import { Plus, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const CompanyDealsPage = () => {
  const mockDeals = [
    {
      id: '1',
      title: 'Q1 2024 Hiring Initiative',
      value: 150000,
      stage: 'Negotiation',
      probability: 85,
      expectedCloseDate: '2024-02-15',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-text">Related Deals</h2>
          <p className="text-text-muted">Sales opportunities and partnerships</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Deal
        </Button>
      </div>

      <div className="space-y-4">
        {mockDeals.map((deal) => (
          <div key={deal.id} className="bg-card border border-border rounded-lg p-6 card-hover">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-text mb-2">{deal.title}</h3>
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {formatCurrency(deal.value)}
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {deal.probability}% probability
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                {deal.stage}
              </Badge>
            </div>
            
            <div className="text-sm text-text-muted">
              Expected close: {new Date(deal.expectedCloseDate).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};