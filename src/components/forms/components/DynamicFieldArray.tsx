
import React from 'react';
import { Control } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { ProductFormData } from '../types/ProductFormTypes';

interface DynamicFieldArrayProps {
  fields: any[];
  append: (value: { value: string }) => void;
  remove: (index: number) => void;
  name: string;
  label: string;
  control: Control<ProductFormData>;
}

const DynamicFieldArray: React.FC<DynamicFieldArrayProps> = ({ 
  fields, 
  append, 
  remove, 
  name, 
  label,
  control
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ value: '' })}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add {label.slice(0, -1)}
        </Button>
      </div>
      
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <FormField
              control={control}
              name={`${name}.${index}.value` as any}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`Enter ${label.toLowerCase().slice(0, -1)}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {fields.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => remove(index)}
                className="flex-shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicFieldArray;
