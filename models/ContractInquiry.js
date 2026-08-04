import mongoose from 'mongoose';

const ContractInquirySchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Please provide client name.'],
      trim: true,
    },
    clientEmail: {
      type: String,
      required: [true, 'Please provide client email.'],
      trim: true,
      lowercase: true,
    },
    projectType: {
      type: String,
      required: [true, 'Please select a project type.'],
      enum: ['U-Net Brain MRI Segmentation', 'Medical Imaging Pipeline', 'Neural Plasticity Algorithm', 'Custom AI Consulting'],
      default: 'Custom AI Consulting',
    },
    budget: {
      type: String,
      default: 'Flexible',
    },
    description: {
      type: String,
      required: [true, 'Please provide project description.'],
      trim: true,
    },
    auth0Sub: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ContractInquiry || mongoose.model('ContractInquiry', ContractInquirySchema);
