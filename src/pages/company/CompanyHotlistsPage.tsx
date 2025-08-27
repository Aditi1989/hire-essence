import { Plus, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const CompanyHotlistsPage = () => {
  const mockHotlists = [
    {
      id: '1',
      name: 'Senior Engineers',
      description: 'Top software engineering candidates for senior positions',
      candidateCount: 24,
      updatedOn: '2024-01-15',
    },
    {
      id: '2', 
      name: 'Product Managers',
      description: 'Experienced product management professionals',
      candidateCount: 12,
      updatedOn: '2024-01-12',
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-text">Hotlists</h2>
          <p className="text-text-muted">Curated candidate lists for this company</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Hotlist
        </Button>
      </div>

      <div className="space-y-4">
        {mockHotlists.map((hotlist) => (
          <div key={hotlist.id} className="bg-card border border-border rounded-lg p-6 card-hover">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text mb-2">{hotlist.name}</h3>
                <p className="text-text-muted mb-3">{hotlist.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {hotlist.candidateCount} candidates
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Updated {new Date(hotlist.updatedOn).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <Badge variant="secondary">
                Active
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};