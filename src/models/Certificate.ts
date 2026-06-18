import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  title: string;
  organization: string;
  issueDate: string;
  credentialUrl: string;
  imageOrPdfUrl: string;
  type: 'Certificate' | 'Workshop' | 'Hackathon' | 'Competition' | 'Award';
}

const CertificateSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    organization: { type: String, required: true },
    issueDate: { type: String, required: true },
    credentialUrl: { type: String, default: '' },
    imageOrPdfUrl: { type: String, default: '' },
    type: {
      type: String,
      required: true,
      enum: ['Certificate', 'Workshop', 'Hackathon', 'Competition', 'Award'],
      default: 'Certificate',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Certificate || mongoose.model<ICertificate>('Certificate', CertificateSchema);
