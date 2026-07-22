import { lazy, Suspense } from 'react';
import { Container, Typography } from '@mui/material';
import { ButtonBack, SuspenseFallback } from '@/shared';

const Anticipation = lazy(() => import('../widgets/anticipation').then(module => ({ default: module.Anticipation })));

export function AnticipationQuest() {
  return (
    <Container maxWidth="xl">
      <ButtonBack to="/quest" />

      <Typography
        variant="h2"
        sx={{
          mt: 2,
          mb: 1,
          textAlign: 'center',
          overflowWrap: 'anywhere',
          fontSize: { xs: '2rem', md: '3.75rem' },
        }}
      >
        Кристальный шар знает всё
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 3,
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        Выбирай вопрос осторожно — будущее может оказаться слишком правдивым🪄
      </Typography>

      <Suspense fallback={<SuspenseFallback />}>
        <Anticipation />
      </Suspense>
    </Container>
  );
}
