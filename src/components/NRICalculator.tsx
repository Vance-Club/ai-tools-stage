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
  const [years, setYears] = useState(1);
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  const [isUKResident, setIsUKResident] = useState(false);

  // Calculate tenure in years
  const tenureInYears = useMemo(() => {
    return years + (months / 12) + (days / 365);
  }, [years, months, days]);

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

  // Handle tenure input
  const handleTenureInput = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    max: number
  ) => (value: string) => {
    const num = parseInt(value, 10) || 0;
    setter(Math.min(Math.max(0, num), max));
  };

  return (
    <>
      <style>{`
        .calc-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px;
        }

        @media (max-width: 850px) {
          .calc-container {
            padding: 24px 16px;
          }
        }

        .calc-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .calc-header h1 {
          font-size: 32px;
          font-weight: 700;
          color: var(--fills-primary-500, #5523B2);
          margin-bottom: 8px;
        }

        .calc-header p {
          font-size: 16px;
          color: var(--text-base-500, #666);
        }

        .calc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        @media (max-width: 850px) {
          .calc-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .calc-card {
          background: white;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(85, 35, 178, 0.08);
        }

        @media (max-width: 850px) {
          .calc-card {
            padding: 24px 20px;
            border-radius: 16px;
          }
        }

        .calc-section {
          margin-bottom: 28px;
        }

        .calc-section:last-child {
          margin-bottom: 0;
        }

        .calc-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-base-600, #0E0F11);
          margin-bottom: 12px;
          display: block;
        }

        .calc-sublabel {
          font-size: 13px;
          color: var(--text-base-400, rgba(14, 15, 17, 0.45));
          margin-top: 4px;
        }

        .account-toggle {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .tenure-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
        }

        .tenure-field {
          display: flex;
          flex-direction: column;
        }

        .tenure-field label {
          font-size: 12px;
          color: var(--text-base-400, rgba(14, 15, 17, 0.45));
          margin-bottom: 6px;
        }

        .tenure-input {
          width: 100%;
          padding: 12px;
          border: 1px solid var(--fills-gray-400, #C7C7CC);
          border-radius: 12px;
          font-size: 16px;
          font-family: 'Inter', sans-serif;
          text-align: center;
          outline: none;
          transition: border-color 0.2s;
        }

        .tenure-input:focus {
          border-color: var(--fills-primary-500, #5523B2);
        }

        .uk-toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          background: var(--fills-gray-100, #F2F2F7);
          border-radius: 12px;
        }

        .uk-toggle-info {
          flex: 1;
        }

        .uk-toggle-title {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-base-600, #0E0F11);
        }

        .uk-toggle-desc {
          font-size: 12px;
          color: var(--text-base-400, rgba(14, 15, 17, 0.45));
          margin-top: 2px;
        }

        .results-card {
          background: linear-gradient(135deg, var(--fills-primary-500, #5523B2) 0%, var(--fills-primary-600, #43149B) 100%);
          color: white;
        }

        .result-hero {
          text-align: center;
          padding: 24px 0;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          margin-bottom: 24px;
        }

        .result-hero-label {
          font-size: 14px;
          opacity: 0.8;
          margin-bottom: 8px;
        }

        .result-hero-value {
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        @media (max-width: 850px) {
          .result-hero-value {
            font-size: 28px;
          }
        }

        .result-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .result-row:last-child {
          border-bottom: none;
        }

        .result-row-label {
          font-size: 14px;
          opacity: 0.8;
        }

        .result-row-value {
          font-size: 16px;
          font-weight: 600;
        }

        .result-row-value.positive {
          color: #4ADE80;
        }

        .result-row-value.negative {
          color: #F87171;
        }

        .notional-credit-box {
          background: rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 16px;
          margin-top: 20px;
        }

        .notional-credit-title {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .notional-credit-values {
          display: flex;
          gap: 16px;
          margin-bottom: 8px;
        }

        .notional-credit-value {
          font-size: 18px;
          font-weight: 700;
        }

        .notional-credit-desc {
          font-size: 11px;
          opacity: 0.7;
          line-height: 1.4;
        }

        .comparison-section {
          margin-top: 32px;
        }

        .comparison-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-base-600, #0E0F11);
          margin-bottom: 16px;
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(85, 35, 178, 0.06);
        }

        .comparison-table th,
        .comparison-table td {
          padding: 14px 16px;
          text-align: left;
          font-size: 14px;
        }

        .comparison-table th {
          background: var(--fills-gray-100, #F2F2F7);
          font-weight: 600;
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
          padding: 4px 8px;
          background: var(--fills-gray-200, #E5E5EA);
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
        }

        .hero-row .rate-badge {
          background: var(--fills-primary-500, #5523B2);
          color: white;
        }

        @media (max-width: 600px) {
          .comparison-table th,
          .comparison-table td {
            padding: 12px 10px;
            font-size: 13px;
          }
        }

        .principal-input-wrapper {
          margin-bottom: 16px;
        }

        .principal-display {
          font-size: 24px;
          font-weight: 600;
          color: var(--fills-primary-500, #5523B2);
          text-align: center;
          margin-bottom: 12px;
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
                  label="NRE SA"
                  selected={accountType === 'NRE'}
                  onClick={() => setAccountType('NRE')}
                  size="medium"
                />
                <Selector
                  label="NRO SA"
                  selected={accountType === 'NRO'}
                  onClick={() => setAccountType('NRO')}
                  size="medium"
                />
              </div>
              <p className="calc-sublabel">
                {accountType === 'NRE'
                  ? 'Tax-free in India'
                  : 'Income generated in India (Rent/Dividends)'}
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
              <div className="tenure-grid">
                <div className="tenure-field">
                  <label>Years</label>
                  <input
                    type="number"
                    className="tenure-input"
                    value={years}
                    onChange={(e) => handleTenureInput(setYears, 10)(e.target.value)}
                    min={0}
                    max={10}
                  />
                </div>
                <div className="tenure-field">
                  <label>Months</label>
                  <input
                    type="number"
                    className="tenure-input"
                    value={months}
                    onChange={(e) => handleTenureInput(setMonths, 11)(e.target.value)}
                    min={0}
                    max={11}
                  />
                </div>
                <div className="tenure-field">
                  <label>Days</label>
                  <input
                    type="number"
                    className="tenure-input"
                    value={days}
                    onChange={(e) => handleTenureInput(setDays, 30)(e.target.value)}
                    min={0}
                    max={30}
                  />
                </div>
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
    </>
  );
};

export default NRICalculator;
