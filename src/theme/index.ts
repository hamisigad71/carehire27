import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { colors } from './colors';
import { typography } from './typography';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors,
  ...typography,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'light' ? '#f4f7f5' : '#0a0f0d',
        color: props.colorMode === 'light' ? '#0a0f0d' : '#ffffff',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '700',
        borderRadius: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        transition: 'all 0.2s',
        _hover: {
          opacity: 0.85,
        },
      },
    },
    Card: {
      baseStyle: (props: any) => ({
        container: {
          bg: props.colorMode === 'light' ? '#ffffff' : '#101815',
          borderRadius: '16px',
          border: '1px solid',
          borderColor: props.colorMode === 'light' ? 'rgba(0,150,80,0.12)' : 'rgba(0,255,136,0.12)',
          transition: 'all 0.25s ease',
        },
      }),
    },
  },
});
