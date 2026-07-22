import { lazy, Suspense } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { SuspenseFallback } from '@/shared';

const MovingCards = lazy(() => import('@/widgets/moving-cards').then(module => ({ default: module.MovingCards })));
const GiftMap = lazy(() => import('@/widgets/gift-map').then(module => ({ default: module.GiftMap })));

export function Home() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: { xs: 4, md: 8 }, textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
            overflowWrap: 'anywhere',
          }}
        >
          Оооооо май гад, неужели сегодня у кого-то день рождения???
        </Typography>
      </Box>

      <Suspense fallback={<SuspenseFallback />}>
        <MovingCards />
      </Suspense>

      <Typography
        variant="h3"
        sx={{
          maxWidth: 900,
          mx: 'auto',
          textAlign: 'center',
          textWrap: 'balance',
          fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
          overflowWrap: 'anywhere',
        }}
      >
        А ведь действительно… Так что я подготовил для тебя кое-что
      </Typography>
      <Suspense
        fallback={
          <SuspenseFallback
            heightXs={550}
            heightMd={750}
          />
        }
      >
        <GiftMap />
      </Suspense>
    </Container>
  );
}
