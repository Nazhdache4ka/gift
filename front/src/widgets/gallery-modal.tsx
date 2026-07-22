import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface GalleryModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text: string;
}

export function GalleryModal({ open, onClose, onConfirm, text }: GalleryModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        <Typography sx={{ textAlign: 'center', fontSize: { xs: '1rem', md: '2rem' } }}>
          Внимание! Не для слабонервных!
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="body1"
          sx={{ textAlign: 'center' }}
        >
          {text}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onConfirm}
        >
          Все равно посмотреть
        </Button>
      </DialogActions>
    </Dialog>
  );
}
