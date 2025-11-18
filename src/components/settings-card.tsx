'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';

type SettingsCardProps = {
  products: Product[];
  onSaveSettings: () => void;
};

export function SettingsCard({ products, onSaveSettings }: SettingsCardProps) {
  const [model, setModel] = useState('prophet');
  const [selectedProduct, setSelectedProduct] = useState<string>(
    products[0]?.name || ''
  );
  const [learningRate, setLearningRate] = useState(0.01);
  const [epochs, setEpochs] = useState(100);

  const { toast } = useToast();

  const handleSaveSettings = () => {
    // Here you would typically trigger the model re-training and forecasting
    // For now, we'll call the onSaveSettings prop which simulates a data update
    onSaveSettings();

    toast({
      title: 'Settings Saved',
      description: 'Your new model settings have been applied. The forecast has been updated.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Settings</CardTitle>
        <CardDescription>
          Fine-tune the AI demand forecasting model.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="product">Product</Label>
            <Input
                id="product"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                placeholder="Enter product name"
              />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="model">Forecasting Model</Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger id="model">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prophet">Prophet</SelectItem>
                <SelectItem value="random_forest">Random Forest</SelectItem>
                <SelectItem value="lstm">LSTM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="learning-rate">Learning Rate</Label>
            <Input
              id="learning-rate"
              type="number"
              value={learningRate}
              onChange={(e) => setLearningRate(parseFloat(e.target.value))}
              step="0.001"
              min="0.001"
              max="1"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="epochs">Epochs</Label>
            <Input
              id="epochs"
              type="number"
              value={epochs}
              onChange={(e) => setEpochs(parseInt(e.target.value, 10))}
              min="1"
              step="1"
            />
          </div>
          <Button type="button" onClick={handleSaveSettings}>Save Settings</Button>
        </form>
      </CardContent>
    </Card>
  );
}
