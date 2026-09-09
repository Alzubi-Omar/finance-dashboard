import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  transactionSchema,
  type TransactionFormData,
} from "@/schemas/transaction";
import type { Transaction } from "@/types";

interface Props {
  onSubmit: (data: TransactionFormData) => void;
  onCancel: () => void;
  defaultValues?: Transaction;
  isSubmitting?: boolean;
}

const categories = [
  "housing",
  "food",
  "transport",
  "entertainment",
  "health",
  "shopping",
  "utilities",
  "savings",
  "income",
  "other",
];

export default function TransactionForm({
  onSubmit,
  onCancel,
  defaultValues,
  isSubmitting = false,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: defaultValues
      ? {
          type: defaultValues.type,
          amount: defaultValues.amount,
          category: defaultValues.category,
          description: defaultValues.description,
          date: defaultValues.date,
        }
      : { type: "expense", date: new Date().toISOString().slice(0, 10) },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        type: defaultValues.type,
        amount: defaultValues.amount,
        category: defaultValues.category,
        description: defaultValues.description,
        date: defaultValues.date,
      });
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Type */}
      <div>
        <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5">
          Type
        </label>
        <div className="flex gap-3">
          {(["expense", "income"] as const).map((t) => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={t}
                {...register("type")}
                className="accent-indigo-500"
              />
              <span
                className={`text-sm font-medium capitalize ${
                  t === "income" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {t}
              </span>
            </label>
          ))}
        </div>
        {errors.type && (
          <p className="text-red-400 text-xs mt-1">{errors.type.message}</p>
        )}
      </div>

      {/* Amount */}
      <div>
        <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5">
          Amount
        </label>
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          {...register("amount", { valueAsNumber: true })}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5
                     text-zinc-100 text-sm font-mono placeholder-zinc-600
                     focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        {errors.amount && (
          <p className="text-red-400 text-xs mt-1">{errors.amount.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5">
          Category
        </label>
        <select
          {...register("category")}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5
                     text-zinc-100 text-sm focus:outline-none focus:border-indigo-500
                     focus:ring-1 focus:ring-indigo-500"
        >
          {categories.map((c) => (
            <option key={c} value={c} className="capitalize">
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5">
          Description
        </label>
        <input
          type="text"
          placeholder="e.g. Grocery run"
          {...register("description")}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5
                     text-zinc-100 text-sm placeholder-zinc-600
                     focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        {errors.description && (
          <p className="text-red-400 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Date */}
      <div>
        <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5">
          Date
        </label>
        <input
          type="date"
          {...register("date")}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5
                     text-zinc-100 text-sm focus:outline-none focus:border-indigo-500
                     focus:ring-1 focus:ring-indigo-500"
        />
        {errors.date && (
          <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50
                     text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
        >
          {isSubmitting
            ? "Saving..."
            : defaultValues
              ? "Save Changes"
              : "Add Transaction"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300
                     text-sm font-medium py-2.5 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
