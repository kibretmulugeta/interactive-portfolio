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
    if (!uri) {
      console.log('No MONGODB_URI found, skipping DB update.');
      process.exit(0);
    }

    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas');

    const ProfileConfigSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
    const ProfileConfig = mongoose.models.ProfileConfig || mongoose.model('ProfileConfig', ProfileConfigSchema);
    const config = await ProfileConfig.findOne({});

    const newProject = {
      title: 'Apparent — Enterprise Apartment Rental & Property Management Platform',
      category: 'fullstack',
      description: 'Production-grade multi-tenant property management platform featuring automated lease lifecycle tracking, rent ledger accounting, maintenance dispatching, Stripe payment integration, tenant portal, and role-based access control.',
      image: '/assets/images/event_4.png',
      tags: ['FastAPI', 'React', 'Next.js', 'PostgreSQL', 'Stripe', 'Docker', 'Python', 'Tailwind'],
      liveUrl: 'https://apartment-management-platform-eight.vercel.app/',
      githubUrl: 'https://github.com/kibretmulugeta/apartment-management-platform',
    };

    if (config) {
      let projects = config.toObject().projects || [];
      // Check if project already exists
      const existingIdx = projects.findIndex(p => p.title && (p.title.includes('Apparent') || p.title.includes('Apartment')));
      if (existingIdx !== -1) {
        projects[existingIdx] = newProject;
      } else {
        projects.unshift(newProject);
      }

      await ProfileConfig.updateOne({ _id: config._id }, { $set: { projects } });
      console.log('Updated projects in MongoDB successfully!');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error updating DB:', error);
    process.exit(0);
  }
}

run();
