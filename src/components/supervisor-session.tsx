import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

const SessionContext = createContext<{ user: User | null; ready: boolean; recovery: boolean }>({ user: null, ready: false, recovery: false });
export const useSupervisorSession = () => useContext(SessionContext);

export function SupervisorSession({ children }: { children: ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [state, setState] = useState<{ user: User | null; ready: boolean; recovery: boolean }>({ user: null, ready: false, recovery: false });
  useEffect(() => {
    let active = true;
    let generation = 0;
    const refresh = async () => {
      const current = ++generation;
      const { data } = await supabase.auth.getUser();
      if (active && current === generation) setState(previous => ({ ...previous, user: data.user, ready: true }));
    };
    const { data: { subscription } } = supabase.auth.onAuthStateChange(event => {
      if (event === 'PASSWORD_RECOVERY') {
        setState(previous => ({ ...previous, recovery: true }));
        setTimeout(() => void refresh(), 0);
        return;
      }
      if (!['SIGNED_IN', 'SIGNED_OUT', 'USER_UPDATED'].includes(event)) return;
      if (event === 'SIGNED_OUT') {
        generation++;
        setState({ user: null, ready: true, recovery: false });
        void queryClient.cancelQueries().then(() => queryClient.clear());
        void router.navigate({ to: '/auth', replace: true });
      } else {
        // Leave the auth callback before making another auth request.
        setTimeout(() => void refresh(), 0);
        void queryClient.invalidateQueries();
      }
      void router.invalidate();
    });
    void refresh();
    return () => { active = false; subscription.unsubscribe(); };
  }, [router, queryClient]);
  return <SessionContext.Provider value={state}>
    {state.user && <div dir="rtl" className="flex flex-wrap items-center justify-between gap-2 border-b bg-card px-4 py-2 text-sm">
      <Link to="/admin" className="font-medium">حساب المشرف</Link>
      <span className="break-all text-muted-foreground">{state.user.email}</span>
      <SignOutButton />
    </div>}
    {children}
  </SessionContext.Provider>;
}

export function SignOutButton() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  return <div><Button variant="outline" disabled={busy} onClick={async () => {
    setBusy(true); setError('');
    await queryClient.cancelQueries(); queryClient.clear();
    const { error } = await supabase.auth.signOut();
    if (error) { setError('تعذر تسجيل الخروج. حاول مجدداً.'); setBusy(false); return; }
    await router.navigate({ to: '/auth', replace: true });
    setBusy(false);
  }}>تسجيل الخروج</Button>{error && <p role="alert">{error}</p>}</div>;
}