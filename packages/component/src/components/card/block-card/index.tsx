import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import * as styles from './styles.css';

export const BlockCard = forwardRef<
  HTMLDivElement,
  {
    left?: ReactNode;
    title: string;
    desc?: string;
    right?: ReactNode;
  } & HTMLAttributes<HTMLDivElement>
>(({ left, title, desc, right, ...props }, ref) => {
  return (
    <div ref={ref} className={styles.blockCard} {...props}>
      {left && <div className={styles.blockCardAround}>{left}</div>}
      <div className={styles.blockCardContent}>
        <div>{title}</div>
        <div className={styles.blockCardDesc}>{desc}</div>
      </div>
      {right && <div className={styles.blockCardAround}>{right}</div>}
    </div>
  );
});
BlockCard.displayName = 'BlockCard';
