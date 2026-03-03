import React, { useState, useEffect, useRef, useCallback } from 'react';
import DuckIcon from './DuckIcon';
import './QuackingDuckIcon.css';

interface QuackingDuckProps {
  size?: number;
  wobble?: boolean;
  autoQuack?: boolean;
  quackDuration?: number;
  initialDelay?: number;
  interval?: number;
  className?: string;
}

const QuackingDuck: React.FC<QuackingDuckProps> = ({
  size = 64,
  wobble = false,
  autoQuack = false,
  quackDuration = 650,
  initialDelay = 0,
  interval = 2000,
  className = '',
}) => {
  const [isQuacking, setIsQuacking] = useState(false);
  const isQuackingRef = useRef(false);
  const pendingQuackRef = useRef(false);

  // wobble + autoQuack uses a pure CSS sequence animation — no JS timers needed.
  const isSequenceMode = wobble && autoQuack;

  const fireQuack = useCallback(() => {
    isQuackingRef.current = true;
    setIsQuacking(true);
    setTimeout(() => {
      setIsQuacking(false);
      isQuackingRef.current = false;
    }, quackDuration);
  }, [quackDuration]);

  const triggerQuack = useCallback(() => {
    if (isSequenceMode) return;
    if (isQuackingRef.current || pendingQuackRef.current) return;
    if (wobble) {
      pendingQuackRef.current = true;
    } else {
      fireQuack();
    }
  }, [isSequenceMode, wobble, fireQuack]);

  const handleAnimationIteration = useCallback(() => {
    if (!pendingQuackRef.current) return;
    pendingQuackRef.current = false;
    fireQuack();
  }, [fireQuack]);

  useEffect(() => {
    if (!autoQuack || wobble) return;
    const initial = setTimeout(triggerQuack, initialDelay);
    const timer = setInterval(triggerQuack, interval);
    return () => {
      clearTimeout(initial);
      clearInterval(timer);
    };
  }, [autoQuack, wobble, initialDelay, interval, triggerQuack]);

  const containerClass = [
    'quacking-duck',
    isSequenceMode ? 'quacking-duck--sequence' : '',
    !isSequenceMode && wobble ? 'quacking-duck--wobble' : '',
    !isSequenceMode && isQuacking ? 'quacking-duck--quacking' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClass}
      onClick={triggerQuack}
      onAnimationIteration={handleAnimationIteration}
    >
      <DuckIcon size={size} hover={false} />
    </div>
  );
};

export default QuackingDuck;
