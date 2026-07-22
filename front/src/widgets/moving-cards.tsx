import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Box, useMediaQuery } from '@mui/material';
import shock1 from '../assets/shock1.webm';
import shock2 from '../assets/shock2.webm';
import shock3 from '../assets/shock3.webm';
import shock4 from '../assets/shock4.webm';
import shock5 from '../assets/shock5.webm';

const shockVideos = [shock1, shock2, shock3, shock4, shock5];

interface MovingCardProps {
  video: string;
  index: number;
}

export function MovingCards() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', height: { xs: 400, md: 600 } }}>
      {shockVideos.map((video, index) => (
        <MovingCard
          key={video}
          video={video}
          index={index}
        />
      ))}
    </Box>
  );
}

function MovingCard({ video, index }: MovingCardProps) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [initialPosition] = useState(createRandomPosition);

  const spring = useSpring({
    from: {
      ...initialPosition,
      rotate: index * 6 - 6,
    },
    to: async next => {
      while (true) {
        await next({
          ...createRandomPosition(),
          rotate: randomBetween(-12, 12),
          config: {
            duration: randomBetween(3500, 6500),
          },
        });
      }
    },
    pause: prefersReducedMotion,
  });

  return (
    <animated.div
      style={{
        ...spring,
        position: 'absolute',
        willChange: 'left, top, transform',
      }}
    >
      <Box
        component="video"
        src={video}
        autoPlay
        loop
        muted
        playsInline
        sx={{
          display: 'block',
          width: { xs: 120, sm: 150, md: 180 },
          aspectRatio: '4 / 3',
          objectFit: 'cover',
          borderRadius: 3,
          boxShadow: 6,
          pointerEvents: 'none',
        }}
      />
    </animated.div>
  );
}

function createRandomPosition() {
  return {
    left: `${Math.random() * 78}%`,
    top: `${Math.random() * 65}%`,
    scale: randomBetween(85, 110) / 100,
  };
}

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
