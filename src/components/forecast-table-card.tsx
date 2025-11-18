'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, ArrowUp, ArrowDown } from 'lucide-react';
import type { ForecastRecord } from '@/lib/types';
import { cn } from '@/lib/utils';

type ForecastTableCardProps = {
    forecastData: ForecastRecord[];
}

export function ForecastTableCard({ forecastData }: ForecastTableCardProps) {
  const handleDownload = () => {
    const headers = ['date', 'forecast'];
    const csvRows = [
      headers.join(','),
      ...forecastData.map(row => `${row.date},${row.forecast}`)
    ];
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'forecast.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const totalForecastedVolume = forecastData.reduce((sum, item) => sum + item.forecast, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Predicted Sales</CardTitle>
          <CardDescription>
            The next 30 days of forecasted sales data.
          </CardDescription>
        </div>
        <Button size="sm" className="ml-auto gap-1" onClick={handleDownload}>
          <Download className="h-4 w-4" />
          Download CSV
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Forecasted Sales</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forecastData.map((item, index) => {
              const prevForecast = index > 0 ? forecastData[index - 1].forecast : null;
              const trend = prevForecast ? item.forecast - prevForecast : null;
              const TrendIcon = trend ? (trend > 0 ? ArrowUp : ArrowDown) : null;
              const trendColor = trend ? (trend > 0 ? 'text-green-500' : 'text-red-500') : '';

              return (
                <TableRow key={index}>
                  <TableCell>
                    <div className="font-medium">{item.date}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span>{item.forecast}</span>
                      {TrendIcon && <TrendIcon className={cn('h-4 w-4', trendColor)} />}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className='pt-4'>
        <div className="text-sm text-muted-foreground">
            Total next 30-day predicted sales: <span className="font-bold">{totalForecastedVolume.toLocaleString()} units</span>
        </div>
      </CardFooter>
    </Card>
  );
}
