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

    const targetLiveUrl = 'https://cctv-intelligent-analysis.vercel.app/';
    const targetGithubUrl = 'https://github.com/kibretmulugeta/cctv-intelligent-analysis';

    const updatedProjects = projects.map(p => {
      if (p.title && p.title.toLowerCase().includes('cctv')) {
        console.log(`Updating liveUrl and githubUrl for project [${p.title}]`);
        return {
          ...p,
          liveUrl: targetLiveUrl,
          githubUrl: targetGithubUrl,
        };
      }
      return p;
    });

    const result = await ProfileConfig.updateOne(
      { _id: config._id },
      { $set: { projects: updatedProjects } }
    );

    console.log(`Result: matched=${result.matchedCount}, modified=${result.modifiedCount}`);

    const verify = await ProfileConfig.findOne({});
    const cctv = verify.projects.find(p => p.title && p.title.toLowerCase().includes('cctv'));
    console.log('VERIFIED CCTV PROJECT:');
    console.log(cctv);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

run();
