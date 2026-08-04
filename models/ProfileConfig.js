import mongoose from 'mongoose';

const ProfileConfigSchema = new mongoose.Schema(
  {
    hero: {
      name: { type: String, default: 'Kibret Mulugeta' },
      title: { type: String, default: 'AI Engineer | Medical Imaging Researcher' },
      bio: {
        type: String,
        default:
          'Passionate about designing cutting-edge deep learning solutions for complex healthcare challenges. Specialized in U-Net brain MRI segmentation and reward-driven neural plasticity-inspired optimization algorithms to enhance diagnostic precision and algorithmic learning efficiency.',
      },
      photoUrl: { type: String, default: '/assets/images/kibret_photo.jpg' },
      badgeText: { type: String, default: 'Available for Research & Contracting' },
      githubUrl: { type: String, default: 'https://github.com' },
      linkedinUrl: { type: String, default: 'https://linkedin.com' },
      scholarUrl: { type: String, default: 'https://scholar.google.com' },
      twitterUrl: { type: String, default: 'https://twitter.com' },
      email: { type: String, default: 'kibret.mulugeta@example.com' },
    },
    projects: [
      {
        title: String,
        description: String,
        image: String,
        tags: [String],
        liveUrl: String,
        githubUrl: String,
      },
    ],
    events: [
      {
        date: String,
        title: String,
        text: String,
        image: String,
      },
    ],
    experience: [
      {
        jobTitle: String,
        company: String,
        date: String,
        bullets: [String],
      },
    ],
    education: [
      {
        degree: String,
        institution: String,
        date: String,
        thesis: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ProfileConfig || mongoose.model('ProfileConfig', ProfileConfigSchema);
