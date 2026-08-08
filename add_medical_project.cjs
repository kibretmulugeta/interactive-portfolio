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
      title: 'Medical Image Analysis System',
      description: 'Developed deep learning models for medical image understanding and automated diagnosis support. Focused on Brain MRI analysis, medical image segmentation, and deep learning optimization.',
      image: '/assets/images/medical_image_analysis.png',
      tags: ['U-Net', 'MONAI', 'PyTorch', 'TensorFlow'],
      liveUrl: '#',
      githubUrl: 'https://github.com/kibretmulugeta'
    };

    // check if it exists so we don't duplicate
    const exists = config.projects.find(p => p.title === newProject.title);
    if (!exists) {
        config.projects.push(newProject);
        await config.save();
        console.log('Successfully added Medical Image Analysis System project!');
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
