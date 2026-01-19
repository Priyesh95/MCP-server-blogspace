import { getBlogById } from '../../data/index.js'

/**
 * Tool: get_blog_by_id
 * Returns a specific blog post by ID with full content
 */
export const getBlogByIdTool = {
  name: 'get_blog_by_id',
  description: 'Get a specific blog post by its ID. Returns the complete blog including full content, author details, category, tags, and all metadata. Use this when you need the full text of a specific blog post.',
  
  // Input schema - this tool requires a blog ID
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the blog post to retrieve'
      }
    },
    required: ['id']
  },

  // Execute function with validation
  async execute(params) {
    try {
      console.log(`🔧 Tool Called: get_blog_by_id with ID: ${params.id}`)
      
      // Validate input
      if (!params.id) {
        throw new Error('Blog ID is required')
      }

      const id = params.id;

      // Fetch blog
      const blog = getBlogById(id)
      
      if (!blog) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: false,
                error: 'Not Found',
                message: `Blog with ID ${id} does not exist`
              }, null, 2)
            }
          ]
        }
      }

      console.log(`✅ Returning blog: "${blog.title}"`)
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              blog: {
                id: blog.id,
                title: blog.title,
                slug: blog.slug,
                excerpt: blog.excerpt,
                content: blog.content,  // Full content included
                coverImage: blog.coverImage,
                author: {
                  id: blog.author.id,
                  name: blog.author.name,
                  bio: blog.author.bio,
                  avatar: blog.author.avatar
                },
                category: {
                  id: blog.category.id,
                  name: blog.category.name,
                  slug: blog.category.slug,
                  color: blog.category.color
                },
                tags: blog.tags,
                readTime: blog.readTime,
                views: blog.views,
                likes: blog.likes,
                createdAt: blog.createdAt,
                updatedAt: blog.updatedAt
              }
            }, null, 2)
          }
        ]
      }
    } catch (error) {
      console.error('❌ Error in get_blog_by_id:', error)
      
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