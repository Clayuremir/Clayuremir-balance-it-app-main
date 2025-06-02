
import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  tags?: string[];
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'monthly' | 'weekly' | 'yearly';
}

export interface FinanceState {
  transactions: Transaction[];
  budgets: Budget[];
  categories: {
    income: string[];
    expense: string[];
  };
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

type FinanceAction =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'ADD_BUDGET'; payload: Budget }
  | { type: 'UPDATE_BUDGET'; payload: Budget }
  | { type: 'DELETE_BUDGET'; payload: string }
  | { type: 'LOAD_DATA'; payload: FinanceState };

const initialState: FinanceState = {
  transactions: [
    {
      id: '1',
      type: 'income',
      amount: 5000,
      category: 'Salário',
      description: 'Salário mensal',
      date: '2024-05-01',
    },
    {
      id: '2',
      type: 'expense',
      amount: 1200,
      category: 'Moradia',
      description: 'Aluguel',
      date: '2024-05-05',
    },
    {
      id: '3',
      type: 'expense',
      amount: 350,
      category: 'Alimentação',
      description: 'Supermercado',
      date: '2024-05-10',
    },
    {
      id: '4',
      type: 'income',
      amount: 800,
      category: 'Freelance',
      description: 'Projeto web',
      date: '2024-05-15',
    },
    {
      id: '5',
      type: 'expense',
      amount: 150,
      category: 'Transporte',
      description: 'Combustível',
      date: '2024-05-20',
    },
  ],
  budgets: [
    {
      id: '1',
      category: 'Alimentação',
      limit: 800,
      spent: 350,
      period: 'monthly',
    },
    {
      id: '2',
      category: 'Transporte',
      limit: 400,
      spent: 150,
      period: 'monthly',
    },
    {
      id: '3',
      category: 'Lazer',
      limit: 300,
      spent: 0,
      period: 'monthly',
    },
  ],
  categories: {
    income: ['Salário', 'Freelance', 'Investimentos', 'Vendas', 'Outros'],
    expense: ['Moradia', 'Alimentação', 'Transporte', 'Saúde', 'Educação', 'Lazer', 'Compras', 'Outros'],
  },
  totalBalance: 0,
  monthlyIncome: 0,
  monthlyExpenses: 0,
};

const financeReducer = (state: FinanceState, action: FinanceAction): FinanceState => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t => 
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'ADD_BUDGET':
      return {
        ...state,
        budgets: [...state.budgets, action.payload],
      };
    case 'UPDATE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.map(b => 
          b.id === action.payload.id ? action.payload : b
        ),
      };
    case 'DELETE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.filter(b => b.id !== action.payload),
      };
    case 'LOAD_DATA':
      return action.payload;
    default:
      return state;
  }
};

interface FinanceContextType {
  state: FinanceState;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (transaction: Transaction) => void;
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  updateBudget: (budget: Budget) => void;
  deleteBudget: (id: string) => void;
  calculateStats: () => {
    totalBalance: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    yearlyIncome: number;
    yearlyExpenses: number;
  };
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
  };

  const deleteTransaction = (id: string) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const updateTransaction = (transaction: Transaction) => {
    dispatch({ type: 'UPDATE_TRANSACTION', payload: transaction });
  };

  const addBudget = (budget: Omit<Budget, 'id'>) => {
    const newBudget = {
      ...budget,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_BUDGET', payload: newBudget });
  };

  const updateBudget = (budget: Budget) => {
    dispatch({ type: 'UPDATE_BUDGET', payload: budget });
  };

  const deleteBudget = (id: string) => {
    dispatch({ type: 'DELETE_BUDGET', payload: id });
  };

  const calculateStats = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const monthlyTransactions = state.transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    });

    const yearlyTransactions = state.transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getFullYear() === currentYear;
    });

    const monthlyIncome = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const yearlyIncome = yearlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const yearlyExpenses = yearlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = state.transactions.reduce((sum, t) => {
      return t.type === 'income' ? sum + t.amount : sum - t.amount;
    }, 0);

    return {
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      yearlyIncome,
      yearlyExpenses,
    };
  };

  // Atualizar budgets com gastos atuais
  useEffect(() => {
    const updatedBudgets = state.budgets.map(budget => {
      const categoryExpenses = state.transactions
        .filter(t => t.type === 'expense' && t.category === budget.category)
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        ...budget,
        spent: categoryExpenses,
      };
    });

    if (JSON.stringify(updatedBudgets) !== JSON.stringify(state.budgets)) {
      updatedBudgets.forEach(budget => {
        updateBudget(budget);
      });
    }
  }, [state.transactions]);

  return (
    <FinanceContext.Provider
      value={{
        state,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        addBudget,
        updateBudget,
        deleteBudget,
        calculateStats,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
