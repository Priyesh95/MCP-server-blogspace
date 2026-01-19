# MCP Tools Quick Reference

## Setup (Claude Desktop)

1. **Config File Location:**
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`

2. **Add This:**
```json
   {
     "mcpServers": {
       "blogspace": {
         "command": "node",
         "args": ["/YOUR/PATH/blogspace-mcp-server/src/mcp/server.js"]
       }
     }
   }
```

3. **Restart Claude Desktop**

---

## Available Tools

| Tool | Parameters | Purpose |
|------|------------|---------|
| `get_all_blogs` | None | List all blogs |
| `get_blog_by_id` | `id` (number) | Get specific blog |

---

### 1. get_all_blogs

**Description:** Retrieves all published blog posts with metadata.

**Parameters:** None

**Returns:**
- List of blogs with IDs, titles, excerpts
- Author and category information
- Tags, read time, views, likes
- Creation dates

**Use Cases:**
- List all available blogs
- Search through blog titles and content
- Filter blogs by category or author
- Find blogs by tags

---

### 2. get_blog_by_id

**Description:** Retrieves a specific blog post by ID with full content.

**Parameters:**
- `id` (number, required) - The blog post ID (1-8)

**Returns:**
- Complete blog post with full content
- Detailed author information (name, bio, avatar)
- Category details
- All metadata and statistics

**Use Cases:**
- Read full blog content
- Get detailed blog information
- Summarize specific blog posts
- Compare multiple blogs

---

## Example Prompts
```
"Show me all blogs"
"Get blog ID 5"
"Find blogs about React"
"Summarize blog 3"
"Compare blog 1 and blog 2"
```

---

## Troubleshooting
```bash
# Test server manually
node src/mcp/server.js

# Test tools
node src/mcp/test-tools.js

# Check logs (macOS)
tail -f ~/Library/Logs/Claude/mcp*.log
```

---

