import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Programming Languages' | 'DevOps' | 'Cloud' | 'AI' | 'Tools';
  progress: number;
  icon: string;
}

const SkillSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'Database', 'Programming Languages', 'DevOps', 'Cloud', 'AI', 'Tools'],
    },
    progress: { type: Number, required: true, min: 0, max: 100 },
    icon: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
