import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CategorySalesChart = ({ salesData }) => {
  // Sort by profit
  const sortedData = [...salesData].sort((a, b) => b.profit - a.profit);

  // Format data for the chart
  const chartData = sortedData.map(item => ({
    name: item.category,
    profit: item.profit,
    salesRate: (item.sold / item.stock) * 100,
    color: item.color
  }));

  return (
    <div className="chart-container">
      <h3 className="chart-title">Category Sales Performance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 70, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tickFormatter={(value) => `£${value}`} />
          <YAxis dataKey="name" type="category" />
          <Tooltip 
            formatter={(value, name) => [
              name === 'profit' ? `£${value}` : `${value.toFixed(0)}%`, 
              name === 'profit' ? 'Total Profit' : 'Sales Rate'
            ]} 
          />
          <Legend />
          <Bar dataKey="profit" name="Total Profit" fill="#8884d8" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategorySalesChart;
