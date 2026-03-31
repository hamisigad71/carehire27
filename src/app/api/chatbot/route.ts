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

    const textData = await n8nResponse.text();
    let n8nData;

    try {
      n8nData = JSON.parse(textData);
      console.log("[N8N RAW RESPONSE]:", textData);
    } catch (e) {
      console.log("n8n didn't return JSON. It returned:", textData);
      return NextResponse.json({
        success: true,
        response: `⚠️ **n8n Test Mode Warning:**\n\nWe connected successfully, but n8n didn't send a valid AI response back.\n\nThis almost always happens because you clicked "Listen for test event" from *inside* the Webhook node's settings panel, which only runs that single node.\n\nPlease close the Webhook settings panel so you can see your entire workflow, and click the **"Test Workflow"** button at the bottom of the screen instead!`,
        sessionId,
      });
    }

    // n8n might return an array if using 'allIncomingItems' or wrapping expressions.
    const dataObj = Array.isArray(n8nData) ? n8nData[0] : n8nData;

    return NextResponse.json({
      success: true,
      response:
        dataObj?.finalResponse ||
        dataObj?.output ||
        "Thank you for your inquiry. Our team will contact you soon.",
      sessionId,
      extractedData: {
        name: dataObj?.extractedName,
        phone: dataObj?.extractedPhone,
        vehicleType: dataObj?.extractedVehicleType,
        rentalPeriod: dataObj?.extractedRentalPeriod,
        budget: dataObj?.extractedBudget,
        location: dataObj?.extractedLocation,
      },
      isHotLead: dataObj?.isHotLead,
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
