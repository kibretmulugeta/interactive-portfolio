const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

function getMongoUri() {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  try {
    const envPath = path.join(__dirname, '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed.startsWith('MONGODB_URI=')) return trimmed.substring('MONGODB_URI='.length).trim();
      }
    }
  } catch (err) { console.error(err); }
  return null;
}

async function run() {
  try {
    const uri = getMongoUri();
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas');

    const ProfileConfigSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
    const ProfileConfig = mongoose.models.ProfileConfig || mongoose.model('ProfileConfig', ProfileConfigSchema);
    const config = await ProfileConfig.findOne({});
    if (!config) { console.error('No config found.'); process.exit(1); }

    const projects = config.toObject().projects || [];

    const fullDescription = 'AI Digital Twin — Multi-Agent Personal Assistant Platform. A full-stack AI-powered chat platform featuring Retrieval-Augmented Generation (RAG), multi-LLM model support (Gemini, Claude, GPT-4), PostgreSQL with pgvector for semantic search, and containerized microservice deployment via Docker. Built with FastAPI backend, React frontend, and a custom LLM abstraction layer.';

    const updatedProjects = projects.map(p => {
      if (p.title && (p.title.toLowerCase().includes('chat') || p.title.toLowerCase().includes('digital twin'))) {
        return {
          ...p,
          title: 'Chat Platform',
          description: fullDescription,
          image: '/assets/images/chat_platform.png',
          tags: ['FastAPI', 'React', 'PostgreSQL', 'pgvector', 'Docker', 'RAG', 'Gemini', 'Claude', 'GPT-4', 'Python'],
          liveUrl: 'https://personal-ai-assistant-six-phi.vercel.app/demo',
          githubUrl: 'https://github.com/kibretmulugeta/personal-ai-assistant',
        };
      }
      return p;
    });

    const result = await ProfileConfig.updateOne(
      { _id: config._id },
      { $set: { projects: updatedProjects } }
    );

    console.log(`Update result: matched=${result.matchedCount}, modified=${result.modifiedCount}`);

    const verify = await ProfileConfig.findOne({});
    const chatProj = verify.projects.find(p => p.title === 'Chat Platform');
    console.log('\nUpdated Chat Platform project:');
    console.log('Title:', chatProj?.title);
    console.log('Description:', chatProj?.description);
    console.log('Live URL:', chatProj?.liveUrl);
    console.log('GitHub URL:', chatProj?.githubUrl);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

run();
