import mongoose from 'mongoose';

const ProfileConfigSchema = new mongoose.Schema(
  {
    hero: {
      name: { type: String, default: 'Kibret Mulugeta' },
      title: { type: String, default: 'AI ENGINEER | MACHINE LEARNING ENGINEER | FULL-STACK DEVELOPER' },
      bio: {
        type: String,
        default:
          'AI Engineer, Machine Learning Engineer, Full-Stack Developer, and Systems Engineer with an MSc in Computer Engineering specializing in Artificial Intelligence and Data Engineering. Experienced in designing intelligent systems, developing deep learning models, building full-stack web applications, and deploying scalable software solutions.',
      },
      photoUrl: { type: String, default: '/assets/images/kibret_photo.jpg' },
      resumeUrl: { type: String, default: '/api/resume/download' },
      badgeText: { type: String, default: 'Available for Research & Contracting' },
      githubUrl: { type: String, default: 'https://github.com/kibretmulugeta' },
      linkedinUrl: { type: String, default: 'https://linkedin.com/in/kibret-mulugeta' },
      scholarUrl: { type: String, default: 'https://scholar.google.com' },
      twitterUrl: { type: String, default: 'https://twitter.com' },
      email: { type: String, default: 'kibretmail@gmail.com' },
    },
    resumeDataUri: {
      type: String, // Base64 PDF storage for Vercel serverless persistence
    },
    resumeDownloads: {
      type: Number,
      default: 0,
    },
    resumeDownloadLogs: [
      {
        downloadedAt: { type: Date, default: Date.now },
        ip: { type: String, default: 'Anonymous Visitor' },
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ProfileConfig || mongoose.model('ProfileConfig', ProfileConfigSchema);
