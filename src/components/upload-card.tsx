
import React from "react";
import { Card, CardHeader } from "./ui/card";
import { useToast } from "../hooks/use-toast";

interface UploadCardProps {
  onDataSubmit?: () => void;
}

const UploadCard: React.FC<UploadCardProps> = ({ onDataSubmit }) => {
  // Helper to parse CSV and get last date
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    // Simple CSV parsing: assumes first row is header, one column is 'date' or similar
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return;
    const header = lines[0].split(',');
    // Find date column index
    const dateIdx = header.findIndex(h => h.toLowerCase().includes('date'));
    if (dateIdx === -1) return;
    // Get last row's date
    const lastRow = lines[lines.length - 1].split(',');
    const lastDateStr = lastRow[dateIdx];
    // Parse date and get next day
    const lastDate = new Date(lastDateStr);
    if (isNaN(lastDate.getTime())) return;
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + 1);
    // Trigger prediction (replace with your prediction logic)
    alert(`Start prediction for next date: ${nextDate.toISOString().slice(0,10)}`);
  };

  return (
    <Card className="relative">
      <CardHeader>
        <div>
          <h2 className="text-2xl font-bold mb-1">Data Input</h2>
          <p className="text-muted-foreground mb-4">Upload sales data and provide external factors.</p>
          <label className="font-semibold mb-2 block">Historical Sales Data (CSV)</label>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
            onClick={() => document.getElementById('csv-upload')?.click()}
          >
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <span className="text-muted-foreground">Drag and drop CSV or click to browse.</span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default UploadCard;
