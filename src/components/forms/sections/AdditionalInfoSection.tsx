
import React from 'react';
import { Control, UseFieldArrayReturn } from 'react-hook-form';
import DynamicFieldArray from '../components/DynamicFieldArray';
import { ProductFormData } from '../types/ProductFormTypes';

interface AdditionalInfoSectionProps {
  control: Control<ProductFormData>;
  relatedLinksFields: UseFieldArrayReturn<ProductFormData, 'relatedLinks'>['fields'];
  appendRelatedLink: UseFieldArrayReturn<ProductFormData, 'relatedLinks'>['append'];
  removeRelatedLink: UseFieldArrayReturn<ProductFormData, 'relatedLinks'>['remove'];
  mayYouLikeFields: UseFieldArrayReturn<ProductFormData, 'mayYouLike'>['fields'];
  appendMayYouLike: UseFieldArrayReturn<ProductFormData, 'mayYouLike'>['append'];
  removeMayYouLike: UseFieldArrayReturn<ProductFormData, 'mayYouLike'>['remove'];
  sizesFields: UseFieldArrayReturn<ProductFormData, 'sizes'>['fields'];
  appendSize: UseFieldArrayReturn<ProductFormData, 'sizes'>['append'];
  removeSize: UseFieldArrayReturn<ProductFormData, 'sizes'>['remove'];
}

const AdditionalInfoSection: React.FC<AdditionalInfoSectionProps> = ({
  control,
  relatedLinksFields,
  appendRelatedLink,
  removeRelatedLink,
  mayYouLikeFields,
  appendMayYouLike,
  removeMayYouLike,
  sizesFields,
  appendSize,
  removeSize
}) => {
  return (
    <div className="bg-white p-6 rounded-lg border space-y-6">
      <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
      
      <DynamicFieldArray
        fields={relatedLinksFields}
        append={appendRelatedLink}
        remove={removeRelatedLink}
        name="relatedLinks"
        label="Related Links"
        control={control}
      />

      <DynamicFieldArray
        fields={mayYouLikeFields}
        append={appendMayYouLike}
        remove={removeMayYouLike}
        name="mayYouLike"
        label="May You Like Items"
        control={control}
      />

      <DynamicFieldArray
        fields={sizesFields}
        append={appendSize}
        remove={removeSize}
        name="sizes"
        label="Sizes"
        control={control}
      />
    </div>
  );
};

export default AdditionalInfoSection;
