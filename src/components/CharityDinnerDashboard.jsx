import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import FixedCostsChart from './FixedCostsChart';
import CategorySalesChart from './CategorySalesChart';
import RevenueStructureChart from './RevenueStructureChart';
import WaterfallChart from './WaterfallChart';
import './CharityDinnerDashboard.css';

const CharityDinnerDashboard = () => {
  // Event details directly from the Excel data
  const eventDetails = {
    venue: "Co-Op Live Stadium",
    capacity: 25000,
    ticketPrice: "£25",
    estimatedAttendees: 16000,
    entranceFeeRevenue: 400000,
    predictedRevenue: "£625,000",
    duration: "4 Hours"
  };

  // Sales data directly from the Excel table
  const salesData = [
    { category: "Snack", stock: 1000, sold: 200, unsold: 800, costPrice: 1, sellingPrice: 2, profit: 200, percentProfit: "8.9%", color: "#3b82f6" },
    { category: "Drink", stock: 700, sold: 140, unsold: 560, costPrice: 1, sellingPrice: 3.5, profit: 350, percentProfit: "15.5%", color: "#10b981" },
    { category: "T-shirt", stock: 180, sold: 18, unsold: 162, costPrice: 2, sellingPrice: 10, profit: 144, percentProfit: "6.4%", color: "#f59e0b" },
    { category: "Toy", stock: 1200, sold: 120, unsold: 1080, costPrice: 0.5, sellingPrice: 3, profit: 300, percentProfit: "13.3%", color: "#ef4444" },
    { category: "Magazine", stock: 300, sold: 120, unsold: 180, costPrice: 3.5, sellingPrice: 14, profit: 1260, percentProfit: "55.9%", color: "#8b5cf6" }
  ];

  // Fixed costs data directly from the Excel table
  const fixedCostsData = [
    { category: "Venue Hire", cost: 5000, percentage: "7.7%", color: "#3b82f6" },
    { category: "Band Hire", cost: 50000, percentage: "76.9%", color: "#ef4444" },
    { category: "Helpers/Workers", cost: 10000, percentage: "15.4%", color: "#10b981" }
  ];

  // Revenue breakdown data
  const revenueData = [
    { name: "Entrance Fees", value: 400000, color: "#1e40af" },
    { name: "Sales Profit", value: 2254, color: "#059669" }
  ];

  // Per attendee metrics
  const perAttendeeData = [
    { name: "Ticket Revenue", value: 25, color: "#3b82f6" },
    { name: "Sales Revenue", value: 0.14, color: "#10b981" }
  ];

  // Summary statistics calculated from the data
  const salesProfit = 2254; // Sum of all profits from Excel
  const fixedCostsTotal = 65000; // Sum of all fixed costs
  const entranceFeeRevenue = 400000; // From Excel
  const totalRevenue = salesProfit + entranceFeeRevenue;
  const netProfit = totalRevenue - fixedCostsTotal;

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
            <p className="detail-label">Est. Attendees</p>
            <p className="detail-value">{eventDetails.estimatedAttendees.toLocaleString()}</p>
          </div>
          <div className="event-detail-card">
            <p className="detail-label">Ticket Price</p>
            <p className="detail-value">{eventDetails.ticketPrice}</p>
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
            <p className="financial-label">Entrance Fee Revenue</p>
            <p className="financial-value financial-value-profit">£{entranceFeeRevenue.toLocaleString()}</p>
          </div>
          <div className="financial-card financial-card-profit">
            <p className="financial-label">Sales Profit</p>
            <p className="financial-value financial-value-profit">£{salesProfit.toLocaleString()}</p>
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

      {/* Charts Section */}
      <div className="visualizations">
        <h2 className="section-header">Performance Visualizations</h2>

        <div className="charts-grid">
          {/* Revenue Structure Chart */}
          <RevenueStructureChart revenueData={revenueData} totalRevenue={totalRevenue} />

          {/* Venue Capacity Utilization */}
          <div className="chart-container">
            <h3 className="chart-title">Venue Capacity Utilization</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Expected Attendees", value: eventDetails.estimatedAttendees, color: "#3b82f6" },
                    { name: "Unused Capacity", value: eventDetails.capacity - eventDetails.estimatedAttendees, color: "#94a3b8" }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  outerRadius={100}
                  innerRadius={0}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  paddingAngle={0}
                >
                  {[
                    { name: "Expected Attendees", value: eventDetails.estimatedAttendees, color: "#3b82f6" },
                    { name: "Unused Capacity", value: eventDetails.capacity - eventDetails.estimatedAttendees, color: "#94a3b8" }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value.toLocaleString()} people`} />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fixed Costs Chart */}
        <FixedCostsChart fixedCostsData={fixedCostsData} />
        
        {/* Category Sales Chart */}
        <CategorySalesChart salesData={salesData} />
        
        {/* Stock Utilization Chart */}
        <div className="bar-chart-container chart-container">
          <h3 className="chart-title">Stock Utilization by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={salesData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
              stackOffset="expand"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" tick={{ fill: '#4b5563' }} />
              <YAxis tick={{ fill: '#4b5563' }} />
              <Tooltip
                formatter={(value, name) => [value.toLocaleString(), name === "sold" ? "Units Sold" : "Unsold Units"]}
                contentStyle={{ backgroundColor: '#f9fafb', borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend />
              <Bar dataKey="sold" name="Units Sold" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="unsold" name="Unsold Units" stackId="a" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Waterfall Chart */}
        <WaterfallChart 
          entranceFeeRevenue={entranceFeeRevenue} 
          salesProfit={salesProfit} 
          fixedCostsTotal={fixedCostsTotal} 
          netProfit={netProfit} 
        />
      </div>

      {/* Sales Data Table */}
      <div className="table-container">
        <h2 className="section-header">Sales Data</h2>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr className="table-header">
                <th className="text-left">Menu</th>
                <th className="text-right">Units Purchased</th>
                <th className="text-right">Cost Price (£)</th>
                <th className="text-right">Markup Percentage</th>
                <th className="text-right">Selling Price (£)</th>
                <th className="text-right">Profit per Unit (£)</th>
                <th className="text-right">Estimated Sales</th>
                <th className="text-right">Units Sold</th>
                <th className="text-right">Total Profit (£)</th>
                <th className="text-right">Unsold Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row-even">
                <td className="table-cell">Snack</td>
                <td className="table-cell text-right">1,000</td>
                <td className="table-cell text-right">1.00</td>
                <td className="table-cell text-right">100%</td>
                <td className="table-cell text-right">2.00</td>
                <td className="table-cell text-right">1.00</td>
                <td className="table-cell text-right">20%</td>
                <td className="table-cell text-right">200</td>
                <td className="table-cell text-right">200</td>
                <td className="table-cell text-right">800</td>
              </tr>
              <tr className="table-row-odd">
                <td className="table-cell">Drink</td>
                <td className="table-cell text-right">700</td>
                <td className="table-cell text-right">1.00</td>
                <td className="table-cell text-right">250%</td>
                <td className="table-cell text-right">3.50</td>
                <td className="table-cell text-right">2.50</td>
                <td className="table-cell text-right">20%</td>
                <td className="table-cell text-right">140</td>
                <td className="table-cell text-right">350</td>
                <td className="table-cell text-right">560</td>
              </tr>
              <tr className="table-row-even">
                <td className="table-cell">T-shirt</td>
                <td className="table-cell text-right">180</td>
                <td className="table-cell text-right">2.00</td>
                <td className="table-cell text-right">400%</td>
                <td className="table-cell text-right">10.00</td>
                <td className="table-cell text-right">8.00</td>
                <td className="table-cell text-right">10%</td>
                <td className="table-cell text-right">18</td>
                <td className="table-cell text-right">144</td>
                <td className="table-cell text-right">162</td>
              </tr>
              <tr className="table-row-odd">
                <td className="table-cell">Toy</td>
                <td className="table-cell text-right">1,200</td>
                <td className="table-cell text-right">0.50</td>
                <td className="table-cell text-right">500%</td>
                <td className="table-cell text-right">3.00</td>
                <td className="table-cell text-right">2.50</td>
                <td className="table-cell text-right">10%</td>
                <td className="table-cell text-right">120</td>
                <td className="table-cell text-right">300</td>
                <td className="table-cell text-right">1,080</td>
              </tr>
              <tr className="table-row-even">
                <td className="table-cell">Magazine</td>
                <td className="table-cell text-right">300</td>
                <td className="table-cell text-right">3.50</td>
                <td className="table-cell text-right">300%</td>
                <td className="table-cell text-right">14.00</td>
                <td className="table-cell text-right">10.50</td>
                <td className="table-cell text-right">40%</td>
                <td className="table-cell text-right">120</td>
                <td className="table-cell text-right">1,260</td>
                <td className="table-cell text-right">180</td>
              </tr>
              <tr className="table-row-total">
                <td className="table-cell">Total</td>
                <td className="table-cell text-right">3,380</td>
                <td className="table-cell"></td>
                <td className="table-cell"></td>
                <td className="table-cell"></td>
                <td className="table-cell"></td>
                <td className="table-cell"></td>
                <td className="table-cell text-right">598</td>
                <td className="table-cell text-right">£2,254</td>
                <td className="table-cell text-right">2,782</td>
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
            <li><span className="finding-label">Overall Financial Position:</span> The event shows a projected profit of £337,254 (Entrance fees £400,000 + Sales profit £2,254 - Fixed costs £65,000).</li>
            <li><span className="finding-label">Revenue Structure:</span> Entrance fees (£400,000) represent 99.4% of total revenue, with sales profit (£2,254) contributing only 0.6%.</li>
            <li><span className="finding-label">Attendance:</span> Expected attendance of 16,000 represents 64% of venue capacity (25,000).</li>
            <li><span className="finding-label">Stock Utilization:</span> Only 17.7% of purchased stock is expected to be sold (598 out of 3,380 units).</li>
            <li><span className="finding-label">Product Performance:</span> Magazines generate the highest profit at £1,260 (55.9% of total sales profit) despite representing only 8.9% of purchased stock.</li>
            <li><span className="finding-label">Cost Structure:</span> Band hire (£50,000) represents 76.9% of all fixed costs but is well covered by entrance fee revenue.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharityDinnerDashboard;
