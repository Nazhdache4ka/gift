import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { Header, Footer } from '@/layout';
import { Box } from '@mui/material';

export const Route = createFileRoute('/_main')({
  component: Layout,
  beforeLoad: ({ location }) => {
    const name = sessionStorage.getItem('name');

    if (!name && location.pathname !== '/login') {
      throw redirect({ to: '/login', replace: true });
    }

    if (name && location.pathname === '/login') {
      throw redirect({ to: '/', replace: true });
    }
  },
});

function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <Box sx={{ display: 'flex', flexGrow: 1, width: '100%', minHeight: 0 }}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
