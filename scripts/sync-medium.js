const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const cron = require('node-cron');

class MediumSyncer {
  constructor(username) {
    this.username = username;
    this.parser = new Parser({
      customFields: {
        item: ['content:encoded', 'guid', 'description']
      }
    });
    this.dataPath = path.join(__dirname, '../data/medium-posts.json');
    this.rssUrl = `https://medium.com/feed/@${username}`;
  }

  async fetchMediumPosts() {
    try {
      console.log(`🔄 Fetching posts from: ${this.rssUrl}`);
      const feed = await this.parser.parseURL(this.rssUrl);
      console.log(`📝 Found ${feed.items.length} posts on Medium`);
      return feed.items;
    } catch (error) {
      console.error('❌ Error fetching Medium RSS:', error.message);
      return [];
    }
  }

  transformMediumPost(item, index) {
    // Extract content from HTML
    const $ = cheerio.load(item['content:encoded'] || item.content || item.description || '');
    
    // Remove Medium-specific elements
    $('figure').remove();
    $('iframe').remove();
    $('.medium-zoom-image').remove();
    
    // Get first paragraph as excerpt
    const allText = $.text().trim();
    const sentences = allText.split('.').filter(s => s.trim().length > 0);
    const excerpt = sentences.slice(0, 2).join('.') + '.';
    const finalExcerpt = excerpt.length > 300 ? excerpt.substring(0, 300) + '...' : excerpt;

    // Estimate read time (assuming 200 words per minute)
    const wordCount = allText.split(/\s+/).length;
    const readTime = Math.max(1, Math.round(wordCount / 200));

    // Extract categories from title and content
    const categories = this.extractCategories(item.title, allText, item.categories || []);
    
    // Generate slug from title
    const slug = this.generateSlug(item.title);

    // Assign colors based on categories
    const colorMap = {
      'Gap Year': 'emerald',
      'Creative': 'purple', 
      'Career': 'blue',
      'Life': 'orange',
      'Engineering': 'teal'
    };
    const color = colorMap[categories.primary] || 'blue';

    return {
      id: item.guid || `medium-${Date.now()}-${index}`,
      title: item.title,
      excerpt: finalExcerpt,
      content: item['content:encoded'] || item.content || item.description || '',
      date: new Date(item.pubDate).toISOString().split('T')[0],
      category: categories.primary,
      readTime: readTime,
      tags: categories.tags,
      slug: slug,
      featured: index === 0, // Make first post featured
      color: color,
      mediumUrl: item.link,
      source: 'medium',
      lastSync: new Date().toISOString()
    };
  }

