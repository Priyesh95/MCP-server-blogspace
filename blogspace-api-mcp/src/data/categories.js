export const categories = [
  {
    id: 1,
    name: "Technology",
    slug: "technology",
    description: "Latest tech trends, tutorials, and insights",
    color: "#3b82f6"
  },
  {
    id: 2,
    name: "Web Development",
    slug: "web-development",
    description: "Frontend, backend, and full-stack development",
    color: "#8b5cf6"
  },
  {
    id: 3,
    name: "Design",
    slug: "design",
    description: "UI/UX design, graphics, and creative work",
    color: "#ec4899"
  },
  {
    id: 4,
    name: "Career",
    slug: "career",
    description: "Career advice, interviews, and professional growth",
    color: "#10b981"
  },
  {
    id: 5,
    name: "DevOps",
    slug: "devops",
    description: "Infrastructure, deployment, and automation",
    color: "#f59e0b"
  }
]

// Helper function to get category by ID
export const getCategoryById = (id) => {
  return categories.find(category => category.id === parseInt(id))
}

// Helper function to get category by slug
export const getCategoryBySlug = (slug) => {
  return categories.find(category => category.slug === slug)
}