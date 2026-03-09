import { Router } from 'express';
import { UserRepository, getEffectivePlan } from '@ducky.wtf/database';
import { authenticateToken } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { updateProfileSchema, changePasswordSchema } from '../validation/schemas';
import { asyncHandler } from '../utils/handlers';
import { serializeUser } from '../utils/serializers';

const router = Router();
const userRepo = new UserRepository();

// Get current user profile
router.get(
  '/me',
  authenticateToken,
  asyncHandler(async (req, res) => {
    const user = await userRepo.findById(req.user!.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const effectivePlan = await getEffectivePlan(req.user!.id);
    res.json({ user: { ...serializeUser(user), effectivePlan } });
  })
);

// Update user profile
router.patch(
  '/me',
  authenticateToken,
  validateBody(updateProfileSchema),
  asyncHandler(async (req, res) => {
    const updates: Record<string, any> = {};
    if (req.body.fullName !== undefined) updates.full_name = req.body.fullName;
    if (req.body.email !== undefined) {
      const existing = await userRepo.findByEmail(req.body.email);
      if (existing && existing.id !== req.user!.id) {
        return res.status(409).json({ error: 'Email already in use' });
      }
      updates.email = req.body.email;
    }

    const user = await userRepo.update(req.user!.id, updates);
    const effectivePlan = await getEffectivePlan(req.user!.id);
    res.json({ user: { ...serializeUser(user), effectivePlan } });
  })
);

// Change password
router.post(
  '/me/change-password',
  authenticateToken,
  validateBody(changePasswordSchema),
  asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const user = await userRepo.findById(req.user!.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValid = await userRepo.verifyPassword(user, currentPassword);
    if (!isValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    await userRepo.updatePassword(req.user!.id, newPassword);
    res.json({ message: 'Password changed successfully' });
  })
);

export default router;
