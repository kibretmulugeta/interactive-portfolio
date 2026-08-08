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
      title: 'Novel Optimization Algorithm Design',
      description: 'Designed and implemented novel optimization algorithms inspired by biological intelligence and neural adaptation mechanisms. Applied to Machine Learning optimization, neural network training, and engineering optimization problems.',
      image: '/assets/images/novel_optimization.png',
      tags: ['Algorithms', 'Machine Learning', 'Neural Networks', 'Optimization'],
      liveUrl: '#',
      githubUrl: 'https://github.com/kibretmulugeta'
    };

    const exists = config.projects.find(p => p.title === newProject.title);
    if (!exists) {
        config.projects.push(newProject);
        await config.save();
        console.log('Successfully added Optimization project!');
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
