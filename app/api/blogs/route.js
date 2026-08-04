import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export const defaultBlogs = [
  {
    title: 'Optimizing U-Net Architectures for High-Resolution Brain MRI Segmentation',
    slug: 'optimizing-unet-brain-mri-segmentation',
    excerpt: 'Exploring neural plasticity-inspired loss functions and MONAI PyTorch optimizations for precise clinical MRI tissue segmentation.',
    content: `
Medical imaging diagnostics require exceptional precision, particularly when segmenting complex neurological tissues from brain Magnetic Resonance Imaging (MRI) scans. In this article, we dive into advanced U-Net architectural enhancements that accelerate training convergence while elevating Dice similarity metrics.

### 1. The Challenge of Brain MRI Segmentation
High-resolution 3D DICOM scans exhibit subtle intensity variations between white matter, grey matter, and pathological lesions. Traditional convolutional networks often struggle with class imbalance when small lesion boundaries are present.

### 2. Biological Neural Plasticity & Loss Weighting
By drawing inspiration from synaptic reinforcement mechanisms, we formulate adaptive loss weight updates during backpropagation. Synaptic weights associated with under-segmented edge voxels receive dynamic reinforcement, decreasing convergence times by up to 35%.

\`\`\`python
import torch
import torch.nn as nn

class PlasticityWeightedLoss(nn.Module):
    def __init__(self, alpha=0.5):
        super().__init__()
        self.alpha = alpha

    def forward(self, pred, target):
        dice_loss = 1.0 - (2.0 * (pred * target).sum() + 1e-5) / (pred.sum() + target.sum() + 1e-5)
        edge_weight = torch.abs(pred - target)
        return dice_loss + self.alpha * edge_weight.mean()
\`\`\`

### 3. Conclusion & Open Source Framework
By leveraging PyTorch and the MONAI framework, clinical researchers can deploy scalable DICOM segmentation microservices with real-time inference speed.
    `,
    author: 'Kibret Mulugeta',
    readTime: '6 min read',
    views: 142,
  },
  {
    title: 'Reward-Driven Synaptic Reinforcement in Deep Learning Optimization',
    slug: 'reward-driven-synaptic-reinforcement',
    excerpt: 'How principles of neurobiology can inspire next-generation optimization algorithms in medical computer vision.',
    content: `
Artificial Neural Networks (ANNs) have drawn foundational concepts from biological brains, yet standard backpropagation algorithm updates remain static compared to dynamic brain plasticity.

### Synaptic Plasticity in ML
In biological brains, Hebbian learning asserts that "neurons that fire together, wire together." Integrating reward-driven feedback loops into deep learning loss landscapes yields higher generalization scores across noisy DICOM datasets.
    `,
    author: 'Kibret Mulugeta',
    readTime: '4 min read',
    views: 89,
  },
];

export async function GET() {
  try {
    await connectToDatabase();
    let blogs = await BlogPost.find({}).sort({ createdAt: -1 });

    if (blogs.length === 0) {
      blogs = await BlogPost.insertMany(defaultBlogs);
    }

    return NextResponse.json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    console.error('API Error /api/blogs:', error);
    return NextResponse.json({ success: true, data: defaultBlogs, fallback: true });
  }
}
