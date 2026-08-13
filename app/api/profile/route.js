import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ProfileConfig from '@/models/ProfileConfig';

export const defaultProfileData = {
  hero: {
    name: 'KIBRET MULUGETA ALEMU',
    title: 'AI Engineer & Medical Imaging Researcher',
    bio: 'AI Engineer and Medical Imaging Researcher specializing in deep learning, medical image segmentation, and bio-inspired optimization algorithms. Experienced in designing neural plasticity-inspired optimization frameworks for hyperparameter tuning and implementing U-Net/Attention U-Net architectures for brain MRI analysis. Skilled in end-to-end medical imaging pipelines using PyTorch and MONAI. Seeking graduate research opportunities in Computer Science focusing on computational intelligence, medical image analysis, and AI-driven healthcare systems.',
    photoUrl: '/assets/images/kibret_photo.jpg',
    resumeUrl: '/api/resume/download',
    badgeText: 'Available for Research & Contracting',
    githubUrl: 'https://github.com/kibretmulugeta',
    linkedinUrl: 'https://linkedin.com/in/kibret-mulugeta',
    scholarUrl: 'https://scholar.google.com',
    twitterUrl: 'https://twitter.com',
    email: 'kibretmail@gmail.com',
    phone: '+251 947369090',
    location: 'Addis Ababa, Ethiopia',
    website: 'https://kibretmulugeta.pro.et',
  },
  resumeDownloads: 18,
  resumeDownloadLogs: [
    { downloadedAt: new Date(Date.now() - 3600000 * 2), ip: 'Client Visitor (Addis Ababa)', userAgent: 'Chrome / macOS' },
    { downloadedAt: new Date(Date.now() - 3600000 * 5), ip: 'Research Collaborator', userAgent: 'Safari / iOS' },
  ],
  skills: {
    deepLearning: ['PyTorch', 'TensorFlow', 'Keras', 'MONAI', 'Scikit-learn'],
    medicalImaging: ['NIFTI', 'DICOM', 'SimpleITK', 'NiBabel', 'OpenCV'],
    optimization: ['Bio-inspired Optimization', 'Neural Plasticity Learning', 'Genetic Algorithms', 'Particle Swarm Optimization (PSO)', 'Hyperparameter Optimization'],
    dataEngineering: ['NumPy', 'Pandas', 'SciPy', 'SQL', 'Apache Spark'],
    mlops: ['Linux', 'Docker', 'MLflow', 'Git', 'Jupyter Notebook', 'Google Colab', 'Overleaf'],
    programmingLanguages: ['Python', 'C++', 'Java', 'SQL', 'LaTeX'],
    cloudPlatforms: ['AWS', 'Google Cloud Platform (GCP)', 'Microsoft Azure'],
  },
  researchExperience: [
    {
      title: 'Graduate Researcher - Master\'s Thesis',
      role: 'Graduate Researcher',
      institution: 'Bahir Dar University',
      date: '2023 - 2025',
      thesisTitle: 'Reward-Driven Neural Plasticity Inspired Optimization for Enhancing U-net Based Medical Image Segmentation',
      bullets: [
        'Designed a biologically inspired optimization algorithm based on neural plasticity and reward-driven learning.',
        'Developed deep learning pipelines using PyTorch and TensorFlow for brain MRI segmentation (tumor & stroke lesions).',
        'Implemented preprocessing workflows including normalization, resampling, and augmentation for NIfTI and DICOM datasets.',
        'Evaluated performance using Dice Coefficient, IoU, Precision, and Recall metrics.',
        'Achieved improved convergence stability and segmentation accuracy compared to Random Search and Genetic Algorithms.',
      ],
    },
    {
      title: 'Neuro-Inspired U-Net Optimization Project (Open Source)',
      role: 'Lead Developer',
      institution: 'GitHub Project',
      date: '2023 - 2025',
      thesisTitle: '',
      bullets: [
        'Developed a reproducible Python framework integrating bio-inspired optimization into deep learning training.',
        'Implemented Attention U-Net models for fine-grained medical image segmentation.',
        'Built automated medical imaging pipelines using MONAI and SimpleITK (skull stripping, preprocessing, artifact removal).',
        'Designed modular codebase for research reproducibility and extension.',
      ],
    },
  ],
  experience: [
    {
      jobTitle: 'Freelance Machine Learning Engineer',
      company: 'Self-employed',
      date: '2023 - Present',
      bullets: [
        'Developed machine learning models for classification and segmentation tasks in research environments.',
        'Designed hyperparameter optimization pipelines for GPU-based training (Google Colab, AWS EC2).',
        'Created technical documentation and research manuscripts using LaTeX.',
        'Supported academic research projects in deep learning and medical imaging.',
      ],
    },
  ],
  education: [
    {
      degree: 'Master of Science in Computer Engineering (AI & Data Engineering)',
      institution: 'Bahir Dar University, Ethiopia',
      date: '2025',
      thesis: 'GPA: 3.45/4.0',
    },
    {
      degree: 'Bachelor of Science in Electrical and Computer Engineering',
      institution: 'Debre Berhan University, Ethiopia',
      date: '2021',
      thesis: '',
    },
  ],
  researchInterests: [
    'Medical Image Analysis (MRI / CT segmentation, neuroimaging)',
    'Bio-inspired and Neuro-inspired Learning Systems',
    'Explainable AI (XAI) for Healthcare Systems',
    'Deep Learning Optimization and Architecture Design',
    'Domain Adaptation in Clinical AI',
    'Pediatric Neuroimaging and Tumor Analysis',
  ],
  projects: defaultProjects,
  events: [
    {
      date: 'Oct 2025',
      title: 'Neural Plasticity & U-Net Keynote',
      text: 'Presenting "Neural Plasticity Inspired Optimization for Enhancing U-Net Progress Presentation" on U-Net Brain MRI Segmentation at the Global HealthTech Summit.',
      image: '/assets/images/event_presentation.jpg',
    },
    {
      date: 'Aug 2025',
      title: 'Deep Learning & Plasticity Podcast',
      text: 'Discussing biological plasticity-inspired loss functions in medical neural networks.',
      image: '/assets/images/event_presentation.jpg',
    },
    {
      date: 'Jun 2025',
      title: 'MONAI Hands-on Workshop',
      text: 'Leading a multi-gpu medical image segmentation lab using PyTorch and MONAI framework.',
      image: '/assets/images/event_3.png',
    },
  ],
};

export async function GET() {
  try {
    await connectToDatabase();
    let config = await ProfileConfig.findOne({});

    if (!config) {
      config = await ProfileConfig.create(defaultProfileData);
    }

    return NextResponse.json({ success: true, data: config });
  } catch (error) {
    console.error('API Error /api/profile:', error);
    return NextResponse.json({ success: true, data: defaultProfileData, fallback: true });
  }
}
