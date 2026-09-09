import { useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import type { Transaction } from "@/types";
import type { TransactionFormData } from "@/schemas/transaction";
import { formatCurrency, formatDate } from "@/lib/formatters";
import Modal from "@/components/ui/Modal";
import TransactionForm from "@/components/ui/TransactionForm";
import ConfirmDelete from "@/components/ui/ConfirmDelete";

type ModalState =
  | { mode: "closed" }
  | { mode: "add" }
  | { mode: "edit"; transaction: Transaction }
  | { mode: "delete"; transaction: Transaction };

export default function Transcations() {
  const {
    transactions,
    isLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    isAdding,
    isUpdating,
    isDeleting,
  } = useTransactions();

  const [modal, setModal] = useState<ModalState>({ mode: "closed" });

  const closeModal = () => setModal({ mode: "closed" });

  const handleAdd = (data: TransactionFormData) => {
    addTransaction(data, { onSuccess: closeModal });
  };

  const handleEdit = (data: TransactionFormData) => {
    if (modal.mode !== "edit") return;
    updateTransaction(
      { ...modal.transaction, ...data },
      { onSuccess: closeModal },
    );
  };

  const handleDelete = () => {
    if (modal.mode !== "delete") return;
    deleteTransaction(modal.transaction.id, { onSuccess: closeModal });
  };

  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  if (isLoading) return <p className="text-zinc-500 text-sm">Loading...</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Transactions</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {transactions.length} total transactions
          </p>
        </div>
        <button
          onClick={() => setModal({ mode: "add" })}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm
                     font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          + Add Transaction
        </button>
      </div>

      {/* Table */}
      {sorted.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-500 text-sm">No transactions yet.</p>
          <button
            onClick={() => setModal({ mode: "add" })}
            className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm underline"
          >
            Add your first transaction
          </button>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-widest px-6 py-3">
                  Description
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-widest px-6 py-3">
                  Category
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-widest px-6 py-3">
                  Date
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-widest px-6 py-3">
                  Amount
                </th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {sorted.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4 text-zinc-200 font-medium">
                    {t.description}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded-md capitalize">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">
                    {formatDate(t.date)}
                  </td>
                  <td
                    className={`px-6 py-4 text-right font-mono font-semibold ${
                      t.type === "income" ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}
                    {formatCurrency(t.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() =>
                          setModal({ mode: "edit", transaction: t })
                        }
                        className="text-zinc-500 hover:text-zinc-200 text-xs transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          setModal({ mode: "delete", transaction: t })
                        }
                        className="text-zinc-500 hover:text-red-400 text-xs transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {modal.mode === "add" && (
        <Modal title="Add Transaction" onClose={closeModal}>
          <TransactionForm
            onSubmit={handleAdd}
            onCancel={closeModal}
            isSubmitting={isAdding}
          />
        </Modal>
      )}

      {modal.mode === "edit" && (
        <Modal title="Edit Transaction" onClose={closeModal}>
          <TransactionForm
            onSubmit={handleEdit}
            onCancel={closeModal}
            defaultValues={modal.transaction}
            isSubmitting={isUpdating}
          />
        </Modal>
      )}

      {modal.mode === "delete" && (
        <Modal title="Delete Transaction" onClose={closeModal}>
          <ConfirmDelete
            description={modal.transaction.description}
            onConfirm={handleDelete}
            onCancel={closeModal}
            isDeleting={isDeleting}
          />
        </Modal>
      )}
    </div>
  );
}
