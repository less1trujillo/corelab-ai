
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<AuthContextType['plan']>(null);

  useEffect(() => {
    const getSessionAndPlan = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        if (session?.user) {
            // In a real app, you'd fetch this from your database
            // For now, we'll simulate it. All users start on 'spark'.
            setPlan('spark');
        } else {
            setPlan(null);
        }
        setLoading(false);
    }
    
    getSessionAndPlan();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
           setPlan('spark'); // Reset to spark on new login
        } else {
           setPlan(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const upgradePlan = useCallback((newPlan: 'momentum') => {
      // In a real app, this would be an API call that triggers after successful payment
      // and then updates the user's record in your database.
      if (user) {
          console.log(`Upgrading user ${user.id} to ${newPlan}`);
          setPlan(newPlan);
      }
  }, [user]);


  const value = {
    user,
    loading,
    plan,
    upgradePlan,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};