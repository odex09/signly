import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'signly_app_state';

const PLANS_FEATURES = {
  starter: ['Signature simple', 'Piste d\'audit de base'],
  pro: ['Documents illimités', 'Modèles réutilisables', 'Signature multi-parties', 'Relances automatiques', 'Piste d\'audit avancée', 'Branding personnalisé'],
  business: ['Tout le plan Pro', 'Jusqu\'à 20 utilisateurs', 'Workflows séquentiels', 'SSO & API', 'Support dédié'],
};

const DEFAULT_USERS = [
  { id: 'u1', name: 'Camille Moreau', email: 'camille@studio.fr', role: 'user', plan: 'pro', status: 'actif', createdAt: '2026-01-12' },
  { id: 'u2', name: 'Thomas Lefèvre', email: 'thomas@vertex.fr', role: 'user', plan: 'starter', status: 'actif', createdAt: '2026-02-03' },
  { id: 'u3', name: 'Sofia Kaddour', email: 'sofia@arcade.fr', role: 'user', plan: 'business', status: 'actif', createdAt: '2026-01-28' },
  { id: 'u4', name: 'Admin Principal', email: 'admin@signly.io', role: 'admin', plan: 'business', status: 'actif', createdAt: '2025-12-01' },
];

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
};

const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
};

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const initial = loadState();
  const [plan, setPlan] = useState(initial?.plan || 'starter');
  const [documents, setDocuments] = useState(initial?.documents || []);
  const [user, setUser] = useState(initial?.user || { firstName: 'Camille', lastName: 'Moreau', email: 'camille@studio.fr', company: 'Nebula Studio', role: 'user' });
  const [users, setUsers] = useState(initial?.users || DEFAULT_USERS);
  const [planConfig, setPlanConfig] = useState(initial?.planConfig || {
    starter: { price: 0, docsPerMonth: 3, users: 1, name: 'Starter' },
    pro: { price: 19, docsPerMonth: Infinity, users: 1, name: 'Pro' },
    business: { price: 49, docsPerMonth: Infinity, users: 20, name: 'Business' },
  });

  useEffect(() => {
    saveState({ plan, documents, user, users, planConfig });
  }, [plan, documents, user, users, planConfig]);

  const plans = {};
  Object.keys(planConfig).forEach((k) => {
    plans[k] = { id: k, ...planConfig[k], features: PLANS_FEATURES[k] || [] };
  });

  const isAdmin = user?.role === 'admin';

  const docsThisMonth = useCallback(() => {
    const now = new Date();
    const ym = `${now.getFullYear()}-${now.getMonth()}`;
    return documents.filter((d) => {
      const dt = new Date(d.date);
      return `${dt.getFullYear()}-${dt.getMonth()}` === ym;
    }).length;
  }, [documents]);

  const canSign = useCallback(() => {
    const limit = planConfig[plan]?.docsPerMonth;
    if (limit === Infinity || limit == null) return true;
    return docsThisMonth() < limit;
  }, [plan, planConfig, docsThisMonth]);

  const addDocument = useCallback((doc) => {
    setDocuments((prev) => [{ id: `doc_${Date.now()}`, date: new Date().toISOString(), ...doc }, ...prev]);
  }, []);

  const removeDocument = useCallback((id) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const upgradePlan = useCallback((newPlan) => {
    if (planConfig[newPlan]) {
      setPlan(newPlan);
      setUser((u) => ({ ...u, plan: newPlan }));
    }
  }, [planConfig]);

  const updateUserRole = useCallback((userId, role) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
  }, []);

  const updateUserPlan = useCallback((userId, newPlan) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, plan: newPlan } : u)));
  }, []);

  const deleteUser = useCallback((userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  }, []);

  const updatePlanConfig = useCallback((planId, config) => {
    setPlanConfig((prev) => ({ ...prev, [planId]: { ...prev[planId], ...config } }));
  }, []);

  const switchRole = useCallback((role) => {
    setUser((u) => ({ ...u, role }));
  }, []);

  return (
    <AppContext.Provider value={{
      plan, plans, planConfig, user, setUser, users, setUsers,
      documents, addDocument, removeDocument, upgradePlan,
      canSign, docsThisMonth, isAdmin, switchRole,
      updateUserRole, updateUserPlan, deleteUser, updatePlanConfig,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}