import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './CharityDinnerDashboard.css';

const CharityDinnerDashboard = () => {
  // Event details directly from the data
  const eventDetails = {
    venue: "Co-Op Live Stadium",
    capacity: 25000,
    ticketPrice: "£25",
    predictedRevenue: "£625,000",
    duration: "4 Hours"
  };

  // Sales data directly from the table
  const salesData = [
    { category: "Snack", stock: 1000, sold: 1000, costPrice: 1, sellingPrice: 2, profit: 1000, percentProfit: "8.1%", color: "#3b82f6" },
    { category: "Drink", stock: 500, sold: 500, costPrice: 1, sellingPrice: 3.5, profit: 1000, percentProfit: "8.1%", color: "#10b981" },
    { category: "T-shirt", stock: 150, sold: 150, costPrice: 2, sellingPrice: 10, profit: 1250, percentProfit: "10.1%", color: "#f59e0b" },
    { category: "Toy", stock: 1000, sold: 1000, costPrice: 0.5, sellingPrice: 3, profit: 1200, percentProfit: "9.7%", color: "#ef4444" },
    { category: "Magazine", stock: 750, sold: 750, costPrice: 3.5, sellingPrice: 14, profit: 7875, percentProfit: "63.9%", color: "#8b5cf6" }
  ];

  // Fixed costs data directly from the table
  const fixedCostsData = [
    { category: "Venue Hire", cost: 5000, percentage: "7.7%", color: "#3b82f6" },
    { category: "Band Hire", cost: 50000, percentage: "76.9%", color: "#ef4444" },
    { category: "Helpers/Workers", cost: 10000, percentage: "15.4%", color: "#10b981" }
  ];

  // Summary statistics calculated from the data
  const totalProfit = 12325; // Sum of all profits: 1000+1000+1250+1200+7875
  const fixedCostsTotal = 65000; // Sum of all fixed costs: 5000+50000+10000
  const netProfit = totalProfit - fixedCostsTotal;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Charity Dinner Event Dashboard</h1>
        <p className="dashboard-subtitle">Financial Analysis and Performance Metrics</p>
      </div>

      {/* Event Details */}
      <div className="event-details">
        <h2 className="section-header">Event Details</h2>
        <div className="event-details-grid">
          <div className="event-detail-card">
            <p className="detail-label">Venue</p>
            <p className="detail-value">{eventDetails.venue}</p>
          </div>
          <div className="event-detail-card">
            <p className="detail-label">Capacity</p>
            <p className="detail-value">{eventDetails.capacity.toLocaleString()}</p>
          </div>
          <div className="event-detail-card">
            <p className="detail-label">Ticket Price</p>
            <p className="detail-value">{eventDetails.ticketPrice}</p>
          </div>
          <div className="event-detail-card">
            <p className="detail-label">Predicted Revenue</p>
            <p className="detail-value">{eventDetails.predictedRevenue}</p>
          </div>
          <div className="event-detail-card">
            <p className="detail-label">Duration</p>
            <p className="detail-value">{eventDetails.duration}</p>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="financial-summary">
        <h2 className="section-header">Financial Summary</h2>
        <div className="financial-summary-grid">
          <div className="financial-card financial-card-profit">
            <p className="financial-label">Total Sales Profit</p>
            <p className="financial-value financial-value-profit">£{totalProfit.toLocaleString()}</p>
          </div>
          <div className="financial-card financial-card-cost">
            <p className="financial-label">Total Fixed Costs</p>
            <p className="financial-value financial-value-cost">£{fixedCostsTotal.toLocaleString()}</p>
          </div>
          <div className={`financial-card ${netProfit >= 0 ? 'financial-card-profit' : 'financial-card-cost'}`}>
            <p className="financial-label">Net Profit</p>
            <p className={`financial-value ${netProfit >= 0 ? 'financial-value-profit' : 'financial-value-cost'}`}>
              £{netProfit.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section - Moved up for better visual flow */}
      <div className="visualizations">
        <h2 className="section-header">Performance Visualizations</h2>

        <div className="charts-grid">
          {/* Sales Profit Distribution Pie Chart */}
          <div className="chart-container">
            <h3 className="chart-title">Sales Profit Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent, value }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="profit"
                  nameKey="category"
                  paddingAngle={2}
                >
                  {salesData.map((entry) => (
                    <Cell key={`cell-${entry.category}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `£${value.toLocaleString()}`} />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Fixed Costs Distribution Pie Chart */}
          <div className="chart-container">
            <h3 className="chart-title">Fixed Costs Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fixedCostsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="cost"
                  nameKey="category"
                  paddingAngle={2}
                >
                  {fixedCostsData.map((entry) => (
                    <Cell key={`cell-${entry.category}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `£${value.toLocaleString()}`} />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Items Sold Bar Chart */}
        <div className="bar-chart-container chart-container">
          <h3 className="chart-title">Items Sold by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={salesData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" tick={{ fill: '#4b5563' }} />
              <YAxis tick={{ fill: '#4b5563' }} />
              <Tooltip
                formatter={(value, name) => [value.toLocaleString(), name === "sold" ? "Units Sold" : name]}
                contentStyle={{ backgroundColor: '#f9fafb', borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend />
              <Bar dataKey="sold" name="Units Sold" radius={[4, 4, 0, 0]}>
                {salesData.map((entry) => (
                  <Cell key={`cell-${entry.category}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Profit per Item Bar Chart */}
        <div className="bar-chart-container chart-container">
          <h3 className="chart-title">Price Comparison by Item (£)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={salesData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" tick={{ fill: '#4b5563' }} />
              <YAxis tick={{ fill: '#4b5563' }} />
              <Tooltip
                formatter={(value) => `£${value}`}
                contentStyle={{ backgroundColor: '#f9fafb', borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend />
              <Bar dataKey="sellingPrice" name="Selling Price (£)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="costPrice" name="Cost Price (£)" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sales Data Table */}
      <div className="table-container">
        <h2 className="section-header">Sales Data</h2>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr className="table-header">
                <th className="text-left">Menu</th>
                <th className="text-right">Cost Price (£)</th>
                <th className="text-right">Markup Percentage</th>
                <th className="text-right">Selling Price (£)</th>
                <th className="text-right">Profit per Unit (£)</th>
                <th className="text-right">Estimated Sales</th>
                <th className="text-right">Total Profit (£)</th>
                <th className="text-right">Stock Sold</th>
                <th className="text-right">Unsold Stock</th>
                <th className="text-right">Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row-even">
                <td className="table-cell">Snack</td>
                <td className="table-cell text-right">1</td>
                <td className="table-cell text-right">1</td>
                <td className="table-cell text-right">2</td>
                <td className="table-cell text-right">1</td>
                <td className="table-cell text-right">0.2</td>
                <td className="table-cell text-right">1000</td>
                <td className="table-cell text-right">1000</td>
                <td className="table-cell text-right">0</td>
                <td className="table-cell text-right">1000</td>
              </tr>
              <tr className="table-row-odd">
                <td className="table-cell">Drink</td>
                <td className="table-cell text-right">1</td>
                <td className="table-cell text-right">2.5</td>
                <td className="table-cell text-right">3.5</td>
                <td className="table-cell text-right">2.5</td>
                <td className="table-cell text-right">0.15</td>
                <td className="table-cell text-right">1000</td>
                <td className="table-cell text-right">500</td>
                <td className="table-cell text-right">0</td>
                <td className="table-cell text-right">500</td>
              </tr>
              <tr className="table-row-even">
                <td className="table-cell">T-shirt</td>
                <td className="table-cell text-right">2</td>
                <td className="table-cell text-right">4</td>
                <td className="table-cell text-right">10</td>
                <td className="table-cell text-right">8</td>
                <td className="table-cell text-right">0.1</td>
                <td className="table-cell text-right">1250</td>
                <td className="table-cell text-right">150</td>
                <td className="table-cell text-right">0</td>
                <td className="table-cell text-right">150</td>
              </tr>
              <tr className="table-row-odd">
                <td className="table-cell">Toy</td>
                <td className="table-cell text-right">0.5</td>
                <td className="table-cell text-right">5</td>
                <td className="table-cell text-right">3</td>
                <td className="table-cell text-right">2.5</td>
                <td className="table-cell text-right">0.1</td>
                <td className="table-cell text-right">1200</td>
                <td className="table-cell text-right">1000</td>
                <td className="table-cell text-right">0</td>
                <td className="table-cell text-right">1000</td>
              </tr>
              <tr className="table-row-even">
                <td className="table-cell">Magazine</td>
                <td className="table-cell text-right">3.5</td>
                <td className="table-cell text-right">3</td>
                <td className="table-cell text-right">14</td>
                <td className="table-cell text-right">10.5</td>
                <td className="table-cell text-right">0.35</td>
                <td className="table-cell text-right">7875</td>
                <td className="table-cell text-right">750</td>
                <td className="table-cell text-right">0</td>
                <td className="table-cell text-right">750</td>
              </tr>
              <tr className="table-row-total">
                <td className="table-cell">Total</td>
                <td className="table-cell"></td>
                <td className="table-cell"></td>
                <td className="table-cell"></td>
                <td className="table-cell"></td>
                <td className="table-cell"></td>
                <td className="table-cell text-right">£12,325</td>
                <td className="table-cell text-right">3,400</td>
                <td className="table-cell text-right">0</td>
                <td className="table-cell text-right">3,400</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Fixed Costs Table */}
      <div className="table-container">
        <h2 className="section-header">Fixed Costs</h2>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr className="table-header">
                <th className="text-left">List of Fixed Costs</th>
                <th className="text-right">Prices for Fixed Costs</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row-even">
                <td className="table-cell">Venue Hire</td>
                <td className="table-cell text-right">£5,000</td>
              </tr>
              <tr className="table-row-odd">
                <td className="table-cell">Band Hire</td>
                <td className="table-cell text-right">£50,000</td>
              </tr>
              <tr className="table-row-even">
                <td className="table-cell">Helpers/Workers</td>
                <td className="table-cell text-right">£10,000</td>
              </tr>
              <tr className="table-row-total">
                <td className="table-cell">Total</td>
                <td className="table-cell text-right">£65,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Findings Section */}
      <div className="key-findings">
        <h2 className="section-header">Key Findings</h2>
        <div className="findings-container">
          <ul className="findings-list">
            <li><span className="finding-label">Overall Financial Position:</span> The event currently shows a projected loss of £52,675 (Sales profit £12,325 - Fixed costs £65,000).</li>
            <li><span className="finding-label">Cost Structure:</span> Band hire (£50,000) represents 76.9% of all fixed costs.</li>
            <li><span className="finding-label">Profit Breakdown:</span> Magazines generate the highest profit at £7,875 (63.9% of total sales profit).</li>
            <li><span className="finding-label">Product Mix:</span> Consider focusing more on high-margin items like Magazines (£10.5 profit per unit) and T-shirts (£8 profit per unit).</li>
            <li><span className="finding-label">Ticket Revenue:</span> With 25,000 capacity at £25 per ticket, the predicted revenue of £625,000 should be sufficient to cover costs if attendance is high.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharityDinnerDashboard;
