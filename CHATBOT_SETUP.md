# Chatbot Integration Setup Guide

## Overview

This car-hire application now includes an integrated chatbot powered by n8n. The chatbot helps customers inquire about vehicle rentals, and automatically extracts key information like vehicle preferences, rental dates, and budget.

## Architecture

```
Frontend (ChatWidget) 
    ↓
Backend API (/api/chatbot)
    ↓
n8n Webhook
    ↓
ChatBot Workflow
```

## Setup Instructions

### 1. Environment Configuration

Add the following to your `.env.local` file:

```bash
# n8n Chatbot Configuration
N8N_WEBHOOK_URL=http://localhost:5678/webhook/car-rental-chatbot
N8N_API_URL=http://localhost:5678/api/v1
```

If your n8n instance is hosted remotely, update the URLs accordingly (e.g., `https://your-domain.com/webhook/car-rental-chatbot`).

### 2. n8n Workflow Setup

The chatbot workflow (`chatbot.n8n`) is configured to:

- **Accept chat messages** from the frontend
- **Extract information** including:
  - Customer name
  - Phone number
  - Vehicle type preference
  - Rental period
  - Budget
  - Location preference
- **Generate responses** using AI
- **Identify hot leads** (high-value inquiries)
- **Send notifications** via Telegram (optional)

To import the workflow:

1. Open your n8n instance (http://localhost:5678)
2. Click **"Import from File"**
3. Select `chatbot.n8n`
4. Configure credentials:
   - **Telegram Bot** (optional): Add your Telegram bot token
   - **OpenAI/Claude** (optional): Add your API key for AI responses
   - **Database**: Configure if storing leads

### 3. Webhook Configuration in n8n

1. In the n8n workflow, find the "HTTP Request" node
2. Set it to listen at: `/webhook/car-rental-chatbot`
3. Enable "Wait for body" option
4. Test the webhook by sending a POST request:

```bash
curl -X POST http://localhost:5678/webhook/car-rental-chatbot \
  -H "Content-Type: application/json" \
  -d '{
    "chatInput": "I need an SUV for 5 days",
    "sessionId": "session_123",
    "userId": "user_123"
  }'
```

### 4. Backend Integration

The API route `/api/chatbot` handles:
- Receiving chat messages from frontend
- Forwarding to n8n webhook
- Processing responses
- Returning formatted data to frontend

**API Endpoint:**
```
POST /api/chatbot
Content-Type: application/json

{
  "sessionId": "session_123",
  "message": "I need a luxury car",
  "userId": "user_123"  // optional
}
```

**Response:**
```json
{
  "success": true,
  "response": "Got it! We have several luxury vehicles available...",
  "sessionId": "session_123",
  "extractedData": {
    "name": "John Doe",
    "phone": "+254712345678",
    "vehicleType": "Luxury SUV",
    "rentalPeriod": "5 days",
    "budget": "15000 KES",
    "location": "Nairobi"
  },
  "isHotLead": true
}
```

### 5. Frontend Chat Widget

The `ChatWidget` component is automatically added to the app layout and appears as a green chat bubble in the bottom-right corner.

**Usage:**
```tsx
import { ChatWidget } from "@/components/ChatWidget";

export default function Page() {
  return (
    <div>
      <ChatWidget 
        position="bottom-right"
        title="Car Rental Assistant"
        initialMessage="Hi! How can I help you find the perfect car?"
      />
    </div>
  );
}
```

**Props:**
- `position`: `"bottom-right"` | `"bottom-left"` (default: `"bottom-right"`)
- `title`: Custom title for chat window (default: `"Car Rental Assistant"`)
- `initialMessage`: First message from bot (default: greeting)

### 6. Testing

1. **Start n8n:**
   ```bash
   npm start
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Test chat widget:**
   - Visit http://localhost:3000
   - Click the green chat bubble
   - Send test messages

4. **Monitor n8n:**
   - Check n8n logs for incoming webhook calls
   - Verify extracted information in workflow

### 7. Customization

#### Modify Bot Behavior

Edit the n8n workflow to:
- Change system prompt for different tone/style
- Add vehicle database lookups
- Integrate with booking system
- Send leads to CRM

#### Customize UI

Edit [`ChatWidget.tsx`](src/components/ChatWidget.tsx):
- Change colors (green.600 → your brand color)
- Modify message styles
- Add typing indicators
- Customize animations

#### Extract Additional Information

Update the backend response in [`/api/chatbot`](src/app/api/chatbot/route.ts):
```tsx
extractedData: {
  name: n8nData.extractedName,
  phone: n8nData.extractedPhone,
  vehicleType: n8nData.extractedVehicleType,
  rentalPeriod: n8nData.extractedRentalPeriod,
  budget: n8nData.extractedBudget,
  location: n8nData.extractedLocation,
  // Add more fields here
}
```

### 8. Troubleshooting

**Chat not loading messages:**
- Check browser console for fetch errors
- Verify N8N_WEBHOOK_URL is correct
- Test API endpoint directly: `curl http://localhost:3000/api/chatbot`

**n8n webhook not receiving data:**
- Verify webhook URL in n8n matches `N8N_WEBHOOK_URL`
- Check n8n logs: `npm run start -- --verbose`
- Test webhook with curl command (see section 3)

**CORS errors:**
- Ensure n8n webhook allows requests from your app domain
- Add CORS headers in n8n configuration

**Chat widget not appearing:**
- Check if `<ChatWidget />` is in layout
- Verify CSS is loading (no console errors)
- Check z-index conflicts with other elements

### 9. Production Deployment

1. **Environment variables:**
   ```bash
   N8N_WEBHOOK_URL=https://n8n.yourdomain.com/webhook/car-rental-chatbot
   ```

2. **n8n hosting:**
   - Use n8n Cloud, self-hosted Docker, or VPS
   - Configure SSL/TLS
   - Set up backup and monitoring

3. **Security:**
   - Add rate limiting to API endpoint
   - Validate and sanitize chat inputs
   - Implement user authentication if needed
   - Use environment variables for sensitive data

### 10. Analytics & Monitoring

Track chatbot performance:
- Number of conversations
- Average response time
- Hot leads generated
- Conversion metrics

Add logging to track these in n8n or integrate with analytics platform.
