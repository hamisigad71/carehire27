const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('Car_Rental_Chatbot_Workflow.n8n', 'utf8'));

  // 1. Remove all nodes that end with "1", "2" to get a clean set of nodes
  // Actually, let's keep only nodes we want.
  data.nodes = data.nodes.filter(n => !n.name.endsWith('1') && !n.name.endsWith('2'));
  
  // 2. Fix the WhatsApp legacy variables in Sarah AI Agent and Conversation Memory
  data.nodes.forEach(node => {
    if (node.name.startsWith("Sarah AI Agent")) {
      if (node.parameters && node.parameters.text) {
        node.parameters.text = node.parameters.text.replace(
          "{{ $json.messages[0].text.body }}", 
          "{{ $json.chatInput }}"
        );
      }
    }
    if (node.name.startsWith("Conversation Memory")) {
      if (node.parameters && node.parameters.sessionKey) {
        node.parameters.sessionKey = "={{ $json.sessionId }}";
      }
    }
  });

  // 3. Fix the connections since we stripped out '1' nodes
  const cleanConnections = {};
  for (const [sourceName, sourceConns] of Object.entries(data.connections)) {
    if (sourceName.endsWith('1')) continue; // Skip duplicate source
    
    cleanConnections[sourceName] = {};
    for (const [outputName, connectionsArray] of Object.entries(sourceConns)) {
      cleanConnections[sourceName][outputName] = connectionsArray.map(targetArray => 
        targetArray.filter(target => !target.node.endsWith('1'))
      ).filter(arr => arr.length > 0);
    }
  }

  // Force clean connections based exactly on the correct flow:
  data.connections = {
    "Webhook": {
      "main": [
        [
          {
            "node": "Set Session Variables",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Set Session Variables": {
      "main": [
        [
          {
            "node": "Sarah AI Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Conversation Memory": {
      "ai_memory": [
        [
          {
            "node": "Sarah AI Agent",
            "type": "ai_memory",
            "index": 0
          }
        ]
      ]
    },
    "Google Gemini Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "Sarah AI Agent",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Sarah AI Agent": {
      "main": [
        [
          {
            "node": "Process Response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Process Response": {
      "main": [
        [
          {
            "node": "Is Hot Lead?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Is Hot Lead?": {
      "main": [
        [
          {
            "node": "Respond to Webhook",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Respond to Webhook",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  };

  // Wait, does "Process Response" exist or is it "Process Response1"?
  // Let's rename "Process Response" -> "Process Response1" in nodes if it exists, or just ensure proper names.
  const nodeNames = data.nodes.map(n => n.name);
  console.log("Clean nodes kept:", nodeNames);

  fs.writeFileSync('Car_Rental_Chatbot_Workflow_Fixed.n8n', JSON.stringify(data, null, 2));
  fs.writeFileSync('Car_Rental_Chatbot_Workflow.n8n', JSON.stringify(data, null, 2));
  console.log("Successfully fixed workflow!");
} catch (e) {
  console.error(e);
}
