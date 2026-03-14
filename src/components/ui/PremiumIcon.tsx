'use client';

import { 
  Box, 
  Image, 
  Spinner, 
  Center,
  Icon,
  Tooltip,
  useColorModeValue
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FiImage } from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';

interface PremiumIconProps {
  query: string;
  size?: string | number;
  color?: string;
  label?: string;
}

export const PremiumIcon = ({ query, size = '24px', color, label }: PremiumIconProps) => {
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const tokens = useColorTokens();

  useEffect(() => {
    const fetchIcon = async () => {
      // 1. Check Cache
      const cacheKey = `freepik_icon_${query}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        setIconUrl(cached);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/icons?query=${encodeURIComponent(query)}`);
        if (res.ok) {
          const result = await res.json();
          // Logically, Freepik search returns a list of icons. 
          // We take the thumbnail or preview of the first one for this demo.
          const icon = result.data?.[0];
          if (icon && icon.thumbnails?.[1]?.url) {
            const url = icon.thumbnails[1].url; // Usually a good medium size
            setIconUrl(url);
            localStorage.setItem(cacheKey, url);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('PremiumIcon Fetch Error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchIcon();
  }, [query]);

  const fallback = (
    <Center boxSize={size} color={tokens.textMuted}>
      <Icon as={FiImage} />
    </Center>
  );

  if (loading) {
    return (
      <Center boxSize={size}>
        <Spinner size="xs" color={tokens.accent} />
      </Center>
    );
  }

  if (error || !iconUrl) {
     return fallback;
  }

  return (
    <Tooltip label={label || query} placement="top" hasArrow>
      <Box 
        boxSize={size} 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        position="relative"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.1)' }}
      >
        <Image 
          src={iconUrl} 
          alt={query}
          w="full"
          h="full"
          objectFit="contain"
          filter={color ? `drop-shadow(0 0 5px ${color})` : 'none'}
        />
      </Box>
    </Tooltip>
  );
};
