import { Box, ButtonBase, Container, Paper, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { ButtonBack } from '@/shared';

export function Quest() {
  return (
    <Container maxWidth="xl">
      <ButtonBack />

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
        Тут для тебя две мини-игры
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center', color: 'text.secondary' }}
      >
        Турбо-гипер-супер имба
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: { xs: 3, md: 4 },
          maxWidth: 1000,
          mx: 'auto',
          pb: { xs: 6, md: 10 },
        }}
      >
        {questCards.map(card => (
          <Link
            key={card.to}
            to={card.to}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Paper
              elevation={6}
              sx={{
                height: '100%',
                overflow: 'hidden',
                border: 2,
                borderColor: 'divider',
                borderRadius: card.borderRadius,
                transition: 'transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
                '&:hover': {
                  borderColor: card.color,
                  boxShadow: 10,
                  transform: 'translateY(-6px) rotate(-1deg)',
                },
              }}
            >
              <ButtonBase
                component="div"
                sx={{
                  width: '100%',
                  minHeight: { xs: 260, md: 360 },
                  p: { xs: 3, md: 5 },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  textAlign: 'center',
                }}
              >
                <Typography
                  component="span"
                  aria-hidden="true"
                  sx={{ fontSize: { xs: '4rem', md: '6rem' }, lineHeight: 1 }}
                >
                  {card.emoji}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontSize: { xs: '1.6rem', md: '2.4rem' }, color: card.color }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'text.secondary', textWrap: 'balance' }}
                >
                  {card.description}
                </Typography>
              </ButtonBase>
            </Paper>
          </Link>
        ))}
      </Box>
    </Container>
  );
}

const questCards = [
  {
    to: '/quest/tic-tac-toe',
    emoji: '❌⭕',
    title: 'Крестики против сверхразума',
    description: 'Обыграй Chat GPT 5.6 Terra и получи совершенно настоящий приз',
    color: 'primary.main',
    borderRadius: '7% 4% 8% 5% / 5% 8% 4% 7%',
  },
  {
    to: '/quest/anticipation',
    emoji: '🔮',
    title: 'Предсказание будущего',
    description: 'Задай важнейшие вопросы кристальному шару и узнай страшную правду',
    color: 'secondary.main',
    borderRadius: '4% 8% 5% 7% / 8% 4% 7% 5%',
  },
] as const;
