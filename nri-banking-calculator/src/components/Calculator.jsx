import React, { useState, useEffect } from 'react';
import { CONSTANTS, calculateInterest, calculateTax, calculateMaturity, getNotionalCredit, formatCurrency } from '../lib/calculator';
import ResultsCard from './ResultsCard';
import ComparisonTable from './ComparisonTable';
import Slider from './Slider';
import Toggle from './Toggle';

export default function Calculator() {
    const [accountType, setAccountType] = useState('NRE'); // NRE | NRO
    const [principal, setPrincipal] = useState(100000);
    const [years, setYears] = useState(1);
    const [months, setMonths] = useState(0);
    const [days, setDays] = useState(0);
    const [isUKResident, setIsUKResident] = useState(false);
    const [selectedRate, setSelectedRate] = useState(CONSTANTS.RATES.ASPORA);

    const [results, setResults] = useState({
        interest: 0,
        tax: 0,
        maturity: 0,
        notionalCredit: 0
    });

    useEffect(() => {
        const totalYears = Number(years) + (Number(months) / 12) + (Number(days) / 365);
        const rate = selectedRate;

        // Logic: Interest is calculated on Principal
        // But tax depends on Account Type + Residency

        const interest = calculateInterest(principal, rate, totalYears);
        const tax = calculateTax(interest, accountType, isUKResident);
        const maturity = calculateMaturity(principal, interest, tax);
        const notionalCredit = getNotionalCredit(interest, accountType, isUKResident);

        setResults({
            interest,
            tax,
            maturity,
            notionalCredit
        });

    }, [principal, years, months, days, accountType, isUKResident, selectedRate]);

    const handlePrincipalChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setPrincipal(Number(value));
    };

    const formatInputDisplay = (val) => {
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Controls */}
                <div className="lg:col-span-7 space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-primary-dark mb-2">ROI Calculator</h1>
                        <p className="text-content-secondary">Calculate your returns with India's best interest rates.</p>
                    </div>

                    {/* Account Type Toggle & Info */}
                    <div className="space-y-3">
                        <div className="bg-surface-elevated p-1 rounded-full inline-flex border border-gray-200 relative z-10">
                            <button
                                onClick={() => setAccountType('NRE')}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${accountType === 'NRE'
                                    ? 'bg-primary-dark text-white shadow-md'
                                    : 'text-content-secondary hover:text-content-primary'
                                    }`}
                            >
                                NRE Savings
                            </button>
                            <button
                                onClick={() => setAccountType('NRO')}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${accountType === 'NRO'
                                    ? 'bg-primary-dark text-white shadow-md'
                                    : 'text-content-secondary hover:text-content-primary'
                                    }`}
                            >
                                NRO Savings
                            </button>
                        </div>

                        <div className="relative bg-[#EDEFFE] p-4 rounded-xl border border-[#DADEFD] text-sm text-info transition-all">
                            {/* Tooltip Triangle */}
                            <div
                                className={`absolute -top-[7px] w-3 h-3 bg-[#EDEFFE] border-l border-t border-[#DADEFD] transform rotate-45 transition-all duration-300 ease-out z-0`}
                                style={{ left: accountType === 'NRE' ? '48px' : '174px' }}
                            ></div>
                            <div className="relative z-10">
                                {accountType === 'NRE'
                                    ? "Tax-free in India. Best for foreign income."
                                    : "Income generated in India (Rent/Dividends). Subject to TDS."}
                            </div>
                        </div>
                    </div>

                    {/* Principal Input */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-content-primary">Investment Amount</label>
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-content-tertiary font-medium">₹</span>
                                <input
                                    type="text"
                                    value={formatInputDisplay(principal)}
                                    onChange={handlePrincipalChange}
                                    className="w-full pl-8 pr-4 py-3 bg-surface-elevated border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold text-lg hover:border-primary/50"
                                />
                            </div>
                        </div>
                        <Slider
                            min={50000}
                            max={100000000}
                            step={10000}
                            value={principal}
                            onValueChange={setPrincipal}
                            aria-label="Investment Amount"
                        />
                        <div className="flex justify-between text-xs text-content-tertiary font-medium">
                            <span>₹50k</span>
                            <span>₹10Cr</span>
                        </div>
                    </div>

                    {/* Tenure Selection */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-content-primary">Duration</label>
                            <span className="text-primary-dark font-bold text-lg">
                                {years} Years {months} Months
                            </span>
                        </div>

                        {/* Duration Slider */}
                        <div className="pt-2">
                            <Slider
                                min={0}
                                max={120} // 10 years in months
                                step={1}
                                value={(years * 12) + months}
                                onValueChange={(totalMonths) => {
                                    setYears(Math.floor(totalMonths / 12));
                                    setMonths(totalMonths % 12);
                                }}
                                aria-label="Duration"
                            />
                            <div className="flex justify-between text-xs text-content-tertiary font-medium mt-2">
                                <span>0 Months</span>
                                <span>10 Years</span>
                            </div>
                        </div>
                    </div>

                    {/* UK Resident Toggle */}
                    <div className="flex items-center justify-between bg-surface-elevated p-4 rounded-xl border border-gray-100 shadow-sm cursor-pointer" onClick={() => setIsUKResident(!isUKResident)}>
                        <div>
                            <span className="block font-medium text-content-primary">Are you a UK Resident?</span>
                            <span className="text-xs text-content-secondary">Enables DTAA benefits & tax credits</span>
                        </div>
                        <Toggle
                            checked={isUKResident}
                            onChange={setIsUKResident}
                            aria-label="UK Resident Toggle"
                        />
                    </div>

                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5">
                    <div className="sticky top-8 space-y-6">
                        <ResultsCard
                            maturityValue={results.maturity}
                            interestEarned={results.interest}
                            taxDeducted={results.tax}
                            notionalCredit={results.notionalCredit}
                            accountType={accountType}
                        />
                        <ComparisonTable
                            selectedRate={selectedRate}
                            onRateSelect={setSelectedRate}
                        />
                        <p className="text-xs text-content-tertiary text-center leading-relaxed">
                            *Disclaimer: Interest rates are subject to periodic changes. The calculations provided are estimates and for informational purposes only.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
