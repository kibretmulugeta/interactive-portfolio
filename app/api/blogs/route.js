import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export const dynamic = 'force-dynamic';

export const defaultBlogs = [
  {
    title: 'Reward-Driven Neural Plasticity-Inspired Optimization for Enhancing U-Net Medical Image Segmentation',
    slug: 'reward-driven-neural-plasticity-unet-segmentation',
    category: 'scientific',
    excerpt: 'A novel biologically-inspired hyperparameter optimization framework for U-Net brain MRI segmentation achieving 99.72% accuracy and 18.32% faster convergence.',
    content: `
This thesis presents a novel biologically-inspired hyperparameter optimization framework for U-Net-based medical image segmentation. Focusing on brain MRI analysis, we address the critical challenge of suboptimal segmentation performance in conventional U-Net architectures, which often suffer from poor convergence (84.32% training accuracy) due to ineffective parameter tuning.

### 1. Executive Summary & Core Discovery
Our proposed reward-driven neural plasticity-inspired optimization algorithm mimics neuroadaptive processes to dynamically optimize learning parameters, achieving remarkable improvements (99.72% accuracy) while demonstrating superior computational efficiency compared to evolutionary approaches.

Through rigorous experimentation on multi-institutional datasets, we demonstrate that the proposed model significantly outperforms baseline models across all metrics:
- **Dice Similarity Score**: 0.8357 vs 0.0700
- **Intersection over Union (IoU)**: 0.7618 vs 0.0188
- **Convergence Speed**: 18.32% faster than conventional genetic algorithms while maintaining comparable validation accuracy (99.68% vs 99.70%).

### 2. Biological Plausibility & Mathematical Formalization
The framework's biological plausibility is mathematically formalized through synaptic strengthening and pruning mechanisms, offering new insights into machine learning optimization.

### 3. Key Contributions
1. **Neurophysiologically-Grounded Optimization**: A novel optimization paradigm inspired by biological synaptic plasticity.
2. **Clinically-Validated Benchmarks**: Extensive validation on multi-institutional brain MRI segmentation datasets.
3. **Adaptable Architecture**: Highly versatile framework applicable across diverse medical imaging diagnostic tasks.

### 4. Conclusion & Future Directions
The results highlight the model's potential to overcome local optima traps and premature convergence, critical limitations in current approaches. This work bridges computational neuroscience and deep learning, establishing a foundation for biologically-plausible AI in medical diagnostics while meeting stringent clinical reliability requirements. Future directions include quantum-enhanced optimization and 3D segmentation extensions.

**Keywords**: Neural plasticity, hyperparameter optimization, medical image segmentation, U-Net architecture, biologically-inspired AI.
    `,
    author: 'Kibret Mulugeta',
    readTime: '8 min read',
    views: 245,
  },
  {
    title: 'The Aesthetic Harmony of Biological Intelligence and Modern Digital UI',
    slug: 'aesthetic-harmony-biological-intelligence-ui',
    category: 'aesthetic',
    excerpt: 'Exploring how organic neural structures, dark mode glassmorphism, and fluid visual ergonomics shape state-of-the-art interactive applications.',
    content: `
Software development is as much an art form as it is a mathematical science. When engineering complex artificial intelligence systems, visual ergonomics and aesthetic harmony play a decisive role in human-computer interaction.

### 1. The Art of Digital Glassmorphism & Visual Balance
Modern visual aesthetics favor deep dark backgrounds paired with vibrant glowing accents. By incorporating subtle micro-animations and translucent glass cards, interfaces transform from static information displays into fluid digital environments.

### 2. Biological Geometry & Systems Elegance
Nature optimizes through computational elegance. From the branching structures of dendritic networks to the golden ratio in anatomical designs, translating biological principles into user interfaces creates intuitive software that feels alive and responsive.
    `,
    author: 'Kibret Mulugeta',
    readTime: '5 min read',
    views: 118,
  },
  {
    title: 'Optimizing U-Net Architectures for High-Resolution Brain MRI Segmentation',
    slug: 'optimizing-unet-brain-mri-segmentation',
    category: 'scientific',
    excerpt: 'Exploring neural plasticity-inspired loss functions and MONAI PyTorch optimizations for precise clinical MRI tissue segmentation.',
    content: `
Medical imaging diagnostics require exceptional precision, particularly when segmenting complex neurological tissues from brain Magnetic Resonance Imaging (MRI) scans. In this article, we dive into advanced U-Net architectural enhancements that accelerate training convergence while elevating Dice similarity metrics.

### 1. The Challenge of Brain MRI Segmentation
High-resolution 3D DICOM scans exhibit subtle intensity variations between white matter, grey matter, and pathological lesions. Traditional convolutional networks often struggle with class imbalance when small lesion boundaries are present.

### 2. Biological Neural Plasticity & Loss Weighting
By drawing inspiration from synaptic reinforcement mechanisms, we formulate adaptive loss weight updates during backpropagation. Synaptic weights associated with under-segmented edge voxels receive dynamic reinforcement, decreasing convergence times by up to 35%.
    `,
    author: 'Kibret Mulugeta',
    readTime: '6 min read',
    views: 142,
  },
];

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    await connectToDatabase();
    let query = {};
    if (category && ['scientific', 'aesthetic'].includes(category)) {
      query.category = category;
    }

    let blogs = await BlogPost.find(query).sort({ createdAt: -1 });

    if (blogs.length === 0 && !category) {
      blogs = await BlogPost.insertMany(defaultBlogs);
    }

    return NextResponse.json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    console.error('API Error /api/blogs:', error);
    return NextResponse.json({ success: true, data: defaultBlogs, fallback: true });
  }
}
