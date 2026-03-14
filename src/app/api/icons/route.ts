import { NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_FREEPIK_API_KEY;
const API_BASE_URL = 'https://api.freepik.com/v1';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const id = searchParams.get('id');

  if (!API_KEY) {
    return NextResponse.json({ error: 'API Key not configured' }, { status: 500 });
  }

  try {
    let endpoint = '';
    if (id) {
       // Get specific icon download link
       endpoint = `${API_BASE_URL}/icons/${id}/download`;
    } else if (query) {
       // Search for icons
       // Defaulting to professional styles if no specific terms provided
       endpoint = `${API_BASE_URL}/icons?term=${encodeURIComponent(query)}&filters[styles]=lineal-color&limit=1`;
    } else {
       return NextResponse.json({ error: 'Missing query or id' }, { status: 400 });
    }

    const response = await fetch(endpoint, {
      headers: {
        'x-freepik-api-key': API_KEY,
        'Accept-Language': 'en-US',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Freepik Proxy Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
