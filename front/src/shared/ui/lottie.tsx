import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { type SxProps, Box } from '@mui/material';

interface LottieProps {
  animationData: any;
  width: number;
  height: number;
  loop?: boolean;
  autoplay?: boolean;
  sx?: SxProps;
}

export function Lottie({ animationData, width, height, loop, autoplay, sx }: LottieProps) {
  return (
    <Box sx={{ width, height, ...sx }}>
      <DotLottieReact
        data={animationData}
        width={width}
        height={height}
        loop={loop}
        autoplay={autoplay}
      />
    </Box>
  );
}
