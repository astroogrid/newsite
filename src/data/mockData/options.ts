import { SizeOption, ColorOption } from '../types/product';
import optionsData from '../json/productOptions.json';

type ProductOptionsData = {
  productSizes: SizeOption[];
  productColors: ColorOption[];
};

const typedOptionsData = optionsData as ProductOptionsData;

export const productSizes: SizeOption[] = typedOptionsData.productSizes;
export const productColors: ColorOption[] = typedOptionsData.productColors;
