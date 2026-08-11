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
  } catch (err) {
    console.error('Error reading .env.local:', err);
  }
  return null;
}

async function addProject() {
  try {
    const uri = getMongoUri();
    if (!uri) {
      console.error('No MONGODB_URI found.');
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
    }, { timestamps: true, strict: false });

    const ProfileConfig = mongoose.models.ProfileConfig || mongoose.model('ProfileConfig', ProfileConfigSchema);

    const config = await ProfileConfig.findOne({});
    if (!config) {
      console.log('No ProfileConfig found.');
      process.exit(1);
    }

    const newProject = {
      title: 'DSM-5 Psychiatry & Clinical Psychology AI Assistant',
      description: 'A production-grade DSM-5 Psychiatry & Clinical Psychology AI Assistant (DSM-5 PsychAssist AI) engineered as a clinical decision support system, educational reference guide, and diagnostic decision aid based on official APA DSM-5 / DSM-5-TR standards. Features instant diagnostic criteria breakdown, clinical differential diagnosis pathways, statistical & epidemiological reference metrics (prevalence, gender ratio, onset age, risk factors), interactive validated psychometric assessment tools (PHQ-9, GAD-7, PCL-5), and automated emergency 24/7 crisis safety guardrails.',
      image: '/assets/images/psychiatry_ai_assistant.png',
      tags: ['DSM-5', 'Psychiatry AI', 'FastAPI', 'React', 'RAG', 'Clinical AI', 'Psychometrics', 'Python'],
      liveUrl: 'https://psychiatry-ai-assistant-dsm-5.vercel.app/demo',
      githubUrl: 'https://github.com/kibretmulugeta/psychiatry_ai_assistant_DSM-5'
    };

    const existingIndex = config.projects.findIndex(p => p.title === newProject.title);
    if (existingIndex >= 0) {
      config.projects[existingIndex] = newProject;
      console.log('Updated existing DSM-5 Psychiatry AI Assistant project!');
    } else {
      config.projects.push(newProject);
      console.log('Added new DSM-5 Psychiatry AI Assistant project!');
    }

    await config.save();
    console.log('Successfully saved to MongoDB Atlas!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding project:', error);
    process.exit(1);
  }
}

addProject();
