
import { useState } from "react";
import { toast } from "sonner";

export function useFinancial() {
  const [generateFinancial, setGenerateFinancial] = useState(false);

  const createFinancialTransaction = (data: any) => {
    if (!generateFinancial) return;

    try {
      // Get existing transactions from localStorage
      const savedTransactions = localStorage.getItem("financialTransactions");
      let transactions = [];
      
      if (savedTransactions) {
        transactions = JSON.parse(savedTransactions);
      }

      // Determine source and transaction type
      let transactionType: "pagar" | "receber" = "pagar";
      let category = "Outros";
      let sourceType = "";
      
      if (data.type === "purchase") {
        transactionType = "pagar";
        category = "Fornecedores";
        sourceType = "Compra";
      } else if (data.type === "sale") {
        transactionType = "receber";
        category = "Clientes";
        sourceType = "Venda";
      }

      // Create the new transaction
      const newTransaction = {
        id: Date.now().toString(),
        type: transactionType,
        description: `${sourceType} - ${data.description || data.entity || ""}`,
        amount: parseFloat(data.totalValue || data.value || 0),
        dueDate: new Date(data.date || data.dueDate || new Date()),
        category: category,
        status: "pendente",
        createdAt: new Date(),
        sourceType: sourceType,
        sourceId: data.id || Date.now().toString(),
      };

      // Add to transactions
      transactions.push(newTransaction);
      
      // Save back to localStorage
      localStorage.setItem("financialTransactions", JSON.stringify(transactions));
      
      toast.success("Transação financeira gerada com sucesso!");
    } catch (error) {
      console.error("Error creating financial transaction:", error);
      toast.error("Erro ao criar transação financeira");
    }
  };

  return {
    generateFinancial,
    setGenerateFinancial,
    createFinancialTransaction
  };
}
