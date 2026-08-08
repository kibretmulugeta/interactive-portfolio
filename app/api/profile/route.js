import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ProfileConfig from '@/models/ProfileConfig';

export const defaultProfileData = {
  hero: {
    name: 'Kibret Mulugeta',
    title: 'AI ENGINEER | MACHINE LEARNING ENGINEER | FULL-STACK DEVELOPER',
    bio: 'AI Engineer, Machine Learning Engineer, Full-Stack Developer, and Systems Engineer with an MSc in Computer Engineering specializing in Artificial Intelligence and Data Engineering. Experienced in designing intelligent systems, developing deep learning models, building full-stack web applications, and deploying scalable software solutions.',
    photoUrl: '/assets/images/kibret_photo.jpg',
    resumeUrl: '/api/resume/download',
    badgeText: 'Available for Research & Contracting',
    githubUrl: 'https://github.com/kibretmulugeta',
    linkedinUrl: 'https://linkedin.com/in/kibret-mulugeta',
    scholarUrl: 'https://scholar.google.com',
    twitterUrl: 'https://twitter.com',
    email: 'kibretmail@gmail.com',
  },
  resumeDownloads: 18,
  resumeDownloadLogs: [
    { downloadedAt: new Date(Date.now() - 3600000 * 2), ip: 'Client Visitor (Addis Ababa)', userAgent: 'Chrome / macOS' },
    { downloadedAt: new Date(Date.now() - 3600000 * 5), ip: 'Research Collaborator', userAgent: 'Safari / iOS' },
  ],
  projects: [
    {
      title: 'Medical Image Analysis System',
      description: 'Developed deep learning models for medical image understanding and automated diagnosis support. Focused on Brain MRI analysis, medical image segmentation (U-Net, MONAI), and deep learning optimization.',
      image: '/assets/images/scholarxiv.png',
      tags: ['U-Net', 'MONAI', 'PyTorch', 'TensorFlow', 'Brain MRI'],
      liveUrl: '#',
      githubUrl: 'https://github.com/kibretmulugeta',
    },
    {
      title: 'Novel Optimization Algorithm Design',
      description: 'Designed and implemented novel optimization algorithms inspired by biological intelligence and neural adaptation mechanisms applied to Machine Learning optimization and engineering problems.',
      image: '/assets/images/openscholarxiv.png',
      tags: ['Neural Plasticity', 'Deep Learning', 'PyTorch', 'Optimization'],
      liveUrl: '#',
      githubUrl: 'https://github.com/kibretmulugeta',
    },
    {
      title: 'Speech Intelligence & Translation Systems',
      description: 'Developed AI applications including Speech-to-Text conversion, Text-to-Speech generation, and Amharic ↔ English machine translation models using advanced NLP architectures.',
      image: '/assets/images/event_2.png',
      tags: ['NLP', 'Speech Processing', 'Amharic Translation', 'PyTorch'],
      liveUrl: '#',
      githubUrl: 'https://github.com/kibretmulugeta',
    },
    {
      title: 'CCTV Intelligent Analysis & Face Recognition',
      description: 'Designed real-time solutions for monitoring CCTV video streams with capabilities in object detection, activity analysis, and AI-based face recognition for identity verification.',
      image: '/assets/images/event_3.png',
      tags: ['CNN', 'OpenCV', 'Computer Vision', 'Face Recognition'],
      liveUrl: '#',
      githubUrl: 'https://github.com/kibretmulugeta',
    },
    {
      title: 'OCR (Optical Character Recognition) System',
      description: 'Built an intelligent OCR pipeline for extracting formatted text and structured data from complex images and scanned medical/technical documents.',
      image: '/assets/images/event_1.png',
      tags: ['OCR Models', 'Computer Vision', 'Deep Learning', 'Python'],
      liveUrl: '#',
      githubUrl: 'https://github.com/kibretmulugeta',
    },
    {
      title: 'Chat Platform',
      description: 'AI Digital Twin — Multi-Agent Personal Assistant Platform. A full-stack AI-powered chat platform featuring Retrieval-Augmented Generation (RAG), multi-LLM model support (Gemini, Claude, GPT-4), PostgreSQL with pgvector for semantic search, and containerized microservice deployment via Docker. Built with FastAPI backend, React frontend, and a custom LLM abstraction layer.',
      image: '/assets/images/chat_platform.png',
      tags: ['FastAPI', 'React', 'PostgreSQL', 'pgvector', 'Docker', 'RAG', 'Gemini', 'Claude', 'GPT-4', 'Python'],
      liveUrl: 'https://personal-ai-assistant-six-phi.vercel.app/demo',
      githubUrl: 'https://github.com/kibretmulugeta/personal-ai-assistant',
    },
    {
      title: 'Apartment Rental & Task Management Systems',
      description: 'Designed complete rental platform featuring property management, search workflows, calendar integration, reminder systems, and JWT authentication.',
      image: '/assets/images/event_4.png',
      tags: ['Next.js', 'Node.js', 'FastAPI', 'PostgreSQL', 'React'],
      liveUrl: '#',
      githubUrl: 'https://github.com/kibretmulugeta',
    },
  ],
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
    {
      date: 'Dec 2024',
      title: 'Health Innovation Award',
      text: 'Honored for pioneering reward-driven optimization methods in diagnostic segmentation.',
      image: '/assets/images/event_4.png',
    },
  ],
  experience: [
    {
      jobTitle: 'Freelance Machine Learning & Systems Engineer',
      company: 'Independent AI Consultant',
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
      degree: 'Master of Science in Computer Engineering (AI & Data Engineering)',
      institution: 'Bahir Dar University',
      date: 'June 2025',
      thesis: 'Research: Reward-Driven Neural Plasticity Inspired Optimization for Enhancing U-Net Based Medical Image Segmentation.',
    },
    {
      degree: 'Bachelor of Science in Electrical and Computer Engineering',
      institution: 'Debre Berhan University',
      date: 'June 2021',
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
    return NextResponse.json({ success: true, data: defaultProfileData, fallback: true });
  }
}
