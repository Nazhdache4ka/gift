import { IconButton, Tooltip } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

interface ButtonBackProps {
  to?: '/' | '/quest';
}

export function ButtonBack({ to = '/' }: ButtonBackProps) {
  return (
    <Link to={to}>
      <Tooltip title="Назад">
        <IconButton sx={{ color: 'primary.main', mt: 4 }}>
          <FaArrowAltCircleLeft size={32} />
        </IconButton>
      </Tooltip>
    </Link>
  );
}
