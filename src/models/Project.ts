import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  problem: string;
  solution: string;
  results: string;
  category: string;
  technologies: string[];
  coverImage: string;
  galleryImages: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  displayOrder: number;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    problem: { type: String, default: '' },
    solution: { type: String, default: '' },
    results: { type: String, default: '' },
    category: { type: String, required: true },
    technologies: { type: [String], required: true },
    coverImage: { type: String, default: '' },
    galleryImages: { type: [String], default: [] },
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
