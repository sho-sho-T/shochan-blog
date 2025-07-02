'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<'fade-in' | 'fade-out' | 'none'>('fade-in');

  useEffect(() => {
    setTransitionStage('fade-out');
  }, [pathname]);

  useEffect(() => {
    if (transitionStage === 'fade-out') {
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionStage('fade-in');
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [transitionStage, children]);

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        transitionStage === 'fade-out'
          ? 'opacity-0 translate-y-2'
          : 'opacity-100 translate-y-0'
      }`}
    >
      {displayChildren}
    </div>
  );
}