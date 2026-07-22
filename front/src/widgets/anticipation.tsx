import { useState, type MouseEvent } from 'react';
import { animated, useSpring } from '@react-spring/web';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { Lottie } from '@/shared';
import crystal from '../assets/crystal.json';

interface Question {
  id: number;
  question: string;
  answer: string;
  retryMessage: string;
}

type Phase = 'idle' | 'ready' | 'animating' | 'revealed';

const questions: Question[] = [
  {
    id: 1,
    question: 'Порвут ли Полине туз?',
    answer: 'Нет конечно',
    retryMessage: 'А тебя такой ответ не устроил что ли?😁',
  },
  {
    id: 2,
    question: 'Подарят ли Полине BMW X5M?',
    answer: 'Бро, ты сама как машина💪',
    retryMessage: 'Ну реально машина, даже не сомневайся',
  },
  {
    id: 3,
    question: 'Стоит ли покупать биткоин на все бабки?',
    answer: 'Э, вацок, я гадалка, а не экономист',
    retryMessage: 'Ну а так парочку купить можно',
  },
];

export function Anticipation() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [retryOpen, setRetryOpen] = useState(false);
  const menuOpen = Boolean(anchorEl);

  const [ballSpring, ballApi] = useSpring(() => ({
    opacity: 0.15,
    scale: 0.35,
  }));

  const [answerSpring, answerApi] = useSpring(() => ({
    opacity: 0,
    scale: 0.6,
  }));

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setPhase('ready');
    setRetryOpen(false);
    ballApi.set({ opacity: 0.15, scale: 0.35 });
    answerApi.set({ opacity: 0, scale: 0.6 });
    handleCloseMenu();
  };

  const handleRevealFuture = () => {
    if (!selectedQuestion || phase === 'animating') return;

    setPhase('animating');
    ballApi.start({
      from: { opacity: 0.15, scale: 0.35 },
      to: { opacity: 1, scale: 1 },
      config: { tension: 110, friction: 16 },
      onRest: result => {
        if (result.finished) {
          setPhase('revealed');
          answerApi.start({
            from: { opacity: 0, scale: 0.6 },
            to: { opacity: 1, scale: 1 },
            config: { tension: 180, friction: 14 },
          });
        }
      },
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, my: 2 }}>
      <Button
        variant="outlined"
        onClick={handleOpenMenu}
        sx={{
          borderRadius: 999,
          px: 3,
          fontFamily: '"Comfortaa", sans-serif',
          fontWeight: 700,
        }}
      >
        Выбрать вопрос
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {questions.map(question => (
          <MenuItem
            key={question.id}
            onClick={() => handleSelectQuestion(question)}
            sx={{ fontFamily: '"Comfortaa", sans-serif' }}
          >
            {question.question}
          </MenuItem>
        ))}
      </Menu>

      {selectedQuestion && (
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', maxWidth: 420, px: 2, color: 'text.secondary' }}
        >
          {selectedQuestion.question}
        </Typography>
      )}

      {phase === 'ready' && (
        <Button
          variant="contained"
          onClick={handleRevealFuture}
          sx={{
            borderRadius: 999,
            px: 3,
            fontFamily: '"Comfortaa", sans-serif',
            fontWeight: 700,
          }}
        >
          Узнать будущее
        </Button>
      )}

      {(phase === 'animating' || phase === 'revealed') && (
        <animated.div
          style={{
            opacity: ballSpring.opacity,
            transform: ballSpring.scale.to(scale => `scale(${scale})`),
            transformOrigin: 'center',
            willChange: 'transform, opacity',
          }}
        >
          <Lottie
            animationData={crystal}
            width={280}
            height={280}
            loop
            autoplay
          />
        </animated.div>
      )}

      {phase === 'revealed' && selectedQuestion && (
        <animated.div
          style={{
            opacity: answerSpring.opacity,
            transform: answerSpring.scale.to(scale => `scale(${scale})`),
            transformOrigin: 'center',
            willChange: 'transform, opacity',
          }}
        >
          <Box sx={{ textAlign: 'center', maxWidth: 420, px: 2 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontFamily: '"Comfortaa", sans-serif',
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              {selectedQuestion.answer}
            </Typography>

            <Button
              variant="outlined"
              onClick={() => setRetryOpen(true)}
              sx={{
                borderRadius: 999,
                px: 3,
                fontFamily: '"Comfortaa", sans-serif',
                fontWeight: 700,
              }}
            >
              Попытать удачу ещё раз
            </Button>
          </Box>
        </animated.div>
      )}

      <Dialog
        open={retryOpen}
        onClose={() => setRetryOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          <Typography sx={{ textAlign: 'center', fontFamily: '"Comfortaa", sans-serif', fontWeight: 700 }}>
            Шар устал отвечать
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            sx={{ textAlign: 'center' }}
          >
            {selectedQuestion?.retryMessage}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            variant="contained"
            onClick={() => setRetryOpen(false)}
            sx={{
              borderRadius: 999,
              px: 3,
              fontFamily: '"Comfortaa", sans-serif',
              fontWeight: 700,
            }}
          >
            Ладно
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
