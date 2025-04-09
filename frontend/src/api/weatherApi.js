export async function getWeather(city) {
    try {
      const response = await fetch(`http://localhost:5000/api/weather?city=${city}`);
      if (!response.ok) throw new Error('Failed to fetch weather data');
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Weather API error:', error.message);
      return null;
    }
  }
  