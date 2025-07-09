import { ITransaction, TransactionListResponse } from "@/types/transaction";
import { api } from "../api";
import { toast } from "react-toastify";

export async function getTransactions(page: number = 1, perPage: number = 10) {
  try {
    const response = await api.get("/transaction", {
      params: {
        page,
        perPage,
      },
    });
    return response.data as TransactionListResponse;
  } catch (error) {
    throw new Error("Erro ao buscar transações: " + error);
  }
}

export async function createTransaction(transaction: ITransaction) {
  try {
    const response = await api.post("/transaction", transaction);
    toast.success("Transação adicionada com sucesso!");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao criar transação: " + error);
  }
}

export async function deleteTransaction(id: string) {
  try {
    await api.delete(`/transaction/${id}`);
    toast.success("Transação removida com sucesso!");
    return;
  } catch (error) {
    throw new Error("Erro ao remover transação: " + error);
  }
}

export async function updateTransaction(id: string, transaction: ITransaction) {
  try {
    const response = await api.patch(`/transaction/${id}`, transaction);
    toast.success("Transação atualizada com sucesso!");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao atualizar transação: " + error);
  }
}
