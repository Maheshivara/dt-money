"use client";
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { DeleteTransactionModal } from "@/components/DeleteTransactionModal";
import { EditTransactionModal } from "@/components/EditTransactionModal";
import { FormModal } from "@/components/FormModal";
import { Header } from "@/components/Header";
import { Table } from "@/components/Table";
import { useTransaction } from "@/hooks/transactions";
import { ITotal, ITransaction } from "@/types/transaction";
import { useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { mutateAsync: deleteTransaction } = useTransaction.Delete();
  const handleOpenDeleteModal = (id: string) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedId(null);
  };
  const onDeleteTransaction = (id: string) => {
    deleteTransaction(id);
  };

  const [editModalOpen, setEditModalOpen] = useState(false);
  const handleOpenEditModal = (id: string) => {
    setSelectedId(id);
    setEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedId(null);
  };
  const { mutateAsync: updateTransaction } = useTransaction.Update();
  const handleEditModal = (updatedTransaction: ITransaction) => {
    if (selectedId) {
      updateTransaction({ id: selectedId, data: updatedTransaction });
    }
    handleCloseEditModal();
  };

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data: transactions, isLoading } = useTransaction.ListAll(
    page,
    pageSize
  );
  const { mutateAsync: addTransaction } = useTransaction.Create();
  const openModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddModal = (newTransaction: ITransaction) => {
    addTransaction(newTransaction);
  };

  const totalTransactions: ITotal = useMemo(() => {
    if (!transactions || transactions.data.length === 0) {
      return { totalIncome: 0, totalOutcome: 0, total: 0 };
    }

    return transactions.totalTransactions;
  }, [transactions]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <ToastContainer />
      <Header openModal={openModal} />
      <BodyContainer>
        <CardContainer totals={totalTransactions} />
        <Table
          data={transactions?.data || []}
          deleteModal={handleOpenDeleteModal}
          editModal={handleOpenEditModal}
        />

        {transactions && (
          <div className="flex justify-center gap-2 mt-4">
            <button
              className={`px-3 py-1 rounded ${
                page === 1 ? "font-bold bg-gray-300" : "bg-gray-200"
              }`}
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              {page === 1 ? <b>1</b> : 1}
            </button>

            {page > 3 && <span className="px-2">...</span>}

            {Array.from({ length: 2 }, (_, i) => page - 2 + i)
              .filter((p) => p > 1 && p < page)
              .map((p) => (
                <button
                  key={p}
                  className="px-3 py-1 rounded bg-gray-200"
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}

            {page !== 1 &&
              page !== Math.ceil(transactions.total / pageSize) && (
                <button
                  className="px-3 py-1 rounded font-bold bg-gray-300"
                  disabled
                >
                  <b>{page}</b>
                </button>
              )}

            {Array.from({ length: 2 }, (_, i) => page + i + 1)
              .filter(
                (p) => p < Math.ceil(transactions.total / pageSize) && p > page
              )
              .map((p) => (
                <button
                  key={p}
                  className="px-3 py-1 rounded bg-gray-200"
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}

            {page < Math.ceil(transactions.total / pageSize) - 2 && (
              <span className="px-2">...</span>
            )}

            {Math.ceil(transactions.total / pageSize) > 1 && (
              <button
                className={`px-3 py-1 rounded ${
                  page === Math.ceil(transactions.total / pageSize)
                    ? "font-bold bg-gray-300"
                    : "bg-gray-200"
                }`}
                onClick={() =>
                  setPage(Math.ceil(transactions.total / pageSize))
                }
                disabled={page === Math.ceil(transactions.total / pageSize)}
              >
                {page === Math.ceil(transactions.total / pageSize) ? (
                  <b>{Math.ceil(transactions.total / pageSize)}</b>
                ) : (
                  Math.ceil(transactions.total / pageSize)
                )}
              </button>
            )}
          </div>
        )}
        {editModalOpen && selectedId && (
          <EditTransactionModal
            closeModal={handleCloseEditModal}
            editTransaction={handleEditModal}
            transaction={transactions?.data.find((t) => t.id === selectedId)}
          />
        )}

        {deleteModalOpen && selectedId && (
          <DeleteTransactionModal
            isOpen={deleteModalOpen}
            onClose={handleCloseDeleteModal}
            transactionId={selectedId}
            onDelete={onDeleteTransaction}
          />
        )}

        {isModalOpen && (
          <FormModal
            closeModal={handleCloseModal}
            formTitle="Adicionar Transação"
            addTransaction={handleAddModal}
          />
        )}
      </BodyContainer>
    </div>
  );
}
