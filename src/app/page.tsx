"use client";

import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { Header } from "@/components/Header";
import { InsertTransactionDialog } from "@/components/InsertTransactionDialog";
import { TransactionList } from "@/components/TransactionList";
import { ITransaction } from "@/interfaces/transaction";
import { useState } from "react";

const initTransactions: ITransaction[] = [
  {
    id: 4,
    title: "Desenvolvimento de site",
    value: 12000,
    type: "income",
    category: "Venda",
    createdAt: new Date("2021-04-13"),
  },
  {
    id: 3,
    title: "Hamburger",
    value: -59,
    type: "outcome",
    category: "Alimentação",
    createdAt: new Date("2021-04-10"),
  },
  {
    id: 2,
    title: "Aluguel do apartamento",
    value: -1200,
    type: "outcome",
    category: "Casa",
    createdAt: new Date("2021-03-27"),
  },
  {
    id: 1,
    title: "Computador",
    value: 5400,
    type: "income",
    category: "Venda",
    createdAt: new Date("2023-10-01"),
  },
];

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [transactions, setTransactions] =
    useState<ITransaction[]>(initTransactions);

  return (
    <div>
      <Header onNewTransaction={() => setDialogOpen(true)} />
      <InsertTransactionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={(transaction) => {
          transactions.push({
            ...transaction,
            id: transactions.length + 1,
            createdAt: new Date(),
          });
          setTransactions([...transactions]);
          setDialogOpen(false);
        }}
      />
      <BodyContainer>
        <CardContainer />
        <TransactionList list={transactions} />
      </BodyContainer>
    </div>
  );
}
