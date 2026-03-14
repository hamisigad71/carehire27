import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || "car";
  const limit = searchParams.get("limit") || "5";

  if (!process.env.NEXT_PUBLIC_FREEPIK_API_KEY) {
    return NextResponse.json(
      { error: "Freepik API key not configured" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      `https://api.freepik.com/v1/resources?query=${encodeURIComponent(query)}&limit=${limit}&locale=en`,
      {
        headers: {
          "x-freepik-api-key": process.env.NEXT_PUBLIC_FREEPIK_API_KEY,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Freepik API responded with ${response.status}`);
    }

    const data = await response.json();

    // Extract image URLs from Freepik response
    const images =
      data.data?.map((item: any) => ({
        id: item.id,
        url: item.previews?.[0]?.url || item.url,
        title: item.title,
        source: "freepik",
      })) || [];

    return NextResponse.json({ images, total: data.total });
  } catch (error) {
    console.error("Freepik API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch images from Freepik" },
      { status: 500 },
    );
  }
}
