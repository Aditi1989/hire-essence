// RecruitCRM Core Types

export interface Contact {
  id: string;
  initials: string;
  name: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface Owner {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
}

export interface Company {
  id: string;
  name: string;
  avatarUrl?: string;
  website?: string;
  fullAddress?: string;
  industry?: string;
  locality?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  linkedinCompanyId?: string;
  monsterBoardCompany?: string;
  indeedOptedOut: boolean;
  owner: Owner;
  updatedOn: string;
  createdOn: string;
  contacts: Contact[];
  about?: string;
}

export type JobStatus = 'Open' | 'On Hold' | 'Canceled' | 'Closed';

export interface Job {
  id: string;
  title: string;
  city?: string;
  contactId?: string;
  ownerId?: string;
  status: JobStatus;
  pipelineCount: number;
  placedCount: number;
  hasJD: boolean;
  createdOn: string;
  updatedOn: string;
}

export interface Hotlist {
  id: string;
  name: string;
  description?: string;
  candidateCount: number;
  createdOn: string;
  updatedOn: string;
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  createdOn: string;
  updatedOn: string;
}

export interface Email {
  id: string;
  subject: string;
  from: string;
  to: string;
  sentOn: string;
  isRead: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  title?: string;
  status: string;
  avatarUrl?: string;
}

export type ActivityType = 'note' | 'call' | 'task' | 'meeting' | 'file';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  createdOn: string;
  createdBy: Owner;
  dueDate?: string;
  completed?: boolean;
}

export interface TabInfo {
  id: string;
  label: string;
  path: string;
  count?: number;
}

export interface JobFilter {
  statuses: JobStatus[];
  searchQuery: string;
}

export interface ActivityFilter {
  types: ActivityType[];
  searchQuery: string;
}