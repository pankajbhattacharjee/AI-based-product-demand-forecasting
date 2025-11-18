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
import type { SalesByCategory } from '@/lib/types';
import { PieChart, Pie, Cell } from 'recharts';

const chartColors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
]

type ChartCardProps = {
    data: SalesByCategory[];
}

export function ChartCard({ data }: ChartCardProps) {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: chartColors[index % chartColors.length]
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
        <CardDescription>
          A breakdown of sales across different product categories.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[200px] w-full">
            {chartData.length > 0 ? (
                <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                </PieChart>
            ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                    No sales data to display.
                </div>
            )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
