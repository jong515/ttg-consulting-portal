export type ResourceType = 'video' | 'pdf' | 'article' | 'module';

export type ContentTopic =
  | 'dsa-pathways'
  | 'interview-preparation'
  | 'timelines-deadlines';

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  topic: ContentTopic;
  topicLabel: string;
  description: string;
  duration: string;
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

export interface DashboardStats {
  totalResources: number;
  completed: number;
  inProgress: number;
}
