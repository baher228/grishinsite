export interface Discount {
  id: number;
  percentage: number;
  title: string;
  description: string;
  code: string;
  validUntil: string;
}

export const discounts: Discount[] = [
  {
    id: 1,
    percentage: 25,
    title: "New Customer Special",
    description: "Get 25% off your first purchase of any tools",
    code: "WELCOME25",
    validUntil: "2024-12-31"
  },
  {
    id: 2,
    percentage: 15,
    title: "Power Tools Sale",
    description: "Save 15% on all power tools this month",
    code: "POWER15",
    validUntil: "2024-12-31"
  },
  {
    id: 3,
    percentage: 20,
    title: "Plumbing Bundle",
    description: "20% off when you buy any 3 plumbing items",
    code: "PLUMB20",
    validUntil: "2024-12-31"
  },
  {
    id: 4,
    percentage: 30,
    title: "Clearance Sale",
    description: "Up to 30% off selected items",
    code: "CLEAR30",
    validUntil: "2024-12-31"
  },
  {
    id: 5,
    percentage: 10,
    title: "Loyalty Reward",
    description: "Extra 10% off for loyalty program members",
    code: "LOYAL10",
    validUntil: "2024-12-31"
  }
];
