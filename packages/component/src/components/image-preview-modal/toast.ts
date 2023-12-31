import type { ToastOptions } from '@affine/component';
import { toast as basicToast } from '@affine/component';

export const toast = (message: string, options?: ToastOptions) => {
  const mainContainer = document.querySelector(
    '[data-testid="image-preview-modal"]'
  ) as HTMLElement;
  return basicToast(message, {
    portal: mainContainer || document.body,
    ...options,
  });
};

declare global {
  // global Events
  interface WindowEventMap {
    'affine-toast:emit': CustomEvent<{
      message: string;
    }>;
  }
}
