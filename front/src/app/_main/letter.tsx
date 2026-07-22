import { createFileRoute } from '@tanstack/react-router';
import { Letter } from '@/pages';

export const Route = createFileRoute('/_main/letter')({
  component: Letter,
});
