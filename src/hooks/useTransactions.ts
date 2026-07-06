import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { storage } from "@/lib/storage";
import type { Transaction } from "@/types";
import type { TransactionFormData } from "@/schemas/transaction";
import { v4 as uuidv4 } from "uuid";

const QUERY_KEY = ["transactions"];

export function useTransactions() {
  const queryClient = useQueryClient();

  // READ
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => storage.getTransactions(),
  });

  // ADD
  const addMutation = useMutation({
    mutationFn: (formData: TransactionFormData) => {
      const newTransaction: Transaction = {
        ...formData,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };
      return Promise.resolve(storage.addTransaction(newTransaction));
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(QUERY_KEY, updated);
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: (transaction: Transaction) => {
      return Promise.resolve(storage.updateTransaction(transaction));
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(QUERY_KEY, updated);
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return Promise.resolve(storage.deleteTransaction(id));
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(QUERY_KEY, updated);
    },
  });

  return {
    transactions,
    isLoading,
    addTransaction: addMutation.mutate,
    updateTransaction: updateMutation.mutate,
    deleteTransaction: deleteMutation.mutate,
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
