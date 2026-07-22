import { type FormEvent, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { verifyName } from './lib';
import { FallingStar, sideConfetti } from '@/shared';

export function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  const handleSubmitName = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { message, isAccepted } = verifyName(name);

    if (isAccepted) {
      sideConfetti();
    }

    setIsAccepted(isAccepted);
    setIsModalOpen(true);
    setMessage(message);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsAccepted(false);
    setName('');
    setMessage('');
  };

  const handleContinue = () => {
    sessionStorage.setItem('name', name);
    handleCloseModal();
    navigate({ to: '/' });
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ display: 'flex', flex: 1 }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <FallingStar
          opacity={0.2}
          duration={6}
        />
        <FallingStar />
        <FallingStar
          opacity={0.5}
          duration={10}
        />

        <Box
          component="form"
          onSubmit={handleSubmitName}
          sx={{
            width: { xs: '100%', md: '50%' },
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            zIndex: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{ textAlign: 'center' }}
          >
            Сюда пускают только крутышек, у которых сегодня особенный день😎
          </Typography>
          <TextField
            label="А как звать?"
            variant="outlined"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
          >
            Войти
          </Button>
        </Box>
      </Box>
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>{isAccepted ? 'Добро пожаловать!' : 'Не получилось войти'}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={isAccepted ? handleContinue : handleCloseModal}
          >
            {isAccepted ? 'Продолжить' : 'Закрыть'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
