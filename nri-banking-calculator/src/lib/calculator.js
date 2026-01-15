
export const CONSTANTS = {
    RATES: {
        ASPORA: 0.073, // 7.30%
        SHIVALIK: 0.073,
        IDFC: 0.0725,
        RBL: 0.065,
        YES: 0.0625,
        LEGACY: 0.035,
    },
    TAX: {
        NRE: 0,
        NRO_STANDARD: 0.312,
        NRO_DTAA: 0.15,
        NRE_TAX_SPARING: 0.15, // Notional credit rate
    },
    EXCHANGE_RATE: 120.91, // GBP to INR
};

export function calculateInterest(principal, rate, years) {
    return principal * rate * years;
}

export function calculateTax(interest, accountType, isUKResident) {
    if (accountType === 'NRE') return 0;

    // NRO Case
    const taxRate = isUKResident ? CONSTANTS.TAX.NRO_DTAA : CONSTANTS.TAX.NRO_STANDARD;
    return interest * taxRate;
}

export function calculateMaturity(principal, interest, tax) {
    return principal + interest - tax;
}

export function getNotionalCredit(interest, accountType, isUKResident) {
    if (accountType === 'NRE' && isUKResident) {
        return interest * CONSTANTS.TAX.NRE_TAX_SPARING;
    }
    return 0;
}

export function formatCurrency(amount, currency = 'INR') {
    if (currency === 'GBP') {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 2
        }).format(amount);
    }

    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}
