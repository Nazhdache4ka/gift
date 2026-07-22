import { useState } from 'react';
import { Box } from '@mui/material';
import { Lottie } from './lottie';
import animationData from './assets/star.json';

interface FallingStarProps {
  opacity?: number;
  duration?: number;
}

const sizes = [120, 130, 140, 150, 160, 170, 180, 190, 200];

const getRandomLeft = () => `${Math.random() * 90}%`;

const getRandomSize = () => sizes[Math.floor(Math.random() * sizes.length)];

export function FallingStar({ opacity = 0.4, duration = 8 }: FallingStarProps) {
  const [left, setLeft] = useState(getRandomLeft);
  const [size] = useState(getRandomSize);

  return (
    <Box
      onAnimationIteration={() => setLeft(getRandomLeft())}
      sx={{
        position: 'absolute',
        top: 0,
        left,
        pointerEvents: 'none',
        animation: `fall ${duration}s linear infinite`,
        '@keyframes fall': {
          from: {
            transform: 'translateY(-100px) rotate(0deg)',
          },
          to: {
            transform: 'translateY(110vh) rotate(360deg)',
          },
        },
        '@media (prefers-reduced-motion: reduce)': {
          display: 'none',
        },
      }}
    >
      <Lottie
        animationData={animationData}
        width={size}
        height={size}
        loop={true}
        autoplay={true}
        sx={{
          opacity,
        }}
      />
    </Box>
  );
}
