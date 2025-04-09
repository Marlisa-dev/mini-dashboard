export async function getWeather(city) {
    try {
      const response = await fetch(`http://localhost:8000/api/weather?city=${city}&days=3&aqi=no&alerts=yes`);
      
      if (!response.ok) throw new Error('Failed to fetch weather data');
  
      const data = await response.json();
      console.log('Weather API response:', data);
      return data;
    } catch (error) {
      console.error('Weather API error:', error.message);
      return null;
    }
  }
  