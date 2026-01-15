import React from 'react';
import { formatCurrency } from '../lib/calculator';

export default function ResultsCard({
    maturityValue,
    interestEarned,
    taxDeducted,
    notionalCredit,
    accountType
}) {
    return (
        <div className="bg-surface-elevated rounded-3xl p-6 shadow-[0_4px_24px_rgba(42,10,94,0.08)]">
            <div className="mb-6">
                <p className="text-content-secondary text-sm font-medium mb-1">Maturity Value</p>
                <h2 className="text-4xl font-bold text-primary-dark">
                    {formatCurrency(maturityValue)}
                </h2>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-content-secondary">Interest Earned</span>
                    <span className="font-semibold text-success">
                        +{formatCurrency(interestEarned)}
                    </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-content-secondary">Tax Deducted (TDS)</span>
                    <span className={`font-semibold ${taxDeducted > 0 ? 'text-error' : 'text-content-primary'}`}>
                        {taxDeducted > 0 ? `-${formatCurrency(taxDeducted)}` : '₹0'}
                    </span>
                </div>

                {notionalCredit > 0 && (
                    <div className="bg-primary-light/30 rounded-xl p-4 mt-4 border border-primary-light">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-primary-dark font-semibold text-sm">HMRC Notional Tax Credit</span>
                            <span className="text-primary font-bold">
                                {formatCurrency(notionalCredit)}
                            </span>
                        </div>
                        <p className="text-xs text-primary/80">
                            Tax Sparing: Claim this credit on your UK Self-Assessment despite paying ₹0 in India.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
