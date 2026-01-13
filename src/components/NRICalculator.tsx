/**
 * NRI Banking Calculator
 * Uses Aspora Design System components
 */

import React, { useState, useMemo } from 'react';
import { Toggle } from '../../components/Toggle';
import { Selector } from '../../components/Selector';
import { Slider } from '../../components/Slider';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';

// Constants
const INTEREST_RATE = 0.073; // 7.30%
const NRO_TAX_STANDARD = 0.312; // 31.2%
const NRO_TAX_DTAA = 0.15; // 15% with DTAA
const GBP_RATE = 120.91; // £1 = ₹120.91

const BANK_RATES = [
  { name: 'Aspora', rate: 7.30, isHero: true },
  { name: 'Shivalik Bank', rate: 7.30, isHero: false },
  { name: 'IDFC First Bank', rate: 7.25, isHero: false },
  { name: 'RBL Bank', rate: 6.50, isHero: false },
  { name: 'Yes Bank', rate: 6.25, isHero: false },
  { name: 'SBI/HDFC', rate: 3.50, isHero: false },
];

// Format number in Indian locale (1,00,000)
const formatINR = (num: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
};

const formatGBP = (num: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(num);
};

// Parse Indian formatted number string to number
const parseINRInput = (value: string): number => {
  const cleaned = value.replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
};

