
---

## 🎓 WHAT YOU'LL LEARN

### Backend/API Concepts
- ✅ REST API design
- ✅ Express routing and middleware
- ✅ Error handling in APIs
- ✅ CORS configuration
- ✅ Route parameters vs query parameters

### MCP (Model Context Protocol) Concepts
- ✅ **Tools:** Functions that LLMs can call
- ✅ **Resources:** Data that LLMs can read
- ✅ **Prompts:** Reusable prompt templates
- ✅ Server-client communication
- ✅ JSON-RPC protocol basics

### Node.js Concepts
- ✅ Module system (ES modules vs CommonJS)
- ✅ Async/await patterns
- ✅ Process management
- ✅ Environment variables

---

## 🔍 MCP CORE COMPONENTS EXPLAINED

### 1. **Tools** (Functions LLMs can execute)
```
Think of these as "actions" the LLM can perform.

Example:
- Tool: "get_all_blogs"
- LLM Request: "Show me all blogs about technology"
- Your server executes the function and returns data
- LLM uses the data to answer the user
```

### 2. **Resources** (Data LLMs can read)
```
Think of these as "files" or "documents" the LLM can access.

Example:
- Resource URI: "blog://post/1"
- LLM Request: "Read blog post 1"
- Your server returns the blog content
- LLM can reference it in responses
```

### 3. **Prompts** (Reusable templates)
```
Think of these as "saved prompts" with placeholders.

Example:
- Prompt: "Summarize this blog: {blog_id}"
- User selects the prompt
- LLM fills in {blog_id} and executes
```

---

## 🎯 YOUR MCP SERVER CAPABILITIES

Once built, your MCP server will let Claude:

### Via Tools:
```
User: "Show me all available blogs"
→ Claude calls get_all_blogs tool
→ Returns list of blogs with titles, excerpts, IDs

User: "Tell me about blog 5"
→ Claude calls get_blog_by_id(5) tool
→ Returns full blog content
→ Claude summarizes it
```

### Via Resources:
```
User: "Read the blog about React hooks"
→ Claude accesses blog://list resource
→ Finds matching blog
→ Accesses blog://post/3 resource
→ Reads and discusses content
```

### Via Prompts:
```
User clicks "Summarize Blog" prompt template
→ Claude asks: "Which blog ID?"
→ User: "Blog 3"
→ Claude uses template to fetch and summarize
```

---

## 🚀 HOW IT ALL CONNECTS
```
┌─────────────────────────────────────────────────┐
│  Claude Desktop (or any MCP-compatible LLM)     │
│  - User asks questions about blogs              │
│  - Claude uses your MCP server to get data      │
└─────────────────┬───────────────────────────────┘
                  │ MCP Protocol (JSON-RPC)
                  │
┌─────────────────▼───────────────────────────────┐
│  YOUR MCP SERVER                                │
│  ├─ Tools (get_all_blogs, get_blog_by_id)      │
│  ├─ Resources (blog://list, blog://post/*)     │
│  └─ Prompts (summarize, compare)               │
└─────────────────┬───────────────────────────────┘
                  │ Internal API calls
                  │
┌─────────────────▼───────────────────────────────┐
│  EXPRESS API                                    │
│  ├─ GET /api/blogs                             │
│  └─ GET /api/blogs/:id                         │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│  BLOG DATA (In-Memory)                          │
│  - Array of blog objects                        │
└─────────────────────────────────────────────────┘