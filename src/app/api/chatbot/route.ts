import { NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  sessionId: string;
  message: string;
  userId?: string;
}

interface ChatbotResponse {
  success: boolean;
  response: string;
  sessionId: string;
  extractedData?: {
    name?: string;
    phone?: string;
    vehicleType?: string;
    rentalPeriod?: string;
    budget?: string;
    location?: string;
  };
  isHotLead?: boolean;
}

const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  "http://localhost:5678/webhook/car-rental-chatbot";

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ChatbotResponse>> {
  try {
    const body: ChatMessage = await request.json();
    const { sessionId, message, userId } = body;

    if (!message || !sessionId) {
      return NextResponse.json(
        {
          success: false,
          response: "Message and session ID are required",
          sessionId,
        },
        { status: 400 },
      );
    }

    // Send to n8n webhook
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatInput: message,
        sessionId,
        userId: userId || `user_${sessionId}`,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!n8nResponse.ok) {
      console.error(
        "n8n webhook error:",
        n8nResponse.status,
        n8nResponse.statusText,
      );
      return NextResponse.json(
        {
          success: false,
          response: "Failed to process your message. Please try again.",
          sessionId,
        },
        { status: 500 },
      );
    }

    const n8nData = await n8nResponse.json();

    return NextResponse.json({
      success: true,
      response:
        n8nData.finalResponse ||
        "Thank you for your inquiry. Our team will contact you soon.",
      sessionId,
      extractedData: {
        name: n8nData.extractedName,
        phone: n8nData.extractedPhone,
        vehicleType: n8nData.extractedVehicleType,
        rentalPeriod: n8nData.extractedRentalPeriod,
        budget: n8nData.extractedBudget,
        location: n8nData.extractedLocation,
      },
      isHotLead: n8nData.isHotLead,
    });
  } catch (error) {
    console.error("Chatbot API error:", error);
    return NextResponse.json(
      {
        success: false,
        response: "An error occurred. Please try again.",
        sessionId: "error",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return NextResponse.json({ message: "Chatbot API endpoint" });
}
