'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertTriangle, TrendingUp, Archive } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

type AlertPriority = 'High' | 'Medium' | 'Low';
type Alert = {
  icon: React.ReactNode;
  title: string;
  product: string;
  description: string;
  time: string;
  read: boolean;
  priority: AlertPriority;
};

const alerts: Alert[] = [
  {
    icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
    title: 'Low Inventory',
    product: 'Organic Tea',
    description: 'Stock is running low. Consider reordering soon.',
    time: '5m ago',
    read: false,
    priority: 'High',
  },
  {
    icon: <TrendingUp className="h-4 w-4 text-green-500" />,
    title: 'High Demand',
    product: 'Sourdough Bread',
    description: 'High demand predicted for the next 7 days.',
    time: '30m ago',
    read: false,
    priority: 'Medium',
  },
  {
    icon: <Archive className="h-4 w-4 text-yellow-500" />,
    title: 'Stockout Risk',
    product: 'Running Shoes',
    description: 'Potential stockout in the next 14 days.',
    time: '1h ago',
    read: true,
    priority: 'High',
  },
];

const priorityVariant: Record<AlertPriority, 'destructive' | 'secondary' | 'outline'> = {
    'High': 'destructive',
    'Medium': 'secondary',
    'Low': 'outline'
}


export function AlertsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-Time Alerts</CardTitle>
        <CardDescription>
          Notifications about inventory and demand.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 p-3 rounded-lg ${
              !alert.read ? 'bg-muted/50' : ''
            }`}
          >
            <div className="flex-shrink-0 pt-1">{alert.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold">
                  {alert.title}: <span className="font-normal">{alert.product}</span>
                </p>
                <Badge variant={priorityVariant[alert.priority]}>{alert.priority} Priority</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {alert.description}
              </p>
            </div>
            <div className="text-xs text-muted-foreground pt-1">{alert.time}</div>
          </div>
        ))}
        <Button variant="outline" size="sm" className="w-full">
            View all notifications
        </Button>
      </CardContent>
    </Card>
  );
}
