export async function getNews() {
  try {
    const response = await fetch(`http://localhost:8000/api/news`);
    
    if (!response.ok) throw new Error('Failed to fetch news');

    const data = await response.json();
    console.log('📰 News API response:', data); // ✅ Debug here
    return data.articles || []; // ✅ Ensure it's always an array
  } catch (error) {
    console.error('❌ News API error:', error.message);
    return []; // ✅ Never return null
  }
}


export async function getNewsByCategory(category = '') {
  try {
    const url = category
      ? `http://localhost:8000/api/news?category=${category}`
      : `http://localhost:8000/api/news`;

    const response = await fetch(url);

    if (!response.ok) throw new Error('Failed to fetch category news');

    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('❌ News Category API error:', error.message);
    return [];
  }
}
