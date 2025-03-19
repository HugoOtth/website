import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_youtube_block_aspect_ratio" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum__pages_v_blocks_youtube_block_aspect_ratio" AS ENUM('16:9', '4:3', '1:1');
  CREATE TABLE IF NOT EXISTS "pages_blocks_youtube_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"youtube_i_d" varchar,
  	"aspect_ratio" "enum_pages_blocks_youtube_block_aspect_ratio" DEFAULT '16:9',
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_youtube_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"youtube_i_d" varchar,
  	"aspect_ratio" "enum__pages_v_blocks_youtube_block_aspect_ratio" DEFAULT '16:9',
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_youtube_block" ADD CONSTRAINT "pages_blocks_youtube_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_youtube_block" ADD CONSTRAINT "_pages_v_blocks_youtube_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_youtube_block_order_idx" ON "pages_blocks_youtube_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_youtube_block_parent_id_idx" ON "pages_blocks_youtube_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_youtube_block_path_idx" ON "pages_blocks_youtube_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_youtube_block_order_idx" ON "_pages_v_blocks_youtube_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_youtube_block_parent_id_idx" ON "_pages_v_blocks_youtube_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_youtube_block_path_idx" ON "_pages_v_blocks_youtube_block" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_youtube_block" CASCADE;
  DROP TABLE "_pages_v_blocks_youtube_block" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_youtube_block_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_youtube_block_aspect_ratio";`)
}
