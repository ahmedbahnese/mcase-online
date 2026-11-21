import { Router, type IRouter } from "express";
import { desc, lt, sql } from "drizzle-orm";
import { db, auditLogsTable } from "@workspace/db";
import { getCurrentUserName, requireFounder } from "../middleware/auth";
import { getPagination } from "../lib/pagination";

const router: IRouter = Router();

router.get("/audit-logs", requireFounder, async (req, res): Promise<void> => {
  await db.delete(auditLogsTable).where(
    lt(auditLogsTable.createdAt, sql`now() - interval '30 days'`),
  );
  const { limit, offset } = getPagination(req, 50);
  const logs = await db
    .select()
    .from(auditLogsTable)
    .orderBy(desc(auditLogsTable.createdAt), desc(auditLogsTable.id))
    .limit(limit)
    .offset(offset);
  res.json(logs);
});

router.delete("/audit-logs", requireFounder, async (_req, res): Promise<void> => {
  await db.delete(auditLogsTable);
  res.json({ success: true });
});

export async function logAction(
  action: string,
  entityType: string,
  entityId: number | null,
  entityName: string | null,
  details: string | null,
  performedBy?: string
) {
  try {
    await db.insert(auditLogsTable).values({
      action,
      entityType,
      entityId,
      entityName,
      details,
      performedBy: performedBy ?? "مستخدم النظام",
    });
  } catch { /* non-critical, don't fail the main operation */ }
}

export default router;
