import {pgTable,uuid , varchar , text} from "drizzle-orm/pg-core"


export const BlogTable = pgTable("blogs",{
id:uuid().primaryKey().defaultRandom(),
title:varchar({length:80}).notNull(),
body:text().notNull(),
orgId:text().notNull()
})

export type CreateBlogType = typeof BlogTable.$inferInsert;
export type SelectBlogType = typeof BlogTable.$inferSelect;