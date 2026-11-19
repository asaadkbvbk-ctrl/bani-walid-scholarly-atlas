import { createFileRoute, redirect } from '@tanstack/react-router';

// Old/shared links to "/index" land on the home page instead of "not found".
export const Route = createFileRoute('/index')({
  beforeLoad: () => { throw redirect({ to: '/', replace: true }); },
});