  extractCategories(title, content, categories = []) {
    const titleLower = title.toLowerCase();
    const contentLower = content.toLowerCase();
    
    // Smart category detection based on content
    const categoryKeywords = {
      'Gap Year': ['gap year', 'jgp', 'fellowship', '間隔年', 'gap', 'application'],
      'Creative': ['art', 'creative', 'design', 'photography', 'artwork', '創作', '藝術'],
      'Career': ['internship', 'engineering', 'career', 'work', 'professional', '工作', '實習'],
      'Life': ['basketball', 'sports', 'life', 'experience', 'personal', '生活', '籃球'],
      'Engineering': ['chemical', 'engineering', 'technical', 'process', 'shl medical', '工程']
    };

    let detectedCategory = 'Life'; // default
    let maxScore = 0;

    // Check keywords in title and content
    Object.entries(categoryKeywords).forEach(([category, keywords]) => {
      const score = keywords.reduce((acc, keyword) => {
        const titleMatches = (titleLower.includes(keyword) ? 3 : 0);
        const contentMatches = (contentLower.includes(keyword) ? 1 : 0);
        return acc + titleMatches + contentMatches;
      }, 0);

      if (score > maxScore) {
        maxScore = score;
        detectedCategory = category;
      }
    });

    // Generate tags from content and existing categories
    const tags = new Set();
    
    // Add detected keywords as tags
    Object.entries(categoryKeywords).forEach(([_, keywords]) => {
      keywords.forEach(keyword => {
        if (titleLower.includes(keyword) || contentLower.includes(keyword)) {
          tags.add(keyword.replace(/\s+/g, '-'));
        }
      });
    });

    // Add original categories
    categories.forEach(cat => {
      if (typeof cat === 'string') {
        tags.add(cat.toLowerCase().replace(/\s+/g, '-'));
      }
    });

    // Limit tags and filter out very common ones
    const filteredTags = Array.from(tags)
      .filter(tag => tag.length > 2 && !['the', 'and', 'for', 'with'].includes(tag))
      .slice(0, 4);

    return {
      primary: detectedCategory,
      tags: filteredTags
    };
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^\w\s\u4e00-\u9fff-]/g, '') // Keep Chinese characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-')      // Replace multiple hyphens with single
      .replace(/^-|-$/g, '');   // Remove leading/trailing hyphens
  }

  ensureDataDirectory() {
    const dataDir = path.dirname(this.dataPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
      console.log(`📁 Created data directory: ${dataDir}`);
    }
  }

  loadExistingPosts() {
    try {
      if (fs.existsSync(this.dataPath)) {
        const data = fs.readFileSync(this.dataPath, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.warn('⚠️  Could not load existing posts:', error.message);
    }
    return [];
  }

  savePosts(posts) {
    this.ensureDataDirectory();
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(posts, null, 2));
      console.log(`✅ Saved ${posts.length} posts to ${this.dataPath}`);
    } catch (error) {
      console.error('❌ Error saving posts:', error.message);
    }
  }

  async syncPosts() {
    console.log('🚀 Starting Medium sync for @andersonchen_2095...');
    
    const mediumPosts = await this.fetchMediumPosts();
    if (mediumPosts.length === 0) {
      console.log('❌ No posts fetched from Medium');
      return [];
    }

    // Transform Medium posts to blog format
    const transformedPosts = mediumPosts.map((post, index) => 
      this.transformMediumPost(post, index)
    );

    // Load existing posts and merge with new ones
    const existingPosts = this.loadExistingPosts();
    const existingUrls = new Set(existingPosts.map(post => post.mediumUrl));

    // Add only new posts
    const newPosts = transformedPosts.filter(post => !existingUrls.has(post.mediumUrl));
    
    // Update existing posts and add new ones
    const existingPostsMap = new Map(existingPosts.map(post => [post.mediumUrl, post]));
    const allPosts = transformedPosts.map(newPost => {
      const existing = existingPostsMap.get(newPost.mediumUrl);
      if (existing) {
        // Update existing post but keep some original data
        return {
          ...newPost,
          id: existing.id, // Keep original ID
          lastSync: new Date().toISOString()
        };
      }
      return newPost;
    });

    // Sort by date (newest first)
    allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Update featured status (make newest the featured)
    allPosts.forEach((post, index) => {
      post.featured = index === 0;
    });

    this.savePosts(allPosts);
    
    if (newPosts.length > 0) {
      console.log(`🎉 Added ${newPosts.length} new posts!`);
      newPosts.forEach(post => {
        console.log(`   📄 ${post.title}`);
        console.log(`      Category: ${post.category} | Read time: ${post.readTime}min`);
      });
    } else {
      console.log('✨ No new posts to sync (all posts up to date)');
    }

    console.log(`📊 Total posts: ${allPosts.length}`);
    return allPosts;
  }

  startWatching() {
    console.log('👀 Starting Medium sync watcher...');
    console.log('   Will check for new posts every 2 hours');
    
    // Run immediately
    this.syncPosts();
    
    // Then run every 2 hours
    cron.schedule('0 */2 * * *', () => {
      console.log('\n⏰ Scheduled sync triggered');
      this.syncPosts();
    });

    // Keep the process alive
    console.log('🔄 Watcher is running... Press Ctrl+C to stop');
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const username = 'andersonchen_2095'; // Your Medium username
  
  const syncer = new MediumSyncer(username);

  if (args.includes('--watch')) {
    syncer.startWatching();
  } else {
    const posts = await syncer.syncPosts();
    console.log('\n🏁 Sync completed!');
    if (posts.length > 0) {
      console.log(`📚 Blog now has ${posts.length} posts from Medium`);
    }
    process.exit(0);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { MediumSyncer }; 