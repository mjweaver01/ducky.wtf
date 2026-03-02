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

  const triggerQuack = useCallback(() => {
    if (isQuackingRef.current || pendingQuackRef.current) return;

    if (wobble) {
      pendingQuackRef.current = true;
    } else {
      isQuackingRef.current = true;
      setIsQuacking(true);
      setTimeout(() => {
        setIsQuacking(false);
        isQuackingRef.current = false;
      }, quackDuration);
    }
  }, [wobble, quackDuration]);

  const handleAnimationIteration = useCallback(() => {
    if (pendingQuackRef.current) {
      pendingQuackRef.current = false;
      isQuackingRef.current = true;
      setIsQuacking(true);
      setTimeout(() => {
        setIsQuacking(false);
        isQuackingRef.current = false;
      }, quackDuration);
    }
  }, [quackDuration]);

  useEffect(() => {
    if (!autoQuack) return;
    const initial = setTimeout(triggerQuack, initialDelay);
    const timer = setInterval(triggerQuack, interval);
    return () => {
      clearTimeout(initial);
      clearInterval(timer);
    };
  }, [autoQuack, initialDelay, interval, triggerQuack]);

  const containerClass = [
    'quacking-duck',
    wobble ? 'quacking-duck--wobble' : '',
    isQuacking ? 'quacking-duck--quacking' : '',
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
