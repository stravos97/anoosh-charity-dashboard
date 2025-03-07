import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const RevenueStructureChart = ({ revenueData, totalRevenue }) => {
  const data = [
    { name: 'Entrance Fees', value: 400000, percentage: '99.4%', color: '#3F51B5' },
    { name: 'Sales Profit', value: 2254, percentage: '0.6%', color: '#4CAF50' }
  ];

  const COLORS = ['#3F51B5', '#4CAF50'];

  return (
    <div className="chart-container">
      <h3 className="chart-title">Revenue Structure</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ name, percentage }) => `${name}: ${percentage}`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `£${value.toLocaleString()}`} />
        </PieChart>
      </ResponsiveContainer>
      <div className="chart-subtitle text-center">
        <div className="font-bold">Total Revenue: £402,254</div>
      </div>
    </div>
  );
};

export default RevenueStructureChart;
