
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { brands, categories, priceRanges } from '@/data/products';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { FilterIcon, X } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

export interface FilterOptions {
  brands: string[];
  categories: string[];
  priceRange: { min: number; max: number };
}

interface CatalogSidebarProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  isMobile: boolean;
}

const CatalogSidebar: React.FC<CatalogSidebarProps> = ({ filters, setFilters, isMobile }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [priceValue, setPriceValue] = React.useState([0, 5000]);
  const [openSections, setOpenSections] = React.useState({
    categories: true,
    brands: true,
    price: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handlePriceChange = (values: number[]) => {
    setPriceValue(values);
    setFilters(prev => ({
      ...prev,
      priceRange: { min: values[0], max: values[1] }
    }));
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      brands: checked 
        ? [...prev.brands, brand] 
        : prev.brands.filter(b => b !== brand)
    }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      categories: checked 
        ? [...prev.categories, category] 
        : prev.categories.filter(c => c !== category)
    }));
  };

  const clearFilters = () => {
    setFilters({
      brands: [],
      categories: [],
      priceRange: { min: 0, max: 5000 }
    });
    setPriceValue([0, 5000]);
  };

  const sidebarContent = (
    <div className="flex flex-col gap-6 py-4">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-xl font-bold">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
          className="text-sm text-muted-foreground"
        >
          Clear All
        </Button>
      </div>

      {/* Categories */}
      <Collapsible open={openSections.categories} onOpenChange={() => toggleSection('categories')}>
        <div className="px-4">
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <h3 className="text-lg font-medium">Categories</h3>
            <span className={cn("transition-transform", openSections.categories ? "rotate-180" : "")}>▼</span>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="flex flex-col gap-2 px-4 mt-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox 
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked === true)}
                />
                <Label 
                  htmlFor={`category-${category}`}
                  className="text-sm cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Brands */}
      <Collapsible open={openSections.brands} onOpenChange={() => toggleSection('brands')}>
        <div className="px-4">
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <h3 className="text-lg font-medium">Brands</h3>
            <span className={cn("transition-transform", openSections.brands ? "rotate-180" : "")}>▼</span>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="flex flex-col gap-2 px-4 mt-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox 
                  id={`brand-${brand}`}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked === true)}
                />
                <Label 
                  htmlFor={`brand-${brand}`}
                  className="text-sm cursor-pointer"
                >
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range */}
      <Collapsible open={openSections.price} onOpenChange={() => toggleSection('price')}>
        <div className="px-4">
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <h3 className="text-lg font-medium">Price Range</h3>
            <span className={cn("transition-transform", openSections.price ? "rotate-180" : "")}>▼</span>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="px-4 mt-4">
            <Slider
              defaultValue={[0, 5000]}
              min={0}
              max={5000}
              step={100}
              value={priceValue}
              onValueChange={handlePriceChange}
              className="mb-6"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceValue[0]}</span>
              <span>${priceValue[1] === 5000 ? '5000+' : priceValue[1]}</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="flex gap-2">
            <FilterIcon size={16} />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[350px]">
          <div className="h-full overflow-y-auto pb-20">
            {sidebarContent}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="hidden md:block w-64 flex-shrink-0 border-r h-full overflow-y-auto sticky top-32"
    >
      {sidebarContent}
    </motion.div>
  );
};

export default CatalogSidebar;
