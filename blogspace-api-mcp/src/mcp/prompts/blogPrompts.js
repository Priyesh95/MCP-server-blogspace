/**
 * MCP Prompts for BlogSpace
 * Reusable prompt templates for common blog tasks
 */

/**
 * Prompt: Summarize Blog
 * Generates a prompt to summarize a specific blog post
 */
export const summarizeBlogPrompt = {
  name: 'summarize_blog',
  description: 'Get a concise summary of a specific blog post including main points and key takeaways',
  
  // Define arguments that user needs to provide
  arguments: [
    {
      name: 'blog_id',
      description: 'The ID of the blog post to summarize',
      required: true
    }
  ],

  // Generate the prompt based on provided arguments
  async generate(args) {
    const { blog_id } = args

    // Validate input
    if (!blog_id) {
      throw new Error('blog_id is required')
    }

    console.log(`💬 Prompt Generated: summarize_blog for blog ${blog_id}`)

    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Please use the get_blog_by_id tool to fetch blog post ${blog_id}, then provide a comprehensive summary that includes:

1. **Main Topic**: What is the blog post about?
2. **Key Points**: List the 3-5 most important points discussed
3. **Target Audience**: Who would benefit from reading this?
4. **Key Takeaways**: What should readers remember?

Format the summary in a clear, structured way.`
          }
        }
      ]
    }
  }
}

/**
 * Prompt: Compare Blogs
 * Generates a prompt to compare two blog posts
 */
export const compareBlogsPrompt = {
  name: 'compare_blogs',
  description: 'Compare two blog posts side by side, highlighting similarities and differences',
  
  arguments: [
    {
      name: 'blog_id_1',
      description: 'The ID of the first blog post',
      required: true
    },
    {
      name: 'blog_id_2',
      description: 'The ID of the second blog post',
      required: true
    }
  ],

  async generate(args) {
    const { blog_id_1, blog_id_2 } = args

    // Validate inputs
    if (!blog_id_1 || !blog_id_2) {
      throw new Error('Both blog_id_1 and blog_id_2 are required')
    }

    if (blog_id_1 === blog_id_2) {
      throw new Error('Please provide two different blog IDs')
    }

    console.log(`💬 Prompt Generated: compare_blogs for blogs ${blog_id_1} and ${blog_id_2}`)

    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Please use the get_blog_by_id tool to fetch both blog posts (ID ${blog_id_1} and ID ${blog_id_2}), then provide a detailed comparison:

**Comparison Analysis:**

1. **Topics**: Compare the main subjects covered
2. **Target Audience**: Who is each blog written for?
3. **Technical Depth**: Which is more technical/beginner-friendly?
4. **Key Differences**: What makes each unique?
5. **Similarities**: What common themes do they share?
6. **Recommendation**: Which should someone read first and why?

Present the comparison in a clear, organized format.`
          }
        }
      ]
    }
  }
}

/**
 * Prompt: Find Blogs by Topic
 * Generates a prompt to search for blogs on a specific topic
 */
export const findBlogsByTopicPrompt = {
  name: 'find_blogs_by_topic',
  description: 'Search for all blogs related to a specific topic or keyword',
  
  arguments: [
    {
      name: 'topic',
      description: 'The topic or keyword to search for (e.g., "React", "Docker", "Design")',
      required: true
    }
  ],

  async generate(args) {
    const { topic } = args

    if (!topic) {
      throw new Error('topic is required')
    }

    console.log(`💬 Prompt Generated: find_blogs_by_topic for "${topic}"`)

    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Please use the get_all_blogs tool to fetch all blogs, then find and present blogs related to "${topic}".

For each matching blog, provide:
- **Title and ID**
- **Author**
- **Brief excerpt**
- **Why it matches** the topic "${topic}"
- **Relevance score** (High/Medium/Low)

If multiple blogs match, rank them by relevance. If no blogs match, suggest related topics that are available.`
          }
        }
      ]
    }
  }
}

/**
 * Prompt: Blog Reading List
 * Generates a prompt to create a curated reading list
 */
export const blogReadingListPrompt = {
  name: 'create_reading_list',
  description: 'Create a curated reading list based on interests or skill level',
  
  arguments: [
    {
      name: 'interest',
      description: 'Area of interest (e.g., "Frontend Development", "DevOps", "Career Growth")',
      required: true
    },
    {
      name: 'skill_level',
      description: 'Skill level: "beginner", "intermediate", or "advanced"',
      required: false
    }
  ],

  async generate(args) {
    const { interest, skill_level = 'all' } = args

    if (!interest) {
      throw new Error('interest is required')
    }

    console.log(`💬 Prompt Generated: create_reading_list for "${interest}" (${skill_level})`)

    const skillLevelText = skill_level !== 'all' 
      ? ` appropriate for ${skill_level} level readers`
      : ''

    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Please use the get_all_blogs tool to fetch all blogs, then create a curated reading list focused on "${interest}"${skillLevelText}.

**Reading List Requirements:**

1. **Selection**: Choose 3-5 most relevant blogs
2. **Ordering**: Arrange from foundational to advanced (if applicable)
3. **For Each Blog**: Include
   - Title and ID
   - Why it's included
   - Key topics covered
   - Estimated read time
4. **Reading Path**: Suggest the order to read them
5. **Total Time**: Calculate total reading time

Make the list actionable and well-organized.`
          }
        }
      ]
    }
  }
}

/**
 * Prompt: Analyze Blog Trends
 * Generates a prompt to analyze trends across all blogs
 */
export const analyzeBlogTrendsPrompt = {
  name: 'analyze_blog_trends',
  description: 'Analyze trends, patterns, and statistics across all blog posts',
  
  arguments: [],  // No arguments needed

  async generate(args) {
    console.log('💬 Prompt Generated: analyze_blog_trends')

    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Please use the get_all_blogs tool to fetch all blogs, then provide a comprehensive trend analysis:

**Analysis Areas:**

1. **Most Popular Topics**: Which categories/tags appear most frequently?
2. **Author Contributions**: How many blogs has each author written?
3. **Content Preferences**: What's the average read time? Most common length?
4. **Engagement Patterns**: Which blogs have highest views/likes?
5. **Temporal Trends**: Any patterns in publication dates?
6. **Recommendations**: What topics should be covered next?

Present findings with specific numbers and examples. Include visualizations if possible (tables, lists).`
          }
        }
      ]
    }
  }
}

// Export all prompts
export const prompts = [
  summarizeBlogPrompt,
  compareBlogsPrompt,
  findBlogsByTopicPrompt,
  blogReadingListPrompt,
  analyzeBlogTrendsPrompt
]