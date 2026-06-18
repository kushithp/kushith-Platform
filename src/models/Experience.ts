import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  position: string;
  organization: string;
  duration: string;
  responsibilities: string[];
  achievements: string[];
}

const ExperienceSchema: Schema = new Schema(
  {
    position: { type: String, required: true },
    organization: { type: String, required: true },
    duration: { type: String, required: true },
    responsibilities: { type: [String], default: [] },
    achievements: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);
