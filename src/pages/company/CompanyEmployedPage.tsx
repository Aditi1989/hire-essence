import { Plus, User, Calendar, DollarSign, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const CompanyEmployedPage = () => {
  const mockEmployed = [
    {
      id: '1',
      name: 'Jennifer Walsh',
      title: 'Senior Software Engineer',
      email: 'jennifer.walsh@techcorp.com',
      hiredFor: 'Senior Software Engineer',
      hiredOn: '2023-12-15T00:00:00Z',
      startDate: '2024-01-02T00:00:00Z',
      salary: 145000,
      isActive: true,
    },
    {
      id: '2',
      name: 'Robert Kim',
      title: 'DevOps Engineer',
      email: 'robert.kim@techcorp.com',
      hiredFor: 'DevOps Engineer',
      hiredOn: '2023-11-20T00:00:00Z',
      startDate: '2023-12-01T00:00:00Z',
      salary: 135000,
      isActive: true,
    },
    {
      id: '3',
      name: 'Lisa Chen',
      title: 'Product Designer',
      email: 'lisa.chen@email.com',
      hiredFor: 'Senior Product Designer',
      hiredOn: '2023-10-10T00:00:00Z',
      startDate: '2023-10-23T00:00:00Z',
      salary: 125000,
      isActive: false,
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const calculateTenure = (startDate: string) => {
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    
    if (diffMonths < 1) return 'Less than 1 month';
    if (diffMonths === 1) return '1 month';
    if (diffMonths < 12) return `${diffMonths} months`;
    
    const years = Math.floor(diffMonths / 12);
    const remainingMonths = diffMonths % 12;
    
    if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    }
    
    return `${years} ${years === 1 ? 'year' : 'years'}, ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-text">Candidates Employed</h2>
          <p className="text-text-muted">Successfully placed candidates at this company</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Placement
        </Button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-1 w-8 bg-primary rounded-full"></div>
          <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide">Placement History</h3>
        </div>
        
        {mockEmployed.map((employee) => (
          <div key={employee.id} className="card-enhanced p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-14 w-14 flex-shrink-0 ring-2 ring-background shadow-sm">
                <AvatarFallback className="bg-success/10 text-success font-semibold text-lg">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text mb-1">{employee.name}</h3>
                    <p className="text-text-muted font-medium">{employee.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={employee.isActive 
                        ? 'bg-success/15 text-success border-success/30 font-semibold' 
                        : 'bg-muted text-muted-foreground border-muted-foreground/30 font-semibold'
                      }
                    >
                      {employee.isActive ? '● Active Employee' : '● Former Employee'}
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-medium">
                      <Award className="h-3 w-3 mr-1" />
                      Successful Placement
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <User className="h-4 w-4" />
                      <span>Hired for: {employee.hiredFor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <Calendar className="h-4 w-4" />
                      <span>Start Date: {formatDate(employee.startDate)}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <DollarSign className="h-4 w-4" />
                      <span>Salary: {formatCurrency(employee.salary)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <Calendar className="h-4 w-4" />
                      <span>Tenure: {calculateTenure(employee.startDate)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-semibold">
                        🎉 Placed {formatDate(employee.hiredOn)}
                      </Badge>
                      <span className="text-sm text-text-muted">
                        • {calculateTenure(employee.startDate)} tenure
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="hover:bg-primary/5">
                        View Details
                      </Button>
                      {employee.isActive && (
                        <Button variant="outline" size="sm" className="hover:bg-success/5">
                          Contact Employee
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};