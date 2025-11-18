'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { getWeek, getMonth, getYear, startOfWeek, startOfMonth, startOfYear, parseISO } from 'date-fns';
import type { SaleRecord, ForecastRecord, TimeAggregation } from '@/lib/types';

type ChartDataPoint = {
  date: string;
  sales: number;
  forecast?: number;
};

const aggregateData = (
  sales: SaleRecord[],
  forecast: ForecastRecord[],
  aggregation: TimeAggregation
): ChartDataPoint[] => {
    const combined: { [key: string]: { sales: number; forecast: number; } } = {};

    const getAggregationKey = (date: Date): string => {
        switch (aggregation) {
          case 'week':
            // The date is already a string 'yyyy-MM-dd', parseISO is needed
            return startOfWeek(date).toISOString().split('T')[0];
          case 'month':
            return startOfMonth(date).toISOString().slice(0, 7);
          case 'year':
              return startOfYear(date).toISOString().slice(0, 4);
        }
      };

    sales.forEach(d => {
        const key = getAggregationKey(parseISO(d.date));
        if (!combined[key]) combined[key] = { sales: 0, forecast: 0 };
        combined[key].sales += d.sales;
    });
    
    forecast.forEach(d => {
        const key = getAggregationKey(parseISO(d.date));
        if (!combined[key]) {
            combined[key] = { sales: 0, forecast: 0 };
        }
        combined[key].forecast += d.forecast;
    });
    
    return Object.keys(combined).map(key => ({
        date: key,
        sales: combined[key].sales,
        forecast: combined[key].forecast,
    })).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

type SalesChartProps = {
    salesData: SaleRecord[];
    forecastData: ForecastRecord[];
}

export function SalesChart({ salesData, forecastData }: SalesChartProps) {
  const [timeframe, setTimeframe] = useState<TimeAggregation>('week');

  const chartData = aggregateData(salesData, forecastData, timeframe);

  const chartConfig = {
    sales: {
      label: 'Sales',
      color: 'hsl(var(--chart-1))',
    },
    forecast: {
      label: 'Forecast',
      color: 'hsl(var(--chart-2))',
    },
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>Sales & Demand Forecast</CardTitle>
          <CardDescription>
            A comparative view of sales and demand forecast.
          </CardDescription>
        </div>
        <Select
          value={timeframe}
          onValueChange={(value) => setTimeframe(value as TimeAggregation)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = parseISO(value);
                if (timeframe === 'week') return `W${getWeek(date)}`;
                if (timeframe === 'month') return getMonth(date) + 1 + '/' + getYear(date);
                if (timeframe === 'year') return getYear(date).toString();
                return value;
              }}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
            <Bar
              dataKey="forecast"
              fill="var(--color-forecast)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
