import app from "../artifacts/api-server/src/app";
import { initDatabase } from "../artifacts/api-server/src/lib/db-init";

const ready = initDatabase();

export default async function handler(req: any, res: any) {
  await ready;
  return app(req, res);
}
