import express from 'express'
import cors from 'cors'
import blogRoutes from './routes/blogs.js'

const app = express()
const PORT = process.env.PORT || 3000

// ===== MIDDLEWARE =====

// Enable CORS for all origins (adjust in production)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Parse JSON request bodies
app.use(express.json())

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] ${req.method} ${req.url}`)
  next()
})

// ===== ROUTES =====

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'BlogSpace API is running'
  })
})

// API version and info
app.get('/api', (req, res) => {
  res.json({
    name: 'BlogSpace API',
    version: '1.0.0',
    description: 'REST API for blog posts',
    endpoints: {
      health: '/health',
      blogs: {
        getAll: 'GET /api/blogs',
        getById: 'GET /api/blogs/:id',
        search: 'GET /api/blogs?search=query',
        byCategory: 'GET /api/blogs?category=id',
        byAuthor: 'GET /api/blogs?author=id'
      }
    }
  })
})

// Mount blog routes
app.use('/api/blogs', blogRoutes)

// ===== ERROR HANDLING =====

// 404 handler - catch all unmatched routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.url}`,
    availableEndpoints: ['/health', '/api', '/api/blogs']
  })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack)
  
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

// ===== START SERVER =====

app.listen(PORT, () => {
  console.log('\n🚀 BlogSpace API Server Started')
  console.log(`📍 URL: http://localhost:${PORT}`)
  console.log(`🏥 Health: http://localhost:${PORT}/health`)
  console.log(`📚 API Info: http://localhost:${PORT}/api`)
  console.log(`📝 Blogs: http://localhost:${PORT}/api/blogs`)
  console.log('\n✨ Server is ready to accept requests!\n')
})

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n👋 SIGTERM received, shutting down gracefully...')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('\n👋 SIGINT received, shutting down gracefully...')
  process.exit(0)
})

export default app