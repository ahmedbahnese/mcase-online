import type { Request } from "express";

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

export type Pagination = {
  limit: number;
  offset: number;
  page: number;
};

function positiveInteger(value: unknown, fallback: number): number {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function getPagination(req: Request, defaultLimit = DEFAULT_PAGE_SIZE): Pagination {
  const requestedLimit = positiveInteger(req.query.limit, defaultLimit);
  const limit = Math.min(requestedLimit, MAX_PAGE_SIZE);
  const page = positiveInteger(req.query.page, 1);
  const offsetValue = Number.parseInt(String(req.query.offset ?? ""), 10);
  const offset = Number.isFinite(offsetValue) && offsetValue >= 0
    ? offsetValue
    : (page - 1) * limit;
  return { limit, offset, page };
}
