"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Input,
  IconButton,
  VStack,
  HStack,
  Avatar,
  Container,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { FiSend, FiMessageSquare, FiInfo } from "react-icons/fi";

const L = {
  bg: "#f4f7f5",
  card: "#ffffff",
  cardBorder: "rgba(30,110,30,0.1)",
  accent: "#1e6e1e",
  accentLight: "#2d8c2d",
  accentGlow: "rgba(30,110,30,0.08)",
  text: "#111a11",
  textSub: "#3a4d3a",
  muted: "#6b7f6b",
  subtle: "#9aaa9a",
  border: "rgba(0,0,0,0.07)",
  shadowMd: "0 4px 24px rgba(0,0,0,0.06)",
};

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

export default function CustomerChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I help you with your car rental today?",
      sender: "agent",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      if (!webhookUrl) {
        // Fallback demo response if no webhook is configured
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              text: "I'm a placeholder assistant. Please configure the N8N_WEBHOOK_URL to connect to the live chatbot.",
              sender: "agent",
              timestamp: new Date(),
            },
          ]);
          setIsTyping(false);
        }, 1500);
        return;
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newUserMsg.text }),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: data.reply || "Message received by support.",
          sender: "agent",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error(error);
      toast({
        title: "Connection Error",
        description: "Failed to reach customer support. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box minH="calc(100vh - 80px)" bg={L.bg} py={{ base: 4, md: 8 }}>
      <Container maxW="container.md" h="100%">
        <Flex
          direction="column"
          h={{ base: "calc(100vh - 120px)", md: "80vh" }}
          bg={L.card}
          borderRadius="20px"
          boxShadow={L.shadowMd}
          border="1px solid"
          borderColor={L.cardBorder}
          overflow="hidden"
        >
          {/* Header */}
          <Flex
            px={6}
            py={4}
            bg={L.accent}
            align="center"
            justify="space-between"
            borderBottom="1px solid"
            borderColor="rgba(0,0,0,0.1)"
          >
            <HStack spacing={4}>
              <Box p={2} bg="whiteAlpha.200" borderRadius="xl">
                <FiMessageSquare color="white" size={24} />
              </Box>
              <Box>
                <Heading size="md" color="white" mb={0.5}>
                  Support Chat
                </Heading>
                <Text fontSize="sm" color="whiteAlpha.800">
                  Typically replies in a few minutes
                </Text>
              </Box>
            </HStack>
          </Flex>

          {/* Messages Area */}
          <Box flex={1} overflowY="auto" p={6} bg="#fdfdfd" ref={scrollRef}>
            <Flex direction="column" gap={4}>
              <HStack justify="center" mb={4}>
                <Box bg={L.accentGlow} px={3} py={1} borderRadius="full">
                  <Text fontSize="xs" color={L.textSub} fontWeight="500">
                    Today
                  </Text>
                </Box>
              </HStack>

              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <Flex key={msg.id} justify={isUser ? "flex-end" : "flex-start"} w="100%">
                    <HStack
                      spacing={3}
                      maxW="80%"
                      alignItems="flex-end"
                      flexDir={isUser ? "row-reverse" : "row"}
                    >
                      {!isUser && (
                        <Avatar
                          size="sm"
                          name="Support bot"
                          src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=100&h=100&fit=crop"
                        />
                      )}
                      <Box
                        bg={isUser ? L.accent : "gray.100"}
                        color={isUser ? "white" : L.text}
                        px={4}
                        py={3}
                        borderRadius="2xl"
                        borderBottomRightRadius={isUser ? "xs" : "2xl"}
                        borderBottomLeftRadius={!isUser ? "xs" : "2xl"}
                        boxShadow="sm"
                      >
                        <Text fontSize="sm" lineHeight="tall">
                          {msg.text}
                        </Text>
                      </Box>
                    </HStack>
                  </Flex>
                );
              })}
              
              {isTyping && (
                <Flex justify="flex-start" w="100%" mt={2}>
                  <HStack spacing={3} alignItems="flex-end">
                    <Avatar
                      size="sm"
                      name="Support bot"
                      src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=100&h=100&fit=crop"
                    />
                    <Box bg="gray.100" px={4} py={3} borderRadius="2xl" borderBottomLeftRadius="xs">
                      <HStack spacing={1}>
                        <Spinner size="xs" color={L.muted} />
                        <Text fontSize="xs" color={L.muted}>Typing...</Text>
                      </HStack>
                    </Box>
                  </HStack>
                </Flex>
              )}
            </Flex>
          </Box>

          {/* Input Area */}
          <Box p={4} borderTop="1px solid" borderColor={L.border} bg={L.card}>
            <Flex align="center" gap={3}>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                size="lg"
                borderRadius="full"
                bg="gray.50"
                border="1px solid"
                borderColor={L.border}
                _focus={{ borderColor: L.accent, boxShadow: "none" }}
              />
              <IconButton
                aria-label="Send message"
                icon={<FiSend />}
                size="lg"
                colorScheme="green"
                bg={L.accent}
                isRound
                isDisabled={!inputValue.trim()}
                onClick={handleSend}
                _hover={{ bg: L.accentLight }}
              />
            </Flex>
            <HStack justify="center" mt={3} spacing={1}>
              <FiInfo color={L.subtle} size={12} />
              <Text fontSize="10px" color={L.subtle}>
                Messages are end-to-end securely transmitted.
              </Text>
            </HStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
