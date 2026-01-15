import React from 'react';
import { CONSTANTS } from '../lib/calculator';

export default function ComparisonTable({ selectedRate, onRateSelect }) {
    const banks = [
        { name: 'Aspora (Shivalik Bank)', rate: CONSTANTS.RATES.ASPORA, highlight: true },
        { name: 'IDFC First Bank', rate: CONSTANTS.RATES.IDFC },
        { name: 'RBL Bank', rate: CONSTANTS.RATES.RBL },
        { name: 'Yes Bank', rate: CONSTANTS.RATES.YES },
        { name: 'Legacy (SBI/HDFC)', rate: CONSTANTS.RATES.LEGACY },
    ];

    return (
        <div className="mt-8 bg-surface-elevated rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-primary-dark mb-4">Market Comparison</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-content-tertiary font-medium border-b border-gray-100">
                        <tr>
                            <th className="py-2 pl-4 w-10"></th>
                            <th className="py-2 pl-2">Bank</th>
                            <th className="py-2 pr-4 text-right">Interest Rate</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {banks.map((bank, index) => {
                            const isSelected = selectedRate === bank.rate;
                            return (
                                <tr
                                    key={index}
                                    className={`cursor-pointer transition-all ${isSelected ? 'bg-primary-dark/5' : 'hover:bg-gray-50'}`}
                                    onClick={() => onRateSelect(bank.rate)}
                                >
                                    <td className="py-4 pl-4 first:rounded-l-2xl">
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'border-primary-dark' : 'border-gray-300'}`}>
                                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary-dark"></div>}
                                        </div>
                                    </td>
                                    <td className={`py-4 pl-2 ${isSelected ? 'font-bold text-primary-dark' : 'text-content-secondary'}`}>
                                        {bank.name}
                                        {bank.highlight && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Best</span>}
                                    </td>
                                    <td className={`py-4 pr-4 text-right last:rounded-r-2xl ${isSelected ? 'font-bold text-primary-dark' : 'text-content-secondary'}`}>
                                        {(bank.rate * 100).toFixed(2)}%
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
