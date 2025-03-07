import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';

const WaterfallChart = ({ entranceFeeRevenue, salesProfit, fixedCostsTotal, netProfit }) => {
  const data = [
    { name: 'Entrance Fees', value: entranceFeeRevenue, color: '#4CAF50' },
    { name: 'Sales Revenue', value: salesProfit, color: '#2196F3' },
    { name: 'Fixed Costs', value: -fixedCostsTotal, color: '#F44336' },
    { name: 'Net Profit', value: netProfit, isTotal: true, color: '#673AB7' }
  ];

  return (
    <div className="chart-container">
      <h3 className="chart-title">Revenue & Profit Summary</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `£${Math.abs(value / 1000)}k`} />
          <Tooltip formatter={(value) => `£${value.toLocaleString()}`} />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="value"
            radius={[4, 4, 0, 0]}
            fillOpacity={0.8} 
            fill={(entry) => entry.color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WaterfallChart;
