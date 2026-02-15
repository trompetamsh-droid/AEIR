import React from 'react';

export interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}