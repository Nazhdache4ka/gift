import { createFileRoute } from '@tanstack/react-router';
import { AnticipationQuest } from '@/pages';

export const Route = createFileRoute('/_main/quest_/anticipation')({
  component: AnticipationQuest,
});
