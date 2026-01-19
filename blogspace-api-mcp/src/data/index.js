import { users, getUserById, getUserByEmail } from './users.js'
import { categories, getCategoryById, getCategoryBySlug } from './categories.js'
import { blogs } from './blogs.js'

// Export all data
export { users, categories, blogs }

// Export user helpers
export { getUserById, getUserByEmail }

// Export category helpers
export { getCategoryById, getCategoryBySlug }

// ===== BLOG HELPER FUNCTIONS =====

// Get all published blogs
export const getAllBlogs = () => {
  return blogs
    .filter(blog => blog.published)
    .map(blog => ({
      ...blog,
      author: getUserById(blog.authorId),
      category: getCategoryById(blog.categoryId)
    }))
}

// // Get blog by ID
// export const getBlogById = (id) => {
//   const blog = blogs.find(blog => blog.id === (id))
//   if (!blog) return null
  
//   // Enrich with author and category data
//   return {
//     ...blog,
//     author: getUserById(blog.authorId),
//     category: getCategoryById(blog.categoryId)
//   }
// }


export const getBlogById = (id) => {
    const blog = blogs.find(blog =>{
        return blog.id === id
    })

    return {
        ...blog,
         author: getUserById(blog.authorId),
         category: getCategoryById(blog.categoryId)
    }

}

// Get blog by slug
export const getBlogBySlug = (slug) => {
  const blog = blogs.find(blog => blog.slug === slug)
  if (!blog) return null
  
  return {
    ...blog,
    author: getUserById(blog.authorId),
    category: getCategoryById(blog.categoryId)
  }
}

// Get blogs by category ID
export const getBlogsByCategory = (categoryId) => {
  return blogs
    .filter(blog => blog.categoryId === parseInt(categoryId) && blog.published)
    .map(blog => ({
      ...blog,
      author: getUserById(blog.authorId),
      category: getCategoryById(blog.categoryId)
    }))
}

// Get blogs by author ID
export const getBlogsByAuthor = (authorId) => {
  return blogs
    .filter(blog => blog.authorId === parseInt(authorId))
    .map(blog => ({
      ...blog,
      author: getUserById(blog.authorId),
      category: getCategoryById(blog.categoryId)
    }))
}

// Search blogs by query (title, excerpt, tags)
export const searchBlogs = (query) => {
  const lowerQuery = query.toLowerCase()
  
  return blogs
    .filter(blog => 
      blog.published && (
        blog.title.toLowerCase().includes(lowerQuery) ||
        blog.excerpt.toLowerCase().includes(lowerQuery) ||
        blog.content.toLowerCase().includes(lowerQuery) ||
        blog.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
    )
    .map(blog => ({
      ...blog,
      author: getUserById(blog.authorId),
      category: getCategoryById(blog.categoryId)
    }))
}

// Get all categories with blog count
export const getAllCategoriesWithCount = () => {
  return categories.map(category => ({
    ...category,
    blogCount: blogs.filter(
      blog => blog.categoryId === category.id && blog.published
    ).length
  }))
}

// Get blog statistics
export const getBlogStats = () => {
  const publishedBlogs = blogs.filter(blog => blog.published)
  
  return {
    totalBlogs: publishedBlogs.length,
    totalViews: publishedBlogs.reduce((sum, blog) => sum + blog.views, 0),
    totalLikes: publishedBlogs.reduce((sum, blog) => sum + blog.likes, 0),
    totalAuthors: new Set(publishedBlogs.map(blog => blog.authorId)).size,
    categoriesUsed: new Set(publishedBlogs.map(blog => blog.categoryId)).size
  }
}

// Get related blogs (same category, excluding current blog)
export const getRelatedBlogs = (blogId, limit = 3) => {
  const currentBlog = getBlogById(blogId)
  if (!currentBlog) return []
  
  return blogs
    .filter(blog => 
      blog.id !== (blogId) &&
      blog.categoryId === currentBlog.categoryId &&
      blog.published
    )
    .slice(0, limit)
    .map(blog => ({
      ...blog,
      author: getUserById(blog.authorId),
      category: getCategoryById(blog.categoryId)
    }))
}