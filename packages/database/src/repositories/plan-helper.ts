import { getDatabase } from '../client';

/**
 * Get the effective plan for a user, considering both their individual plan
 * and any team membership where they inherit the owner's plan
 */
export async function getEffectivePlan(userId: string): Promise<string> {
  const db = getDatabase();
  
  // Get user's own plan
  const userResult = await db.query<{ plan: string }>(
    'SELECT plan FROM users WHERE id = $1',
    [userId]
  );
  
  const userPlan = userResult.rows[0]?.plan || 'free';
  
  // Check if user is part of a team and get the team owner's plan
  const teamResult = await db.query<{ owner_plan: string }>(
    `SELECT u.plan as owner_plan
     FROM teams t
     INNER JOIN team_members tm ON t.id = tm.team_id
     INNER JOIN users u ON t.owner_id = u.id
     WHERE tm.user_id = $1`,
    [userId]
  );
  
  const teamOwnerPlan = teamResult.rows[0]?.owner_plan;
  
  // Return the highest tier plan (enterprise > pro > free)
  const plans = [userPlan, teamOwnerPlan].filter(Boolean);
  
  if (plans.includes('enterprise')) return 'enterprise';
  if (plans.includes('pro')) return 'pro';
  return 'free';
}

/**
 * Check if a user has access to a specific plan level or higher
 */
export async function hasMinimumPlan(
  userId: string, 
  requiredPlan: 'free' | 'pro' | 'enterprise'
): Promise<boolean> {
  const effectivePlan = await getEffectivePlan(userId);
  
  const planHierarchy = { free: 0, pro: 1, enterprise: 2 };
  
  return planHierarchy[effectivePlan as keyof typeof planHierarchy] >= 
         planHierarchy[requiredPlan];
}
