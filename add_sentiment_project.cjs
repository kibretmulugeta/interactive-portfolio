const mongoose = require('mongoose');

async function addProject() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

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
      console.log('No ProfileConfig found.');
      process.exit(1);
    }

    const newProject = {
      title: 'Sentiment Analysis System',
      description: 'Developed NLP models for analyzing text sentiment and classifying user opinions into positive, negative, and neutral categories.',
      image: '/assets/images/sentiment_analysis.png',
      tags: ['Python', 'NLP', 'Machine Learning', 'Deep Learning'],
      liveUrl: '#',
      githubUrl: 'https://github.com/kibretmulugeta'
    };

    const exists = config.projects.find(p => p.title === newProject.title);
    if (!exists) {
        config.projects.push(newProject);
        await config.save();
        console.log('Successfully added Sentiment Analysis project!');
    } else {
        console.log('Project already exists.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error adding project:', error);
    process.exit(1);
  }
}

addProject();
