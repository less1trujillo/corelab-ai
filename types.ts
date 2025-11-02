import React from 'react';
import { User } from '@supabase/supabase-js';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  plan: 'spark' | 'momentum' | 'quantum' | 'enterprise' | null;
  upgradePlan: (newPlan: 'momentum') => void;
}

export interface Bot {
  name: string;
  description: string;
  icon: React.ReactNode;
}

export interface Step {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export interface Principle {
    name: string;
    description: string;
    icon: React.ReactNode;
}

export type Language = 'en' | 'es';

export interface Plan {
  name: string;
  price: string;
  priceDetails: string;
  description: string;
  features: string[];
  ctaText: string;
  isFeatured: boolean;
  featuredText?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

export interface BenefitModule {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  image: string;
}

export interface ActivityLogItem {
    bot: string;
    client: {
        id: number;
        name: string;
    };
    action: string;
    impact: {
        value: string;
        type: 'positive' | 'negative' | 'neutral';
    };
    timestamp: string;
    icon: React.ReactNode;
    type: 'log' | 'alert' | 'success';
}

export interface JourneyStep {
  planName: string;
  planColor: string;
  title: string;
  action: {
    label: string;
    description: string;
  };
  process: {
    icon: React.ReactNode;
    title: string;
    description: string;
  };
  result: {
    title: string;
    description: string;
    metrics: {
      label: string;
      value: string;
      change?: string;
      color?: string;
    }[];
    icon: React.ReactNode;
  };
}

export interface Client {
    id: number;
    name: string;
    status: string;
    statusColor: string;
    plan: 'Momentum' | 'Quantum' | 'Enterprise';
    mrr: number;
    churnRisk: 'Low' | 'Medium' | 'High';
}

export interface ChartDataPoint {
    x: number;
    y: number;
}

export interface BotMetric {
    label: string;
    value: string;
    icon: React.ReactNode;
}

export interface AdminMetric {
    label: string;
    value: string;
    icon: React.ReactNode;
}

export interface SentinelFinding {
    title: string;
    description: string;
    severity: 'High' | 'Medium' | 'Low';
    businessImpact: string;
    aiSolution: string;
}

export interface SentinelReportData {
    businessName: string;
    executiveSummary: string;
    keyMetrics: { label: string; value: string; }[];
    findings: SentinelFinding[];
}

export interface GrowthKitTool {
    title: string;
    category: string;
    prompt: string;
    description: string;
}

export interface Review {
    id: number;
    author: string;
    rating: number;
    content: string;
    source: string;
    sourceIcon: React.ReactNode;
    aiResponse: string;
}