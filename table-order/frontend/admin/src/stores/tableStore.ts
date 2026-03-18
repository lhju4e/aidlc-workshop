import { create } from 'zustand';
import type { Table } from '@/types';

interface TableState {
  tables: Table[];
  setTables: (tables: Table[]) => void;
}

export const useTableStore = create<TableState>((set) => ({
  tables: [],
  setTables: (tables) => set({ tables }),
}));
