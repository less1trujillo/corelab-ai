import { createClient, User } from '@supabase/supabase-js';

const supabaseUrl = 'https://mock-project-id.supabase.co';
const supabaseAnonKey = 'mock-anon-key-for-testing';

// Mock client to prevent network errors in development
const createMockSupabaseClient = () => {
  let session: { user: User } | null = null;
  const listeners: Set<(event: string, session: any) => void> = new Set();

  const mockUser: User = {
    id: 'mock-user-id',
    app_metadata: {},
    user_metadata: { name: 'Mock User' },
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  };

  const notifyListeners = (event: string) => {
    listeners.forEach(cb => cb(event, session));
  };

  try {
    const storedSession = localStorage.getItem('supabase.auth.session');
    if (storedSession) {
      session = JSON.parse(storedSession);
    }
  } catch (e) {
    console.error("Could not parse stored session", e);
  }

  return {
    auth: {
      getSession: async () => {
        return { data: { session }, error: null };
      },
      signInWithPassword: async ({ email, password }: any) => {
        if (email && password) {
          session = { user: { ...mockUser, email } };
          localStorage.setItem('supabase.auth.session', JSON.stringify(session));
          notifyListeners('SIGNED_IN');
          return { data: { session }, error: null };
        }
        return { data: { session: null }, error: { message: 'Invalid credentials' } };
      },
      signUp: async ({ email, password }: any) => {
         if (email && password) {
          session = { user: { ...mockUser, email } };
          localStorage.setItem('supabase.auth.session', JSON.stringify(session));
          notifyListeners('SIGNED_IN');
          return { data: { session }, error: null };
        }
        return { data: { session: null }, error: { message: 'Sign up failed' } };
      },
      signOut: async () => {
        session = null;
        localStorage.removeItem('supabase.auth.session');
        notifyListeners('SIGNED_OUT');
        return { error: null };
      },
      onAuthStateChange: (callback: (event: string, session: any) => void) => {
        listeners.add(callback);
        return {
          data: {
            subscription: {
              unsubscribe: () => {
                listeners.delete(callback);
              },
            },
          },
        };
      },
       signInWithOAuth: async ({ provider }: any) => {
        // This is a simplified mock. In a real scenario, this would redirect.
        console.log(`Mock sign in with ${provider}`);
        session = { user: { ...mockUser, email: 'google.user@example.com' } };
        localStorage.setItem('supabase.auth.session', JSON.stringify(session));
        notifyListeners('SIGNED_IN');
        // No redirect in mock. The effect will be picked up by onAuthStateChange.
      },
    },
  };
};

// Use the mock client if the URL is the mock URL
export const supabase = (supabaseUrl.includes('mock-project-id'))
  ? createMockSupabaseClient()
  : createClient(supabaseUrl, supabaseAnonKey);
