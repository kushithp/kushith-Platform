import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  projectType: string;
  message: string;
  status: 'Pending' | 'In Contact' | 'Completed' | 'Archived';
  createdAt: Date;
}

const LeadSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    company: { type: String, default: '' },
    budget: { type: String, default: '' },
    projectType: { type: String, default: '' },
    message: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'In Contact', 'Completed', 'Archived'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
