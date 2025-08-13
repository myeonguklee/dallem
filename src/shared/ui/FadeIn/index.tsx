'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimationControls, useInView, useReducedMotion } from 'framer-motion';

export type InViewOptions = NonNullable<Parameters<typeof useInView>[1]>;
export type InViewMargin = InViewOptions['margin'];

type Props = React.PropsWithChildren<{
  delay?: number;
  amount?: InViewOptions['amount'];
  margin?: InViewMargin;
  className?: string;
}>;

export const FadeIn: React.FC<Props> = ({
  children,
  delay = 0,
  amount = 0.08,
  margin = '-64px 0px -10% 0px',
  className,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimationControls();
  const reduce = useReducedMotion();

  // 1) in-view 감지
  const inView = useInView(ref, { once: true, amount, margin: margin as InViewMargin });

  // 2) 감지되면 애니메이션 시작
  useEffect(() => {
    if (reduce) {
      controls.set({ opacity: 1, y: 0 });
    } else if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay } });
    }
  }, [inView, reduce, controls, delay]);

  // 3) 세이프티(스크롤 복원 레이스 대비): 의존성은 모두 포함, 내부에서 1회만 실행
  const ranOnceRef = useRef(false);
  useEffect(() => {
    if (reduce || ranOnceRef.current) return;
    ranOnceRef.current = true;

    const raf = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const visible = r.top < vh && r.bottom > 0;
      if (visible) {
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: 'easeOut', delay },
        });
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [controls, delay, reduce]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};
