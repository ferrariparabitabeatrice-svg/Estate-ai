import React, { useState } from 'react';
import { Home, TrendingUp, DollarSign, AlertCircle, CheckCircle, Building2, BarChart3, Trash2, Download, RefreshCw, Globe, Zap } from 'lucide-react';

export default function MultiPlatformRealEstateAnalyzer() {
  const [propertyUrl, setPropertyUrl] = useState('');
  const [propertyData, setPropertyData] = useState(null);
  const [manualInput, setManualInput] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('auto');
  const [manualProperty, setManualProperty] = useState({
    address: '',
    purchasePrice: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    condition: 'Good',
    location: 'Urban',
    propertyType: 'House',
    luxuryFeatures: false,
    poolArea: 0,
    garageSpaces: 0,
    yearBuilt: ''
  });
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [platformInfo, setPlatformInfo] = useState('');

  const platforms = [
    { id: 'auto', name: 'Auto-Detect', icon: '🔍' },
    { id: 'google', name: 'Google Properties', icon: '🔍' },
    { id: 'idealista', name: 'Idealista (Spain/Portugal)', icon: '🏠' },
    { id: 'luxury', name: 'Luxury Estate', icon: '✨' },
    { id: 'james', name: 'James Edition', icon: '👑' },
    { id: 'manual', name: 'Manual Entry', icon: '📝' }
  ];

  const detectPlatform = (url) => {
    if (url.includes('idealista')) return 'idealista';
    if (url.includes('jamesedition')) return 'james';
    if (url.includes('luxuryestate')) return 'luxury';
    if (url.includes('google')) return 'google';
    return 'auto';
  };

  // Simulated platform-specific data extraction
  const extractPropertyData = (platform, url) => {
    const baseData = {
      address: '',
      purchasePrice: 0,
      bedrooms: 0,
      bathrooms: 0,
      squareFeet: 0,
      condition: 'Good',
      location: 'Urban',
      propertyType: 'House',
      yearBuilt: 2005,
      luxuryFeatures: false,
      poolArea: 0,
      garageSpaces: 0,
      platformData: {}
    };

    switch(platform) {
      case 'idealista':
        return {
          ...baseData,
          address: '125 Paseo de Gracia, Barcelona, Spain',
          purchasePrice: 750000,
          bedrooms: 4,
          bathrooms: 3,
          squareFeet: 2500,
          condition: 'Good',
          location: 'Urban',
          propertyType: 'Apartment',
          yearBuilt: 2010,
          platformData: {
            source: 'Idealista.com',
            reference: 'IDEA-2024-BC-125',
            energyRating: 'B',
            expenses: { community: 250, utilities: 150 },
            virtualTour: true
          }
        };
      
      case 'james':
        return {
          ...baseData,
          address: 'Villa Solaris, French Riviera, Côte d\'Azur, France',
          purchasePrice: 3500000,
          bedrooms: 6,
          bathrooms: 5,
          squareFeet: 5800,
          condition: 'Excellent',
          location: 'Urban',
          propertyType: 'Villa',
          yearBuilt: 1998,
          luxuryFeatures: true,
          poolArea: 500,
          garageSpaces: 4,
          platformData: {
            source: 'James Edition',
            reference: 'JE-FR-PACA-001',
            features: ['Swimming Pool', 'Wine Cellar', 'Home Cinema', 'Tennis Court', 'Wellness Center'],
            architecture: 'Mediterranean',
            agent: 'Luxury Properties France',
            viewType: 'Sea View, Mountain View'
          }
        };
      
      case 'luxury':
        return {
          ...baseData,
          address: '500 Park Avenue Penthouse, New York, NY',
          purchasePrice: 8500000,
          bedrooms: 5,
          bathrooms: 4,
          squareFeet: 4200,
          condition: 'Excellent',
          location: 'Urban',
          propertyType: 'Penthouse',
          yearBuilt: 2015,
          luxuryFeatures: true,
          poolArea: 0,
          garageSpaces: 3,
          platformData: {
            source: 'Luxury Estate',
            reference: 'LE-NY-PA-500',
            features: ['Concierge Service', 'Private Elevator', 'Rooftop Terrace', 'Smart Home', 'Gym'],
            location: 'Manhattan Prime',
            starRating: '5-Star',
            agent: 'Sotheby\'s International'
          }
        };
      
      case 'google':
        return {
          ...baseData,
          address: '250 Ocean Boulevard, Miami Beach, FL',
          purchasePrice: 2200000,
          bedrooms: 4,
          bathrooms: 3,
          squareFeet: 3500,
          condition: 'Good',
          location: 'Urban',
          propertyType: 'House',
          yearBuilt: 2005,
          poolArea: 400,
          garageSpaces: 2,
          platformData: {
            source: 'Google Properties',
            reference: 'GP-FL-MIB-250',
            features: ['Ocean View', 'Pool', 'Smart Home'],
            images: 25,
            streetView: true
          }
        };
      
      default:
        return baseData;
    }
  };

  const analyzeProperty = async () => {
    if (!propertyUrl && !manualInput) {
      alert('Please enter a property URL or use manual entry');
      return;
    }

    setLoading(true);
    
    let finalData;
    
    if (manualInput) {
      finalData = {
        ...manualProperty,
        purchasePrice: parseFloat(manualProperty.purchasePrice),
        bedrooms: parseInt(manualProperty.bedrooms),
        bathrooms: parseInt(manualProperty.bathrooms),
        squareFeet: parseInt(manualProperty.squareFeet),
        poolArea: parseInt(manualProperty.poolArea) || 0,
        garageSpaces: parseInt(manualProperty.garageSpaces) || 0,
        yearBuilt: parseInt(manualProperty.yearBuilt) || 2005
      };
    } else {
      const detectedPlatform = selectedPlatform === 'auto' ? detectPlatform(propertyUrl) : selectedPlatform;
      finalData = extractPropertyData(detectedPlatform, propertyUrl);
      setPlatformInfo(`Detected: ${platforms.find(p => p.id === detectedPlatform)?.name || 'Unknown Platform'}`);
    }

    const analysis = calculatePropertyAnalysis(finalData);
    
    const newProperty = {
      id: Date.now(),
      ...finalData,
      ...analysis
    };

    setProperties([...properties, newProperty]);
    setPropertyUrl('');
    setManualInput(false);
    setManualProperty({
      address: '',
      purchasePrice: '',
      bedrooms: '',
      bathrooms: '',
      squareFeet: '',
      condition: 'Good',
      location: 'Urban',
      propertyType: 'House',
      luxuryFeatures: false,
      poolArea: 0,
      garageSpaces: 0,
      yearBuilt: ''
    });
    setLoading(false);
    setSelectedProperty(newProperty);
  };

  const calculatePropertyAnalysis = (property) => {
    const purchasePrice = property.purchasePrice;
    const isLuxury = property.luxuryFeatures;
    
    // Market rent calculation - adjusted for luxury and amenities
    const baseRent = {
      1: 1500, 2: 2200, 3: 3000, 4: 4000, 5: 5200, 6: 6500
    };
    const locationMultiplier = {
      'Urban': 1.3,
      'Suburban': 1.0,
      'Rural': 0.7
    };
    
    let monthlyRent = (baseRent[property.bedrooms] || 3000) * locationMultiplier[property.location];
    
    // Luxury premium
    if (isLuxury) {
      monthlyRent *= 1.5; // 50% premium for luxury features
    }
    
    // Amenity bonuses
    if (property.poolArea > 200) monthlyRent *= 1.15;
    if (property.garageSpaces >= 3) monthlyRent *= 1.10;
    
    const summerRent = monthlyRent * 1.4;
    
    // Taxes and fees (adjusted by location)
    const closingCosts = purchasePrice * (isLuxury ? 0.08 : 0.05);
    const propertyTaxAnnual = purchasePrice * (isLuxury ? 0.015 : 0.012);
    const propertyTaxMonthly = propertyTaxAnnual / 12;
    const rentalTaxRate = isLuxury ? 0.30 : 0.25;
    
    // Monthly expenses
    const insurance = purchasePrice * (isLuxury ? 0.012 : 0.006) / 12;
    const maintenance = monthlyRent * (isLuxury ? 0.12 : 0.08);
    const vacancy = monthlyRent * 0.05;
    const utilities = property.bedrooms * 150;
    const management = monthlyRent * 0.10;
    
    // Luxury property management premium
    const luxuryManagement = isLuxury ? purchasePrice * 0.003 / 12 : 0;
    
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
    const totalMonthlyExpenses = propertyTaxMonthly + insurance + maintenance + vacancy + management + luxuryManagement;
    const monthlyNetBeforeTax = monthlyRent - totalMonthlyExpenses;
    const monthlyTaxOnRent = grossAnnualRent * rentalTaxRate / 12;
    const monthlyNetAfterTax = monthlyNetBeforeTax - monthlyTaxOnRent;
    const annualNetAfterTax = monthlyNetAfterTax * 12;
    
    // Summer short-term rental
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
    
    // Price appreciation projections
    const appreciationRate = isLuxury ? 0.04 : 0.03;
    const projections = [];
    for (let year = 1; year <= 10; year++) {
      const projectedValue = purchasePrice * Math.pow(1 + appreciationRate, year);
      const appreciationGain = projectedValue - purchasePrice;
      const totalWorth = projectedValue + (annualNetAfterTax * year);
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
    } else {
      recommendationReason.push('Strong cash flow of $' + Math.round(monthlyNetAfterTax) + '/month');
    }
    
    if (isLuxury) {
      recommendationReason.push('Luxury property with ' + appreciationRate * 100 + '% annual appreciation');
    }
    
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
      luxuryManagement: Math.round(luxuryManagement),
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
      breakEvenMonths,
      appreciationRate: appreciationRate * 100
    };
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter(p => p.id !== id));
    if (selectedProperty?.id === id) setSelectedProperty(null);
  };

  const downloadReport = (property) => {
    const report = `
╔════════════════════════════════════════════════════════════════════════════╗
║          REAL ESTATE INVESTMENT ANALYSIS REPORT - MULTI-PLATFORM           ║
╚════════════════════════════════════════════════════════════════════════════╝

📍 PROPERTY DETAILS
─────────────────────────────────────────────────────────────────────────────
Address:                  ${property.address}
Property Type:            ${property.propertyType}
Bedrooms:                 ${property.bedrooms} | Bathrooms: ${property.bathrooms}
Square Feet:              ${property.squareFeet?.toLocaleString() || 'N/A'} sq ft
Year Built:               ${property.yearBuilt}
Condition:                ${property.condition}
Location Type:            ${property.location}
${property.luxuryFeatures ? `
Luxury Status:            ✨ Premium Property
Pool Area:                ${property.poolArea} sq ft
Garage Spaces:            ${property.garageSpaces}
Features:                 ${property.platformData?.features?.join(', ') || 'N/A'}
` : ''}
Platform Source:          ${property.platformData?.source || 'Manual Entry'}

💰 PURCHASE ANALYSIS
─────────────────────────────────────────────────────────────────────────────
Purchase Price:           $${property.purchasePrice?.toLocaleString() || 'N/A'}
Closing Costs (${property.luxuryFeatures ? '8' : '5'}%):      $${property.closingCosts?.toLocaleString() || 'N/A'}
Renovation Estimate:      $${property.renovationCost?.toLocaleString() || 'N/A'}
─────────────────────────────────────────────────────────────────────────────
Total Initial Investment: $${property.totalInitialInvestment?.toLocaleString() || 'N/A'}

🏘️ RENTAL INCOME PROJECTIONS
─────────────────────────────────────────────────────────────────────────────
Monthly Long-Term Rent:   $${property.monthlyRent?.toLocaleString() || 'N/A'}
Annual Rental Income:     $${(property.monthlyRent * 12)?.toLocaleString() || 'N/A'}

🌞 SUMMER SHORT-TERM STRATEGY
─────────────────────────────────────────────────────────────────────────────
Summer Daily Rate:        $${property.summerRent?.toLocaleString() || 'N/A'}/month
Summer 3-Month Gross:     $${(property.summerRent * 3)?.toLocaleString() || 'N/A'}
Summer 3-Month Profit:    $${(property.summerMonthlyNet * 3)?.toLocaleString() || 'N/A'}

📊 MONTHLY EXPENSES
─────────────────────────────────────────────────────────────────────────────
Property Tax:             $${property.propertyTaxMonthly?.toLocaleString() || 'N/A'}
Insurance:                $${property.insurance?.toLocaleString() || 'N/A'}
Maintenance:              $${property.maintenance?.toLocaleString() || 'N/A'}
Vacancy Loss (5%):        $${property.vacancy?.toLocaleString() || 'N/A'}
Property Management:      $${property.management?.toLocaleString() || 'N/A'}
${property.luxuryManagement > 0 ? `Luxury Management:        $${property.luxuryManagement?.toLocaleString() || 'N/A'}` : ''}
─────────────────────────────────────────────────────────────────────────────
Total Monthly Expenses:   $${property.totalMonthlyExpenses?.toLocaleString() || 'N/A'}

💵 PROFIT ANALYSIS (AFTER ALL TAXES)
─────────────────────────────────────────────────────────────────────────────
Monthly Gross Rent:       $${property.monthlyRentalIncome?.toLocaleString() || 'N/A'}
Less: Monthly Expenses:   -$${property.totalMonthlyExpenses?.toLocaleString() || 'N/A'}
Net Before Tax:           $${property.monthlyNetBeforeTax?.toLocaleString() || 'N/A'}

Rental Tax (${property.luxuryFeatures ? '30' : '25'}%):          -$${property.monthlyTaxOnRent?.toLocaleString() || 'N/A'}
─────────────────────────────────────────────────────────────────────────────
Monthly Net Profit:       $${property.monthlyNetAfterTax?.toLocaleString() || 'N/A'} ✓
Annual Net Profit:        $${property.annualNetAfterTax?.toLocaleString() || 'N/A'} ✓

📈 INVESTMENT METRICS
─────────────────────────────────────────────────────────────────────────────
Cap Rate:                 ${property.capRate}%
Total ROI:                ${property.totalROI}%
Break-Even Period:        ${property.breakEvenMonths} months
Annual Appreciation:      ${property.appreciationRate}%

✅ RECOMMENDATION: ${property.recommendation}
─────────────────────────────────────────────────────────────────────────────
${property.recommendationReason?.map(r => `• ${r}`).join('\n')}

📊 10-YEAR MARKET PROJECTIONS (3-4% Annual Appreciation)
─────────────────────────────────────────────────────────────────────────────
Year | Property Value        | Appreciation Gain     | Total Worth
─────┼──────────────────────┼─────────────────────┼──────────────────────
${property.projections?.slice(0, 10).map(p => 
  `  ${p.year}  | $${p.projectedValue?.toLocaleString().padEnd(19)} | +$${p.appreciationGain?.toLocaleString().padEnd(18)} | $${p.totalWorth?.toLocaleString()}`
).join('\n')}

═════════════════════════════════════════════════════════════════════════════

Generated: ${new Date().toLocaleString()}
Analyzer: Multi-Platform Real Estate Investment Tool
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
              <div className="text-5xl">🏘️</div>
              <h1 className="text-6xl font-light text-white" style={{fontFamily: "'Playfair Display', serif"}}>
                Multi-Platform
                <span className="block text-amber-400">Real Estate Analyzer</span>
              </h1>
            </div>
            <p className="text-lg text-slate-400 max-w-3xl">Google • Idealista • Luxury Estate • James Edition • Manual Entry</p>
          </div>

          {/* Platform Selector */}
          <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              Select Property Source
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {platforms.map(platform => (
                <button
                  key={platform.id}
                  onClick={() => {
                    setSelectedPlatform(platform.id);
                    if (platform.id === 'manual') setManualInput(true);
                    else setManualInput(false);
                  }}
                  className={`py-3 px-4 rounded-lg font-semibold transition text-sm ${
                    selectedPlatform === platform.id
                      ? 'bg-amber-500/40 border-2 border-amber-400 text-amber-300'
                      : 'bg-slate-700/30 border border-slate-600/50 text-slate-300 hover:border-amber-400/50'
                  }`}
                >
                  <span className="text-lg mb-1">{platform.icon}</span>
                  <div>{platform.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Input Section */}
          {selectedPlatform !== 'manual' ? (
            <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Paste Property Link</h3>
              <p className="text-sm text-slate-400 mb-4">Paste your property URL and we'll extract all details automatically</p>
              <input
                type="text"
                placeholder="https://www.idealista.com/... or https://www.jamesedition.com/... or any supported platform"
                value={propertyUrl}
                onChange={(e) => setPropertyUrl(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition mb-4"
              />
              {platformInfo && <p className="text-sm text-cyan-400 mb-4">✓ {platformInfo}</p>}
              <button
                onClick={analyzeProperty}
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 active:scale-95"
              >
                {loading ? 'Analyzing Property...' : 'Analyze Property'}
              </button>
            </div>
          ) : (
            /* Manual Entry Form */
            <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-white mb-6">Enter Property Details</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Address"
                  value={manualProperty.address}
                  onChange={(e) => setManualProperty({...manualProperty, address: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Purchase Price ($)"
                    value={manualProperty.purchasePrice}
                    onChange={(e) => setManualProperty({...manualProperty, purchasePrice: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="number"
                    placeholder="Year Built"
                    value={manualProperty.yearBuilt}
                    onChange={(e) => setManualProperty({...manualProperty, yearBuilt: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <input
                    type="number"
                    placeholder="Bedrooms"
                    value={manualProperty.bedrooms}
                    onChange={(e) => setManualProperty({...manualProperty, bedrooms: e.target.value})}
                    className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="number"
                    placeholder="Bathrooms"
                    value={manualProperty.bathrooms}
                    onChange={(e) => setManualProperty({...manualProperty, bathrooms: e.target.value})}
                    className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="number"
                    placeholder="Square Feet"
                    value={manualProperty.squareFeet}
                    onChange={(e) => setManualProperty({...manualProperty, squareFeet: e.target.value})}
                    className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="number"
                    placeholder="Pool Area (sq ft)"
                    value={manualProperty.poolArea}
                    onChange={(e) => setManualProperty({...manualProperty, poolArea: e.target.value})}
                    className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <select
                    value={manualProperty.condition}
                    onChange={(e) => setManualProperty({...manualProperty, condition: e.target.value})}
                    className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Fair</option>
                    <option>Poor</option>
                  </select>
                  <select
                    value={manualProperty.location}
                    onChange={(e) => setManualProperty({...manualProperty, location: e.target.value})}
                    className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>Urban</option>
                    <option>Suburban</option>
                    <option>Rural</option>
                  </select>
                  <select
                    value={manualProperty.propertyType}
                    onChange={(e) => setManualProperty({...manualProperty, propertyType: e.target.value})}
                    className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Condo</option>
                    <option>Villa</option>
                    <option>Penthouse</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Garage Spaces"
                    value={manualProperty.garageSpaces}
                    onChange={(e) => setManualProperty({...manualProperty, garageSpaces: e.target.value})}
                    className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <label className="flex items-center gap-3 bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 cursor-pointer hover:border-amber-400">
                  <input
                    type="checkbox"
                    checked={manualProperty.luxuryFeatures}
                    onChange={(e) => setManualProperty({...manualProperty, luxuryFeatures: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-white">✨ This is a Luxury Property</span>
                </label>

                <button
                  onClick={analyzeProperty}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  {loading ? 'Analyzing...' : 'Analyze Property'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Properties Grid */}
        <div className="max-w-7xl mx-auto">
          {properties.length === 0 ? (
            <div className="text-center py-20">
              <Home className="w-20 h-20 text-slate-600 mx-auto mb-6" />
              <p className="text-2xl text-slate-400">No properties analyzed yet</p>
              <p className="text-slate-500 mt-2">Add your first property to begin analysis</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {properties.map(property => (
                <div
                  key={property.id}
                  onClick={() => setSelectedProperty(selectedProperty?.id === property.id ? null : property)}
                  className={`bg-gradient-to-br border rounded-2xl p-8 cursor-pointer transition-all transform hover:scale-105 ${
                    selectedProperty?.id === property.id
                      ? 'from-amber-900/30 to-orange-900/30 border-amber-500/50 ring-2 ring-amber-500/30'
                      : 'from-slate-800/30 to-slate-700/30 border-slate-700/50 hover:border-amber-500/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      {property.luxuryFeatures && <span className="text-sm text-amber-400 mb-1">✨ LUXURY PROPERTY</span>}
                      <h3 className="text-2xl font-light text-white" style={{fontFamily: "'Playfair Display', serif"}}>
                        {property.address}
                      </h3>
                      <p className="text-slate-400 text-sm">{property.bedrooms}B/{property.bathrooms}B • {property.propertyType} • {property.location}</p>
                      {property.platformData?.source && (
                        <p className="text-xs text-cyan-400 mt-1">Source: {property.platformData.source}</p>
                      )}
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

                  <div className="space-y-3">
                    <div className="bg-slate-900/50 rounded-xl p-4">
                      <p className="text-sm text-slate-400 mb-1">Purchase Price</p>
                      <p className="text-3xl font-light text-amber-400">${property.purchasePrice?.toLocaleString()}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-900/30 border border-blue-600/30 rounded-xl p-3">
                        <p className="text-xs text-blue-300 mb-1">Monthly Rent</p>
                        <p className="text-xl font-semibold text-blue-300">${property.monthlyRent?.toLocaleString()}</p>
                      </div>
                      <div className="bg-orange-900/30 border border-orange-600/30 rounded-xl p-3">
                        <p className="text-xs text-orange-300 mb-1">Summer Rate</p>
                        <p className="text-xl font-semibold text-orange-300">${property.summerRent?.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-emerald-900/30 border border-emerald-600/30 rounded-xl p-3">
                        <p className="text-xs text-emerald-300 mb-1">Monthly Profit</p>
                        <p className="text-lg font-semibold text-emerald-300">${property.monthlyNetAfterTax?.toLocaleString()}</p>
                      </div>
                      <div className="bg-purple-900/30 border border-purple-600/30 rounded-xl p-3">
                        <p className="text-xs text-purple-300 mb-1">Cap Rate</p>
                        <p className="text-lg font-semibold text-purple-300">{property.capRate}%</p>
                      </div>
                    </div>

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

          {/* Detailed Analysis */}
          {selectedProperty && (
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur border border-slate-600/50 rounded-2xl p-8 animate-in fade-in">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-4xl font-light text-white mb-2" style={{fontFamily: "'Playfair Display', serif"}}>
                    Investment Analysis
                  </h2>
                  <p className="text-slate-400">{selectedProperty.address}</p>
                  {selectedProperty.platformData?.source && (
                    <p className="text-sm text-cyan-400 mt-1">Source: {selectedProperty.platformData.source}</p>
                  )}
                </div>
                <button
                  onClick={() => downloadReport(selectedProperty)}
                  className="flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 px-4 py-2 rounded-lg font-semibold transition"
                >
                  <Download className="w-4 h-4" /> Report
                </button>
              </div>

              {/* Investment Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-slate-600/50">
                <div>
                  <h3 className="text-lg font-semibold text-slate-300 mb-4">Initial Investment</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Purchase Price</span>
                      <span className="text-white font-semibold">${selectedProperty.purchasePrice?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Closing Costs ({selectedProperty.luxuryFeatures ? '8' : '5'}%)</span>
                      <span className="text-white font-semibold">${selectedProperty.closingCosts?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Renovation Estimate</span>
                      <span className="text-white font-semibold">${selectedProperty.renovationCost?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-slate-600/30 font-semibold text-amber-400">
                      <span>Total Investment</span>
                      <span className="text-lg">${selectedProperty.totalInitialInvestment?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-300 mb-4">Rental Income</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Monthly Long-Term Rent</span>
                      <span className="text-white font-semibold">${selectedProperty.monthlyRent?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Annual Rental Income</span>
                      <span className="text-white font-semibold">${(selectedProperty.monthlyRent * 12)?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Summer Short-Term Rate</span>
                      <span className="text-orange-400 font-semibold">${selectedProperty.summerRent?.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-slate-600/30 font-semibold text-orange-400">
                      <span>Summer 3-Month Profit</span>
                      <span className="text-lg">${(selectedProperty.summerMonthlyNet * 3)?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-slate-600/50">
                <div>
                  <h3 className="text-lg font-semibold text-slate-300 mb-4">Monthly Expenses</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Property Tax</span>
                      <span>${selectedProperty.propertyTaxMonthly?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Insurance</span>
                      <span>${selectedProperty.insurance?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Maintenance</span>
                      <span>${selectedProperty.maintenance?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Vacancy Loss</span>
                      <span>${selectedProperty.vacancy?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Management</span>
                      <span>${selectedProperty.management?.toLocaleString()}</span>
                    </div>
                    {selectedProperty.luxuryManagement > 0 && (
                      <div className="flex justify-between text-slate-400">
                        <span>Luxury Management</span>
                        <span>${selectedProperty.luxuryManagement?.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-slate-600/30 text-slate-300 font-semibold">
                      <span>Total Monthly</span>
                      <span>${selectedProperty.totalMonthlyExpenses?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-300 mb-4">Profit Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Gross Rent</span>
                      <span>${selectedProperty.monthlyRentalIncome?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-red-400">
                      <span>Expenses</span>
                      <span>-${selectedProperty.totalMonthlyExpenses?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Net Before Tax</span>
                      <span>${selectedProperty.monthlyNetBeforeTax?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-red-400 border-t border-slate-600/30 pt-2">
                      <span>Rental Tax ({selectedProperty.luxuryFeatures ? '30' : '25'}%)</span>
                      <span>-${selectedProperty.monthlyTaxOnRent?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-emerald-400 border-t border-slate-600/30 pt-2 text-base">
                      <span>NET PROFIT</span>
                      <span>${selectedProperty.monthlyNetAfterTax?.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex justify-between font-semibold text-emerald-400">
                      <span>ANNUAL PROFIT</span>
                      <span>${selectedProperty.annualNetAfterTax?.toLocaleString()}/yr</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-slate-600/50">
                <div className="bg-slate-900/50 rounded-xl p-6">
                  <p className="text-sm text-slate-400 mb-2">Cap Rate</p>
                  <p className="text-3xl font-bold text-blue-400">{selectedProperty.capRate}%</p>
                  <p className="text-xs text-slate-500 mt-2">Annual return on value</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-6">
                  <p className="text-sm text-slate-400 mb-2">Total ROI</p>
                  <p className="text-3xl font-bold text-emerald-400">{selectedProperty.totalROI}%</p>
                  <p className="text-xs text-slate-500 mt-2">With renovations</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-6">
                  <p className="text-sm text-slate-400 mb-2">Annual Appreciation</p>
                  <p className="text-3xl font-bold text-purple-400">{selectedProperty.appreciationRate}%</p>
                  <p className="text-xs text-slate-500 mt-2">Market growth yearly</p>
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
                  10-Year Financial Projections
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-600/50">
                        <th className="text-left py-3 px-4 text-slate-400">Year</th>
                        <th className="text-right py-3 px-4 text-slate-400">Property Value</th>
                        <th className="text-right py-3 px-4 text-slate-400">Appreciation</th>
                        <th className="text-right py-3 px-4 text-slate-400">Rental Profits</th>
                        <th className="text-right py-3 px-4 text-slate-400 font-bold">Total Worth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProperty.projections?.slice(0, 10).map((proj) => (
                        <tr key={proj.year} className="border-b border-slate-600/30 hover:bg-slate-900/30">
                          <td className="py-3 px-4 text-white font-semibold">Year {proj.year}</td>
                          <td className="py-3 px-4 text-right text-blue-400">${proj.projectedValue?.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-emerald-400">+${proj.appreciationGain?.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-orange-400">${proj.totalRentalProfit?.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-amber-400 font-bold">${proj.totalWorth?.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500 mt-4">* Based on {selectedProperty.appreciationRate}% annual appreciation + cumulative rental income</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
