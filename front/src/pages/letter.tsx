import { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Avatar, Box, ButtonBase, Container, Paper, Typography, useMediaQuery } from '@mui/material';
import { ButtonBack } from '@/shared';
import envelope from '../assets/envelope.png';
import poganets from '../assets/poganets.webp';
import kaban from '../assets/kaban.webp';

interface ILetterItem {
  id: number;
  author: string;
  avatar: string;
  text: string;
}

const letter: ILetterItem[] = [
  {
    id: 1,
    author: 'Глеб',
    avatar: poganets,
    text: 'С днём рождения мудрец!! Вот тебе и стукнула 20-ка , новое десятилетие, период, когда ты станешь реально успешным человеком несмотря ни на что, ведь я знаю, что ты никогда не отступишь. Я даже не знаю, что тебе пожелать такого, чего у тебя нет, в голову приходит лишь оглушительный успех и ещё более светлое будущее. Трудности будут, но знай, что, если не будешь сдаваться, станешь величайшим из нашего ебучего класса',
  },
  {
    id: 2,
    author: 'Илья',
    avatar: kaban,
    text: '',
  },
];

export function Letter() {
  return (
    <Container maxWidth="lg">
      <ButtonBack />

      <Typography
        variant="h1"
        sx={{
          textAlign: 'center',
          textWrap: 'balance',
          overflowWrap: 'anywhere',
          fontSize: { xs: '1.8rem', md: '3rem' },
          mt: 2,
          mb: 2,
        }}
      >
        Шутки шутками, и я надеюсь они хотя бы на мгновение заставили тебя улыбнуться, но главное, что у тебя сегодня
        день рождения, так что вот парочка теплых слов в такой особенный день
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: { xs: 3, md: 4 },
          pb: { xs: 6, md: 10 },
        }}
      >
        {letter.map(item => (
          <LetterItem
            key={item.id}
            letter={item}
          />
        ))}
      </Box>
    </Container>
  );
}

interface LetterItemProps {
  letter: ILetterItem;
}

function LetterItem({ letter }: LetterItemProps) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [revealed, setRevealed] = useState(false);
  const [envelopeGone, setEnvelopeGone] = useState(false);

  const envelopeSpring = useSpring({
    opacity: revealed ? 0 : 1,
    transform: revealed ? 'scale(1.35) rotate(-3deg)' : 'scale(1) rotate(0deg)',
    immediate: prefersReducedMotion,
    config: { mass: 1, tension: 110, friction: 20 },
    onRest: result => {
      if (result.finished && revealed) {
        setEnvelopeGone(true);
      }
    },
  });

  const textSpring = useSpring({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0px) scale(1)' : 'translateY(24px) scale(0.94)',
    delay: revealed && !prefersReducedMotion ? 120 : 0,
    immediate: prefersReducedMotion,
    config: { tension: 170, friction: 20 },
  });

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 380, sm: 440 },
        overflow: 'hidden',
        borderRadius: '7% 4% 8% 5% / 5% 8% 4% 7%',
      }}
    >
      <animated.div
        style={{
          ...textSpring,
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <Paper
          elevation={5}
          sx={{
            position: 'absolute',
            inset: 0,
            p: { xs: 3, sm: 4 },
            overflow: 'auto',
            border: 2,
            borderColor: 'divider',
            borderRadius: '7% 4% 8% 5% / 5% 8% 4% 7%',
            bgcolor: 'background.paper',
            backgroundImage: 'linear-gradient(transparent 31px, color-mix(in srgb, currentColor 8%, transparent) 32px)',
            backgroundSize: '100% 32px',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-line',
              lineHeight: 2,
              overflowWrap: 'anywhere',
            }}
          >
            {letter.text.length === 0
              ? 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, aut! Commodi eos consequatur explicabo quae repellat perferendis, facere sit recusandae dicta architecto in assumenda voluptas accusantium vitae nulla inventore at'
              : letter.text}
          </Typography>

          <Box
            sx={{
              mt: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar
              src={letter.avatar}
              alt={letter.author}
              sx={{ width: 64, height: 64, border: 2 }}
            />
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
            >
              {letter.author}
            </Typography>
          </Box>
        </Paper>
      </animated.div>

      {!envelopeGone && (
        <animated.div
          style={{
            ...envelopeSpring,
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            transformOrigin: 'center',
            willChange: 'transform, opacity',
            pointerEvents: revealed ? 'none' : 'auto',
          }}
        >
          <ButtonBase
            onClick={() => setRevealed(true)}
            aria-label={`Открыть письмо от ${letter.author}`}
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.default',
            }}
          >
            <Box
              component="img"
              src={envelope}
              alt=""
              sx={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                pointerEvents: 'none',
              }}
            />
          </ButtonBase>
        </animated.div>
      )}
    </Box>
  );
}
