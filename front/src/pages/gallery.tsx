import { lazy, Suspense } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { ButtonBack, SuspenseFallback } from '@/shared';

const GalleryCards = lazy(() => import('../widgets/gallery-cards').then(module => ({ default: module.GalleryCards })));

export function Gallery() {
  return (
    <Container maxWidth="xl">
      <ButtonBack />

      <Box sx={{ py: { xs: 4, md: 4 }, textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
            overflowWrap: 'anywhere',
          }}
        >
          Ну короче тут будет компромат, а может и просто кайфовые фотки и видео
        </Typography>
        <Typography
          variant="body1"
          sx={{ my: 2 }}
        >
          P.S Тыкай на крышки, чтобы открыть🤓
        </Typography>
      </Box>

      <Suspense fallback={<SuspenseFallback />}>
        <GalleryCards />
      </Suspense>
    </Container>
  );
}
