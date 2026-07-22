import { Box, Typography, Container, Link, Tooltip } from '@mui/material';
import { FaTelegram } from 'react-icons/fa';
import footerVideo from './assets/gif.mp4';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'auto minmax(0, 1fr) auto',
            sm: '1fr auto 1fr',
          },
          alignItems: 'center',
          gap: { xs: 1, sm: 2 },
          py: 2,
        }}
      >
        <Box
          component="video"
          src={footerVideo}
          autoPlay
          muted
          loop
          playsInline
          sx={{
            gridColumn: 1,
            width: { xs: 56, md: 72 },
            height: { xs: 56, md: 72 },
            objectFit: 'cover',
            '&:hover': { scale: 1.05 },
            transition: 'all 0.3s ease-in-out',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            gridColumn: 2,
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: 0,
          }}
        >
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ textAlign: 'center', overflowWrap: 'anywhere' }}
          >
            Конечно нет проблем, когда продакшен Слава Мерлоу
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center' }}
          >
            &copy; Права в поряде епта
          </Typography>
        </Box>
        <Tooltip title="Гениальный создатель">
          <Link
            href="https://t.me/iliaiurk"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              gridColumn: 3,
              justifySelf: 'end',
              color: 'text.primary',
            }}
          >
            <FaTelegram size={24} />
          </Link>
        </Tooltip>
      </Container>
    </Box>
  );
}
