import mongoose from 'mongoose';

const ProfileConfigSchema = new mongoose.Schema(
  {
    hero: {
      name: { type: String, default: 'Kibret Mulugeta Alemu' },
      title: { type: String, default: 'AI Engineer & Medical Imaging Researcher' },
      bio: {
        type: String,
        default:
          'AI Engineer and Medical Imaging Researcher specializing in deep learning, medical image segmentation, and bio-inspired optimization algorithms. Experienced in designing neural plasticity-inspired optimization frameworks for hyperparameter tuning and implementing U-Net/Attention U-Net architectures for brain MRI analysis. Skilled in end-to-end medical imaging pipelines using PyTorch and MONAI. Seeking graduate research opportunities in Computer Science focusing on computational intelligence, medical image analysis, and AI-driven healthcare systems.',
      },
      photoUrl: { type: String, default: '/assets/images/kibret_photo.jpg' },
      resumeUrl: { type: String, default: '/api/resume/download' },
      badgeText: { type: String, default: 'Available for Research & Contracting' },
      githubUrl: { type: String, default: 'https://github.com/kibretmulugeta' },
      linkedinUrl: { type: String, default: 'https://linkedin.com/in/kibret-mulugeta' },
      scholarUrl: { type: String, default: 'https://scholar.google.com' },
      twitterUrl: { type: String, default: 'https://twitter.com' },
      email: { type: String, default: 'kibretmail@gmail.com' },
      phone: { type: String, default: '+251 947369090' },
      location: { type: String, default: 'Addis Ababa, Ethiopia' },
      website: { type: String, default: 'https://kibretmulugeta.pro.et' },
    },
    resumeDataUri: {
      type: String,
    },
    resumeDownloads: {
      type: Number,
      default: 0,
    },
    resumeDownloadLogs: [
      {
        downloadedAt: { type: Date, default: Date.now },
        clientName: { type: String, default: 'Anonymous Visitor' },
        clientEmail: { type: String, default: 'Unknown Email' },
        ip: { type: String, default: 'Visitor IP' },
        userAgent: String,
      },
    ],
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
    researchExperience: [
      {
        title: String,
        role: String,
        institution: String,
        date: String,
        thesisTitle: String,
        bullets: [String],
      },
    ],
    skills: {
      deepLearning: [String],
      medicalImaging: [String],
      optimization: [String],
      dataEngineering: [String],
      mlops: [String],
      programmingLanguages: [String],
      cloudPlatforms: [String],
    },
    researchInterests: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ProfileConfig || mongoose.model('ProfileConfig', ProfileConfigSchema);

