export type ResourceType = 'video' | 'pdf' | 'article' | 'module';

export type ContentTopic =
  | 'dsa-pathways'
  | 'interview-preparation'
  | 'timelines-deadlines';

export type ResourceAccess = 'public' | 'paid';

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  topic: ContentTopic;
  description: string;
  duration: string;
  access?: ResourceAccess;
  bucket?: string;
  filePath?: string;
  thumbnailUrl?: string;
  contentUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResourceProgress {
  resourceId: string;
  userId: string;
  completed: boolean;
  completedAt?: string;
  lastAccessedAt?: string;
}
