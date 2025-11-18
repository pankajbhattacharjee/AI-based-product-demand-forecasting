'use client';

import React, { useState, useMemo } from 'react';
import { StatCard } from '@/components/stat-card';
import { SalesChart } from '@/components/sales-chart';
import { SettingsCard } from '@/components/settings-card';
import { UploadCard } from '@/components/upload-card';
import {
  TrendingUp,
  Package,
  ShoppingCart,
  Lightbulb,
} from 'lucide-react';
import { ChartCard } from './chart-card';
import { ForecastTableCard } from './forecast-table-card';
import { ProductManagementCard } from './product-management-card';
import { AlertsCard } from './alerts-card';
import type { SaleRecord, ForecastRecord, Product, SalesByCategory } from '@/lib/types';
import { generateMockData } from '@/lib/mock-data';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Matcha Green Tea',
    category: 'Groceries',
    price: 29.99,
    sku: 'SKU-GMT-001',
    inventory: 150,
  },
  {
    id: '2',
    name: 'Hand-woven Wool Rug',
    category: 'Home Goods',
    price: 199.99,
    sku: 'SKU-WWR-001',
    inventory: 30,
  },
  {
    id: '3',
    name: 'Artisanal Sourdough Bread',
    category: 'Bakery',
    price: 8.5,
    sku: 'SKU-ASB-001',
    inventory: 50,
  },
  {
    id: '4',
    name: 'Running Shoes',
    category: 'Apparel',
    price: 120.0,
    sku: 'SKU-RS-001',
    inventory: 200,
  },
];

const initialSalesData: SaleRecord[] = [
  { date: '2024-01-15', sales: 120, productId: '4' },
  { date: '2024-01-22', sales: 180, productId: '1' },
  { date: '2024-02-05', sales: 250, productId: '2' },
  { date: '2024-02-19', sales: 210, productId: '3' },
  { date: '2024-03-04', sales: 300, productId: '1' },
  { date: '2024-03-18', sales: 280, productId: '4' },
  { date: '2024-04-01', sales: 350, productId: '3' },
  { date: '2024-04-15', sales: 320, productId: '2' },
  { date: '2024-04-29', sales: 380, productId: '1' },
  { date: '2024-05-13', sales: 400, productId: '4' },
  { date: '2024-05-27', sales: 390, productId: '1' },
];

const initialForecastData: ForecastRecord[] = [
    { date: '2024-06-03', forecast: 420 },
    { date: '2024-06-10', forecast: 430 },
    { date: '2024-06-17', forecast: 425 },
    { date: '2024-06-24', forecast: 440 },
    { date: '2024-07-01', forecast: 450 },
    { date: '2024-07-08', forecast: 460 },
  ];

export function Dashboard() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [salesData, setSalesData] = useState<SaleRecord[]>(initialSalesData);
  const [forecastData, setForecastData] = useState<ForecastRecord[]>(initialForecastData);

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      {
        ...newProduct,
        id: (prevProducts.length + 1).toString(),
      },
    ]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
  };

  const handleDataSubmit = () => {
    // In a real app, you'd parse the uploaded CSV here and re-train the model.
    // For now, we'll just generate new mock data to simulate an update.
    const { sales, forecast } = generateMockData(products);
    setSalesData(sales);
    setForecastData(forecast);
  };

  const dashboardStats = useMemo(() => {
    const totalSalesValue = salesData.reduce((acc, sale) => {
      const product = products.find(p => p.id === sale.productId);
      return acc + (product ? product.price * sale.sales : 0);
    }, 0);
    
    const totalUnitsSold = salesData.reduce((acc, sale) => acc + sale.sales, 0);
    
    const totalInventory = products.reduce((acc, product) => acc + product.inventory, 0);

    const salesByCategory = products.reduce((acc, product) => {
        const productSales = salesData
            .filter(sale => sale.productId === product.id)
            .reduce((sum, sale) => sum + sale.sales * product.price, 0);

        if (!acc[product.category]) {
            acc[product.category] = { name: product.category, value: 0 };
        }
        acc[product.category].value += productSales;

        return acc;
    }, {} as { [key: string]: SalesByCategory });

    return {
        totalSalesValue,
        totalUnitsSold,
        totalInventory,
        salesByCategory: Object.values(salesByCategory),
    }
  }, [salesData, products]);


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Total Sales"
                value={`$${dashboardStats.totalSalesValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                change="+12.5%"
                Icon={TrendingUp}
                changeColor="text-green-500"
              />
              <StatCard
                title="Units Sold"
                value={dashboardStats.totalUnitsSold.toLocaleString('en-US')}
                change="+5.2%"
                Icon={ShoppingCart}
                changeColor="text-green-500"
              />
              <StatCard
                title="Inventory"
                value={dashboardStats.totalInventory.toLocaleString('en-US')}
                change="-2.8%"
                Icon={Package}
                changeColor="text-red-500"
              />
              <StatCard
                title="New Optimizations"
                value="3"
                change=""
                Icon={Lightbulb}
              />
            </div>
            <SalesChart salesData={salesData} forecastData={forecastData} />
            <ForecastTableCard forecastData={forecastData} />
            <ProductManagementCard 
              products={products} 
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          </div>
  
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
            <UploadCard onDataSubmit={handleDataSubmit} />
            <SettingsCard products={products} onSaveSettings={handleDataSubmit}/>
            <AlertsCard />
            <ChartCard data={dashboardStats.salesByCategory} />
          </div>
        </main>
      </div>
    </div>
  );
}
