import mongoose, { Schema, Document } from 'mongoose';

export interface IPersonal extends Document {
  name: string;
  role: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
  profileImage: string;
}

const PersonalSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp: { type: String, required: true },
    linkedin: { type: String, required: true },
    github: { type: String, required: true },
    resumeUrl: { type: String, default: '' },
    profileImage: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Personal || mongoose.model<IPersonal>('Personal', PersonalSchema);
