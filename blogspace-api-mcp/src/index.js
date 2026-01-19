// Import environment variables
import 'dotenv/config'

// Start the API server
import './api/server.js'

console.log('🎯 BlogSpace Backend Starting...')
console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`)