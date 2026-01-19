import express from 'express'
import {
  getAllBlogs,
  getBlogById,
  getBlogsByCategory,
  getBlogsByAuthor,
  searchBlogs,
  getBlogStats,
  getRelatedBlogs,
  getAllCategoriesWithCount
} from '../../data/index.js'

const router = express.Router()

// ===== BLOG ROUTES =====

/**
 * GET /api/blogs
 * Get all blogs or filter by query parameters
 * Query params: ?search=query, ?category=id, ?author=id
 */
router.get('/', (req, res) => {
  try {
    const { search, category, author } = req.query
    
    let blogs
    let filterApplied = null

    if (search) {
      // Search blogs
      blogs = searchBlogs(search)
      filterApplied = `search: "${search}"`
    } else if (category) {
      // Filter by category
      blogs = getBlogsByCategory(category)
      filterApplied = `category: ${category}`
    } else if (author) {
      // Filter by author
      blogs = getBlogsByAuthor(author)
      filterApplied = `author: ${author}`
    } else {
      // Get all blogs
      blogs = getAllBlogs()
    }

    res.json({
      success: true,
      count: blogs.length,
      ...(filterApplied && { filter: filterApplied }),
      data: blogs
    })
  } catch (error) {
    console.error('Error fetching blogs:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch blogs',
      message: error.message
    })
  }
})

/**
 * GET /api/blogs/stats
 * Get blog statistics
 * Note: This must come BEFORE /:id route to avoid treating "stats" as an ID
 */
router.get('/stats', (req, res) => {
  try {
    const stats = getBlogStats()
    
    res.json({
      success: true,
      data: stats
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics',
      message: error.message
    })
  }
})

/**
 * GET /api/blogs/categories
 * Get all categories with blog counts
 */
router.get('/categories', (req, res) => {
  try {
    const categories = getAllCategoriesWithCount()
    
    res.json({
      success: true,
      count: categories.length,
      data: categories
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories',
      message: error.message
    })
  }
})

/**
 * GET /api/blogs/:id
 * Get a single blog by ID
 */
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params

    const blog = getBlogById(id)

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Blog with ID ${id} not found`
      })
    }

    res.json({
      success: true,
      data: blog
    })
  } catch (error) {
    console.error('Error fetching blog:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch blog',
      message: error.message
    })
  }
})

/**
 * GET /api/blogs/:id/related
 * Get related blogs for a specific blog
 */
router.get('/:id/related', (req, res) => {
  try {
    const { id } = req.params
    const limit = parseInt(req.query.limit) || 3

    const relatedBlogs = getRelatedBlogs(id, limit)

    res.json({
      success: true,
      count: relatedBlogs.length,
      blogId: parseInt(id),
      data: relatedBlogs
    })
  } catch (error) {
    console.error('Error fetching related blogs:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch related blogs',
      message: error.message
    })
  }
})

export default router