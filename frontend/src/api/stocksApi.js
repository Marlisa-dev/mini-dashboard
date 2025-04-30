const BASE_URL = 'http://localhost:8000/api/stocks';

export async function getGainersLosers() {
    try {
        const response = await fetch(`${BASE_URL}/gainers-losers`);
        if (!response.ok) throw new Error('Failed to fetch gainers and losers');
        const data = await response.json();
        console.log('Gainers/Losers API response:', data); // ✅ Debug here
        return {
        top_gainers: data.top_gainers || [],
        top_losers: data.top_losers || [],
        most_actively_traded: data.most_actively_traded || [],
        };
    } catch (error) {
        console.error('❌ Gainers/Losers API error:', error.message);
        return { top_gainers: [], top_losers: [] }; // Return empty arrays on error
    }
}

export async function getRealGDP() {
    try {
        const response = await fetch(`${BASE_URL}/gdp`);
        if (!response.ok) throw new Error('Failed to Real GDP Data');
        const data = await response.json();
        console.log('Real GDP API response:', data); // ✅ Debug here
        return {
        data: data.data || [],
        };
    } catch (error) {
        console.error('❌ Gainers/Losers API error:', error.message);
        return { data: [] }; // Return empty arrays on error
    }
}

export async function getInflationRates() {
    try {
        const response = await fetch(`${BASE_URL}/inflation`);
        if (!response.ok) throw new Error('Failed to Inflation Rates Data');
        const data = await response.json();
        console.log('Inflation Rates response:', data); // ✅ Debug here
        return {
        data: data.data || [],
        };
    } catch (error) {
        console.error('❌ Inflation Rates API error:', error.message);
        return { data: [] }; // Return empty arrays on error
    }
}
