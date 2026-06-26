import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z
    .number({ error: "Amount must be a number" })
    .positive("Amount must be greater than 0"),
  category: z.enum([
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
  ]),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(100, "Description too long"),
  date: z.string().min(1, "Date is required"),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
