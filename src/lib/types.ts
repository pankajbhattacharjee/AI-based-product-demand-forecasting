export type SaleRecord = {
  date: string;
  sales: number;
  productId: string;
};

export type ForecastRecord = {
  date: string;
  forecast: number;
};

export type TimeAggregation = 'week' | 'month' | 'year';

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  sku: string;
  inventory: number;
};

export type OptimizationSuggestion = {
  id: string;
  product: string;
  suggestion: string;
  impact: 'High' | 'Medium' | 'Low';
};

export type SalesByCategory = {
    name: string;
    value: number;
}
