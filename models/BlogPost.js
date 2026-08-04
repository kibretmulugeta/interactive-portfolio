import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide blog title.'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Please provide blog slug.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['scientific', 'aesthetic'],
      default: 'scientific',
    },
    excerpt: {
      type: String,
      required: [true, 'Please provide short excerpt.'],
    },
    content: {
      type: String,
      required: [true, 'Please provide blog content.'],
    },
    author: {
      type: String,
      default: 'Kibret Mulugeta',
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
