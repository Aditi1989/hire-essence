import { JobsTab } from '@/components/company/JobsTab';

export const CompanyJobsPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text">Jobs</h2>
        <p className="text-text-muted">Manage job postings and candidate pipelines</p>
      </div>
      
      <JobsTab />
    </div>
  );
};