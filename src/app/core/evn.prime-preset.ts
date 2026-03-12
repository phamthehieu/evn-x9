import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

/**
 * EVN preset dựa trên Aura.
 * Mục tiêu: đưa "primary" về EVN Blue để PrimeNG không tự ra xanh lá như mặc định.
 */
export const EvnAuraPreset = definePreset(Aura, {
  semantic: {
    focusRing: {
      color: 'rgba(56, 83, 164, 0.25)'
    },
    colorScheme: {
      light: {
        primary: {
          color: '#3853A4',
          contrastColor: '#FFFFFF',
          hoverColor: '#2A3F7D',
          activeColor: '#213364'
        },
        highlight: {
          background: 'rgba(56, 83, 164, 0.12)',
          focusBackground: 'rgba(56, 83, 164, 0.18)',
          color: '#1B2559',
          focusColor: '#1B2559'
        }
      }
    }
  }
});

