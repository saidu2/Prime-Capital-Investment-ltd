import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema/index";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update. In production, we use a single connection.
 */
const connectionString = process.env.DATABASE_URL!;

// For query purposes
const queryClient = postgres(connectionString, {
  ssl: connectionString.includes("neon") ? { rejectUnauthorized: false } : false,
});

export const db = drizzle(queryClient, {
  schema,
});
