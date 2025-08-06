import React, { useState, useMemo } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Edit3, Save, X, Calendar, Filter, Plus, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('overview');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingMonthly, setIsEditingMonthly] = useState(false);
  
  // Filter states
  const [dateFilter, setDateFilter] = useState('1year'); // 1month, 3months, 1year, custom
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });
  const [showFilters, setShowFilters] = useState(false);

  // Enhanced data structure with historical data
  const [properties, setProperties] = useState({
    'daily-thanthi': {
      name: 'Daily Thanthi',
      logo: 'https://i.imgur.com/placeholder.png', // You can replace this with the actual logo URL
      logoType: 'image',
      color: 'from-red-600 to-red-800',
      demand: 15000000,
      collection: 12500000,
      expense: 8000000,
      growth: 8.5,
      monthlyData: [
        // 2024 Data
        { month: 'Jan', year: 2024, demand: 13500000, collection: 11000000, expense: 7200000 },
        { month: 'Feb', year: 2024, demand: 13700000, collection: 11200000, expense: 7300000 },
        { month: 'Mar', year: 2024, demand: 13900000, collection: 11400000, expense: 7400000 },
        { month: 'Apr', year: 2024, demand: 14100000, collection: 11600000, expense: 7500000 },
        { month: 'May', year: 2024, demand: 14300000, collection: 11800000, expense: 7600000 },
        { month: 'Jun', year: 2024, demand: 14400000, collection: 11900000, expense: 7650000 },
        { month: 'Jul', year: 2024, demand: 14500000, collection: 12000000, expense: 7700000 },
        { month: 'Aug', year: 2024, demand: 14600000, collection: 12100000, expense: 7750000 },
        { month: 'Sep', year: 2024, demand: 14700000, collection: 12200000, expense: 7800000 },
        { month: 'Oct', year: 2024, demand: 14800000, collection: 12300000, expense: 7850000 },
        { month: 'Nov', year: 2024, demand: 14900000, collection: 12400000, expense: 7900000 },
        { month: 'Dec', year: 2024, demand: 15000000, collection: 12500000, expense: 7950000 },
        // 2025 Data
        { month: 'Jan', year: 2025, demand: 15100000, collection: 12600000, expense: 8000000 },
        { month: 'Feb', year: 2025, demand: 15200000, collection: 12700000, expense: 8050000 },
        { month: 'Mar', year: 2025, demand: 15300000, collection: 12800000, expense: 8100000 },
        { month: 'Apr', year: 2025, demand: 15400000, collection: 12900000, expense: 8150000 },
        { month: 'May', year: 2025, demand: 15500000, collection: 13000000, expense: 8200000 },
      ]
    },
    'maalaimalar': {
      name: 'Maalaimalar',
      logo: '🌅',
      logoType: 'emoji',
      color: 'from-orange-500 to-red-600',
      demand: 8500000,
      collection: 7200000,
      expense: 5000000,
      growth: 12.3,
      monthlyData: [
        // 2024 Data
        { month: 'Jan', year: 2024, demand: 7200000, collection: 6000000, expense: 4200000 },
        { month: 'Feb', year: 2024, demand: 7300000, collection: 6100000, expense: 4250000 },
        { month: 'Mar', year: 2024, demand: 7400000, collection: 6200000, expense: 4300000 },
        { month: 'Apr', year: 2024, demand: 7500000, collection: 6300000, expense: 4350000 },
        { month: 'May', year: 2024, demand: 7600000, collection: 6400000, expense: 4400000 },
        { month: 'Jun', year: 2024, demand: 7700000, collection: 6500000, expense: 4450000 },
        { month: 'Jul', year: 2024, demand: 7800000, collection: 6600000, expense: 4500000 },
        { month: 'Aug', year: 2024, demand: 7900000, collection: 6700000, expense: 4550000 },
        { month: 'Sep', year: 2024, demand: 8000000, collection: 6800000, expense: 4600000 },
        { month: 'Oct', year: 2024, demand: 8100000, collection: 6900000, expense: 4650000 },
        { month: 'Nov', year: 2024, demand: 8200000, collection: 7000000, expense: 4700000 },
        { month: 'Dec', year: 2024, demand: 8300000, collection: 7100000, expense: 4750000 },
        // 2025 Data
        { month: 'Jan', year: 2025, demand: 8400000, collection: 7150000, expense: 4800000 },
        { month: 'Feb', year: 2025, demand: 8450000, collection: 7175000, expense: 4850000 },
        { month: 'Mar', year: 2025, demand: 8500000, collection: 7200000, expense: 4900000 },
        { month: 'Apr', year: 2025, demand: 8550000, collection: 7225000, expense: 4950000 },
        { month: 'May', year: 2025, demand: 8600000, collection: 7250000, expense: 5000000 },
      ]
    },
    'dtnext': {
      name: 'DTNext',
      logo: '🌐',
      logoType: 'emoji',
      color: 'from-green-500 to-emerald-600',
      demand: 3200000,
      collection: 2800000,
      expense: 1800000,
      growth: 25.8,
      monthlyData: [
        // 2024 Data
        { month: 'Jan', year: 2024, demand: 2200000, collection: 1900000, expense: 1300000 },
        { month: 'Feb', year: 2024, demand: 2300000, collection: 2000000, expense: 1350000 },
        { month: 'Mar', year: 2024, demand: 2400000, collection: 2100000, expense: 1400000 },
        { month: 'Apr', year: 2024, demand: 2500000, collection: 2200000, expense: 1450000 },
        { month: 'May', year: 2024, demand: 2600000, collection: 2300000, expense: 1500000 },
        { month: 'Jun', year: 2024, demand: 2700000, collection: 2350000, expense: 1520000 },
        { month: 'Jul', year: 2024, demand: 2750000, collection: 2375000, expense: 1540000 },
        { month: 'Aug', year: 2024, demand: 2800000, collection: 2400000, expense: 1560000 },
        { month: 'Sep', year: 2024, demand: 2850000, collection: 2450000, expense: 1580000 },
        { month: 'Oct', year: 2024, demand: 2900000, collection: 2500000, expense: 1600000 },
        { month: 'Nov', year: 2024, demand: 2950000, collection: 2550000, expense: 1650000 },
        { month: 'Dec', year: 2024, demand: 3000000, collection: 2600000, expense: 1700000 },
        // 2025 Data
        { month: 'Jan', year: 2025, demand: 3050000, collection: 2650000, expense: 1720000 },
        { month: 'Feb', year: 2025, demand: 3100000, collection: 2700000, expense: 1740000 },
        { month: 'Mar', year: 2025, demand: 3150000, collection: 2750000, expense: 1760000 },
        { month: 'Apr', year: 2025, demand: 3200000, collection: 2800000, expense: 1780000 },
        { month: 'May', year: 2025, demand: 3250000, collection: 2850000, expense: 1800000 },
      ]
    },
    'thanthi-tv': {
      name: 'Thanthi TV',
      logo: '📺',
      logoType: 'emoji',
      color: 'from-purple-500 to-indigo-600',
      demand: 6800000,
      collection: 5500000,
      expense: 4200000,
      growth: 15.7,
      monthlyData: [
        // 2024 Data
        { month: 'Jan', year: 2024, demand: 5500000, collection: 4400000, expense: 3400000 },
        { month: 'Feb', year: 2024, demand: 5600000, collection: 4500000, expense: 3450000 },
        { month: 'Mar', year: 2024, demand: 5700000, collection: 4600000, expense: 3500000 },
        { month: 'Apr', year: 2024, demand: 5800000, collection: 4700000, expense: 3550000 },
        { month: 'May', year: 2024, demand: 5900000, collection: 4800000, expense: 3600000 },
        { month: 'Jun', year: 2024, demand: 6000000, collection: 4850000, expense: 3650000 },
        { month: 'Jul', year: 2024, demand: 6100000, collection: 4900000, expense: 3700000 },
        { month: 'Aug', year: 2024, demand: 6200000, collection: 4950000, expense: 3750000 },
        { month: 'Sep', year: 2024, demand: 6300000, collection: 5000000, expense: 3800000 },
        { month: 'Oct', year: 2024, demand: 6400000, collection: 5100000, expense: 3850000 },
        { month: 'Nov', year: 2024, demand: 6500000, collection: 5200000, expense: 3900000 },
        { month: 'Dec', year: 2024, demand: 6600000, collection: 5300000, expense: 3950000 },
        // 2025 Data
        { month: 'Jan', year: 2025, demand: 6650000, collection: 5350000, expense: 4000000 },
        { month: 'Feb', year: 2025, demand: 6700000, collection: 5400000, expense: 4050000 },
        { month: 'Mar', year: 2025, demand: 6750000, collection: 5450000, expense: 4100000 },
        { month: 'Apr', year: 2025, demand: 6800000, collection: 5500000, expense: 4150000 },
        { month: 'May', year: 2025, demand: 6850000, collection: 5550000, expense: 4200000 },
      ]
    },
    'rani-online': {
      name: 'Rani Online',
      logo: '👑',
      logoType: 'emoji',
      color: 'from-pink-500 to-rose-600',
      demand: 2100000,
      collection: 1800000,
      expense: 1200000,
      growth: 18.2,
      monthlyData: [
        // 2024 Data
        { month: 'Jan', year: 2024, demand: 1600000, collection: 1350000, expense: 900000 },
        { month: 'Feb', year: 2024, demand: 1650000, collection: 1400000, expense: 920000 },
        { month: 'Mar', year: 2024, demand: 1700000, collection: 1450000, expense: 940000 },
        { month: 'Apr', year: 2024, demand: 1750000, collection: 1500000, expense: 960000 },
        { month: 'May', year: 2024, demand: 1800000, collection: 1520000, expense: 980000 },
        { month: 'Jun', year: 2024, demand: 1820000, collection: 1540000, expense: 1000000 },
        { month: 'Jul', year: 2024, demand: 1840000, collection: 1560000, expense: 1020000 },
        { month: 'Aug', year: 2024, demand: 1860000, collection: 1580000, expense: 1040000 },
        { month: 'Sep', year: 2024, demand: 1880000, collection: 1600000, expense: 1060000 },
        { month: 'Oct', year: 2024, demand: 1900000, collection: 1620000, expense: 1080000 },
        { month: 'Nov', year: 2024, demand: 1950000, collection: 1650000, expense: 1100000 },
        { month: 'Dec', year: 2024, demand: 2000000, collection: 1700000, expense: 1120000 },
        // 2025 Data
        { month: 'Jan', year: 2025, demand: 2020000, collection: 1720000, expense: 1140000 },
        { month: 'Feb', year: 2025, demand: 2040000, collection: 1740000, expense: 1160000 },
        { month: 'Mar', year: 2025, demand: 2060000, collection: 1760000, expense: 1180000 },
        { month: 'Apr', year: 2025, demand: 2080000, collection: 1780000, expense: 1190000 },
        { month: 'May', year: 2025, demand: 2100000, collection: 1800000, expense: 1200000 },
      ]
    }
  });

  const [editData, setEditData] = useState({});
  const [editMonthlyData, setEditMonthlyData] = useState([]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCompact = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return formatCurrency(amount);
  };

  // Enhanced filtering logic
  const getFilteredData = (monthlyData) => {
    const currentDate = new Date('2025-05-31'); // Using May 2025 as current
    let filteredData = [];

    switch (dateFilter) {
      case '1month':
        filteredData = monthlyData.filter(item => 
          item.year === 2025 && item.month === 'May'
        );
        break;
      case '3months':
        filteredData = monthlyData.filter(item => 
          item.year === 2025 && ['Mar', 'Apr', 'May'].includes(item.month)
        );
        break;
      case '1year':
        filteredData = monthlyData.filter(item => 
          item.year === 2025 || (item.year === 2024 && ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].includes(item.month))
        );
        break;
      case 'custom':
        // Custom date range logic would go here
        filteredData = monthlyData;
        break;
      default:
        filteredData = monthlyData;
    }

    return filteredData;
  };

  const getTotalValues = () => {
    const totals = Object.values(properties).reduce((acc, prop) => {
      const filteredData = getFilteredData(prop.monthlyData);
      const latestMonth = filteredData[filteredData.length - 1] || { demand: 0, collection: 0, expense: 0 };
      
      return {
        demand: acc.demand + latestMonth.demand,
        collection: acc.collection + latestMonth.collection,
        expense: acc.expense + latestMonth.expense,
      };
    }, { demand: 0, collection: 0, expense: 0 });
    
    totals.profit = totals.collection - totals.expense;
    totals.collectionRate = (totals.collection / totals.demand) * 100;
    
    return totals;
  };

  const handlePropertyClick = (propertyKey) => {
    setSelectedProperty(propertyKey);
    setCurrentView('detail');
  };

  const handleBackClick = () => {
    setCurrentView('overview');
    setSelectedProperty(null);
    setIsEditing(false);
    setIsEditingMonthly(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditData({ ...properties[selectedProperty] });
  };

  const handleEditMonthlyClick = () => {
    setIsEditingMonthly(true);
    setEditMonthlyData([...properties[selectedProperty].monthlyData]);
  };

  const handleSaveEdit = () => {
    setProperties(prev => ({
      ...prev,
      [selectedProperty]: editData
    }));
    setIsEditing(false);
  };

  const handleSaveMonthlyEdit = () => {
    setProperties(prev => ({
      ...prev,
      [selectedProperty]: {
        ...prev[selectedProperty],
        monthlyData: editMonthlyData
      }
    }));
    setIsEditingMonthly(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({});
  };

  const handleCancelMonthlyEdit = () => {
    setIsEditingMonthly(false);
    setEditMonthlyData([]);
  };

  const handleInputChange = (field, value) => {
    const numValue = parseFloat(value) || 0;
    setEditData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const handleMonthlyInputChange = (index, field, value) => {
    const numValue = parseFloat(value) || 0;
    setEditMonthlyData(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: numValue };
      return updated;
    });
  };

  const addNewMonthlyEntry = () => {
    const newEntry = {
      month: 'Jan',
      year: 2025,
      demand: 0,
      collection: 0,
      expense: 0
    };
    setEditMonthlyData(prev => [...prev, newEntry]);
  };

  const deleteMonthlyEntry = (index) => {
    setEditMonthlyData(prev => prev.filter((_, i) => i !== index));
  };

  const FilterComponent = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Report Filters
        </h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-blue-600 hover:text-blue-800"
        >
          {showFilters ? 'Hide' : 'Show'} Filters
        </button>
      </div>
      
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1month">Current Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="1year">Last 12 Months</option>
              <option value="all">All Time</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          {dateFilter === 'custom' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="month"
                  value={customDateRange.start}
                  onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="month"
                  value={customDateRange.end}
                  onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}
          
          <div className="flex items-end">
            <button
              onClick={() => {
                // Apply filters logic
                console.log('Applying filters:', { dateFilter, customDateRange });
              }}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const OverviewDashboard = () => {
    const totals = getTotalValues();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Daily Thanthi Group</h1>
            <p className="text-gray-600">Financial Dashboard & Performance Overview</p>
          </div>

          {/* Filters */}
          <FilterComponent />

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Demand</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCompact(totals.demand)}</p>
                  <p className="text-xs text-gray-500 mt-1">{dateFilter.replace('1', 'Current ').replace('3', 'Last 3 ').replace('all', 'All Time')}</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Collection</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCompact(totals.collection)}</p>
                  <p className="text-xs text-gray-500 mt-1">{totals.collectionRate.toFixed(1)}% of demand</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Expense</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCompact(totals.expense)}</p>
                  <p className="text-xs text-gray-500 mt-1">{((totals.expense/totals.collection)*100).toFixed(1)}% of collection</p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Net Profit</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCompact(totals.profit)}</p>
                  <p className="text-xs text-gray-500 mt-1">{((totals.profit/totals.collection)*100).toFixed(1)}% margin</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(properties).map(([key, property]) => {
              const filteredData = getFilteredData(property.monthlyData);
              const latestMonth = filteredData[filteredData.length - 1] || { demand: 0, collection: 0, expense: 0 };
              const profit = latestMonth.collection - latestMonth.expense;
              const collectionRate = (latestMonth.collection / latestMonth.demand) * 100;
              
              return (
                <div 
                  key={key}
                  onClick={() => handlePropertyClick(key)}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden"
                >
                  <div className={`h-32 bg-gradient-to-r ${property.color} flex items-center justify-center`}>
                    <div className="text-center text-white">
                      {property.logoType === 'image' ? (
                        <div className="w-24 h-16 bg-white rounded p-2 mb-2 mx-auto flex items-center justify-center">
                          <img 
                            src={property.logo} 
                            alt={property.name}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              // Fallback to text if image fails to load
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'block';
                            }}
                          />
                          <div className="text-red-600 font-bold text-sm hidden">Daily Thanthi</div>
                        </div>
                      ) : (
                        <div className="text-4xl mb-2">{property.logo}</div>
                      )}
                      <h3 className="text-xl font-bold">{property.name}</h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Demand</p>
                        <p className="text-sm font-semibold">{formatCompact(latestMonth.demand)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Collection</p>
                        <p className="text-sm font-semibold text-green-600">{formatCompact(latestMonth.collection)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Expense</p>
                        <p className="text-sm font-semibold text-red-600">{formatCompact(latestMonth.expense)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Profit</p>
                        <p className="text-sm font-semibold text-purple-600">{formatCompact(profit)}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500">Collection Rate</p>
                        <p className="text-sm font-semibold">{collectionRate.toFixed(1)}%</p>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-500 font-medium">{property.growth}%</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-xs text-gray-400">
                      Data from {filteredData.length} months • {dateFilter}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const DetailView = () => {
    const property = isEditing ? editData : properties[selectedProperty];
    const monthlyData = isEditingMonthly ? editMonthlyData : property.monthlyData;
    const filteredData = getFilteredData(monthlyData);
    const latestMonth = filteredData[filteredData.length - 1] || { demand: 0, collection: 0, expense: 0 };
    const profit = latestMonth.collection - latestMonth.expense;
    const collectionRate = (latestMonth.collection / latestMonth.demand) * 100;
    const profitMargin = (profit / latestMonth.collection) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button 
                onClick={handleBackClick}
                className="mr-4 p-2 rounded-lg bg-white shadow hover:shadow-md transition-shadow"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center">
                {property.logoType === 'image' ? (
                  <div className="w-16 h-12 bg-white rounded shadow mr-3 flex items-center justify-center p-1">
                    <img 
                      src={property.logo} 
                      alt={property.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="text-red-600 font-bold text-xs hidden">DT</div>
                  </div>
                ) : (
                  <div className="text-3xl mr-3">{property.logo}</div>
                )}
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{property.name}</h1>
                  <p className="text-gray-600">Detailed Financial Analysis</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              {!isEditing && !isEditingMonthly ? (
                <>
                  <button 
                    onClick={handleEditClick}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Current
                  </button>
                  <button 
                    onClick={handleEditMonthlyClick}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Edit Monthly Data
                  </button>
                </>
              ) : isEditing ? (
                <>
                  <button 
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </button>
                  <button 
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleSaveMonthlyEdit}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Monthly
                  </button>
                  <button 
                    onClick={handleCancelMonthlyEdit}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Filters for Detail View */}
          <FilterComponent />

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Demand</h3>
                <DollarSign className="h-5 w-5 text-blue-500" />
              </div>
              {isEditing ? (
                <input
                  type="number"
                  value={property.demand}
                  onChange={(e) => handleInputChange('demand', e.target.value)}
                  className="w-full text-2xl font-bold bg-gray-50 border rounded px-3 py-2"
                />
              ) : (
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(latestMonth.demand)}</p>
              )}
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Collection</h3>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              {isEditing ? (
                <input
                  type="number"
                  value={property.collection}
                  onChange={(e) => handleInputChange('collection', e.target.value)}
                  className="w-full text-2xl font-bold bg-gray-50 border rounded px-3 py-2"
                />
              ) : (
                <p className="text-2xl font-bold text-green-600">{formatCurrency(latestMonth.collection)}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">{collectionRate.toFixed(1)}% of demand</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Expense</h3>
                <TrendingDown className="h-5 w-5 text-red-500" />
              </div>
              {isEditing ? (
                <input
                  type="number"
                  value={property.expense}
                  onChange={(e) => handleInputChange('expense', e.target.value)}
                  className="w-full text-2xl font-bold bg-gray-50 border rounded px-3 py-2"
                />
              ) : (
                <p className="text-2xl font-bold text-red-600">{formatCurrency(latestMonth.expense)}</p>
              )}
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Net Profit</h3>
                <TrendingUp className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(profit)}</p>
              <p className="text-sm text-gray-500 mt-1">{profitMargin.toFixed(1)}% margin</p>
            </div>
          </div>

          {/* Monthly Data Editor */}
          {isEditingMonthly && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Edit Monthly Data</h3>
                <button
                  onClick={addNewMonthlyEntry}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Month
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Month</th>
                      <th className="text-left p-2">Year</th>
                      <th className="text-left p-2">Demand</th>
                      <th className="text-left p-2">Collection</th>
                      <th className="text-left p-2">Expense</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editMonthlyData.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <select
                            value={item.month}
                            onChange={(e) => handleMonthlyInputChange(index, 'month', e.target.value)}
                            className="w-full p-1 border rounded"
                          >
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                              <option key={month} value={month}>{month}</option>
                            ))}
                          </select>
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={item.year}
                            onChange={(e) => handleMonthlyInputChange(index, 'year', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={item.demand}
                            onChange={(e) => handleMonthlyInputChange(index, 'demand', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={item.collection}
                            onChange={(e) => handleMonthlyInputChange(index, 'collection', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={item.expense}
                            onChange={(e) => handleMonthlyInputChange(index, 'expense', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="p-2">
                          <button
                            onClick={() => deleteMonthlyEntry(index)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Monthly Trend Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => formatCompact(value)} />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    labelFormatter={(label, payload) => {
                      if (payload && payload[0]) {
                        return `${payload[0].payload.month} ${payload[0].payload.year}`;
                      }
                      return label;
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="demand" stroke="#3b82f6" name="Demand" strokeWidth={2} />
                  <Line type="monotone" dataKey="collection" stroke="#10b981" name="Collection" strokeWidth={2} />
                  <Line type="monotone" dataKey="expense" stroke="#ef4444" name="Expense" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Monthly Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => formatCompact(value)} />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    labelFormatter={(label, payload) => {
                      if (payload && payload[0]) {
                        return `${payload[0].payload.month} ${payload[0].payload.year}`;
                      }
                      return label;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="demand" fill="#3b82f6" name="Demand" />
                  <Bar dataKey="collection" fill="#10b981" name="Collection" />
                  <Bar dataKey="expense" fill="#ef4444" name="Expense" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentView === 'overview' ? <OverviewDashboard /> : <DetailView />}
    </div>
  );
};

export default Dashboard;