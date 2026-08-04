import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ProfileConfig from '@/models/ProfileConfig';

export const defaultProfileData = {
  hero: {
    name: 'Kibret Mulugeta',
    title: 'AI Engineer | Medical Imaging Researcher',
    bio: 'Passionate about designing cutting-edge deep learning solutions for complex healthcare challenges. Specialized in U-Net brain MRI segmentation and reward-driven neural plasticity-inspired optimization algorithms to enhance diagnostic precision and algorithmic learning efficiency.',
    photoUrl: '/assets/images/kibret_photo.jpg',
    badgeText: 'Available for Research & Contracting',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    scholarUrl: 'https://scholar.google.com',
    twitterUrl: 'https://twitter.com',
    email: 'kibret.mulugeta@example.com',
  },
  projects: [
    {
      title: 'ScholarXIV',
      description: 'An AI-powered academic paper analysis and discovery engine engineered for medical researchers. Integrates automatic neural citation graphs, bio-medical paper summarization, and interactive brain MRI annotation visualizers.',
      image: '/assets/images/scholarxiv.png',
      tags: ['PyTorch', 'MONAI', 'NLP & Vision', 'FastAPI'],
      liveUrl: '#',
      githubUrl: 'https://github.com',
    },
    {
      title: 'OpenScholarXIV',
      description: 'An open-source ecosystem providing pre-trained reward-driven U-Net segmentation models for brain MRI scanning datasets. Features plug-and-play neural plasticity optimization modules decreasing training convergence times by up to 35%.',
      image: '/assets/images/openscholarxiv.png',
      tags: ['U-Net', 'Brain MRI', 'Neural Plasticity', 'Open Data'],
      liveUrl: '#',
      githubUrl: 'https://github.com',
    },
  ],
  events: [
    {
      date: 'Oct 2025',
      title: 'AI & Medical Imaging Keynote',
      text: 'Presenting U-Net brain MRI segmentation breakthroughs at the Global HealthTech Summit.',
      image: '/assets/images/event_1.png',
    },
    {
      date: 'Aug 2025',
      title: 'Deep Learning & Plasticity Podcast',
      text: 'Discussing biological plasticity-inspired loss functions in medical neural networks.',
      image: '/assets/images/event_2.png',
    },
    {
      date: 'Jun 2025',
      title: 'MONAI Hands-on Workshop',
      text: 'Leading a multi-gpu medical image segmentation lab using PyTorch and MONAI framework.',
      image: '/assets/images/event_3.png',
    },
    {
      date: 'Dec 2024',
      title: 'Health Innovation Award',
      text: 'Honored for pioneering reward-driven optimization methods in diagnostic segmentation.',
      image: '/assets/images/event_4.png',
    },
  ],
  experience: [
    {
      jobTitle: 'Freelance Machine Learning Engineer',
      company: 'Independent Medical AI Consultant',
      date: '2021 - Present',
      bullets: [
        'Engineered robust end-to-end medical image segmentation pipelines leveraging PyTorch and MONAI for brain MRI scan diagnostics.',
        'Implemented custom reward-driven neural plasticity optimization algorithms, accelerating model inference speed and improving Dice similarity scores.',
        'Collaborated with clinical research teams to deploy scalable API microservices processing high-resolution DICOM datasets in real time.',
      ],
    },
  ],
  education: [
    {
      degree: 'MSc in Computer Engineering (AI & Data Engineering)',
      institution: 'Bahir Dar University',
      date: '2025',
      thesis: 'Master\'s Thesis: Reward-driven neural plasticity-inspired optimization algorithms for U-Net brain MRI segmentation architectures.',
    },
    {
      degree: 'BSc in Electrical and Computer Engineering',
      institution: 'Debre Berhan University',
      date: '2021',
      thesis: 'Focused on embedded computing, signal processing, and foundational machine learning principles.',
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
    // Fallback to default memory profile data if DB is connecting
    return NextResponse.json({ success: true, data: defaultProfileData, fallback: true });
  }
}
