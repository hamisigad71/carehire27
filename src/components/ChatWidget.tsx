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
  Flex,
} from "@chakra-ui/react";
import {
  FiSend,
  FiMessageCircle,
  FiX,
  FiMinimize2,
  FiMaximize2,
  FiZap,
  FiClock,
} from "react-icons/fi";
import { FaCar } from "react-icons/fa";

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const L = {
  accent:      "#1e6e1e",
  accentLight: "#2d8c2d",
  accentGlow:  "rgba(30,110,30,0.08)",
  accentGlow2: "rgba(30,110,30,0.14)",
  borderMid:   "rgba(30,110,30,0.18)",
  bg:          "#f4f7f4",
  card:        "#ffffff",
  border:      "rgba(0,0,0,0.07)",
  text:        "#111a11",
  textSub:     "#3a4d3a",
  muted:       "#6b7f6b",
  subtle:      "#9aaa9a",
  shadow:      "0 2px 16px rgba(0,0,0,0.07)",
  shadowMd:    "0 8px 40px rgba(0,0,0,0.13)",
  shadowGreen: "0 8px 32px rgba(30,110,30,0.28)",
  userBubble:  "linear-gradient(135deg, #1e6e1e, #2d8c2d)",
  gold:        "#b07d0a",
  goldBg:      "rgba(176,125,10,0.08)",
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const Styles = () => (
  <style>{`
    @keyframes cw-in {
      from { opacity:0; transform: scale(0.88) translateY(16px); filter: blur(3px); }
      to   { opacity:1; transform: scale(1)    translateY(0);    filter: blur(0);   }
    }
    @keyframes cw-out {
      from { opacity:1; transform: scale(1)    translateY(0);    }
      to   { opacity:0; transform: scale(0.9)  translateY(12px); }
    }
    @keyframes cw-btn-in {
      from { opacity:0; transform: scale(0.7) rotate(-15deg); }
      to   { opacity:1; transform: scale(1)   rotate(0deg);   }
    }
    @keyframes cw-msg-in {
      from { opacity:0; transform: translateY(8px); }
      to   { opacity:1; transform: translateY(0);   }
    }
    @keyframes cw-dot {
      0%,80%,100% { transform: scale(0.55); opacity:0.4; }
      40%          { transform: scale(1);    opacity:1;   }
    }
    @keyframes cw-pulse-ring {
      0%   { box-shadow: 0 0 0 0   rgba(30,110,30,0.5); }
      70%  { box-shadow: 0 0 0 10px rgba(30,110,30,0);  }
      100% { box-shadow: 0 0 0 0   rgba(30,110,30,0);   }
    }
    @keyframes cw-shimmer {
      0%   { background-position: -300px 0; }
      100% { background-position:  300px 0; }
    }
    @keyframes cw-badge-bounce {
      0%,100% { transform: scale(1);    }
      50%      { transform: scale(1.18); }
    }

    .cw-window {
      animation: cw-in 0.42s cubic-bezier(0.22,1,0.36,1) both;
    }
    .cw-window.closing {
      animation: cw-out 0.28s ease both;
    }
    .cw-fab {
      animation: cw-btn-in 0.38s cubic-bezier(0.22,1,0.36,1) both;
      transition: transform 0.22s cubic-bezier(0.22,1,0.36,1),
                  box-shadow 0.22s ease !important;
    }
    .cw-fab:hover {
      transform: scale(1.08) !important;
      box-shadow: ${L.shadowGreen} !important;
    }
    .cw-fab-pulse {
      animation: cw-pulse-ring 2.2s ease-out infinite;
    }
    .cw-msg {
      animation: cw-msg-in 0.28s cubic-bezier(0.22,1,0.36,1) both;
    }
    .cw-dot-1 { animation: cw-dot 1.2s ease-in-out infinite 0s;    }
    .cw-dot-2 { animation: cw-dot 1.2s ease-in-out infinite 0.18s; }
    .cw-dot-3 { animation: cw-dot 1.2s ease-in-out infinite 0.36s; }

    .cw-send-btn {
      transition: all 0.18s cubic-bezier(0.22,1,0.36,1) !important;
    }
    .cw-send-btn:hover:not(:disabled) {
      transform: scale(1.08) !important;
      box-shadow: 0 4px 16px rgba(30,110,30,0.35) !important;
    }
    .cw-send-btn:active:not(:disabled) {
      transform: scale(0.95) !important;
    }

    .cw-input {
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .cw-input:focus {
      border-color: ${L.borderMid} !important;
      box-shadow: 0 0 0 3px ${L.accentGlow2} !important;
      outline: none !important;
    }

    .cw-scroll::-webkit-scrollbar { width: 4px; }
    .cw-scroll::-webkit-scrollbar-track { background: transparent; }
    .cw-scroll::-webkit-scrollbar-thumb {
      background: rgba(30,110,30,0.18);
      border-radius: 99px;
    }

    .cw-quick-btn {
      transition: all 0.15s ease;
      cursor: pointer;
      white-space: nowrap;
    }
    .cw-quick-btn:hover {
      background: ${L.accentGlow2} !important;
      border-color: ${L.borderMid} !important;
      color: ${L.accentLight} !important;
      transform: translateY(-1px);
    }

    .cw-badge-num {
      animation: cw-badge-bounce 1s ease-in-out 0.3s both;
    }

    .cw-header-shimmer::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(
        90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%
      );
      background-size: 300px 100%;
      animation: cw-shimmer 3s linear infinite;
      pointer-events: none;
    }
  `}</style>
);

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface ChatWidgetProps {
  position?: "bottom-right" | "bottom-left";
  title?: string;
  subtitle?: string;
  initialMessage?: string;
}

const generateSessionId = () =>
  `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// ─── QUICK REPLIES ────────────────────────────────────────────────────────────
const QUICK_REPLIES = [
  "Available cars today",
  "Pricing & rates",
  "Airport pickup",
  "Long-term hire",
];

// ─── FORMAT TIME ──────────────────────────────────────────────────────────────
function formatTime(date: Date) {
  return date.toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" });
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export const ChatWidget = ({
  position = "bottom-right",
  title = "Car Rental Assistant",
  subtitle = "Powered by AI · Replies instantly",
  initialMessage = "👋 Hi there! I'm your Elite CarHire assistant. Ask me anything about our fleet, pricing, or bookings — I'm here to help!",
}: ChatWidgetProps) => {
  const [isOpen, setIsOpen]       = useState(false);
  const [closing, setClosing]     = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);
  const [messages, setMessages]   = useState<Message[]>([
    { id: "init", type: "bot", content: initialMessage, timestamp: new Date() },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading]   = useState(false);
  const [unread, setUnread]         = useState(1);
  const [sessionId]                 = useState(() => generateSessionId());
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // focus input on open
  useEffect(() => {
    if (isOpen) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 320);
    }
  }, [isOpen]);

  const openChat = () => {
    setClosing(false);
    setIsOpen(true);
  };

  const closeChat = () => {
    setClosing(true);
    setTimeout(() => { setIsOpen(false); setClosing(false); setIsExpanded(false); }, 260);
  };

  const sendMessage = async (text?: string) => {
    const content = (text ?? inputValue).trim();
    if (!content || isLoading) return;

    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      type: "user",
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const res  = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: content, userId: `user_${sessionId}` }),
      });
      const data = await res.json();

      setMessages(prev => [...prev, {
        id: `msg_${Date.now()}_bot`,
        type: "bot",
        content: data.success
          ? data.response
          : "Sorry, I couldn't process that. Please try again.",
        timestamp: new Date(),
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: `msg_${Date.now()}_err`,
        type: "bot",
        content: "Connection error. Please check your internet and try again.",
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const posX = position === "bottom-right" ? { right: { base: "16px", sm: "20px" } } : { left: { base: "16px", sm: "20px" } };

  return (
    <>
      <Styles />

      {/* ── FAB BUTTON ────────────────────────────────────────────────── */}
      {!isOpen && (
        <Box
          position="fixed"
          bottom={{ base: "100px", md: "20px" }}
          {...posX}
          zIndex={9998}
          cursor="pointer"
          onClick={openChat}
        >
          {/* pulse ring */}
          <Box
            position="absolute"
            top={0} right={0} bottom={0} left={0}
            borderRadius="full"
            className="cw-fab-pulse"
          />

          <Box
            className="cw-fab"
            w="58px" h="58px"
            borderRadius="full"
            bg="linear-gradient(135deg, #1e6e1e, #2d8c2d)"
            boxShadow={L.shadowGreen}
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <Icon as={FiMessageCircle} boxSize={6} color="white" />

            {/* unread badge */}
            {unread > 0 && (
              <Box
                className="cw-badge-num"
                position="absolute"
                top="-3px" right="-3px"
                w="18px" h="18px"
                borderRadius="full"
                bg="#c0392b"
                border="2px solid white"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="9px" fontWeight="900" color="white" lineHeight="1">
                  {unread}
                </Text>
              </Box>
            )}
          </Box>

          {/* tooltip */}
          <Box
            position="absolute"
            bottom="70px"
            right={position === "bottom-right" ? 0 : "auto"}
            left={position === "bottom-left" ? 0 : "auto"}
            bg={L.card}
            borderRadius="12px"
            border="1px solid"
            borderColor={L.borderMid}
            boxShadow={L.shadowMd}
            px={3} py={2}
            whiteSpace="nowrap"
            opacity={0}
            pointerEvents="none"
            sx={{ ".cw-fab:hover + &, &:hover": { opacity: 1 } }}
            transition="opacity 0.15s ease"
          >
            <Text fontSize="12px" fontWeight="700" color={L.text}>
              Chat with us 💬
            </Text>
          </Box>
        </Box>
      )}

      {/* ── CHAT WINDOW ───────────────────────────────────────────────── */}
      {isOpen && (
        <Box
          className={`cw-window${closing ? " closing" : ""}`}
          position="fixed"
          bottom={{ base: "100px", md: "20px" }}
          left={{ base: "16px", sm: position === "bottom-left" ? "20px" : "auto" }}
          right={{ base: "16px", sm: position === "bottom-right" ? "20px" : "auto" }}
          zIndex={9999}
          w={{ base: "auto", sm: isExpanded ? "450px" : "370px" }}
          h={{ base: "calc(100dvh - 120px)", sm: isExpanded ? "calc(100vh - 40px)" : "580px" }}
          maxH={isExpanded ? "900px" : "580px"}
          transition="width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), max-height 0.3s ease"
          bg={L.card}
          borderRadius="22px"
          boxShadow={L.shadowMd}
          border="1px solid"
          borderColor={L.border}
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          {/* ── HEADER ──────────────────────────────────────────────── */}
          <Box
            className="cw-header-shimmer"
            position="relative"
            overflow="hidden"
            bg="linear-gradient(135deg, #1e6e1e 0%, #2d8c2d 60%, #3a9c3a 100%)"
            px={4} pt={4} pb={3.5}
          >
            {/* grid texture */}
            <Box
              position="absolute" top={0} right={0} bottom={0} left={0}
              opacity={0.06} pointerEvents="none"
              bgImage="linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)"
              bgSize="32px 32px"
            />

            <Flex align="flex-start" justify="space-between" position="relative" zIndex={1}>
              <HStack spacing={3} align="flex-start">
                {/* bot avatar */}
                <Box
                  w="40px" h="40px" borderRadius="14px"
                  bg="rgba(255,255,255,0.18)"
                  border="1px solid rgba(255,255,255,0.25)"
                  display="flex" alignItems="center" justifyContent="center"
                  sx={{ flexShrink: 0 }}
                >
                  <Icon as={FaCar} boxSize={5} color="white" />
                </Box>

                <Box>
                  <Text fontWeight="800" color="white" fontSize="15px" lineHeight="1.2">
                    {title}
                  </Text>
                  <HStack spacing={1.5} mt={0.5}>
                    <Box w="6px" h="6px" borderRadius="full" bg="rgba(120,255,120,0.9)" />
                    <Text fontSize="11px" color="rgba(255,255,255,0.75)" fontWeight="600">
                      {subtitle}
                    </Text>
                  </HStack>
                </Box>
              </HStack>

              {/* header actions */}
              <HStack spacing={2} zIndex={10}>
                <Box
                  w="36px" h="36px" borderRadius="10px"
                  bg="rgba(255,255,255,0.15)"
                  border="1px solid rgba(255,255,255,0.25)"
                  display="flex" alignItems="center" justifyContent="center"
                  cursor="pointer"
                  _hover={{ bg: "rgba(255,255,255,0.3)" }}
                  sx={{ transition: "background .15s ease" }}
                  onClick={toggleExpand}
                >
                  <Icon as={isExpanded ? FiMinimize2 : FiMaximize2} boxSize={4} color="white" />
                </Box>
                <Box
                  w="36px" h="36px" borderRadius="10px"
                  bg="rgba(255,255,255,0.15)"
                  border="1px solid rgba(255,255,255,0.25)"
                  display="flex" alignItems="center" justifyContent="center"
                  cursor="pointer"
                  _hover={{ bg: "rgba(231, 76, 60, 0.8)", border: "1px solid rgba(231, 76, 60, 1)" }}
                  sx={{ transition: "all .15s ease" }}
                  onClick={closeChat}
                >
                  <Icon as={FiX} boxSize={5} color="white" />
                </Box>
              </HStack>
            </Flex>

            {/* feature pills */}
            <HStack spacing={2} mt={3} position="relative" zIndex={1} flexWrap="wrap">
              {[
                { icon: FiZap,   label: "Instant replies" },
                { icon: FiClock, label: "24/7 available"  },
                { icon: FaCar,   label: "1,200+ vehicles" },
              ].map(f => (
                <HStack key={f.label} spacing={1.5}
                  px={2.5} py={1}
                  bg="rgba(255,255,255,0.12)"
                  borderRadius="8px"
                  border="1px solid rgba(255,255,255,0.15)"
                >
                  <Icon as={f.icon} boxSize={3} color="rgba(255,255,255,0.8)" />
                  <Text fontSize="10px" fontWeight="700" color="rgba(255,255,255,0.85)">
                    {f.label}
                  </Text>
                </HStack>
              ))}
            </HStack>

            {/* bottom shimmer line */}
            <Box
              position="absolute" bottom={0} left={0} right={0} h="1px"
              bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
            />
          </Box>

          {/* ── MESSAGES ────────────────────────────────────────────── */}
          <Box
            ref={scrollRef}
            flex={1}
            px={4} py={4}
            overflowY="auto"
            bg={L.bg}
            className="cw-scroll"
          >
            <VStack spacing={3} align="stretch">
              {messages.map((msg, i) => (
                <Box
                  key={msg.id}
                  className="cw-msg"
                  display="flex"
                  justifyContent={msg.type === "user" ? "flex-end" : "flex-start"}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  {/* bot avatar dot */}
                  {msg.type === "bot" && (
                    <Box
                      w="26px" h="26px" borderRadius="10px"
                      bg="linear-gradient(135deg, #1e6e1e, #2d8c2d)"
                      display="flex" alignItems="center" justifyContent="center"
                      mr={2} mt={0.5}
                      sx={{ flexShrink: 0 }}
                    >
                      <Icon as={FaCar} boxSize={3} color="white" />
                    </Box>
                  )}

                  <Box maxW="75%">
                    <Box
                      bg={msg.type === "user"
                        ? L.userBubble
                        : L.card
                      }
                      color={msg.type === "user" ? "white" : L.text}
                      px={3.5} py={2.5}
                      borderRadius={msg.type === "user"
                        ? "18px 4px 18px 18px"
                        : "4px 18px 18px 18px"
                      }
                      fontSize="13px"
                      lineHeight="1.55"
                      boxShadow={msg.type === "user"
                        ? "0 2px 12px rgba(30,110,30,0.22)"
                        : L.shadow
                      }
                      border={msg.type === "bot" ? "1px solid" : "none"}
                      borderColor={L.border}
                    >
                      {msg.content}
                    </Box>
                    {/* timestamp */}
                    <Text
                      fontSize="9px"
                      color={L.subtle}
                      mt={1}
                      textAlign={msg.type === "user" ? "right" : "left"}
                      px={1}
                    >
                      {formatTime(msg.timestamp)}
                    </Text>
                  </Box>
                </Box>
              ))}

              {/* typing indicator */}
              {isLoading && (
                <Box className="cw-msg" display="flex" justifyContent="flex-start">
                  <Box
                    w="26px" h="26px" borderRadius="10px"
                    bg="linear-gradient(135deg, #1e6e1e, #2d8c2d)"
                    display="flex" alignItems="center" justifyContent="center"
                    mr={2} mt={0.5}
                    sx={{ flexShrink: 0 }}
                  >
                    <Icon as={FaCar} boxSize={3} color="white" />
                  </Box>
                  <Box
                    bg={L.card}
                    px={4} py={3}
                    borderRadius="4px 18px 18px 18px"
                    border="1px solid" borderColor={L.border}
                    boxShadow={L.shadow}
                  >
                    <HStack spacing={1.5}>
                      <Circle size="7px" bg={L.accentLight} className="cw-dot-1" />
                      <Circle size="7px" bg={L.accentLight} className="cw-dot-2" />
                      <Circle size="7px" bg={L.accentLight} className="cw-dot-3" />
                    </HStack>
                  </Box>
                </Box>
              )}
            </VStack>
          </Box>

          {/* ── QUICK REPLIES ───────────────────────────────────────── */}
          <Box
            px={4} py={2.5}
            bg={L.card}
            borderTop="1px solid" borderColor={L.border}
            overflowX="auto"
            sx={{ "&::-webkit-scrollbar": { display: "none" } }}
          >
            <HStack spacing={1.5} flexWrap="nowrap">
              {QUICK_REPLIES.map(q => (
                <Box
                  key={q}
                  className="cw-quick-btn"
                  px={3} py={1.5}
                  bg={L.accentGlow}
                  borderRadius="9px"
                  border="1px solid" borderColor={L.borderMid}
                  onClick={() => sendMessage(q)}
                  sx={{ flexShrink: 0 }}
                >
                  <Text fontSize="11px" fontWeight="700" color={L.accentLight}>
                    {q}
                  </Text>
                </Box>
              ))}
            </HStack>
          </Box>

          {/* ── INPUT ───────────────────────────────────────────────── */}
          <HStack
            px={4} py={3}
            bg={L.card}
            borderTop="1px solid" borderColor={L.border}
            spacing={2}
          >
            <Input
              ref={inputRef}
              className="cw-input"
              placeholder="Ask about cars, pricing, pickup…"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              isDisabled={isLoading}
              size="sm"
              h="40px"
              borderRadius="12px"
              fontSize="13px"
              bg={L.bg}
              border="1px solid" borderColor={L.border}
              color={L.text}
              _placeholder={{ color: L.subtle, fontSize: "13px" }}
              _focus={{}}
              _disabled={{ opacity: 0.6, cursor: "not-allowed" }}
            />
            <Button
              className="cw-send-btn"
              onClick={() => sendMessage()}
              isDisabled={isLoading || !inputValue.trim()}
              w="40px" h="40px"
              minW="40px"
              p={0}
              borderRadius="12px"
              bg={inputValue.trim()
                ? "linear-gradient(135deg, #1e6e1e, #2d8c2d)"
                : L.accentGlow
              }
              color={inputValue.trim() ? "white" : L.subtle}
              border="1px solid"
              borderColor={inputValue.trim() ? "transparent" : L.border}
              boxShadow={inputValue.trim() ? "0 2px 10px rgba(30,110,30,0.2)" : "none"}
              _hover={{}}
              _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
              transition="all .18s ease"
            >
              <Icon as={FiSend} boxSize={4} />
            </Button>
          </HStack>

          {/* ── POWERED BY ──────────────────────────────────────────── */}
          <Box
            px={4} py={2}
            bg={L.card}
            borderTop="1px solid" borderColor={L.border}
            textAlign="center"
          >
            <Text fontSize="9px" fontWeight="600" color={L.subtle} letterSpacing=".04em">
              🔒 Encrypted · Powered by{" "}
              <Text as="span" fontWeight="800" color={L.accentLight}>
                Elite CarHire AI
              </Text>
            </Text>
          </Box>
        </Box>
      )}
    </>
  );
};