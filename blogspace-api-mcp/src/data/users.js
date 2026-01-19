export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "Tech enthusiast and full-stack developer. Love writing about JavaScript, React, and modern web technologies.",
    joinedDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "UX designer and blogger. Passionate about creating beautiful user experiences and sharing design insights.",
    joinedDate: "2024-02-20"
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "DevOps engineer and cloud architect. Writing about infrastructure, automation, and best practices.",
    joinedDate: "2024-03-10"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    email: "emily@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=10",
    bio: "Content writer and business strategist. Passionate about health, wellness, and sustainable business practices.",
    joinedDate: "2024-04-05"
  }
]

// Helper function to get user by ID
export const getUserById = (id) => {
  return users.find(user => user.id === parseInt(id))
}

// Helper function to get user by email
export const getUserByEmail = (email) => {
  return users.find(user => user.email === email)
}