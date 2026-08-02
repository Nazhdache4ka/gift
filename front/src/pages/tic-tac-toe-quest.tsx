import { lazy, Suspense, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { ButtonBack, SuspenseFallback } from '@/shared';
import prize from '../assets/prize.webp';

const TikTakToe = lazy(() => import('../widgets/tik-tak-toe').then(module => ({ default: module.TikTakToe })));

export function TicTakToeQuest() {
  const [hasWon, setHasWon] = useState(false);

  return (
    <Container maxWidth="xl">
      <ButtonBack to="/quest" />

      <Box
        sx={{
          my: { xs: 2, md: 4 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 3, md: 6 },
          overflowWrap: 'anywhere',
          textAlign: 'center',
        }}
      >
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
          >
            Битва против Chat GPT 5.6 Terra
          </Typography>
          <Typography
            variant="body1"
            sx={{ my: 2 }}
          >
            Обыграй ИИ в крестики-нолики — и тебе станцуют{' '}
            <Box
              component="span"
              sx={{ fontWeight: 700, color: 'primary.main' }}
            >
              чунга-чангу
            </Box>
            🤙
          </Typography>
        </Box>

        <Box sx={{ flex: 1, width: '100%' }}>
          <Suspense fallback={<SuspenseFallback />}>
            <TikTakToe setHasWon={setHasWon} />
          </Suspense>
        </Box>
      </Box>

      {hasWon && (
        <Box sx={{ my: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              my: 2,
              textAlign: 'center',
              fontFamily: '"Comfortaa", sans-serif',
              fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' },
            }}
          >
            Ашалеть вацок, ты его победила🤯 вот твой приз
          </Typography>
          <Box
            component="img"
            src={prize}
            alt="Приз за победу"
            sx={{
              width: '100%',
              maxWidth: 900,
              height: 'auto',
              my: 2,
              opacity: 0.1,
              filter: 'blur(10px)',
              transition: 'opacity 300ms ease, filter 300ms ease',
              '&:hover': { opacity: 1, filter: 'blur(0)' },
            }}
          />
        </Box>
      )}
    </Container>
  );
}
