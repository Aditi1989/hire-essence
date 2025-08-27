import { CompanyOverview } from '@/components/company/CompanyOverview';

export const CompanyOverviewPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text">Company Information</h2>
        <p className="text-text-muted">Manage and update company details</p>
      </div>
      
      <CompanyOverview />
    </div>
  );
};