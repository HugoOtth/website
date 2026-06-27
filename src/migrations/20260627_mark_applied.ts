import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  const existing = await db.execute(sql`
    SELECT "name" FROM "payload_migrations" WHERE "name" IN ('20250308_183843', '20250308_210559')
  `)
  const existingNames = new Set(existing.rows.map((r: Record<string, unknown>) => r.name))

  if (!existingNames.has('20250308_183843')) {
    await db.execute(sql`
      INSERT INTO "payload_migrations" ("name", "batch", "updated_at", "created_at")
      VALUES ('20250308_183843', 1, now(), now())
    `)
  }
  if (!existingNames.has('20250308_210559')) {
    await db.execute(sql`
      INSERT INTO "payload_migrations" ("name", "batch", "updated_at", "created_at")
      VALUES ('20250308_210559', 1, now(), now())
    `)
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DELETE FROM "payload_migrations" WHERE "name" IN ('20250308_183843', '20250308_210559')
  `)
}
