const mongoose = require('mongoose');

async function updateProject() {
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

    const projectIndex = config.projects.findIndex(p => p.title === 'Chat Platform');
    if (projectIndex === -1) {
      console.log('Chat Platform project not found.');
      process.exit(1);
    }

    config.projects[projectIndex].liveUrl = 'https://personal-ai-assistant-r1zt.onrender.com/demo';
    
    // Ensure github link is set
    if (!config.projects[projectIndex].githubUrl || config.projects[projectIndex].githubUrl === '#') {
      config.projects[projectIndex].githubUrl = 'https://github.com/kibretmulugeta/chat-platform';
    } else {
        config.projects[projectIndex].githubUrl = 'https://github.com/kibretmulugeta/chat-platform';
    }

    await config.save();
    console.log('Successfully updated Chat Platform links!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating:', error);
    process.exit(1);
  }
}

updateProject();
