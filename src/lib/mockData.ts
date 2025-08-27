// Mock data for RecruitCRM

import { Company, Job, Activity, Contact } from '@/types';

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    initials: 'SJ',
    email: 'sarah@techcorp.com',
    phone: '+1 (555) 123-4567',
  },
  {
    id: '2',
    name: 'Michael Chen',
    initials: 'MC',
    email: 'michael@techcorp.com',
    phone: '+1 (555) 234-5678',
  },
  {
    id: '3',
    name: 'Emily Davis',
    initials: 'ED',
    email: 'emily@techcorp.com',
  },
];

export const mockCompany: Company = {
  id: '1',
  name: 'TechCorp Solutions',
  website: 'https://techcorp.com',
  fullAddress: '123 Innovation Drive, San Francisco, CA 94105, United States',
  industry: 'Technology',
  locality: 'San Francisco',
  state: 'California',
  country: 'United States',
  postalCode: '94105',
  linkedinCompanyId: 'techcorp-solutions',
  monsterBoardCompany: 'TechCorp Solutions Inc.',
  indeedOptedOut: false,
  about: 'TechCorp Solutions is a leading technology company specializing in cloud infrastructure and enterprise software solutions. Founded in 2010, we serve Fortune 500 companies worldwide.',
  owner: {
    id: '1',
    name: 'Jessica Martinez',
    email: 'jessica@recruitcrm.com',
  },
  updatedOn: '2024-01-15T10:30:00Z',
  createdOn: '2023-06-15T09:00:00Z',
  contacts: mockContacts,
};

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    city: 'San Francisco',
    contactId: '1',
    ownerId: '1',
    status: 'Open',
    pipelineCount: 12,
    placedCount: 0,
    hasJD: true,
    createdOn: '2024-01-10T09:00:00Z',
    updatedOn: '2024-01-15T14:30:00Z',
  },
  {
    id: '2',
    title: 'Product Manager',
    city: 'San Francisco',
    contactId: '2',
    ownerId: '1',
    status: 'On Hold',
    pipelineCount: 8,
    placedCount: 0,
    hasJD: true,
    createdOn: '2024-01-08T11:00:00Z',
    updatedOn: '2024-01-12T16:45:00Z',
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    city: 'Remote',
    contactId: '3',
    ownerId: '1',
    status: 'Closed',
    pipelineCount: 15,
    placedCount: 1,
    hasJD: false,
    createdOn: '2023-12-20T08:30:00Z',
    updatedOn: '2024-01-05T12:00:00Z',
  },
  {
    id: '4',
    title: 'UI/UX Designer',
    city: 'San Francisco',
    contactId: '1',
    ownerId: '1',
    status: 'Canceled',
    pipelineCount: 5,
    placedCount: 0,
    hasJD: true,
    createdOn: '2024-01-01T10:00:00Z',
    updatedOn: '2024-01-07T15:20:00Z',
  },
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'note',
    title: 'Follow-up call with Sarah Johnson',
    description: 'Discussed upcoming Software Engineer position requirements. Sarah mentioned they are looking for someone with 5+ years of React experience.',
    createdOn: '2024-01-15T09:30:00Z',
    createdBy: {
      id: '1',
      name: 'Jessica Martinez',
    },
  },
  {
    id: '2',
    type: 'call',
    title: 'Initial client call',
    description: 'Introduced RecruitCRM services and discussed their hiring needs for Q1 2024.',
    createdOn: '2024-01-12T14:15:00Z',
    createdBy: {
      id: '1',
      name: 'Jessica Martinez',
    },
  },
  {
    id: '3',
    type: 'task',
    title: 'Send job description template',
    description: 'Send standardized JD template for Product Manager role',
    createdOn: '2024-01-10T11:00:00Z',
    createdBy: {
      id: '1',
      name: 'Jessica Martinez',
    },
    dueDate: '2024-01-16T17:00:00Z',
    completed: false,
  },
  {
    id: '4',
    type: 'meeting',
    title: 'Kickoff meeting scheduled',
    description: 'Quarterly business review meeting with TechCorp leadership team',
    createdOn: '2024-01-08T16:30:00Z',
    createdBy: {
      id: '1',
      name: 'Jessica Martinez',
    },
    dueDate: '2024-01-20T10:00:00Z',
  },
];