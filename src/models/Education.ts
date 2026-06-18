import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
  institutionName: string;
  degree: string;
  department: string;
  duration: string;
  CGPA: string;
  description: string;
  logo: string;
}

const EducationSchema: Schema = new Schema(
  {
    institutionName: { type: String, required: true },
    degree: { type: String, required: true },
    department: { type: String, required: true },
    duration: { type: String, required: true },
    CGPA: { type: String, required: true },
    description: { type: String, default: '' },
    logo: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Education || mongoose.model<IEducation>('Education', EducationSchema);
