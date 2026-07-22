import { createFileRoute } from '@tanstack/react-router';
import { Login } from '@/pages';

export const Route = createFileRoute('/_main/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
