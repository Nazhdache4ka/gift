import { Box, ButtonBase, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { Lottie } from '@/shared';
import swag from '../assets/swag.webm';
import sticker from '../assets/sticker.json';
import cat from '../assets/cat.webm';

const nodes = [
  {
    label: 'Мини-галерея',
    emoji: '📸',
    left: '22%',
    top: '22%',
    rotate: -5,
    flexDirection: 'row',
    component: 'video',
    src: swag,
    href: '/gallery',
  },
  {
    label: 'Квест',
    emoji: '🚀',
    left: '72%',
    top: '48%',
    rotate: 4,
    flexDirection: 'row-reverse',
    component: 'lottie',
    src: sticker,
    href: '/quest',
  },
  {
    label: 'Письмо',
    emoji: '✉️',
    left: '30%',
    top: '82%',
    rotate: -3,
    flexDirection: 'row',
    component: 'video',
    src: cat,
    href: '/letter',
  },
] satisfies GiftNodeProps[];

export function GiftMap() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 10 },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 1000,
          height: { xs: 520, sm: 580, md: 640 },
          mx: 'auto',
          mt: { xs: 3, md: 5 },
          overflow: 'hidden',
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            color: 'text.secondary',
            pointerEvents: 'none',
          }}
        >
          <path
            d="M 50 0 C 38 5, 25 8, 22 22 C 38 22, 63 28, 72 48 C 82 64, 64 72, 50 72 C 40 73, 32 77, 30 82 C 28 89, 38 91, 38 95"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="5 7"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </Box>

        {nodes.map(node => (
          <Link
            to={node.href ?? ''}
            key={node.label}
          >
            <GiftNode {...node} />
          </Link>
        ))}
      </Box>
    </Box>
  );
}

interface GiftNodeProps {
  label: string;
  emoji: string;
  left: string;
  top: string;
  rotate: number;
  flexDirection: 'row' | 'row-reverse';
  component: 'video' | 'lottie';
  src: unknown;
  href?: string;
}

function GiftNode({ label, emoji, left, top, rotate, flexDirection, component, src }: GiftNodeProps) {
  const transform = `rotate(${rotate}deg)`;
  const hoverTransform = 'rotate(0deg) scale(1.06)';
  const isDecorationOnRight = flexDirection === 'row';

  return (
    <Box
      sx={{
        position: 'absolute',
        left,
        top,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <ButtonBase
        sx={{
          width: { xs: 138, sm: 175, md: 210 },
          minHeight: { xs: 82, sm: 96, md: 112 },
          display: 'flex',
          gap: 1,
          px: { xs: 2, md: 3 },
          bgcolor: 'background.paper',
          color: 'text.primary',
          border: 2,
          borderColor: 'divider',
          borderRadius: '48% 52% 45% 55% / 55% 44% 56% 45%',
          boxShadow: 4,
          transform,
          transition: 'transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease',
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: 7,
            transform: hoverTransform,
          },
          '&:focus-visible': {
            outline: '3px solid',
            outlineColor: 'primary.main',
            outlineOffset: 4,
          },
        }}
      >
        <Typography
          component="span"
          aria-hidden="true"
          sx={{ fontSize: { xs: 24, md: 32 } }}
        >
          {emoji}
        </Typography>
        <Typography
          component="span"
          variant="h6"
          sx={{
            fontFamily: '"Comfortaa", sans-serif',
            fontWeight: 700,
            fontSize: { xs: '1rem', sm: '1.5rem' },
          }}
        >
          {label}
        </Typography>
      </ButtonBase>

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: '50%',
          ...(isDecorationOnRight
            ? {
                left: {
                  xs: 'calc(100% + 4rem)',
                  sm: 'calc(100% + 8rem)',
                  md: 'calc(100% + 16rem)',
                },
              }
            : {
                right: {
                  xs: 'calc(100% + 16px)',
                  sm: 'calc(100% + 24px)',
                  md: 'calc(100% + 10rem)',
                },
              }),
          transform: 'translateY(-60%)',
          pointerEvents: 'none',
        }}
      >
        {component === 'video' ? (
          <Box
            component="video"
            src={src as string}
            autoPlay
            loop
            muted
            playsInline
            sx={{
              display: 'block',
              width: { xs: 72, sm: 96, md: 120 },
              height: { xs: 72, sm: 96, md: 120 },
              objectFit: 'contain',
            }}
          />
        ) : (
          <Box
            sx={{
              transform: { xs: 'scale(0.65)', sm: 'scale(0.85)', md: 'scale(1)' },
            }}
          >
            <Lottie
              animationData={src}
              width={120}
              height={120}
              loop
              autoplay
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
