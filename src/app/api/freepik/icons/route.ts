import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || "icon";
  const limit = searchParams.get("limit") || "1";

  if (!process.env.NEXT_PUBLIC_FREEPIK_API_KEY) {
    return NextResponse.json(
      { icons: [], error: "API key not configured", fallback: true },
      { status: 200 },
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
      console.warn(
        `Freepik API error: ${response.status} for query "${query}"`,
      );
      return NextResponse.json(
        { icons: [], error: `API error ${response.status}`, fallback: true },
        { status: 200 },
      );
    }

    const data = await response.json();

    const icons =
      data.data?.map((item: any) => ({
        id: item.id,
        url: item.previews?.[0]?.url || item.url,
        title: item.title,
        source: "freepik",
      })) || [];

    return NextResponse.json({
      icons,
      total: data.total || 0,
      fallback: false,
    });
  } catch (error) {
    console.warn("Freepik API fetch error:", error);
    // Don't fail - return empty array and let component use fallback
    return NextResponse.json(
      { icons: [], error: "Failed to fetch", fallback: true },
      { status: 200 },
    );
  }
}
