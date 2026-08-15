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
      console.error('No MONGODB_URI found.');
      process.exit(1);
    }
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas');

    const ProfileConfigSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
    const ProfileConfig = mongoose.models.ProfileConfig || mongoose.model('ProfileConfig', ProfileConfigSchema);
    const config = await ProfileConfig.findOne({});
    if (!config) { console.error('No config found.'); process.exit(1); }

    const projects = config.toObject().projects || [];

    const targetLiveUrl = 'https://traveling-salesman-problem-tsp.vercel.app/';
    const targetGithubUrl = 'https://github.com/kibretmulugeta/Traveling-Salesman-Problem-TSP-';

    let found = false;
    const updatedProjects = projects.map(p => {
      if (p.title && (p.title.toLowerCase().includes('tsp') || p.title.toLowerCase().includes('traveling salesman'))) {
        found = true;
        console.log(`Updating liveUrl and githubUrl for project [${p.title}]`);
        return {
          ...p,
          title: 'Traveling Salesman Problem (TSP) Optimization',
          description: 'Interactive visual simulation & metaheuristic optimization engine for solving NP-hard Traveling Salesman Problems using Evolutionary Algorithms, Genetic Algorithms, Simulated Annealing, and 2-Opt Local Search.',
          image: '/assets/images/tsp_optimization.png',
          tags: ['Genetic Algorithm', 'Simulated Annealing', 'Metaheuristics', 'AI Optimization', 'React', 'TypeScript'],
          liveUrl: targetLiveUrl,
          githubUrl: targetGithubUrl,
        };
      }
      return p;
    });

    if (!found) {
      console.log('TSP project not found in MongoDB projects array. Pushing new TSP project entry...');
      updatedProjects.push({
        title: 'Traveling Salesman Problem (TSP) Optimization',
        category: 'ai',
        description: 'Interactive visual simulation & metaheuristic optimization engine for solving NP-hard Traveling Salesman Problems using Evolutionary Algorithms, Genetic Algorithms, Simulated Annealing, and 2-Opt Local Search.',
        image: '/assets/images/tsp_optimization.png',
        tags: ['Genetic Algorithm', 'Simulated Annealing', 'Metaheuristics', 'AI Optimization', 'React', 'TypeScript'],
        liveUrl: targetLiveUrl,
        githubUrl: targetGithubUrl,
      });
    }

    const result = await ProfileConfig.updateOne(
      { _id: config._id },
      { $set: { projects: updatedProjects } }
    );

    console.log(`Result: matched=${result.matchedCount}, modified=${result.modifiedCount}`);

    const verify = await ProfileConfig.findOne({});
    const tspProj = verify.projects.find(p => p.title && (p.title.toLowerCase().includes('tsp') || p.title.toLowerCase().includes('traveling salesman')));
    console.log('VERIFIED TSP PROJECT IN MONGODB:');
    console.log(tspProj);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

run();
