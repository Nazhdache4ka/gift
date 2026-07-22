import { Quest } from '@/pages';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/quest')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Quest />;
}
