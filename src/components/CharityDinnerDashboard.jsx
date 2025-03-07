import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import FixedCostsChart from './FixedCostsChart';
import CategorySalesChart from './CategorySalesChart';
import RevenueStructureChart from './RevenueStructureChart';
import WaterfallChart from './WaterfallChart';
import './CharityDinnerDashboard.css';

const CharityDinnerDashboard = () => {
  // Event details
  const eventDetails = {
    venue: "Co-Op Live Stadium",
    capacity: 25000,
    ticketPrice: 25,
    estimatedAttendees: 16000,
    duration: "4 Hours"
  };

  // Source data from the sales table
  const salesTableData = [
    { menu: "Snack", unitsPurchased: 1000, costPrice: 1.00, markupPercentage: 100, sellingPrice: 2.00, estimatedSalesPercentage: 20, color: "#3b82f6" },
    { menu: "Drink", unitsPurchased: 700, costPrice: 1.00, markupPercentage: 250, sellingPrice: 3.50, estimatedSalesPercentage: 20, color: "#10b981" },
    { menu: "T-shirt", unitsPurchased: 180, costPrice: 2.00, markupPercentage: 400, sellingPrice: 10.00, estimatedSalesPercentage: 10, color: "#f59e0b" },
    { menu: "Toy", unitsPurchased: 1200, costPrice: 0.50, markupPercentage: 500, sellingPrice: 3.00, estimatedSalesPercentage: 10, color: "#ef4444" },
    { menu: "Magazine", unitsPurchased: 300, costPrice: 3.50, markupPercentage: 300, sellingPrice: 14.00, estimatedSalesPercentage: 40, color: "#8b5cf6" }
  ];

  // Source data for fixed costs
  const fixedCostsTableData = [
    { category: "Venue Hire", cost: 5000, color: "#3b82f6" },
    { category: "Band Hire", cost: 50000, color: "#ef4444" },
    { category: "Helpers/Workers", cost: 10000, color: "#10b981" }
  ];

  // Calculate all derived values from the source data
  const {
    processedSalesData,
    salesProfit,
    fixedCostsData,
    fixedCostsTotal,
    entranceFeeRevenue,
    totalRevenue,
    netProfit,
    revenueData,
    perAttendeeData
  } = useMemo(() => {
    // Process sales data
    const processed = salesTableData.map(item => {
      const unitsSold = Math.round(item.unitsPurchased * (item.estimatedSalesPercentage / 100));
      const profitPerUnit = item.sellingPrice - item.costPrice;
      const totalProfit = Math.round(unitsSold * profitPerUnit);
      const unsoldStock = item.unitsPurchased - unitsSold;
      
      return {
        category: item.menu,
        stock: item.unitsPurchased,
        sold: unitsSold,
        unsold: unsoldStock,
        costPrice: item.costPrice,
        sellingPrice: item.sellingPrice,
        profitPerUnit: profitPerUnit,
        profit: totalProfit,
        color: item.color
      };
    });

    // Calculate total sales profit
    const totalSalesProfit = processed.reduce((sum, item) => sum + item.profit, 0);
    
    // Calculate percentages for each item
    const processedWithPercentages = processed.map(item => ({
      ...item,
      percentProfit: `${((item.profit / totalSalesProfit) * 100).toFixed(1)}%`
    }));

    // Process fixed costs
    const totalFixedCosts = fixedCostsTableData.reduce((sum, item) => sum + item.cost, 0);
    const processedFixedCosts = fixedCostsTableData.map(item => ({
      ...item,
      percentage: `${((item.cost / totalFixedCosts) * 100).toFixed(1)}%`
    }));

    // Calculate entrance fee revenue
    const entranceFee = eventDetails.estimatedAttendees * eventDetails.ticketPrice;
    
    // Calculate total revenue
    const totalRev = entranceFee + totalSalesProfit;
    
    // Calculate net profit
    const netProf = totalRev - totalFixedCosts;

    // Revenue breakdown data
    const revData = [
      { name: "Entrance Fees", value: entranceFee, color: "#1e40af" },
      { name: "Sales Profit", value: totalSalesProfit, color: "#059669" }
    ];

    // Per attendee metrics
    const perAttendee = [
      { name: "Ticket Revenue", value: eventDetails.ticketPrice, color: "#3b82f6" },
      { name: "Sales Revenue", value: +(totalSalesProfit / eventDetails.estimatedAttendees).toFixed(2), color: "#10b981" }
    ];

    return {
      processedSalesData: processedWithPercentages,
      salesProfit: totalSalesProfit,
      fixedCostsData: processedFixedCosts,
      fixedCostsTotal: totalFixedCosts,
      entranceFeeRevenue: entranceFee,
      totalRevenue: totalRev,
      netProfit: netProf,
      revenueData: revData,
      perAttendeeData: perAttendee
    };
  }, [salesTableData, fixedCostsTableData, eventDetails]);

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
            <p className="detail-value">£{eventDetails.ticketPrice}</p>
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
        <CategorySalesChart salesData={processedSalesData} />
        
        {/* Stock Utilization Chart */}
        <div className="bar-chart-container chart-container">
          <h3 className="chart-title">Stock Utilization by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={processedSalesData}
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
              {salesTableData.map((item, index) => {
                const isEven = index % 2 === 0;
                const unitsSold = Math.round(item.unitsPurchased * (item.estimatedSalesPercentage / 100));
                const profitPerUnit = item.sellingPrice - item.costPrice;
                const totalProfit = Math.round(unitsSold * profitPerUnit);
                const unsoldStock = item.unitsPurchased - unitsSold;
                
                return (
                  <tr key={item.menu} className={isEven ? "table-row-even" : "table-row-odd"}>
                    <td className="table-cell">{item.menu}</td>
                    <td className="table-cell text-right">{item.unitsPurchased.toLocaleString()}</td>
                    <td className="table-cell text-right">{item.costPrice.toFixed(2)}</td>
                    <td className="table-cell text-right">{item.markupPercentage}%</td>
                    <td className="table-cell text-right">{item.sellingPrice.toFixed(2)}</td>
                    <td className="table-cell text-right">{profitPerUnit.toFixed(2)}</td>
                    <td className="table-cell text-right">{item.estimatedSalesPercentage}%</td>
                    <td className="table-cell text-right">{unitsSold}</td>
                    <td className="table-cell text-right">{totalProfit}</td>
                    <td className="table-cell text-right">{unsoldStock}</td>
                  </tr>
                );
              })}
              <tr className="table-row-total">
                <td className="table-cell">Total</td>
                <td className="table-cell text-right">{salesTableData.reduce((sum, item) => sum + item.unitsPurchased, 0).toLocaleString()}</td>
                <td className="table-cell"></td>
                <td className="table-cell"></td>
                <td className="table-cell"></td>
                <td className="table-cell"></td>
                <td className="table-cell"></td>
                <td className="table-cell text-right">{processedSalesData.reduce((sum, item) => sum + item.sold, 0)}</td>
                <td className="table-cell text-right">£{salesProfit.toLocaleString()}</td>
                <td className="table-cell text-right">{processedSalesData.reduce((sum, item) => sum + item.unsold, 0)}</td>
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
              {fixedCostsTableData.map((item, index) => (
                <tr key={item.category} className={index % 2 === 0 ? "table-row-even" : "table-row-odd"}>
                  <td className="table-cell">{item.category}</td>
                  <td className="table-cell text-right">£{item.cost.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="table-row-total">
                <td className="table-cell">Total</td>
                <td className="table-cell text-right">£{fixedCostsTotal.toLocaleString()}</td>
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
            <li><span className="finding-label">Overall Financial Position:</span> The event shows a projected profit of £{netProfit.toLocaleString()} (Entrance fees £{entranceFeeRevenue.toLocaleString()} + Sales profit £{salesProfit.toLocaleString()} - Fixed costs £{fixedCostsTotal.toLocaleString()}).</li>
            <li><span className="finding-label">Revenue Structure:</span> Entrance fees (£{entranceFeeRevenue.toLocaleString()}) represent {((entranceFeeRevenue / totalRevenue) * 100).toFixed(1)}% of total revenue, with sales profit (£{salesProfit.toLocaleString()}) contributing only {((salesProfit / totalRevenue) * 100).toFixed(1)}%.</li>
            <li><span className="finding-label">Attendance:</span> Expected attendance of {eventDetails.estimatedAttendees.toLocaleString()} represents {((eventDetails.estimatedAttendees / eventDetails.capacity) * 100).toFixed(0)}% of venue capacity ({eventDetails.capacity.toLocaleString()}).</li>
            <li><span className="finding-label">Stock Utilization:</span> Only {((processedSalesData.reduce((sum, item) => sum + item.sold, 0) / salesTableData.reduce((sum, item) => sum + item.unitsPurchased, 0)) * 100).toFixed(1)}% of purchased stock is expected to be sold ({processedSalesData.reduce((sum, item) => sum + item.sold, 0)} out of {salesTableData.reduce((sum, item) => sum + item.unitsPurchased, 0).toLocaleString()} units).</li>
            {(() => {
              const highestProfitItem = [...processedSalesData].sort((a, b) => b.profit - a.profit)[0];
              const stockPercentage = ((highestProfitItem.stock / salesTableData.reduce((sum, item) => sum + item.unitsPurchased, 0)) * 100).toFixed(1);
              return (
                <li><span className="finding-label">Product Performance:</span> {highestProfitItem.category}s generate the highest profit at £{highestProfitItem.profit.toLocaleString()} ({highestProfitItem.percentProfit} of total sales profit) despite representing only {stockPercentage}% of purchased stock.</li>
              );
            })()}
            {(() => {
              const highestCostItem = [...fixedCostsData].sort((a, b) => b.cost - a.cost)[0];
              return (
                <li><span className="finding-label">Cost Structure:</span> {highestCostItem.category} (£{highestCostItem.cost.toLocaleString()}) represents {highestCostItem.percentage} of all fixed costs but is well covered by entrance fee revenue.</li>
              );
            })()}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharityDinnerDashboard;
