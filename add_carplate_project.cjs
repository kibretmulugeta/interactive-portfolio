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
      title: 'Image Classification & Car Plate Detection',
      description: 'Built deep learning classifiers for automatic image recognition and implemented an AI-based vehicle license plate detection system.',
      image: '/assets/images/car_plate_detection.png',
      tags: ['YOLO', 'CNN', 'TensorFlow', 'PyTorch', 'Computer Vision'],
      liveUrl: '#',
      githubUrl: 'https://github.com/kibretmulugeta'
    };

    const exists = config.projects.find(p => p.title === newProject.title);
    if (!exists) {
        config.projects.push(newProject);
        await config.save();
        console.log('Successfully added Car Plate Detection project!');
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
