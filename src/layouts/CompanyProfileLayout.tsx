import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { TopSearchBar } from '@/components/layout/TopSearchBar';
import { CompanyHeader } from '@/components/layout/CompanyHeader';
import { TabNavigation } from '@/components/layout/TabNavigation';
import { ActivitySidebar } from '@/components/layout/ActivitySidebar';
import { useCompanyStore } from '@/store/useCompanyStore';
import { mockCompany, mockJobs, mockActivities } from '@/lib/mockData';

export const CompanyProfileLayout = () => {
  const { id } = useParams<{ id: string }>();
  const { setCurrentCompany, setJobs, setActivities } = useCompanyStore();

  useEffect(() => {
    // In a real app, this would fetch data from an API
    if (id) {
      setCurrentCompany(mockCompany);
      setJobs(mockJobs);
      setActivities(mockActivities);
    }
  }, [id, setCurrentCompany, setJobs, setActivities]);

  if (!id) {
    return <div>Company not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <TopSearchBar />
      
      <div className="pt-12">
        <CompanyHeader />
        <TabNavigation companyId={id} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 py-6">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <Outlet />
            </div>
            
            {/* Right Sidebar */}
            <ActivitySidebar />
          </div>
        </div>
      </div>
    </div>
  );
};