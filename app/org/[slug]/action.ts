"use server"

import { BlogTable, CreateBlogType } from "@/db/schema"
import {db} from "@/db"
export const createBlog = async(payload:CreateBlogType) => {
    const result = await db.insert(BlogTable).values(payload).returning({id:BlogTable.id})
    return result[0]?.id;
}