import { Router } from 'express';
import { UserRepository, getEffectivePlan } from '@ducky.wtf/database';
import { generateToken } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { registerSchema, loginSchema } from '../validation/schemas';
import { asyncHandler } from '../utils/handlers';
import { serializeUser } from '../utils/serializers';

const router = Router();
const userRepo = new UserRepository();

// Register
router.post(
  '/register',
  validateBody(registerSchema),
  asyncHandler(async (req, res) => {
    const { email, password, fullName } = req.body;

    const existing = await userRepo.findByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const user = await userRepo.create(email, password, fullName);
    const token = generateToken(user.id, user.email);
    const effectivePlan = await getEffectivePlan(user.id);

    res.status(201).json({ user: { ...serializeUser(user), effectivePlan }, token });
  })
);

// Login
router.post(
  '/login',
  validateBody(loginSchema),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await userRepo.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await userRepo.verifyPassword(user, password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    await userRepo.updateLastLogin(user.id);
    const token = generateToken(user.id, user.email);
    const effectivePlan = await getEffectivePlan(user.id);

    res.json({ user: { ...serializeUser(user), effectivePlan }, token });
  })
);

export default router;
