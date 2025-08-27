import { create } from 'zustand';
import { Company, Job, JobFilter, Activity, ActivityFilter, Hotlist, Deal, Email, Candidate } from '@/types';

interface CompanyState {
  // Current company data
  currentCompany: Company | null;
  jobs: Job[];
  hotlists: Hotlist[];
  deals: Deal[];
  emails: Email[];
  candidates: Candidate[];
  activities: Activity[];
  
  // UI state
  jobFilter: JobFilter;
  activityFilter: ActivityFilter;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrentCompany: (company: Company) => void;
  updateCompany: (updates: Partial<Company>) => void;
  setJobs: (jobs: Job[]) => void;
  updateJob: (jobId: string, updates: Partial<Job>) => void;
  setJobFilter: (filter: Partial<JobFilter>) => void;
  setActivityFilter: (filter: Partial<ActivityFilter>) => void;
  setActivities: (activities: Activity[]) => void;
  addActivity: (activity: Activity) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed
  filteredJobs: () => Job[];
  filteredActivities: () => Activity[];
}

export const useCompanyStore = create<CompanyState>((set, get) => ({
  // Initial state
  currentCompany: null,
  jobs: [],
  hotlists: [],
  deals: [],
  emails: [],
  candidates: [],
  activities: [],
  
  jobFilter: {
    statuses: ['Open', 'On Hold', 'Canceled', 'Closed'],
    searchQuery: '',
  },
  
  activityFilter: {
    types: ['note', 'call', 'task', 'meeting', 'file'],
    searchQuery: '',
  },
  
  isLoading: false,
  error: null,
  
  // Actions
  setCurrentCompany: (company) => set({ currentCompany: company }),
  
  updateCompany: (updates) => set((state) => ({
    currentCompany: state.currentCompany 
      ? { ...state.currentCompany, ...updates }
      : null
  })),
  
  setJobs: (jobs) => set({ jobs }),
  
  updateJob: (jobId, updates) => set((state) => ({
    jobs: state.jobs.map(job => 
      job.id === jobId ? { ...job, ...updates } : job
    )
  })),
  
  setJobFilter: (filter) => set((state) => ({
    jobFilter: { ...state.jobFilter, ...filter }
  })),
  
  setActivityFilter: (filter) => set((state) => ({
    activityFilter: { ...state.activityFilter, ...filter }
  })),
  
  setActivities: (activities) => set({ activities }),
  
  addActivity: (activity) => set((state) => ({
    activities: [activity, ...state.activities]
  })),
  
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  // Computed
  filteredJobs: () => {
    const { jobs, jobFilter } = get();
    return jobs.filter(job => {
      const matchesStatus = jobFilter.statuses.includes(job.status);
      const matchesSearch = jobFilter.searchQuery === '' || 
        job.title.toLowerCase().includes(jobFilter.searchQuery.toLowerCase()) ||
        (job.city && job.city.toLowerCase().includes(jobFilter.searchQuery.toLowerCase()));
      
      return matchesStatus && matchesSearch;
    });
  },
  
  filteredActivities: () => {
    const { activities, activityFilter } = get();
    return activities.filter(activity => {
      const matchesType = activityFilter.types.includes(activity.type);
      const matchesSearch = activityFilter.searchQuery === '' ||
        activity.title.toLowerCase().includes(activityFilter.searchQuery.toLowerCase()) ||
        (activity.description && activity.description.toLowerCase().includes(activityFilter.searchQuery.toLowerCase()));
      
      return matchesType && matchesSearch;
    });
  },
}));