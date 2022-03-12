export interface Entry {
  _id: string;
  description: string;
  createdAt: number;
  status: EntryStatus;
}

export type EntryStatus = 'completed' | 'pending' | 'in-progress';
