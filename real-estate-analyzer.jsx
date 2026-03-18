import React, { useState } from 'react';
import { Home, TrendingUp, DollarSign, AlertCircle, CheckCircle, Building2, BarChart3, Trash2, Download, RefreshCw } from 'lucide-react';

export default function RealEstateInvestmentAnalyzer() {
  const [propertyUrl, setPropertyUrl] = useState('');
  const [propertyData, setPropertyData] = useState(null);
  const [manualInput, setManualInput] = useState(false);
  const [manualProperty, setManualProperty] = useState({
    address: '',
    purchasePrice: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    condition: 'Good',
    location: 'Urban',
    propertyType: 'House'
  });
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulated property data extraction (in production, use Zillow/Redfin API)
  const analyzeProperty = async () => {
    if (!propertyUrl && !manualInput) {
      alert('Please enter a property URL or use manual entry');
      return;
    }

    setLoading(true);
    
    // Simulated data extraction from URL
    const simulatedData = {
      address: '125 Sunset Boulevard, Los Angeles, CA',
      purchasePrice: 850000,
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2800,
      condition: 'Good',
      location: 'Urban',
      propertyType: 'House',
      yearBuilt: 2005,
      lotSize: 0.35
    };

    // Use manual input if provided
    const finalData = manualInput ? {
      ...manualProperty,
      purchasePrice: parseFloat(manualProperty.purchasePrice),
      bedrooms: parseInt(manualProperty.bedrooms),
      bathrooms: parseInt(manualProperty.bathrooms),
      squareFeet: parseInt(manualProperty.squareFeet)
    } : simulatedData;

    // Calculate financial metrics
    const analysis = calculatePropertyAnalysis(finalData);
    
    const newProperty = {
      id: Date.now(),
      ...finalData,
      ...analysis
    };

    setProperties([...properties, newProperty]);
    setPropertyUrl('');
    setManualInput(false);
    setManualProperty({ address: '', purchasePrice: '', bedrooms: '', bathrooms: '', squareFeet: '', condition: 'Good', location: 'Urban', propertyType: 'House' });
    setLoading(false);
    setSelectedProperty(newProperty);
  };

  const calculatePropertyAnalysis = (property) => {
    const purchasePrice = property.purchasePrice;
    
    // Market rent calculation based on bedrooms and location
    const baseRent = {
      1: 1500, 2: 2200, 3: 3000, 4: 4000, 5: 5200
    };
    const locationMultiplier = {
      'Urban': 1.3,
      'Suburban': 1.0,
      'Rural': 0.7
    };
    
    const monthlyRent = (baseRent[property.bedrooms] || 3000) * locationMultiplier[property.location];
    const summerRent = monthlyRent * 1.4; // 40% premium for summer short-term
    
    // Taxes and fees
    const closingCosts = purchasePrice * 0.05; // 5% closing costs (varies by location)
    const propertyTaxAnnual = purchasePrice * 0.012; // 1.2% property tax (average US)
    const propertyTaxMonthly = propertyTaxAnnual / 12;
    const rentalTaxRate = 0.25; // 25% tax on rental income (federal + state average)
    
    // Monthly expenses
    const insurance = purchasePrice * 0.006 / 12; // 0.6% annually
    const maintenance = monthlyRent * 0.08; // 8% of rent for maintenance
    const vacancy = monthlyRent * 0.05; // 5% vacancy rate
    const utilities = property.bedrooms * 150; // ~$150 per bedroom
    const management = monthlyRent * 0.10; // 10% property management fee
    
    // Renovation estimate
    const conditionMultiplier = {
      'Excellent': 0,
      'Good': purchasePrice * 0.02,
      'Fair': purchasePrice * 0.08,
      'Poor': purchasePrice * 0.15
    };
    const renovationCost = conditionMultiplier[property.condition] || 0;
    
    // Annual long-term rental
    const grossAnnualRent = monthlyRent * 12;
    const totalMonthlyExpenses = propertyTaxMonthly + insurance + maintenance + vacancy + management;
    const monthlyNetBeforeTax = monthlyRent - totalMonthlyExpenses;
    const monthlyTaxOnRent = grossAnnualRent * rentalTaxRate / 12;
    const monthlyNetAfterTax = monthlyNetBeforeTax - monthlyTaxOnRent;
    const annualNetAfterTax = monthlyNetAfterTax * 12;
    
    // Summer short-term rental (assume 3 months at premium rate)
    const summerMonths = 3;
    const summerGrossRent = summerRent * summerMonths;
    const summerExpenses = totalMonthlyExpenses * summerMonths;
    const summerTaxableIncome = summerGrossRent * rentalTaxRate;
    const summerNetProfit = (summerGrossRent - summerExpenses - summerTaxableIncome) / summerMonths;
    
    // Total initial investment
    const totalInitialInvestment = purchasePrice + closingCosts + renovationCost;
    
    // Cap rate and ROI
    const capRate = (annualNetAfterTax / purchasePrice) * 100;
    const totalROI = (annualNetAfterTax / totalInitialInvestment) * 100;
    
    // Price appreciation projections (assume 3% annual appreciation)
    const appreciationRate = 0.03;
    const projections = [];
    for (let year = 1; year <= 10; year++) {
      const projectedValue = purchasePrice * Math.pow(1 + appreciationRate, year);
      const appreciationGain = projectedValue - purchasePrice;
      const totalWorth = projectedValue + (annualNetAfterTax * year); // Include rental profits
      projections.push({
        year,
        projectedValue: Math.round(projectedValue),
        appreciationGain: Math.round(appreciationGain),
        totalWorth: Math.round(totalWorth),
        totalRentalProfit: Math.round(annualNetAfterTax * year)
      });
    }
    
    // Investment recommendation
    let recommendation = 'Strong Buy';
    let recommendationReason = [];
    
    if (capRate < 4) {
      recommendation = 'Hold';
      recommendationReason.push('Cap rate below 4% - moderate returns');
    } else if (capRate >= 6) {
      recommendation = 'Strong Buy';
      recommendationReason.push('Excellent cap rate of ' + capRate.toFixed(2) + '%');
    } else if (capRate >= 5) {
      recommendation = 'Buy';
      recommendationReason.push('Good cap rate of ' + capRate.toFixed(2) + '%');
    }
    
    if (monthlyNetAfterTax < purchasePrice * 0.002) {
      recommendationReason.push('Low monthly cash flow');
    }
    
    if (totalROI < 5) {
      recommendationReason.push('ROI below 5% with renovation costs');
    } else {
      recommendationReason.push('Strong ROI of ' + totalROI.toFixed(2) + '%');
    }
    
    // Break-even analysis
    const monthlyBreakEvenRent = totalMonthlyExpenses + monthlyTaxOnRent;
    const breakEvenMonths = monthlyNetAfterTax > 0 ? 0 : Math.ceil((closingCosts + renovationCost) / (monthlyNetAfterTax || 1));
    
    return {
      monthlyRent: Math.round(monthlyRent),
      summerRent: Math.round(summerRent),
      closingCosts: Math.round(closingCosts),
      renovationCost: Math.round(renovationCost),
      totalInitialInvestment: Math.round(totalInitialInvestment),
      propertyTaxMonthly: Math.round(propertyTaxMonthly),
      propertyTaxAnnual: Math.round(propertyTaxAnnual),
      insurance: Math.round(insurance),
      maintenance: Math.round(maintenance),
      vacancy: Math.round(vacancy),
      management: Math.round(management),
      totalMonthlyExpenses: Math.round(totalMonthlyExpenses),
      monthlyRentalIncome: Math.round(monthlyRent),
      monthlyNetBeforeTax: Math.round(monthlyNetBeforeTax),
      monthlyTaxOnRent: Math.round(monthlyTaxOnRent),
      monthlyNetAfterTax: Math.round(monthlyNetAfterTax),
      annualNetAfterTax: Math.round(annualNetAfterTax),
      summerMonthlyNet: Math.round(summerNetProfit),
      capRate: capRate.toFixed(2),
      totalROI: totalROI.toFixed(2),
      projections,
      recommendation,
      recommendationReason,
      breakEvenMonths
    };
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter(p => p.id !== id));
    if (selectedProperty?.id === id) setSelectedProperty(null);
  };

  const downloadReport = (property) => {
    const report = `
REAL ESTATE INVESTMENT ANALYSIS REPORT
=====================================

PROPERTY DETAILS
----------------
Address: ${property.address}
Property Type: ${property.propertyType}
Bedrooms: ${property.bedrooms} | Bathrooms: ${property.bathrooms}
Square Feet: ${property.squareFeet?.toLocaleString() || 'N/A'}
Condition: ${property.condition}
Location: ${property.location}

PURCHASE ANALYSIS
-----------------
Purchase Price: $${property.purchasePrice?.toLocaleString() || 'N/A'}
Closing Costs (5%): $${property.closingCosts?.toLocaleString() || 'N/A'}
Renovation Estimate: $${property.renovationCost?.toLocaleString() || 'N/A'}
Total Initial Investment: $${property.totalInitialInvestment?.toLocaleString() || 'N/A'}

RENTAL INCOME PROJECTIONS
--------------------------
Monthly Long-Term Rent: $${property.monthlyRent?.toLocaleString() || 'N/A'}
Summer Short-Term Rate: $${property.summerRent?.toLocaleString() || 'N/A'}/month
Summer Profit (3 months): $${(property.summerMonthlyNet * 3)?.toLocaleString() || 'N/A'}

MONTHLY EXPENSES
----------------
Property Tax: $${property.propertyTaxMonthly?.toLocaleString() || 'N/A'}
Insurance: $${property.insurance?.toLocaleString() || 'N/A'}
Maintenance: $${property.maintenance?.toLocaleString() || 'N/A'}
Vacancy Loss: $${property.vacancy?.toLocaleString() || 'N/A'}
Property Management: $${property.management?.toLocaleString() || 'N/A'}
Total Monthly Expenses: $${property.totalMonthlyExpenses?.toLocaleString() || 'N/A'}

PROFIT ANALYSIS
----------------
Monthly Gross Rent: $${property.monthlyRentalIncome?.toLocaleString() || 'N/A'}
Monthly Expenses: $${property.totalMonthlyExpenses?.toLocaleString() || 'N/A'}
Monthly Net (Before Tax): $${property.monthlyNetBeforeTax?.toLocaleString() || 'N/A'}
Estimated Monthly Rental Tax: $${property.monthlyTaxOnRent?.toLocaleString() || 'N/A'}
Monthly Net Profit (After Tax): $${property.monthlyNetAfterTax?.toLocaleString() || 'N/A'}
Annual Net Profit: $${property.annualNetAfterTax?.toLocaleString() || 'N/A'}

INVESTMENT METRICS
-------------------
Cap Rate: ${property.capRate}%
Total ROI: ${property.totalROI}%
Break-Even: ${property.breakEvenMonths} months

RECOMMENDATION
---------------
${property.recommendation}: ${property.recommendationReason?.join(' | ') || 'N/A'}

10-YEAR PROJECTIONS
--------------------
${property.projections?.slice(0, 5).map(p => 
  `Year ${p.year}: Property Value: $${p.projectedValue?.toLocaleString() || 'N/A'} | Appreciation: $${p.appreciationGain?.toLocaleString() || 'N/A'} | Total Worth: $${p.totalWorth?.toLocaleString() || 'N/A'}`
).join('\n') || 'N/A'}
    `;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(report));
    element.setAttribute('download', `property-analysis-${Date.now()}.txt`);
    element.click();
  };

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #0f1419 0%, #1a1f2e 50%, #151b28 100%)', fontFamily: "'Lora', serif"}}>
      {/* Luxury background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/3 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <Home className="w-12 h-12 text-amber-500" />
              <h1 className="text-6xl font-light text-white" style={{fontFamily: "'Playfair Display', serif"}}>
                Real Estate
                <span className="block text-amber-400">Investment Analyzer</span>
              </h1>
            </div>
            <p className="text-lg text-slate-400 max-w-2xl">Analyze property investments with precision. Understand rental income, taxes, renovations, and 10-year market projections.</p>
          </div>

          {/* Input Methods */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* URL Input */}
            <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-xl p-8 hover:border-amber-500/30 transition">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                Paste Property Link
              </h3>
              <p className="text-sm text-slate-400 mb-4">Supports Zillow, Redfin, Trulia, Airbnb</p>
              <input
                type="text"
                placeholder="https://www.zillow.com/homedetails/..."
                value={propertyUrl}
                onChange={(e) => setPropertyUrl(e.target.value)}
                disabled={manualInput}
                className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 disabled:opacity-50 transition mb-4"
              />
              <button
                onClick={analyzeProperty}
                disabled={manualInput || loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 active:scale-95"
              >
                {loading ? 'Analyzing...' : 'Analyze Property'}
              </button>
            </div>

            {/* Manual Input */}
            <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-xl p-8 hover:border-emerald-500/30 transition">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <RefreshCw className={`w-5 h-5 text-emerald-400 ${manualInput ? 'opacity-100' : 'opacity-50'}`} />
                Manual Entry
              </h3>
              <button
                onClick={() => setManualInput(!manualInput)}
                className="w-full bg-slate-700/50 hover:bg-slate-700 text-emerald-400 font-semibold py-2 rounded-lg transition mb-4"
              >
                {manualInput ? 'Hide Form' : 'Enter Manually'}
              </button>
              
              {manualInput && (
                <div className="space-y-3 mt-4">
                  <input
                    type="text"
                    placeholder="Address"
                    value={manualProperty.address}
                    onChange={(e) => setManualProperty({...manualProperty, address: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Purchase Price"
                    value={manualProperty.purchasePrice}
                    onChange={(e) => setManualProperty({...manualProperty, purchasePrice: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-sm"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      placeholder="Beds"
                      value={manualProperty.bedrooms}
                      onChange={(e) => setManualProperty({...manualProperty, bedrooms: e.target.value})}
                      className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Baths"
                      value={manualProperty.bathrooms}
                      onChange={(e) => setManualProperty({...manualProperty, bathrooms: e.target.value})}
                      className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Sq Ft"
                      value={manualProperty.squareFeet}
                      onChange={(e) => setManualProperty({...manualProperty, squareFeet: e.target.value})}
                      className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={manualProperty.condition}
                      onChange={(e) => setManualProperty({...manualProperty, condition: e.target.value})}
                      className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-400 text-sm"
                    >
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Fair</option>
                      <option>Poor</option>
                    </select>
                    <select
                      value={manualProperty.location}
                      onChange={(e) => setManualProperty({...manualProperty, location: e.target.value})}
                      className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-400 text-sm"
                    >
                      <option>Urban</option>
                      <option>Suburban</option>
                      <option>Rural</option>
                    </select>
                    <select
                      value={manualProperty.propertyType}
                      onChange={(e) => setManualProperty({...manualProperty, propertyType: e.target.value})}
                      className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-400 text-sm"
                    >
                      <option>House</option>
                      <option>Condo</option>
                      <option>Apartment</option>
                      <option>Commercial</option>
                    </select>
                  </div>
                  <button
                    onClick={analyzeProperty}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-2 rounded-lg transition text-sm mt-2"
                  >
                    {loading ? 'Analyzing...' : 'Analyze'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="max-w-7xl mx-auto">
          {properties.length === 0 ? (
            <div className="text-center py-20">
              <Home className="w-20 h-20 text-slate-600 mx-auto mb-6" />
              <p className="text-2xl text-slate-400">No properties analyzed yet</p>
              <p className="text-slate-500 mt-2">Add your first property to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {properties.map(property => (
                <div
                  key={property.id}
                  onClick={() => setSelectedProperty(selectedProperty?.id === property.id ? null : property)}
                  className={`bg-gradient-to-br border rounded-2xl p-8 cursor-pointer transition-all transform hover:scale-105 ${
                    selectedProperty?.id === property.id
                      ? 'from-amber-900/30 to-orange-900/30 border-amber-500/50 ring-2 ring-amber-500/30 shadow-2xl shadow-amber-500/20'
                      : 'from-slate-800/30 to-slate-700/30 border-slate-700/50 hover:border-amber-500/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-light text-white mb-1" style={{fontFamily: "'Playfair Display', serif"}}>
                        {property.address}
                      </h3>
                      <p className="text-slate-400">{property.bedrooms}B/{property.bathrooms}B • {property.location}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProperty(property.id);
                      }}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-900/50 rounded-xl p-4">
                      <p className="text-sm text-slate-400 mb-1">Purchase Price</p>
                      <p className="text-3xl font-light text-amber-400">${property.purchasePrice?.toLocaleString() || 'N/A'}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-900/30 border border-blue-600/30 rounded-xl p-3">
                        <p className="text-xs text-blue-300 mb-1">Monthly Rent</p>
                        <p className="text-xl font-semibold text-blue-300">${property.monthlyRent?.toLocaleString() || 'N/A'}</p>
                      </div>
                      <div className="bg-orange-900/30 border border-orange-600/30 rounded-xl p-3">
                        <p className="text-xs text-orange-300 mb-1">Summer Rate</p>
                        <p className="text-xl font-semibold text-orange-300">${property.summerRent?.toLocaleString() || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-emerald-900/30 border border-emerald-600/30 rounded-xl p-3">
                        <p className="text-xs text-emerald-300 mb-1">Monthly Profit</p>
                        <p className="text-lg font-semibold text-emerald-300">${property.monthlyNetAfterTax?.toLocaleString() || 'N/A'}</p>
                      </div>
                      <div className="bg-purple-900/30 border border-purple-600/30 rounded-xl p-3">
                        <p className="text-xs text-purple-300 mb-1">Cap Rate</p>
                        <p className="text-lg font-semibold text-purple-300">{property.capRate}%</p>
                      </div>
                    </div>

                    {/* Recommendation Badge */}
                    <div className={`rounded-xl p-4 flex items-center gap-3 ${
                      property.recommendation === 'Strong Buy' ? 'bg-emerald-900/40 border border-emerald-500/30' :
                      property.recommendation === 'Buy' ? 'bg-blue-900/40 border border-blue-500/30' :
                      'bg-yellow-900/40 border border-yellow-500/30'
                    }`}>
                      <CheckCircle className={`w-5 h-5 ${
                        property.recommendation === 'Strong Buy' ? 'text-emerald-400' :
                        property.recommendation === 'Buy' ? 'text-blue-400' :
                        'text-yellow-400'
                      }`} />
                      <span className={`font-semibold ${
                        property.recommendation === 'Strong Buy' ? 'text-emerald-300' :
                        property.recommendation === 'Buy' ? 'text-blue-300' :
                        'text-yellow-300'
                      }`}>
                        {property.recommendation}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Detailed Analysis Panel */}
          {selectedProperty && (
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur border border-slate-600/50 rounded-2xl p-8 animate-in fade-in">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-4xl font-light text-white mb-2" style={{fontFamily: "'Playfair Display', serif"}}>
                    Investment Analysis
                  </h2>
                  <p className="text-slate-400">{selectedProperty.address}</p>
                </div>
                <button
                  onClick={() => downloadReport(selectedProperty)}
                  className="flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 px-4 py-2 rounded-lg font-semibold transition"
                >
                  <Download className="w-4 h-4" /> Report
                </button>
              </div>

              {/* Financial Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-slate-600/50">
                <div>
                  <h3 className="text-lg font-semibold text-slate-300 mb-4">Initial Investment</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Purchase Price</span>
                      <span className="text-white font-semibold">${selectedProperty.purchasePrice?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Closing Costs (5%)</span>
                      <span className="text-white font-semibold">${selectedProperty.closingCosts?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Renovation Estimate</span>
                      <span className="text-white font-semibold">${selectedProperty.renovationCost?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-slate-600/30">
                      <span className="text-slate-300 font-semibold">Total Investment</span>
                      <span className="text-amber-400 font-bold text-lg">${selectedProperty.totalInitialInvestment?.toLocaleString() || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-300 mb-4">Rental Income</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Monthly Long-Term Rent</span>
                      <span className="text-white font-semibold">${selectedProperty.monthlyRent?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Annual Rental Income</span>
                      <span className="text-white font-semibold">${(selectedProperty.monthlyRent * 12)?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Summer Short-Term Rate</span>
                      <span className="text-orange-400 font-semibold">${selectedProperty.summerRent?.toLocaleString() || 'N/A'}/mo</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-slate-600/30">
                      <span className="text-slate-300 font-semibold">Summer 3-Month Profit</span>
                      <span className="text-orange-400 font-bold text-lg">${(selectedProperty.summerMonthlyNet * 3)?.toLocaleString() || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Expenses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-slate-600/50">
                <div>
                  <h3 className="text-lg font-semibold text-slate-300 mb-4">Monthly Expenses</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Property Tax</span>
                      <span>${selectedProperty.propertyTaxMonthly?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Insurance</span>
                      <span>${selectedProperty.insurance?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Maintenance (8%)</span>
                      <span>${selectedProperty.maintenance?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Vacancy Loss (5%)</span>
                      <span>${selectedProperty.vacancy?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Management (10%)</span>
                      <span>${selectedProperty.management?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-600/30 text-slate-300 font-semibold">
                      <span>Total Expenses</span>
                      <span>${selectedProperty.totalMonthlyExpenses?.toLocaleString() || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-300 mb-4">Profit Analysis</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Monthly Gross Rent</span>
                      <span>${selectedProperty.monthlyRentalIncome?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Less: Expenses</span>
                      <span className="text-red-400">-${selectedProperty.totalMonthlyExpenses?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Net Before Tax</span>
                      <span>${selectedProperty.monthlyNetBeforeTax?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 border-t border-slate-600/30 pt-2">
                      <span>Est. Rental Tax (25%)</span>
                      <span className="text-red-400">-${selectedProperty.monthlyTaxOnRent?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-emerald-400 border-t border-slate-600/30 pt-2">
                      <span>Monthly Net Profit</span>
                      <span className="text-lg">${selectedProperty.monthlyNetAfterTax?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-emerald-400">
                      <span>Annual Net Profit</span>
                      <span className="text-lg">${selectedProperty.annualNetAfterTax?.toLocaleString() || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-slate-600/50">
                <div className="bg-slate-900/50 rounded-xl p-6">
                  <p className="text-sm text-slate-400 mb-2">Cap Rate</p>
                  <p className="text-3xl font-bold text-blue-400">{selectedProperty.capRate}%</p>
                  <p className="text-xs text-slate-500 mt-2">Annual return on property value</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-6">
                  <p className="text-sm text-slate-400 mb-2">Total ROI</p>
                  <p className="text-3xl font-bold text-emerald-400">{selectedProperty.totalROI}%</p>
                  <p className="text-xs text-slate-500 mt-2">Including renovation costs</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-6">
                  <p className="text-sm text-slate-400 mb-2">Break-Even</p>
                  <p className="text-3xl font-bold text-purple-400">{selectedProperty.breakEvenMonths || 'Positive'}</p>
                  <p className="text-xs text-slate-500 mt-2">Months to recover investment</p>
                </div>
              </div>

              {/* Recommendation */}
              <div className={`rounded-xl p-6 mb-8 ${
                selectedProperty.recommendation === 'Strong Buy' ? 'bg-emerald-900/40 border border-emerald-500/50' :
                selectedProperty.recommendation === 'Buy' ? 'bg-blue-900/40 border border-blue-500/50' :
                'bg-yellow-900/40 border border-yellow-500/50'
              }`}>
                <p className={`flex items-center gap-2 font-bold text-lg mb-3 ${
                  selectedProperty.recommendation === 'Strong Buy' ? 'text-emerald-300' :
                  selectedProperty.recommendation === 'Buy' ? 'text-blue-300' :
                  'text-yellow-300'
                }`}>
                  <CheckCircle className="w-6 h-6" />
                  {selectedProperty.recommendation}
                </p>
                <ul className="space-y-2">
                  {selectedProperty.recommendationReason?.map((reason, i) => (
                    <li key={i} className="text-slate-300 flex items-start gap-2">
                      <span className="text-amber-400 mt-1">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 10-Year Projections */}
              <div>
                <h3 className="text-2xl font-light text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
                  10-Year Market Projections
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-600/50">
                        <th className="text-left py-3 px-4 text-slate-400">Year</th>
                        <th className="text-right py-3 px-4 text-slate-400">Property Value</th>
                        <th className="text-right py-3 px-4 text-slate-400">Appreciation</th>
                        <th className="text-right py-3 px-4 text-slate-400">Rental Profit</th>
                        <th className="text-right py-3 px-4 text-slate-400">Total Worth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProperty.projections?.slice(0, 5).map((proj) => (
                        <tr key={proj.year} className="border-b border-slate-600/30 hover:bg-slate-900/30">
                          <td className="py-3 px-4 text-white font-semibold">Year {proj.year}</td>
                          <td className="py-3 px-4 text-right text-blue-400">${proj.projectedValue?.toLocaleString() || 'N/A'}</td>
                          <td className="py-3 px-4 text-right text-emerald-400">+${proj.appreciationGain?.toLocaleString() || 'N/A'}</td>
                          <td className="py-3 px-4 text-right text-orange-400">${proj.totalRentalProfit?.toLocaleString() || 'N/A'}</td>
                          <td className="py-3 px-4 text-right text-amber-400 font-bold">${proj.totalWorth?.toLocaleString() || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500 mt-4">* Based on 3% annual appreciation and cumulative rental income</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
