const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

function getMongoUri() {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  try {
    const envPath = path.join(__dirname, '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('MONGODB_URI=')) {
          return trimmed.substring('MONGODB_URI='.length).trim();
        }
      }
    }
  } catch (err) {
    console.error('Error reading .env.local:', err);
  }
  return null;
}

async function run() {
  try {
    const uri = getMongoUri();
    if (!uri) {
      console.error('MONGODB_URI not found.');
      process.exit(1);
    }
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas');

    const ProfileConfigSchema = new mongoose.Schema({
      projects: [{
        title: String,
        description: String,
        image: String,
        tags: [String],
        liveUrl: String,
        githubUrl: String,
      }],
    }, { timestamps: true });

    const ProfileConfig = mongoose.models.ProfileConfig || mongoose.model('ProfileConfig', ProfileConfigSchema);

    const config = await ProfileConfig.findOne({});
    if (!config) {
      console.log('No ProfileConfig document found.');
      process.exit(1);
    }

    // Search for project named "Chat Platform" or similar
    let proj = config.projects.find(p => p.title && p.title.toLowerCase().includes('chat'));

    if (proj) {
      console.log('Found existing Chat Platform project:', proj.title);
      proj.description = 'AI Digital Twin — Multi-Agent Personal Assistant Platform';
      proj.liveUrl = 'https://personal-ai-assistant-six-phi.vercel.app/demo';
      proj.githubUrl = 'https://github.com/kibretmulugeta/personal-ai-assistant';
      if (!proj.image || proj.image.includes('event_')) {
        proj.image = '/assets/images/chat_platform.png';
      }
    } else {
      console.log('Chat Platform project not found. Creating new project entry...');
      config.projects.push({
        title: 'Chat Platform',
        description: 'AI Digital Twin — Multi-Agent Personal Assistant Platform',
        image: '/assets/images/chat_platform.png',
        tags: ['AI Digital Twin', 'Multi-Agent Systems', 'Next.js', 'Python', 'LLMs'],
        liveUrl: 'https://personal-ai-assistant-six-phi.vercel.app/demo',
        githubUrl: 'https://github.com/kibretmulugeta/personal-ai-assistant',
      });
    }

    await config.save();
    console.log('SUCCESS: Updated Chat Platform project in MongoDB Atlas!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating project:', error);
    process.exit(1);
  }
}

run();
