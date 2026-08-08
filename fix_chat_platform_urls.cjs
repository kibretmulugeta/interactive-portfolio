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

    // Use a permissive schema so we can manipulate projects freely
    const ProfileConfigSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
    const ProfileConfig = mongoose.models.ProfileConfig || mongoose.model('ProfileConfig', ProfileConfigSchema);
    const config = await ProfileConfig.findOne({});
    if (!config) { console.error('No config found.'); process.exit(1); }

    const projects = config.toObject().projects || [];
    console.log(`\nTotal projects before cleanup: ${projects.length}`);

    // Show all chat-related entries
    projects.forEach((p, i) => {
      if (p.title && (p.title.toLowerCase().includes('chat') || p.title.toLowerCase().includes('digital twin'))) {
        console.log(`  [${i}] "${p.title}" | _id: ${p._id} | github: ${p.githubUrl}`);
      }
    });

    // Remove ALL chat/digital-twin related entries, then add one clean one
    const cleanedProjects = projects.filter(p => {
      if (!p.title) return true;
      const t = p.title.toLowerCase();
      if (t.includes('chat platform') || t.includes('digital twin')) {
        console.log(`  REMOVING: "${p.title}" (_id: ${p._id})`);
        return false;
      }
      return true;
    });

    // Add the single correct Chat Platform entry
    cleanedProjects.push({
      title: 'Chat Platform',
      description: 'AI Digital Twin — Multi-Agent Personal Assistant Platform',
      image: '/assets/images/chat_platform.png',
      tags: ['AI Digital Twin', 'Multi-Agent', 'Next.js', 'Python', 'LLM'],
      liveUrl: 'https://personal-ai-assistant-six-phi.vercel.app/demo',
      githubUrl: 'https://github.com/kibretmulugeta/personal-ai-assistant',
    });

    // Use $set to force-update the projects array atomically
    const result = await ProfileConfig.updateOne(
      { _id: config._id },
      { $set: { projects: cleanedProjects } }
    );

    console.log(`\nUpdate result: matched=${result.matchedCount}, modified=${result.modifiedCount}`);
    console.log(`Total projects after cleanup: ${cleanedProjects.length}`);
    
    // Verify
    const verify = await ProfileConfig.findOne({});
    const chatEntries = verify.projects.filter(p => 
      p.title && (p.title.toLowerCase().includes('chat') || p.title.toLowerCase().includes('digital twin'))
    );
    console.log(`\nVerification - Chat-related entries: ${chatEntries.length}`);
    chatEntries.forEach(p => {
      console.log(`  "${p.title}"`);
      console.log(`    liveUrl  : ${p.liveUrl}`);
      console.log(`    githubUrl: ${p.githubUrl}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

run();
