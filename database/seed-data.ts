interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Completed: Lorem, ipsum dolor.',
      status: 'completed',
      createdAt: Date.now(),
    },
    {
      description: 'In-progress:Lorem ipsum dolor sit.',
      status: 'in-progress',
      createdAt: Date.now() - 50000,
    },
    {
      description: 'Pending:Lorem ipsum dolor sit amet consectetur.',
      status: 'pending',
      createdAt: Date.now(),
    },
  ],
};
