import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    ListPromptsRequestSchema,
    GetPromptRequestSchema
} from '@modelcontextprotocol/sdk/types.js'

// Import our tools
import { getAllBlogsTool } from './tools/getAllBlogs.js'
import { getBlogByIdTool } from './tools/getBlogById.js'

// Registry of all available tools
const tools = [
    getAllBlogsTool,
    getBlogByIdTool
]

// Registry of all available prompts
import { prompts } from './prompts/blogPrompts.js'

const server = new Server(
    {
        name: 'blogspace-mcp-server',
        version: '1.0.0'
    },
    {
        capabilities: {
            tools: {},    // Declare that this server supports tools
            prompts: {}   // Declare that this server supports prompts
        }
    }
)

// ===== HANDLE TOOL LISTING =====
// When LLM asks "what tools are available?"

server.setRequestHandler(ListToolsRequestSchema, async () => {
    console.log('📋 Client requested tool list')

    return {
        tools: tools.map((tool) => ({
            name: tool.name,
            description: tool.description,
            inputSchema: tool.inputSchema
        }))
    }
})

// ===== HANDLE TOOL EXECUTION =====
// When LLM calls a specific tool

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: params } = request.params;

    console.log(`\n🎯 Tool Call Request: ${name}`)
    console.log(`📥 Parameters:`, JSON.stringify(params, null, 2))

    const tool = tools.find(tool => tool.name == name);

    if (!tool) {
        console.error(`❌ Unknown tool: ${name}`)
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: false,
                        error: `Unknown tool: ${name}`,
                        availableTools: tools.map(t => t.name)
                    }, null, 2)
                }
            ],
            isError: true
        }
    }

    // Execute the tool
    try {
        const result = await tool.execute(params || {})
        console.log(`📤 Tool execution completed\n`);
        return result
    }
    catch (error) {
        console.error(`❌ Tool execution failed:`, error)
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: false,
                        error: error.message,
                        stack: error.stack
                    }, null, 2)
                }
            ],
            isError: true
        }

    }
})

/**
 * Handle ListPromptsRequest
 * LLM asks: "What prompts are available?"
 */
server.setRequestHandler(ListPromptsRequestSchema, async () => {
    console.log('💬 Client requested prompt list')

    return {
        prompts: prompts.map(prompt => ({
            name: prompt.name,
            description: prompt.description,
            arguments: prompt.arguments || []
        }))
    }
})

/**
 * Handle GetPromptRequest
 * User selects a prompt and provides arguments
 */
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const { name, arguments: args } = request.params

    console.log(`\n💬 Prompt Request: ${name}`)
    console.log(`📥 Arguments:`, JSON.stringify(args, null, 2))

    // Find the requested prompt
    const prompt = prompts.find(p => p.name === name)

    if (!prompt) {
        console.error(`❌ Unknown prompt: ${name}`)
        throw new Error(`Prompt not found: ${name}`)
    }

    // Validate required arguments
    if (prompt.arguments) {
        for (const arg of prompt.arguments) {
            if (arg.required && !args[arg.name]) {
                throw new Error(`Required argument missing: ${arg.name}`)
            }
        }
    }

    try {
        const result = await prompt.generate(args || {})
        console.log(`📤 Prompt generated successfully\n`)
        return result
    } catch (error) {
        console.error(`❌ Prompt generation failed:`, error)
        throw error
    }
})

// ===== START SERVER =====

async function startServer() {
    console.log('🚀 Starting BlogSpace MCP Server...')
    console.log(`📦 Server: blogspace-mcp-server v1.0.0`)
    console.log(`🔧 Capabilities: Tools`)
    console.log(`📋 Available Tools:`)
    tools.forEach(tool => {
        console.log(`   - ${tool.name}: ${tool.description.substring(0, 60)}...`)
    })
    console.log('\n✨ MCP Server ready and waiting for connections...\n')

    // Create stdio transport (communicates via stdin/stdout)
    const transport = new StdioServerTransport();

    // Connect server to transport
    await server.connect(transport)

    console.log('🔗 Connected to stdio transport');

}


// ===== ERROR HANDLING =====
process.on('SIGINT', async () => {
    console.log('\n👋 Shutting down MCP server...')
    await server.close()
    process.exit(0)
})

process.on('SIGTERM', async () => {
    console.log('\n👋 Shutting down MCP server...')
    await server.close()
    process.exit(0)
})

// Start the server
startServer().catch((error) => {
    console.error('💥 Failed to start MCP server:', error)
    process.exit(1)
})