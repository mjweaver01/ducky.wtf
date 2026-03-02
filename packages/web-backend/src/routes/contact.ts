import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { emailService } from '../lib/email';

const router = Router();

// Stricter rate limit for contact form to prevent spam
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 contact form submissions per hour
  message: 'Too many contact form submissions. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, topic, message } = req.body;

    // Validation
    if (!name || !email || !topic || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'email', 'topic', 'message'],
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email address',
      });
    }

    // Length validation
    if (name.length > 100) {
      return res.status(400).json({
        error: 'Name is too long (max 100 characters)',
      });
    }

    if (message.length > 5000) {
      return res.status(400).json({
        error: 'Message is too long (max 5000 characters)',
      });
    }

    // Valid topics
    const validTopics = ['general', 'support', 'billing', 'bug', 'feature', 'other'];
    if (!validTopics.includes(topic)) {
      return res.status(400).json({
        error: 'Invalid topic',
        validTopics,
      });
    }

    // Send email
    await emailService.sendContactForm({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      topic,
      message: message.trim(),
    });

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      error: 'Failed to send message. Please try again later or email us directly.',
    });
  }
});

export default router;
