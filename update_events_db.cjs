const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local file
function getMongoUri() {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  try {
    const envPath = path.join(__dirname, '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('MONGODB_URI=')) {
          return trimmed.substring('MONGODB_URI='.length).trim();
        }
      }
    }
  } catch (err) {
    console.error('Error reading .env.local:', err);
  }
  return null;
}

async function updateEvents() {
  try {
    const uri = getMongoUri();
    if (!uri) {
      console.error('MONGODB_URI not found.');
      process.exit(1);
    }
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas');

    const ProfileConfigSchema = new mongoose.Schema({
      events: [{
        date: String,
        title: String,
        text: String,
        image: String,
      }],
    }, { timestamps: true });

    const ProfileConfig = mongoose.models.ProfileConfig || mongoose.model('ProfileConfig', ProfileConfigSchema);

    const config = await ProfileConfig.findOne({});
    if (!config) {
      console.log('No ProfileConfig document found in MongoDB database.');
      process.exit(1);
    }

    config.events = [
      {
        date: 'Oct 2025',
        title: 'Neural Plasticity & U-Net Keynote',
        text: 'Presenting "Neural Plasticity Inspired Optimization for Enhancing U-Net Progress Presentation" on U-Net Brain MRI Segmentation at the Global HealthTech Summit.',
        image: '/assets/images/event_presentation.jpg',
      },
      {
        date: 'Aug 2025',
        title: 'Deep Learning & Plasticity Podcast',
        text: 'Discussing biological plasticity-inspired loss functions and U-Net brain segmentation architectures.',
        image: '/assets/images/event_presentation.jpg',
      },
      {
        date: 'Jun 2025',
        title: 'MONAI & Brain MRI Hands-on Workshop',
        text: 'Leading a multi-gpu medical image segmentation lab using PyTorch and MONAI framework.',
        image: '/assets/images/event_3.png',
      },
    ];

    await config.save();
    console.log('SUCCESS: Updated events in MongoDB Atlas database!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating events in MongoDB:', error);
    process.exit(1);
  }
}

updateEvents();
