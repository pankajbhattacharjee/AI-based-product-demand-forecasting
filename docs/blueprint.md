# **App Name**: DemandWise

## Core Features:

- Data Import and Processing: Allows users to upload sales data (CSV) and processes it using Pandas to prepare for model training.
- Demand Forecast Generation: Uses either a Random Forest, Prophet, or LSTM model to forecast future product demand based on historical data. Includes tool for selection of algorithm.
- Visualization of Sales Trends: Generates a graph showing historical sales trends, helping users visualize past performance. Users can chose how the X axis is labeled (by week, month, year).
- Forecast Visualization: Presents the demand forecast in a graph, clearly showing predicted sales for the next 30/60 days, etc. Displaying upper and lower bound prediction intervals
- Inventory Optimization Suggestions: Analyzes demand forecasts to provide AI-driven suggestions for optimal stock levels and reorder points.
- Multi-Product Forecasting: Enables users to select a specific product from a dropdown menu and view the demand forecast for that product. The selection gets saved to the user settings.
- Low Stock Alerts: Configure push notifications via email for alerts that products are likely to fall to low stock based on demand predictions

## Style Guidelines:

- Primary color: Deep blue (#3F51B5), conveying trust and intelligence for data-driven decisions.
- Background color: Light blue-gray (#ECEFF1), provides a neutral backdrop that doesn't distract from the data.
- Accent color: Vibrant purple (#9C27B0), highlighting important forecast alerts and call-to-action buttons.
- Body and headline font: 'Inter', a sans-serif for a modern, machined feel, suited for displaying data and insights clearly.
- Use simple, geometric icons to represent data points, trends, and forecast alerts.
- Use a clean, dashboard-style layout, placing key forecast metrics and graphs at the top for easy access.
- Subtle animations when updating forecasts and displaying new alerts.