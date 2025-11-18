import { addDays, format } from 'date-fns';
import type { SaleRecord, ForecastRecord, Product } from './types';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateMockData = (products: Product[]): { sales: SaleRecord[], forecast: ForecastRecord[] } => {
    const sales: SaleRecord[] = [];
    const forecast: ForecastRecord[] = [];
    const today = new Date();

    // Generate historical sales data for the last 12 weeks
    for (let i = 12; i > 0; i--) {
        const date = addDays(today, -i * 7);
        const randomProduct = products[getRandomInt(0, products.length - 1)];
        sales.push({
            date: format(date, 'yyyy-MM-dd'),
            sales: getRandomInt(20, 150),
            productId: randomProduct.id,
        });
    }

    // Generate forecast data for the next 6 weeks
    for (let i = 0; i < 6; i++) {
        const date = addDays(today, i * 7);
        forecast.push({
            date: format(date, 'yyyy-MM-dd'),
            forecast: getRandomInt(200, 600)
        });
    }

    return { sales, forecast };
}
