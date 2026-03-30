"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Icon,
  Circle,
  ScrollArea,
  Badge,
} from "@chakra-ui/react";
import { FiSend, FiMessageCircle, FiX } from "react-icons/fi";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface ChatWidgetProps {
  position?: "bottom-right" | "bottom-left";
  title?: string;
  initialMessage?: string;
}

const generateSessionId = () =>
  `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const ChatWidget = ({
  position = "bottom-right",
  title = "Car Rental Assistant",
  initialMessage = "Hi! 👋 How can I help you find the perfect car today?",
}: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      type: "bot",
      content: initialMessage,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => generateSessionId());
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: inputValue,
          userId: `user_${sessionId}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const botMessage: Message = {
          id: `msg_${Date.now()}_bot`,
          type: "bot",
          content: data.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage: Message = {
          id: `msg_${Date.now()}_error`,
          type: "bot",
          content: "Sorry, I couldn't process that. Please try again.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: `msg_${Date.now()}_error`,
        type: "bot",
        content: "Connection error. Please check your internet and try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Box
          position="fixed"
          className={positionClasses[position]}
          zIndex={40}
          cursor="pointer"
        >
          <Circle
            size="60px"
            bg="linear-gradient(135deg, #1e6e1e 0%, #4a9e4a 100%)"
            shadow="lg"
            onClick={() => setIsOpen(true)}
            _hover={{ transform: "scale(1.05)" }}
            transition="all 0.2s"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FiMessageCircle} boxSize={7} color="white" />
          </Circle>
        </Box>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Box
          position="fixed"
          className={positionClasses[position]}
          zIndex={41}
          width={{ base: "90vw", sm: "380px" }}
          height="600px"
          bg="white"
          borderRadius="16px"
          shadow="2xl"
          display="flex"
          flexDirection="column"
          border="1px solid"
          borderColor="gray.200"
          overflow="hidden"
        >
          {/* Header */}
          <HStack
            bg="linear-gradient(135deg, #1e6e1e 0%, #4a9e4a 100%)"
            px={4}
            py={3}
            justify="space-between"
          >
            <VStack spacing={0} align="flex-start" flex={1}>
              <Text fontWeight="700" color="white" fontSize="15px">
                {title}
              </Text>
              <Text fontSize="11px" color="rgba(255,255,255,0.7)">
                Usually responds in minutes
              </Text>
            </VStack>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              color="white"
              _hover={{ bg: "rgba(255,255,255,0.1)" }}
            >
              <Icon as={FiX} boxSize={5} />
            </Button>
          </HStack>

          {/* Messages */}
          <ScrollArea
            flex={1}
            px={4}
            py={4}
            ref={scrollRef}
            style={{ overflowY: "auto" }}
          >
            <VStack spacing={3} align="stretch">
              {messages.map((msg) => (
                <Box
                  key={msg.id}
                  display="flex"
                  justifyContent={
                    msg.type === "user" ? "flex-end" : "flex-start"
                  }
                >
                  <Box
                    maxW="70%"
                    bg={msg.type === "user" ? "green.600" : "gray.100"}
                    color={msg.type === "user" ? "white" : "gray.900"}
                    px={4}
                    py={2.5}
                    borderRadius={
                      msg.type === "user"
                        ? "16px 4px 16px 16px"
                        : "4px 16px 16px 16px"
                    }
                    fontSize="14px"
                    lineHeight="1.4"
                  >
                    {msg.content}
                  </Box>
                </Box>
              ))}
              {isLoading && (
                <Box display="flex" justifyContent="flex-start">
                  <Box
                    bg="gray.100"
                    px={4}
                    py={2.5}
                    borderRadius="4px 16px 16px 16px"
                  >
                    <HStack spacing={1}>
                      <Circle
                        size="6px"
                        bg="gray.400"
                        animation="pulse 1.5s infinite"
                      />
                      <Circle
                        size="6px"
                        bg="gray.400"
                        animation="pulse 1.5s infinite 0.2s"
                      />
                      <Circle
                        size="6px"
                        bg="gray.400"
                        animation="pulse 1.5s infinite 0.4s"
                      />
                    </HStack>
                  </Box>
                </Box>
              )}
            </VStack>
          </ScrollArea>

          {/* Input */}
          <HStack
            px={4}
            py={3}
            borderTop="1px solid"
            borderColor="gray.200"
            spacing={2}
          >
            <Input
              placeholder="Type your question..."
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isLoading}
              size="sm"
              borderRadius="20px"
              fontSize="14px"
              _placeholder={{ color: "gray.400" }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              bg="green.600"
              color="white"
              _hover={{ bg: "green.700" }}
              _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
              size="sm"
              borderRadius="full"
              px={3}
            >
              <Icon as={FiSend} boxSize={4} />
            </Button>
          </HStack>
        </Box>
      )}
    </>
  );
};
