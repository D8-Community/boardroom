import { useAtom, useSetAtom } from 'jotai';
import type { ReactElement } from 'react';
import { useCallback, useLayoutEffect, useState } from 'react';

import {
  appSidebarOpenAtom,
  appSidebarResizingAtom,
  appSidebarWidthAtom,
} from '../index.jotai';
import * as styles from './index.css';

type ResizeIndicatorProps = {
  targetElement: HTMLElement | null;
};

export const ResizeIndicator = (props: ResizeIndicatorProps): ReactElement => {
  const setWidth = useSetAtom(appSidebarWidthAtom);
  const [sidebarOpen, setSidebarOpen] = useAtom(appSidebarOpenAtom);
  const [isResizing, setIsResizing] = useAtom(appSidebarResizingAtom);

  const [anchorLeft, setAnchorLeft] = useState(0);

  useLayoutEffect(() => {
    if (!props.targetElement) return;
    const { left } = props.targetElement.getBoundingClientRect();
    setAnchorLeft(left);
  }, [props.targetElement]);

  const onResizeStart = useCallback(() => {
    let resized = false;

    function onMouseMove(e: MouseEvent) {
      e.preventDefault();
      if (!props.targetElement) return;
      const newWidth = Math.min(480, Math.max(e.clientX - anchorLeft, 256));
      setWidth(newWidth);
      setIsResizing(true);
      resized = true;
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener(
      'mouseup',
      () => {
        // if not resized, toggle sidebar
        if (!resized) {
          setSidebarOpen(o => !o);
        }
        setIsResizing(false);
        document.removeEventListener('mousemove', onMouseMove);
      },
      { once: true }
    );
  }, [
    anchorLeft,
    props.targetElement,
    setIsResizing,
    setSidebarOpen,
    setWidth,
  ]);

  return (
    <div
      className={styles.resizerContainer}
      data-testid="app-sidebar-resizer"
      data-resizing={isResizing}
      data-open={sidebarOpen}
      onMouseDown={onResizeStart}
    >
      <div className={styles.resizerInner} />
    </div>
  );
};
