import { useState } from 'react';
import { Edit, ExternalLink, Globe, MapPin, Building, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useCompanyStore } from '@/store/useCompanyStore';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface InfoFieldProps {
  label: string;
  value?: string;
  isEditing?: boolean;
  onEdit?: () => void;
  onSave?: (value: string) => void;
  onCancel?: () => void;
  multiline?: boolean;
  placeholder?: string;
  type?: 'text' | 'url' | 'select';
  options?: string[];
}

const InfoField = ({ 
  label, 
  value, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel, 
  multiline, 
  placeholder = "Not available",
  type = 'text',
  options = []
}: InfoFieldProps) => {
  const [editValue, setEditValue] = useState(value || '');

  const handleSave = () => {
    onSave?.(editValue);
  };

  const handleCancel = () => {
    setEditValue(value || '');
    onCancel?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium text-text">{label}</Label>
        <div className="flex gap-2">
          {type === 'select' ? (
            <Select value={editValue} onValueChange={setEditValue}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : multiline ? (
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 min-h-[80px]"
              autoFocus
            />
          ) : (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
              autoFocus
            />
          )}
          <Button variant="outline" size="sm" onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative">
      <Label className="text-sm font-medium text-text">{label}</Label>
      <div className={cn(
        "mt-1 p-3 rounded-md border border-border min-h-[40px] flex items-center justify-between transition-colors",
        "group-hover:bg-muted/50 cursor-pointer inline-editable"
      )} onClick={onEdit}>
        <div className="flex-1">
          {value ? (
            type === 'url' ? (
              <a 
                href={value} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="h-4 w-4" />
                {value}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <span className="text-text">{value}</span>
            )
          ) : (
            <span className="text-text-muted italic">{placeholder}</span>
          )}
        </div>
        <Pencil className="h-4 w-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};

export const CompanyOverview = () => {
  const { currentCompany, updateCompany } = useCompanyStore();
  const [editingField, setEditingField] = useState<string | null>(null);

  if (!currentCompany) return null;

  const handleFieldSave = (field: string, value: string) => {
    updateCompany({ [field]: value });
    setEditingField(null);
    toast({
      title: "Updated successfully",
      description: `${field} has been updated.`,
    });
  };

  const industryOptions = [
    'Technology',
    'Healthcare',
    'Finance',
    'Manufacturing',
    'Retail',
    'Education',
    'Real Estate',
    'Transportation',
    'Energy',
    'Media & Entertainment',
    'Other'
  ];

  return (
    <div className="max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <InfoField
            label="About"
            value={currentCompany.about}
            isEditing={editingField === 'about'}
            onEdit={() => setEditingField('about')}
            onSave={(value) => handleFieldSave('about', value)}
            onCancel={() => setEditingField(null)}
            multiline
            placeholder="Add company description..."
          />

          <InfoField
            label="Website"
            value={currentCompany.website}
            isEditing={editingField === 'website'}
            onEdit={() => setEditingField('website')}
            onSave={(value) => handleFieldSave('website', value)}
            onCancel={() => setEditingField(null)}
            type="url"
            placeholder="Add website URL..."
          />

          <InfoField
            label="Full Address"
            value={currentCompany.fullAddress}
            isEditing={editingField === 'fullAddress'}
            onEdit={() => setEditingField('fullAddress')}
            onSave={(value) => handleFieldSave('fullAddress', value)}
            onCancel={() => setEditingField(null)}
            multiline
            placeholder="Add full address..."
          />

          <InfoField
            label="Industry"
            value={currentCompany.industry}
            isEditing={editingField === 'industry'}
            onEdit={() => setEditingField('industry')}
            onSave={(value) => handleFieldSave('industry', value)}
            onCancel={() => setEditingField(null)}
            type="select"
            options={industryOptions}
            placeholder="Select industry..."
          />

          <InfoField
            label="Locality"
            value={currentCompany.locality}
            isEditing={editingField === 'locality'}
            onEdit={() => setEditingField('locality')}
            onSave={(value) => handleFieldSave('locality', value)}
            onCancel={() => setEditingField(null)}
            placeholder="Add city/locality..."
          />

          <InfoField
            label="State"
            value={currentCompany.state}
            isEditing={editingField === 'state'}
            onEdit={() => setEditingField('state')}
            onSave={(value) => handleFieldSave('state', value)}
            onCancel={() => setEditingField(null)}
            placeholder="Add state/province..."
          />
        </div>

        <div className="space-y-6">
          <InfoField
            label="Country"
            value={currentCompany.country}
            isEditing={editingField === 'country'}
            onEdit={() => setEditingField('country')}
            onSave={(value) => handleFieldSave('country', value)}
            onCancel={() => setEditingField(null)}
            placeholder="Add country..."
          />

          <InfoField
            label="Postal Code"
            value={currentCompany.postalCode}
            isEditing={editingField === 'postalCode'}
            onEdit={() => setEditingField('postalCode')}
            onSave={(value) => handleFieldSave('postalCode', value)}
            onCancel={() => setEditingField(null)}
            placeholder="Add postal code..."
          />

          <InfoField
            label="LinkedIn Company ID"
            value={currentCompany.linkedinCompanyId}
            isEditing={editingField === 'linkedinCompanyId'}
            onEdit={() => setEditingField('linkedinCompanyId')}
            onSave={(value) => handleFieldSave('linkedinCompanyId', value)}
            onCancel={() => setEditingField(null)}
            placeholder="Add LinkedIn company ID..."
          />

          <InfoField
            label="Monster Board Company"
            value={currentCompany.monsterBoardCompany}
            isEditing={editingField === 'monsterBoardCompany'}
            onEdit={() => setEditingField('monsterBoardCompany')}
            onSave={(value) => handleFieldSave('monsterBoardCompany', value)}
            onCancel={() => setEditingField(null)}
            placeholder="Add Monster board company..."
          />

          <div className="space-y-2">
            <Label className="text-sm font-medium text-text">Indeed Opted Out</Label>
            <div className="p-3 rounded-md border border-border">
              <div className="flex items-center justify-between">
                <span className="text-text">
                  {currentCompany.indeedOptedOut ? 'Yes' : 'No'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateCompany({ indeedOptedOut: !currentCompany.indeedOptedOut })}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};