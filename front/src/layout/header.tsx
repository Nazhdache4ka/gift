import { AppBar, Toolbar, Typography, IconButton, Tooltip, Box } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import ContrastIcon from '@mui/icons-material/Contrast';
import { Lottie } from '@/shared';
import animationData from './assets/gift.json';

export function Header() {
  const { mode, setMode } = useColorScheme();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        borderBottom: 1,
        borderColor: 'divider',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <Typography variant="h3">Подарок</Typography>
          <Lottie
            animationData={animationData}
            width={60}
            height={60}
            loop
            autoplay
          />
        </Box>

        <Tooltip title="Toggle Theme">
          <IconButton
            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            sx={{ ml: 'auto', color: 'text.primary' }}
          >
            <ContrastIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
