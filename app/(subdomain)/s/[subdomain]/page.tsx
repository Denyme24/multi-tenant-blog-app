import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/db";
import { BlogTable } from "@/db/schema";
import { eq } from "drizzle-orm";

interface params {
  subdomain: string;
}

async function SubdomainPage({ params }: { params: Promise<params> }) {
  const { subdomain } = await params;
  const client = await clerkClient();
  const org = await client.organizations.getOrganization({ slug: subdomain });
  const orgID = org.id;
  const blogs = await db
    .select()
    .from(BlogTable)
    .where(eq(BlogTable.orgId, orgID));
  return (
    <>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h3>{blog.title}</h3>
          <p>{blog.body}</p>
        </div>
      ))}
    </>
  );
}

export default SubdomainPage;
