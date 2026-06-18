import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalytics extends Document {
  eventType: 'pageview' | 'click';
  target: string; // e.g. '/', '/projects/123', 'whatsapp_click', 'linkedin_click'
  ip: string;
  userAgent: string;
  createdAt: Date;
}

const AnalyticsSchema: Schema = new Schema(
  {
    eventType: { type: String, required: true, enum: ['pageview', 'click'] },
    target: { type: String, required: true },
    ip: { type: String, default: '' },
    userAgent: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
