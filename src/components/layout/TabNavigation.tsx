import { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { TabInfo } from '@/types';

interface TabNavigationProps {
  companyId: string;
}

export const TabNavigation = ({ companyId }: TabNavigationProps) => {
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false);

  const tabs: TabInfo[] = [
    { id: 'overview', label: 'Overview', path: `/company/${companyId}` },
    { id: 'jobs', label: 'Jobs', path: `/company/${companyId}/jobs`, count: 4 },
    { id: 'hotlists', label: 'Hotlists', path: `/company/${companyId}/hotlists`, count: 2 },
    { id: 'deals', label: 'Related Deals', path: `/company/${companyId}/deals`, count: 1 },
    { id: 'emails', label: 'Related Emails', path: `/company/${companyId}/emails`, count: 8 },
    { id: 'pitched', label: 'Candidate(s) Pitched', path: `/company/${companyId}/pitched`, count: 12 },
    { id: 'employed', label: 'Candidates Employed', path: `/company/${companyId}/employed`, count: 3 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsSticky(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveTab = (tabPath: string) => {
    if (tabPath === `/company/${companyId}`) {
      return location.pathname === tabPath;
    }
    return location.pathname.startsWith(tabPath);
  };

  return (
    <div className={`sticky top-[200px] z-[750] bg-surface border-b border-border transition-shadow duration-200 ${isSticky ? 'sticky-shadow' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <NavLink
              key={tab.id}
              to={tab.path}
              className={({ isActive }) =>
                cn(
                  'relative flex items-center gap-2 py-4 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                  isActiveTab(tab.path)
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-muted hover:text-text hover:border-border'
                )
              }
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={cn(
                  'px-2 py-0.5 rounded-full text-xs font-medium',
                  isActiveTab(tab.path)
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-text-muted'
                )}>
                  {tab.count}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};