export const NRICalculator: React.FC = () => {
  // State
  const [accountType, setAccountType] = useState<'NRE' | 'NRO'>('NRE');
  const [principal, setPrincipal] = useState(500000);
  const [principalInput, setPrincipalInput] = useState('5,00,000');
  const [tenureMonths, setTenureMonths] = useState(12); // 3-month quantum, default 1 year
  const [isUKResident, setIsUKResident] = useState(false);

  // Calculate tenure in years from months
  const tenureInYears = useMemo(() => {
    return tenureMonths / 12;
  }, [tenureMonths]);

  // Format tenure display
  const formatTenure = (months: number): string => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${remainingMonths} months`;
    if (remainingMonths === 0) return years === 1 ? '1 year' : `${years} years`;
    return `${years}y ${remainingMonths}m`;
  };

  // Calculate results
  const results = useMemo(() => {
    const interest = principal * INTEREST_RATE * tenureInYears;

    let taxRate = 0;
    if (accountType === 'NRO') {
      taxRate = isUKResident ? NRO_TAX_DTAA : NRO_TAX_STANDARD;
    }

    const tax = interest * taxRate;
    const maturity = principal + interest - tax;

    // Notional credit (only for NRE + UK resident)
    const notionalCredit = (accountType === 'NRE' && isUKResident)
      ? interest * 0.15
      : 0;

    return {
      interest,
      tax,
      maturity,
      notionalCredit,
      notionalCreditGBP: notionalCredit / GBP_RATE,
      taxRate: taxRate * 100,
    };
  }, [principal, tenureInYears, accountType, isUKResident]);

  // Bank comparison calculations
  const bankComparisons = useMemo(() => {
    return BANK_RATES.map(bank => {
      const interest = principal * (bank.rate / 100) * tenureInYears;
      let taxRate = 0;
      if (accountType === 'NRO') {
        taxRate = isUKResident ? NRO_TAX_DTAA : NRO_TAX_STANDARD;
      }
      const tax = interest * taxRate;
      const maturity = principal + interest - tax;

      return {
        ...bank,
        interest,
        maturity,
      };
    });
  }, [principal, tenureInYears, accountType, isUKResident]);

  // Handle principal input change
  const handlePrincipalInputChange = (value: string) => {
    setPrincipalInput(value);
    const numValue = parseINRInput(value);
    if (numValue >= 50000 && numValue <= 100000000) {
      setPrincipal(numValue);
    }
  };

  // Handle slider change
  const handleSliderChange = (value: number) => {
    setPrincipal(value);
    setPrincipalInput(value.toLocaleString('en-IN'));
  };

  // Handle tenure slider change (3-month quantum)
  const handleTenureChange = (value: number) => {
    setTenureMonths(value);
  };

  return (
    <>
      <style>{`
        .calc-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px 16px;
        }

        @media (max-width: 600px) {
          .calc-container {
            padding: 16px;
          }
        }

        .calc-header {
          text-align: center;
          margin-bottom: 16px;
        }

        @media (max-width: 600px) {
          .calc-header {
            margin-bottom: 12px;
          }
        }

        .calc-header h1 {
          font: var(--font-heading-h4);
          color: var(--fills-primary-500, #5523B2);
          margin-bottom: 2px;
        }

        .calc-header p {
          font: var(--font-body-m-regular);
          color: var(--text-base-500, #666);
        }

        .calc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 700px) {
          .calc-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        .calc-card {
          background: white;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 2px 12px rgba(85, 35, 178, 0.08);
        }

        @media (max-width: 600px) {
          .calc-card {
            padding: 14px;
            border-radius: 10px;
          }
        }

        .calc-section {
          margin-bottom: 14px;
        }

        @media (max-width: 600px) {
          .calc-section {
            margin-bottom: 12px;
          }
        }

        .calc-section:last-child {
          margin-bottom: 0;
        }

        .calc-label {
          font: var(--font-body-m-medium);
          color: var(--text-base-600, #0E0F11);
          margin-bottom: 8px;
          display: block;
        }

        .calc-sublabel {
          font: var(--font-caption-1-regular);
          color: var(--text-base-400, rgba(14, 15, 17, 0.45));
          margin-top: 4px;
        }

        .account-toggle {
          display: flex;
          gap: 6px;
        }

        .tenure-display {
          font: var(--font-body-xl-semibold);
          color: var(--fills-primary-500, #5523B2);
          text-align: center;
          margin-bottom: 8px;
        }

        .tenure-range {
          display: flex;
          justify-content: space-between;
          font: var(--font-caption-1-regular);
          color: var(--text-base-400, rgba(14, 15, 17, 0.45));
          margin-top: 4px;
        }

        .uk-toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .uk-toggle-info {
          flex: 1;
          min-width: 0;
        }

        .uk-toggle-title {
          font: var(--font-body-m-medium);
          color: var(--text-base-600, #0E0F11);
        }

        .uk-toggle-desc {
          font: var(--font-caption-1-regular);
          color: var(--text-base-400, rgba(14, 15, 17, 0.45));
          margin-top: 2px;
        }

        .results-card {
          background: linear-gradient(135deg, var(--fills-primary-500, #5523B2) 0%, var(--fills-primary-600, #43149B) 100%);
          color: white;
        }

        .result-hero {
          text-align: center;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          margin-bottom: 12px;
        }

        .result-hero-label {
          font: var(--font-caption-1-regular);
          opacity: 0.8;
          margin-bottom: 4px;
        }

        .result-hero-value {
          font: var(--font-heading-h2);
        }

        .result-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .result-row:last-child {
          border-bottom: none;
        }

        .result-row-label {
          font: var(--font-body-m-regular);
          opacity: 0.8;
        }

        .result-row-value {
          font: var(--font-body-m-bold);
        }

        .result-row-value.positive {
          color: #4ADE80;
        }

        .result-row-value.negative {
          color: #F87171;
        }

        .notional-credit-box {
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 10px;
          margin-top: 10px;
        }

        .notional-credit-title {
          font: var(--font-caption-1-emphasized);
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .notional-credit-values {
          display: flex;
          gap: 10px;
          margin-bottom: 4px;
        }

        .notional-credit-value {
          font: var(--font-body-m-bold);
        }

        .notional-credit-desc {
          font: var(--font-caption-1-regular);
          opacity: 0.7;
        }

        .comparison-section {
          margin-top: 16px;
        }

        @media (max-width: 600px) {
          .comparison-section {
            margin-top: 12px;
          }
        }

        .comparison-title {
          font: var(--font-heading-h4);
          color: var(--text-base-600, #0E0F11);
          margin-bottom: 8px;
        }

        .comparison-table-wrapper {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(85, 35, 178, 0.06);
        }

        .comparison-table {
          width: 100%;
          min-width: 360px;
          border-collapse: collapse;
          background: white;
        }

        .comparison-table th,
        .comparison-table td {
          padding: 8px 10px;
          text-align: left;
          font: var(--font-body-m-regular);
          white-space: nowrap;
        }

        @media (max-width: 600px) {
          .comparison-table th,
          .comparison-table td {
            padding: 6px 8px;
            font: var(--font-caption-1-regular);
          }
        }

        .comparison-table th {
          background: var(--fills-gray-100, #F2F2F7);
          font: var(--font-caption-1-emphasized);
          color: var(--text-base-500, #666);
        }

        .comparison-table td {
          border-bottom: 1px solid var(--fills-gray-200, #E5E5EA);
        }

        .comparison-table tr:last-child td {
          border-bottom: none;
        }

        .comparison-table .hero-row {
          background: linear-gradient(90deg, rgba(85, 35, 178, 0.08) 0%, rgba(85, 35, 178, 0.02) 100%);
        }

        .comparison-table .hero-row td {
          font-weight: 600;
          color: var(--fills-primary-500, #5523B2);
        }

        .comparison-table .bank-name {
          font-weight: 500;
        }

        .comparison-table .rate-badge {
          display: inline-block;
          padding: 2px 5px;
          background: var(--fills-gray-200, #E5E5EA);
          border-radius: 4px;
          font: var(--font-caption-1-emphasized);
        }

        .hero-row .rate-badge {
          background: var(--fills-primary-500, #5523B2);
          color: white;
        }

        .principal-display {
          font: var(--font-body-xl-bold);
          color: var(--fills-primary-500, #5523B2);
          text-align: center;
          margin-bottom: 6px;
        }
      `}</style>

      <div className="calc-container">
        <header className="calc-header">
          <h1>NRI Banking Calculator</h1>
          <p>Estimate returns on your NRE/NRO savings account</p>
        </header>

        <div className="calc-grid">
          {/* Input Card */}
          <div className="calc-card">
            {/* Account Type */}
            <div className="calc-section">
              <span className="calc-label">Account Type</span>
              <div className="account-toggle">
                <Selector
                  label="NRE Account"
                  selected={accountType === 'NRE'}
                  onClick={() => setAccountType('NRE')}
                  size="small"
                />
                <Selector
                  label="NRO Account"
                  selected={accountType === 'NRO'}
                  onClick={() => setAccountType('NRO')}
                  size="small"
                />
              </div>
              <p className="calc-sublabel">
                {accountType === 'NRE'
                  ? 'Tax-free in India'
                  : 'Indian income (Rent/Dividends)'}
              </p>
            </div>

            {/* Principal Amount */}
            <div className="calc-section">
              <span className="calc-label">Principal Amount</span>
              <div className="principal-display">
                {formatINR(principal)}
              </div>
              <Slider
                value={principal}
                onChange={handleSliderChange}
                min={50000}
                max={100000000}
                step={50000}
                type="single"
              />
              <p className="calc-sublabel">₹50,000 to ₹10 Crores</p>
            </div>

            {/* Tenure */}
            <div className="calc-section">
              <span className="calc-label">Tenure</span>
              <div className="tenure-display">
                {formatTenure(tenureMonths)}
              </div>
              <Slider
                value={tenureMonths}
                onChange={handleTenureChange}
                min={3}
                max={120}
                step={3}
                type="single"
              />
              <div className="tenure-range">
                <span>3 months</span>
                <span>10 years</span>
              </div>
            </div>

            {/* UK Resident Toggle */}
            <div className="calc-section">
              <div className="uk-toggle-row">
                <div className="uk-toggle-info">
                  <div className="uk-toggle-title">UK Resident?</div>
                  <div className="uk-toggle-desc">
                    {accountType === 'NRE'
                      ? 'Enable HMRC Notional Credit (Tax Sparing)'
                      : 'Apply DTAA benefit (15% TDS instead of 31.2%)'}
                  </div>
                </div>
                <Toggle
                  checked={isUKResident}
                  onChange={setIsUKResident}
                  size="large"
                />
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="calc-card results-card">
            <div className="result-hero">
              <div className="result-hero-label">Maturity Value</div>
              <div className="result-hero-value">{formatINR(results.maturity)}</div>
            </div>

            <div className="result-row">
              <span className="result-row-label">Principal</span>
              <span className="result-row-value">{formatINR(principal)}</span>
            </div>

            <div className="result-row">
              <span className="result-row-label">Interest Earned (7.30% p.a.)</span>
              <span className="result-row-value positive">+{formatINR(results.interest)}</span>
            </div>

            <div className="result-row">
              <span className="result-row-label">
                Tax Deducted {results.taxRate > 0 ? `(${results.taxRate}%)` : ''}
              </span>
              <span className={`result-row-value ${results.tax > 0 ? 'negative' : ''}`}>
                {results.tax > 0 ? `-${formatINR(results.tax)}` : '₹0'}
              </span>
            </div>

            {/* Notional Credit - Only for NRE + UK Resident */}
            {accountType === 'NRE' && isUKResident && results.notionalCredit > 0 && (
              <div className="notional-credit-box">
                <div className="notional-credit-title">
                  <span>✨</span> HMRC Notional Credit
                </div>
                <div className="notional-credit-values">
                  <span className="notional-credit-value">{formatINR(results.notionalCredit)}</span>
                  <span className="notional-credit-value">{formatGBP(results.notionalCreditGBP)}</span>
                </div>
                <p className="notional-credit-desc">
                  Tax Sparing: Claim this 15% credit on your UK Self-Assessment despite paying ₹0 in India.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="comparison-section">
          <h2 className="comparison-title">Compare with Other Banks</h2>
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Bank</th>
                  <th>Rate</th>
                  <th>Interest</th>
                  <th>Maturity</th>
                </tr>
              </thead>
              <tbody>
                {bankComparisons.map((bank) => (
                  <tr key={bank.name} className={bank.isHero ? 'hero-row' : ''}>
                    <td className="bank-name">{bank.name}</td>
                    <td>
                      <span className="rate-badge">{bank.rate.toFixed(2)}%</span>
                    </td>
                    <td>{formatINR(bank.interest)}</td>
                    <td>{formatINR(bank.maturity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default NRICalculator;
