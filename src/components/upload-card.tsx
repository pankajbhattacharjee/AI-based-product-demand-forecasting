'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileUp } from 'lucide-react';
import { useRef, useState, ChangeEvent, DragEvent } from 'react';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';

type UploadCardProps = {
    onDataSubmit: () => void;
}

export function UploadCard({ onDataSubmit }: UploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file.name);
      setFileName(file.name);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      console.log('Dropped file:', file.name);
      setFileName(file.name);
    }
  };
  
  const handleSubmit = () => {
    if (!fileName) {
        toast({
            variant: "destructive",
            title: "No file selected",
            description: "Please upload a sales data file.",
        });
        return;
    }
    
    onDataSubmit();

    toast({
        title: "Data Submitted",
        description: `${fileName} has been submitted for processing. The dashboard will update with new data.`,
    });
  }

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>Data Input</CardTitle>
        <CardDescription>
          Upload sales data and provide external factors.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="sales-data" className="mb-2 block">
              Historical Sales Data (CSV)
            </Label>
            <div
              id="sales-data"
              className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-8 text-center text-sm text-muted-foreground"
              onClick={handleFileClick}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {fileName ? (
                <span>{fileName}</span>
              ) : (
                <span>Drag and drop CSV or click to browse.</span>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".csv"
            />
          </div>
          <div>
            <Label htmlFor="external-factors">
              External Factors (Holidays, Promotions)
            </Label>
            <Textarea
              id="external-factors"
              placeholder="e.g.&#10;Winter season +35% demand&#10;Diwali festival +25% demand"
              className="mt-2"
            />
          </div>
          <Button onClick={handleSubmit}>Submit Data</Button>
        </div>
      </CardContent>
    </Card>
  );
}
