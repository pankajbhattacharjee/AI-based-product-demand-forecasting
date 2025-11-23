import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { useToast } from '../hooks/use-toast';

type Product = {
  name: string;
  // Add other fields as necessary
};

import { Textarea } from './ui/textarea';

// Added forecastPeriod and externalFactors parameters in onSaveSettings
type SettingsCardProps = {
  products: Product[];
  onSaveSettings: (forecastPeriod: number, externalFactors: string) => void;
};

export function SettingsCard({ products, onSaveSettings }: SettingsCardProps) {
  const [model, setModel] = useState('prophet');
  const [selectedProduct, setSelectedProduct] = useState<string>(
    products[0]?.name || ''
  );
  const [learningRate, setLearningRate] = useState(0.01);
  const [epochs, setEpochs] = useState(100);
  const [forecastPeriod, setForecastPeriod] = useState(30);
  const [externalFactors, setExternalFactors] = useState('');

  const { toast } = useToast();

  const handleSaveSettings = () => {
    // Propagate the new forecastPeriod and externalFactors on save
    onSaveSettings(forecastPeriod, externalFactors);

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
            <Label htmlFor="forecast-period">Forecast Period</Label>
            <Select
              value={forecastPeriod.toString()}
              onValueChange={(value) => setForecastPeriod(parseInt(value, 10))}
            >
              <SelectTrigger id="forecast-period">
                <SelectValue placeholder="Select forecast period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 Days</SelectItem>
                <SelectItem value="90">90 Days</SelectItem>
                <SelectItem value="365">365 Days</SelectItem>
              </SelectContent>
            </Select>
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
          <div className="grid gap-2">
            <Label htmlFor="external-factors">External Factors (e.g. Holidays, Promotions)</Label>
            <Textarea
              id="external-factors"
              value={externalFactors}
              onChange={(e) => setExternalFactors(e.target.value)}
              placeholder="e.g.&#10;Winter season +35% demand&#10;Diwali festival +25% demand"
              rows={4}
            />
          </div>
          <Button type="button" onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
