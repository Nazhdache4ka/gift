import { Box, CircularProgress } from '@mui/material';

interface SuspenseFallbackProps {
  heightXs?: number;
  heightMd?: number;
}

export function SuspenseFallback({ heightXs = 400, heightMd = 600 }: SuspenseFallbackProps) {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: { xs: heightXs, md: heightMd } }}
    >
      <CircularProgress size={100} />
    </Box>
  );
}
