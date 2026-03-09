import { Router } from 'express';
import { TunnelRepository } from '@ducky.wtf/database';
import { authenticateToken } from '../middleware/auth';
import { asyncHandler, assertOwned } from '../utils/handlers';
import { serializeTunnel, serializeTunnelStats } from '../utils/serializers';

const router = Router();
const tunnelRepo = new TunnelRepository();

// List user's tunnels
router.get(
  '/',
  authenticateToken,
  asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
    const offset = Math.max(parseInt(req.query.offset as string) || 0, 0);
    
    const tunnels = await tunnelRepo.listByUser(
      req.user!.id,
      req.query.status as string | undefined,
      limit,
      offset
    );
    res.json({ 
      tunnels: tunnels.map(serializeTunnel),
      pagination: { limit, offset, hasMore: tunnels.length === limit }
    });
  })
);

// Get tunnel stats
router.get(
  '/stats',
  authenticateToken,
  asyncHandler(async (req, res) => {
    const stats = await tunnelRepo.getStats(req.user!.id);
    res.json({ stats: serializeTunnelStats(stats) });
  })
);

// Get tunnel by ID
router.get(
  '/:id',
  authenticateToken,
  asyncHandler(async (req, res) => {
    const tunnel = await tunnelRepo.findById(req.params.id);
    if (!assertOwned(tunnel, req.user!.id, res, 'Tunnel')) return;
    res.json({ tunnel: serializeTunnel(tunnel) });
  })
);

// Stop tunnel
router.post(
  '/:id/stop',
  authenticateToken,
  asyncHandler(async (req, res) => {
    const tunnel = await tunnelRepo.findById(req.params.id);
    if (!assertOwned(tunnel, req.user!.id, res, 'Tunnel')) return;
    await tunnelRepo.updateStatus(req.params.id, 'stopped');
    res.json({ message: 'Tunnel stopped successfully' });
  })
);

export default router;
