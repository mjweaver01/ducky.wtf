import QuackingDuck from './QuackingDuckIcon';
import './LoadingDuck.css';

interface LoadingDuckProps {
  size?: number;
}

const LoadingDuck: React.FC<LoadingDuckProps> = ({ size = 75 }) => {
  return (
    <div className="loading-duck">
      <QuackingDuck size={size} wobble autoQuack />
    </div>
  );
};

export default LoadingDuck;
