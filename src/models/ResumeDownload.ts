import mongoose, { Schema, Document } from 'mongoose';

export interface IResumeDownload extends Document {
  ip: string;
  userAgent: string;
  downloadedAt: Date;
}

const ResumeDownloadSchema: Schema = new Schema(
  {
    ip: { type: String, default: '' },
    userAgent: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.ResumeDownload || mongoose.model<IResumeDownload>('ResumeDownload', ResumeDownloadSchema);
