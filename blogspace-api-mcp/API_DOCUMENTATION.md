# BlogSpace API Documentation

Base URL: `http://localhost:3000`

## Endpoints

### Health Check

**GET** `/health`

Check if the API is running.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-12-20T10:30:00.000Z",
  "uptime": 123.456,
  "message": "BlogSpace API is running"
}
```

---

### API Information

**GET** `/api`

Get API version and available endpoints.

**Response:**
```json
{
  "name": "BlogSpace API",
  "version": "1.0.0",
  "description": "REST API for blog posts",
  "endpoints": { ... }
}
```

---

### Get All Blogs

**GET** `/api/blogs`

Get all published blogs.

**Query Parameters:**
- `search` (optional) - Search query
- `category` (optional) - Filter by category ID
- `author` (optional) - Filter by author ID

**Examples:**
```
GET /api/blogs
GET /api/blogs?search=React
GET /api/blogs?category=1
GET /api/blogs?author=2
```

**Response:**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "id": 1,
      "title": "Getting Started with React Hooks",
      "excerpt": "Learn how to use React Hooks...",
      "author": {
        "id": 1,
        "name": "John Doe",
        ...
      },
      "category": {
        "id": 2,
        "name": "Web Development",
        ...
      },
      ...
    }
  ]
}
```

---

### Get Blog by ID

**GET** `/api/blogs/:id`

Get a single blog post by ID.

**Parameters:**
- `id` (required) - Blog ID (number)

**Example:**
```
GET /api/blogs/1
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Getting Started with React Hooks",
    "content": "Full blog content...",
    "author": { ... },
    "category": { ... },
    ...
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Blog with ID 999 not found"
}
```

---

### Get Blog Statistics

**GET** `/api/blogs/stats`

Get overall blog statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalBlogs": 8,
    "totalViews": 18455,
    "totalLikes": 1485,
    "totalAuthors": 3,
    "categoriesUsed": 5
  }
}
```

---

### Get Categories

**GET** `/api/blogs/categories`

Get all categories with blog counts.

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "name": "Technology",
      "slug": "technology",
      "description": "Latest tech trends...",
      "color": "#3b82f6",
      "blogCount": 2
    },
    ...
  ]
}
```

---

### Get Related Blogs

**GET** `/api/blogs/:id/related`

Get blogs related to a specific blog (same category).

**Parameters:**
- `id` (required) - Blog ID

**Query Parameters:**
- `limit` (optional) - Number of results (default: 3)

**Example:**
```
GET /api/blogs/1/related
GET /api/blogs/1/related?limit=5
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "blogId": 1,
  "data": [ ... ]
}
```

---

## Error Responses

All endpoints return errors in this format:
```json
{
  "success": false,
  "error": "Error Type",
  "message": "Detailed error message"
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad Request (invalid input)
- `404` - Not Found
- `500` - Internal Server Error