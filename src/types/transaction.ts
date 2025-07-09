export interface ITransaction {
  id?: string;
  title: string;
  price: number;
  category: string;
  data: Date;
  type: "INCOME" | "OUTCOME";
}

export type ITotal = {
  totalIncome: number;
  totalOutcome: number;
  total: number;
};

export type TransactionListResponse = {
  data: ITransaction[];
  totalTransactions: ITotal;
  total: number;
  page: number;
  perPage: number;
};
