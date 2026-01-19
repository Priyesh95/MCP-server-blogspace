import { getAllBlogs } from "../../data/index.js";

/**
 * Tool: get_all_blogs
 * Returns all published blog posts
 */

export const getAllBlogsTool = {
    name: "get_all_blogs",
    description: 'Get all published blog posts. Returns a list of blogs with titles, excerpts, authors, categories, and metadata. Use this to show available blogs or search through blog content.',
    inputSchema: {
        type: 'object',
        properties: {
            // This tool takes no parameters, but we define an empty schema
        },
        required: []
    },

    async execute(params) {
        try {
            console.log('🔧 Tool Called: get_all_blogs');

            const blogs = getAllBlogs();

            const blogsForLLM = blogs.map((blog) => ({
                id: blog.id,
                title: blog.title,
                slug: blog.slug,
                excerpt: blog.excerpt,
                author: {
                    id: blog.author.id,
                    name: blog.author.name
                },
                category: {
                    id: blog.category.id,
                    name: blog.category.name,
                    color: blog.category.color
                },
                tags: blog.tags,
                readTime: blog.readTime,
                views: blog.views,
                likes: blog.likes,
                createdAt: blog.createdAt
            }));

            console.log(`✅ Returning ${blogsForLLM.length} blogs`)

            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify({
                        success: true,
                        count: blogsForLLM.length,
                        blogs: blogsForLLM
                    }, null, 2)
                }]

            }

        }
        catch (error) {
            console.error('❌ Error in get_all_blogs:', error)

            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            success: false,
                            error: error.message
                        }, null, 2)
                    }
                ],
                isError: true
            }

        }
    }

}
