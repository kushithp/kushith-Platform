import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  position: string;
  company: string;
  profileImage: string;
  rating: number;
  review: string;
}

const TestimonialSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    company: { type: String, required: true },
    profileImage: { type: String, default: '' },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
