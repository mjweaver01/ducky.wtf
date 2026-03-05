import { Router } from 'express';
import { MagicLinkRepository, UserRepository, TokenRepository } from '@ducky.wtf/database';
import { asyncHandler } from '../utils/handlers';
import { generateToken } from '../middleware/auth';
import { serializeUser } from '../utils/serializers';
import { emailService } from '../lib/email';
import * as crypto from 'crypto';

const router = Router();
const magicLinkRepo = new MagicLinkRepository();
const userRepo = new UserRepository();
const tokenRepo = new TokenRepository();

// Request magic link
router.post(
  '/magic-link',
  asyncHandler(async (req, res) => {
    const { email, anonymousToken } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Create magic link
    const magicLink = await magicLinkRepo.create(email, anonymousToken);

    // TODO: Send email with magic link
    // For now, return the link in dev mode
    const magicUrl = `${process.env.WEB_URL || 'http://localhost:9179'}/auth/magic?token=${magicLink.token}`;

    // In production, only send email and return success
    if (process.env.NODE_ENV === 'production') {
      console.log(`Magic link for ${email}: ${magicUrl}`);
      res.json({ message: 'Magic link sent to your email' });
    } else {
      // In development, return the link for easy testing
      res.json({
        message: 'Magic link generated',
        magicUrl,
        expiresIn: '15 minutes',
      });
    }
  })
);

// Verify magic link and login
router.post(
  '/magic-verify',
  asyncHandler(async (req, res) => {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    // Find and validate magic link
    const magicLink = await magicLinkRepo.findByToken(token);
    if (!magicLink) {
      return res.status(400).json({ error: 'Invalid or expired magic link' });
    }

    // Mark as used
    await magicLinkRepo.markUsed(magicLink.id);

    // Find or create user
    let user = await userRepo.findByEmail(magicLink.email);
    if (!user) {
      // Create new user (passwordless)
      user = await userRepo.create(magicLink.email, crypto.randomBytes(32).toString('hex'));
    }

    // Update last login
    await userRepo.updateLastLogin(user.id);

    // If there was an anonymous token, link it to the user
    let cliToken = null;
    if (magicLink.anonymous_token) {
      const authToken = await tokenRepo.findByToken(magicLink.anonymous_token);
      if (authToken && authToken.is_anonymous) {
        await tokenRepo.linkToUser(authToken.id, user.id, user.plan);
        cliToken = authToken.token;
      }
    }

    // Generate JWT for web session
    const jwtToken = generateToken(user.id, user.email);

    res.json({
      user: serializeUser(user),
      token: jwtToken,
      cliToken, // If anonymous token was linked, return it
    });
  })
);

// Request password reset
router.post(
  '/forgot-password',
  asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Look up user (but always return success to avoid email enumeration)
    const user = await userRepo.findByEmail(email);

    if (user) {
      // Create password reset magic link
      const magicLink = await magicLinkRepo.create(email, undefined, 'password_reset');
      const resetUrl = `${process.env.WEB_URL || 'http://localhost:9179'}/reset-password?token=${magicLink.token}`;

      // Send password reset email
      try {
        await emailService.sendPasswordResetEmail(email, resetUrl);
      } catch (error) {
        console.error('Failed to send password reset email:', error);
        // In production, still return success to avoid email enumeration
        if (process.env.NODE_ENV !== 'production') {
          return res.status(500).json({ error: 'Failed to send email' });
        }
      }

      // In development, return the reset URL for easy testing
      if (process.env.NODE_ENV !== 'production') {
        return res.json({
          message: 'Password reset link sent',
          resetUrl,
          expiresIn: '15 minutes',
        });
      }
    }

    // Always return the same success message (no email enumeration)
    res.json({
      message: 'If an account exists with that email, a password reset link has been sent.',
    });
  })
);

// Reset password
router.post(
  '/reset-password',
  asyncHandler(async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Find and validate password reset magic link
    const magicLink = await magicLinkRepo.findByToken(token, 'password_reset');
    if (!magicLink) {
      return res.status(400).json({ error: 'Invalid or expired reset link' });
    }

    // Find user
    const user = await userRepo.findByEmail(magicLink.email);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Update password
    await userRepo.updatePassword(user.id, newPassword);

    // Mark magic link as used
    await magicLinkRepo.markUsed(magicLink.id);

    res.json({
      message: 'Password has been reset successfully',
    });
  })
);

export default router;
