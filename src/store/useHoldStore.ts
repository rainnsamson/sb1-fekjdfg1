import { create } from 'zustand';
import { BookHold } from '../types';

interface HoldState {
  holds: BookHold[];
  addHold: (hold: BookHold) => void;
  updateHoldStatus: (holdId: string, status: BookHold['status']) => void;
}

export const useHoldStore = create<HoldState>((set) => ({
  holds: [],
  addHold: (hold) => set((state) => ({ 
    holds: [...state.holds, hold] 
  })),
  updateHoldStatus: (holdId, status) => set((state) => ({
    holds: state.holds.map((hold) => 
      hold.id === holdId ? { ...hold, status } : hold
    )
  })),
}));