import { useEffect, useState } from 'react';
import { Box, Button, ButtonBase, Typography } from '@mui/material';
import { sideConfetti } from '@/shared';

type Cell = 'X' | 'O' | null;

const createInitialBoard = (): Cell[] => Array<Cell>(9).fill(null);

interface TikTakToeProps {
  setHasWon: (hasWon: boolean) => void;
}

export function TikTakToe({ setHasWon }: TikTakToeProps) {
  const [board, setBoard] = useState<Cell[]>(createInitialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Cell>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const handleCellClick = (index: number) => {
    if (board[index] || isGameOver || currentPlayer === 'O') return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const nextWinner = checkWinner(newBoard);
    if (nextWinner) {
      setWinner(nextWinner);
      setIsGameOver(true);
      setHasWon(true);
      sideConfetti();
      return;
    }

    if (!newBoard.includes(null)) {
      setIsGameOver(true);
      return;
    }

    setCurrentPlayer('O');
  };

  useEffect(() => {
    if (currentPlayer !== 'O' || isGameOver) return;

    const timer = window.setTimeout(() => {
      const freeCells = board.reduce<number[]>((indexes, cell, index) => {
        if (cell === null) indexes.push(index);
        return indexes;
      }, []);

      if (freeCells.length === 0) {
        setIsGameOver(true);
        return;
      }

      const randomIndex = freeCells[Math.floor(Math.random() * freeCells.length)];
      const newBoard = [...board];
      newBoard[randomIndex] = 'O';
      setBoard(newBoard);

      const nextWinner = checkWinner(newBoard);
      if (nextWinner) {
        setWinner(nextWinner);
        setIsGameOver(true);
        return;
      }

      if (!newBoard.includes(null)) {
        setIsGameOver(true);
        return;
      }

      setCurrentPlayer('X');
    }, 500);

    return () => window.clearTimeout(timer);
  }, [board, currentPlayer, isGameOver]);

  const handleRestart = () => {
    setBoard(createInitialBoard());
    setCurrentPlayer('X');
    setWinner(null);
    setIsGameOver(false);
    setHasWon(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 460,
        mx: 'auto',
        p: { xs: 2, sm: 3 },
        bgcolor: 'background.paper',
        border: 2,
        borderColor: 'divider',
        borderRadius: '6% 4% 7% 5% / 5% 7% 4% 6%',
        boxShadow: 6,
        my: 2,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 1,
          textAlign: 'center',
          fontSize: { xs: '1.4rem', sm: '1.8rem' },
        }}
      >
        Крестики против сверхразума
      </Typography>

      <Typography
        aria-live="polite"
        sx={{
          mb: 2.5,
          minHeight: 24,
          textAlign: 'center',
          color: currentPlayer === 'X' ? 'primary.main' : 'secondary.main',
          fontFamily: '"Comfortaa", sans-serif',
          fontWeight: 700,
        }}
      >
        {isGameOver ? 'Игра окончена' : currentPlayer === 'X' ? 'Твой ход, ты — X' : 'Сверхразум думает...'}
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: { xs: 1, sm: 1.5 } }}>
        {board.map((cell, index) => (
          <ButtonBase
            key={index}
            onClick={() => handleCellClick(index)}
            disabled={Boolean(cell) || isGameOver || currentPlayer === 'O'}
            aria-label={cell ? `Клетка ${index + 1}: ${cell}` : `Пустая клетка ${index + 1}`}
            sx={{
              width: '100%',
              aspectRatio: '1 / 1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'background.default',
              border: 2,
              borderColor: cell === 'X' ? 'primary.main' : cell === 'O' ? 'secondary.main' : 'divider',
              borderRadius: index % 2 === 0 ? '24% 18% 22% 16%' : '16% 24% 18% 22%',
              boxShadow: cell ? 3 : 1,
              transition: 'transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: 4,
                transform: 'translateY(-2px) rotate(-1deg)',
              },
              '&:active': {
                transform: 'scale(0.96)',
              },
              '&.Mui-disabled': {
                color: 'text.primary',
              },
            }}
          >
            <Typography
              component="span"
              sx={{
                color: cell === 'X' ? 'primary.main' : 'secondary.main',
                fontFamily: '"Comfortaa", sans-serif',
                fontSize: { xs: '2.5rem', sm: '3.5rem' },
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              {cell}
            </Typography>
          </ButtonBase>
        ))}
      </Box>

      {isGameOver && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography
            variant="body1"
            sx={{ mb: 1.5, fontWeight: 700 }}
          >
            {winner === 'X'
              ? 'Победа!? Точно не читерила???'
              : winner === 'O'
                ? 'ИИ победил. Ну в целом ожидаемо'
                : 'Ничья!'}
          </Typography>
          <Button
            variant="contained"
            onClick={handleRestart}
            sx={{
              borderRadius: 999,
              px: 3,
              fontFamily: '"Comfortaa", sans-serif',
              fontWeight: 700,
            }}
          >
            Сыграть ещё раз
          </Button>
        </Box>
      )}
    </Box>
  );
}

function checkWinner(board: Cell[]): Cell {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}
