import { Gallery } from '@/pages';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/gallery')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Gallery />;
}
