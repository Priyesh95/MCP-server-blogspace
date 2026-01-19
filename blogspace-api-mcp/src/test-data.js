import {
  getAllBlogs,
  getBlogById,
  searchBlogs,
  getBlogStats,
  getAllCategoriesWithCount,
  getBlogsByCategory
} from './data/index.js'

console.log('=== Testing Blog Data ===\n')

// Test 1: Get all blogs
console.log('1. All Blogs:')
const allBlogs = getAllBlogs()
console.log(`Found ${allBlogs.length} published blogs\n`)

// Test 2: Get specific blog
console.log('2. Blog by ID (1):')
const blog = getBlogById("blog-001")
console.log(`Title: ${blog.title}`)
console.log(`Author: ${blog.author.name}`)
console.log(`Category: ${blog.category.name}\n`)

// Test 3: Search blogs
console.log('3. Search for "React":')
const searchResults = searchBlogs('React')
console.log(`Found ${searchResults.length} blogs`)
searchResults.forEach(b => console.log(`  - ${b.title}`))
console.log('')

// Test 4: Blog statistics
console.log('4. Blog Statistics:')
const stats = getBlogStats()
console.log(JSON.stringify(stats, null, 2))
console.log('')

// Test 5: Categories with counts
console.log('5. Categories with Blog Counts:')
const categoriesWithCount = getAllCategoriesWithCount()
categoriesWithCount.forEach(cat => {
  console.log(`  ${cat.name}: ${cat.blogCount} blogs`)
})

// Test 6: Categories with counts
console.log('6. Get blogs by category:')
const blogsByCategory = getBlogsByCategory(1)
blogsByCategory.forEach(blog => {
//   console.log(blog)
  console.log(`  ${blog.title} ${blog.author.name}`)
})

console.log('\n✅ All data tests passed!')