import { createFileRoute } from '@tanstack/react-router';
import { TicTakToeQuest } from '@/pages';

export const Route = createFileRoute('/_main/quest_/tic-tac-toe')({
  component: TicTakToeQuest,
});
