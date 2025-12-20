// Haptic feedback simulation for web
export const haptics = {
  light: () => {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  },
  medium: () => {
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
  },
  heavy: () => {
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  },
  success: () => {
    if (navigator.vibrate) {
      navigator.vibrate([10, 50, 10]);
    }
  },
  error: () => {
    if (navigator.vibrate) {
      navigator.vibrate([20, 50, 20, 50, 20]);
    }
  },
};
