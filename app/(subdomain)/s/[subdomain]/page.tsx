import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/db";
import { BlogTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import Navbar from "@/components/Navbar";

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
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />

        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              {" "}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {org.name}&apos;s Blog
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover insights, stories, and knowledge shared by our amazing
                team
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1">
                  📝 {blogs.length} {blogs.length === 1 ? "post" : "posts"}
                </span>
                <span>•</span>
                <span>@{subdomain}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            {blogs.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-12 max-w-lg mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <svg
                      className="w-10 h-10 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Coming Soon!
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {org.name} is preparing amazing content for you. Our team is
                    working hard to bring you insightful articles, expert
                    opinions, and valuable resources.
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1 bg-blue-50 px-3 py-2 rounded-lg">
                      <svg
                        className="w-4 h-4 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Stay tuned
                    </span>
                    <span className="flex items-center gap-1 bg-purple-50 px-3 py-2 rounded-lg">
                      <svg
                        className="w-4 h-4 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-5 5v-5zM4.07 11H4a2 2 0 01-2-2V7.93c0-.85.54-1.6 1.35-1.88l3.54-.69a7.98 7.98 0 0113.22 0l3.54.69A1.98 1.98 0 0124 7.93V9a2 2 0 01-2 2h-.07M4.07 11c.48.6 1.17 1 1.93 1h12c.76 0 1.45-.4 1.93-1M4.07 11l8.91 8.91c.39.39 1.02.39 1.41 0L23.3 11"
                        />
                      </svg>
                      Quality content
                    </span>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium transition-all duration-200 hover:from-blue-400 hover:to-purple-400 hover:shadow-lg hover:scale-105">
                    Notify me when posts are published
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-8 md:gap-10">
                {blogs.map((blog, index) => (
                  <article key={blog.id} className="group">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                      {" "}
                      {/* Blog Header */}
                      <div className="p-8 md:p-10">
                        {/* Blog Meta Info */}
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 rounded-full font-medium border border-blue-100">
                              Blog Post #{index + 1}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              📅 Recently published
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              👁️ {Math.floor(Math.random() * 500) + 100} views
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex-1">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                              {blog.title}
                            </h2>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                              <span className="flex items-center gap-1">
                                🏢 {org.name}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                ⏱️ {Math.ceil(blog.body.length / 200)} min read
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                🏷️ Technology
                              </span>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-6">
                            <div className="flex flex-col gap-2">
                              <button className="w-10 h-10 bg-white/80 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-lg flex items-center justify-center transition-all duration-200 group/like">
                                <svg
                                  className="w-5 h-5 text-gray-600 group-hover/like:text-red-500 transition-colors"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                  />
                                </svg>
                              </button>
                              <button className="w-10 h-10 bg-white/80 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-lg flex items-center justify-center transition-all duration-200 group/share">
                                <svg
                                  className="w-5 h-5 text-gray-600 group-hover/share:text-blue-500 transition-colors"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                                  />
                                </svg>
                              </button>
                              <button className="w-10 h-10 bg-white/80 hover:bg-purple-50 border border-gray-200 hover:border-purple-200 rounded-lg flex items-center justify-center transition-all duration-200 group/bookmark">
                                <svg
                                  className="w-5 h-5 text-gray-600 group-hover/bookmark:text-purple-500 transition-colors"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium border border-blue-100">
                            Technology
                          </span>
                          <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium border border-green-100">
                            Innovation
                          </span>
                          <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium border border-purple-100">
                            {index % 3 === 0
                              ? "Insights"
                              : index % 3 === 1
                              ? "Featured"
                              : "Trending"}
                          </span>
                        </div>
                        {/* Blog Content */}
                        <div className="prose prose-lg max-w-none mb-6">
                          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50/50 rounded-xl p-6 border border-gray-100">
                            {blog.body.length > 300 ? (
                              <>
                                {blog.body.substring(0, 300)}
                                <span className="text-gray-500 font-medium">
                                  ...
                                </span>
                              </>
                            ) : (
                              blog.body
                            )}
                          </div>
                        </div>{" "}
                        {/* Read More Section */}
                        {blog.body.length > 300 && (
                          <div className="pt-6 border-t border-gray-200">
                            <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium transition-all duration-200 hover:from-blue-400 hover:to-purple-400 hover:shadow-lg hover:scale-105 group">
                              <span>Continue reading</span>
                              <svg
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                        {/* Blog Footer */}
                        <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white text-sm font-bold">
                                  {org.name.charAt(0)}
                                </span>
                              </div>
                              <div className="text-sm">
                                <p className="font-medium text-gray-900">
                                  by {org.name} Team
                                </p>
                                <p className="text-gray-500">
                                  Published recently • Expert insights
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                              <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-red-50 rounded-lg text-sm text-gray-600 hover:text-red-500 transition-all duration-200 group">
                                <svg
                                  className="w-4 h-4 group-hover:scale-110 transition-transform"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                  />
                                </svg>
                                <span>
                                  {Math.floor(Math.random() * 50) + 15}
                                </span>
                              </button>
                              <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-blue-50 rounded-lg text-sm text-gray-600 hover:text-blue-500 transition-all duration-200 group">
                                <svg
                                  className="w-4 h-4 group-hover:scale-110 transition-transform"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                  />
                                </svg>
                                <span>
                                  {Math.floor(Math.random() * 15) + 3}
                                </span>
                              </button>
                            </div>
                            <button className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-600 border border-blue-200 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md">
                              Read Full Article
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}{" "}
            {/* Organization Info Footer */}
            <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 left-4 w-20 h-20 bg-blue-400 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 bg-purple-400 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-400 rounded-full"></div>
              </div>

              <div className="text-center relative z-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">
                      {org.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    About {org.name}
                  </h3>
                </div>

                <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
                  We&apos;re passionate about sharing knowledge, insights, and
                  stories that matter. Join our community as we explore
                  innovative ideas, breakthrough technologies, and
                  transformative solutions in our field.
                </p>

                {/* Stats Section */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                    <div className="text-2xl font-bold text-blue-600">
                      {blogs.length}
                    </div>
                    <div className="text-sm text-gray-600">Published Posts</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.floor(Math.random() * 5000) + 1000}
                    </div>
                    <div className="text-sm text-gray-600">Total Readers</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.floor(Math.random() * 500) + 100}
                    </div>
                    <div className="text-sm text-gray-600">
                      Community Members
                    </div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                    <div className="text-2xl font-bold text-orange-600">
                      {Math.floor(Math.random() * 50) + 10}
                    </div>
                    <div className="text-sm text-gray-600">Expert Authors</div>
                  </div>
                </div>

                {/* Info Links */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 mb-6">
                  <span className="flex items-center gap-2 bg-white/50 px-3 py-2 rounded-lg border border-white/40">
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                      />
                    </svg>
                    {subdomain}.blogapp.com
                  </span>
                  <span className="flex items-center gap-2 bg-white/50 px-3 py-2 rounded-lg border border-white/40">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Verified Organization
                  </span>
                  <span className="flex items-center gap-2 bg-white/50 px-3 py-2 rounded-lg border border-white/40">
                    <svg
                      className="w-4 h-4 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Quality Content
                  </span>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium transition-all duration-200 hover:from-blue-400 hover:to-purple-400 hover:shadow-lg hover:scale-105">
                    Subscribe to Updates
                  </button>
                  <button className="px-6 py-3 bg-white/80 text-gray-700 border border-gray-200 rounded-lg font-medium transition-all duration-200 hover:bg-white hover:shadow-md">
                    Follow Organization
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default SubdomainPage;
