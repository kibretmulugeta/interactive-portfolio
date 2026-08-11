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

    let projects = config.toObject().projects || [];

    // Find Chat Platform
    const chatProject = projects.find(p => p.title && (p.title.toLowerCase().includes('chat') || p.title.toLowerCase().includes('digital twin')));

    // Find DSM-5 Psychiatry AI Assistant Project
    const dsm5Project = projects.find(p => p.title && (p.title.toLowerCase().includes('dsm-5') || p.title.toLowerCase().includes('psychiatry')));

    // Find CCTV Project
    const cctvProject = projects.find(p => p.title && p.title.toLowerCase().includes('cctv'));

    // Other projects
    const otherProjects = projects.filter(p => {
      if (!p.title) return false;
      const t = p.title.toLowerCase();
      if (t.includes('chat') || t.includes('digital twin') || t.includes('dsm-5') || t.includes('psychiatry') || t.includes('cctv')) return false;
      return true;
    });

    const orderedProjects = [];
    if (chatProject) orderedProjects.push(chatProject);
    if (dsm5Project) orderedProjects.push(dsm5Project);
    if (cctvProject) orderedProjects.push(cctvProject);
    orderedProjects.push(...otherProjects);

    const result = await ProfileConfig.updateOne(
      { _id: config._id },
      { $set: { projects: orderedProjects } }
    );

    console.log(`Reorder result: matched=${result.matchedCount}, modified=${result.modifiedCount}`);

    const verify = await ProfileConfig.findOne({});
    console.log('\nNEW PROJECT ORDER:');
    verify.projects.forEach((p, i) => {
      console.log(`  [${i + 1}] ${p.title}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

run();
