import React, { useEffect, useState } from "react";
import LoanTable, { Loan } from "./components/LoanTable";

const LOCAL_STORAGE_KEY = "loans";

// Default list of 5 loan objects
const defaultLoans: Loan[] = [
  {
    id: 1,
    name: "Loan Alpha",
    borrower: "Alice",
    lender: "Bank A",
    amount: 5000,
    status: "Pending",
  },
  {
    id: 2,
    name: "Loan Beta",
    borrower: "Bob",
    lender: "Bank B",
    amount: 7500,
    status: "Signed",
  },
  {
    id: 3,
    name: "Loan Gamma",
    borrower: "Charlie",
    lender: "Bank C",
    amount: 2000,
    status: "Settled",
  },
  {
    id: 4,
    name: "Loan Delta",
    borrower: "Diana",
    lender: "Bank D",
    amount: 10000,
    status: "Pending",
  },
  {
    id: 5,
    name: "Loan Epsilon",
    borrower: "Evan",
    lender: "Bank E",
    amount: 3200,
    status: "Signed",
  },
];

function App() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [form, setForm] = useState({
    name: "",
    borrower: "",
    lender: "",
    amount: "",
  });
  const [toast, setToast] = useState<string | null>(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setLoans(JSON.parse(stored));
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultLoans));
      setLoans(defaultLoans);
    }
  }, []);

  useEffect(() => {
    if (loans.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(loans));
    }
  }, [loans]);

  const createLoan = () => {
    const { name, borrower, lender, amount } = form;
    if (!name || !borrower || !lender || !amount) {
      setToast("Your Loan can't be saved. Please try again.");
      return;
    }

    const newLoan: Loan = {
      id: Date.now(),
      name,
      borrower,
      lender,
      amount: parseFloat(amount),
      status: "Pending",
    };

    setLoans((prev) => [...prev, newLoan]);
    setForm({ name: "", borrower: "", lender: "", amount: "" });
    setToast("Your Loan has been created successfully");
    setTimeout(() => setToast(null), 3000);
  };

  const updateLoanStatus = (id: number, action: "sign" | "settle") => {
    const updated = loans.map((loan) =>
      loan.id === id
        ? { ...loan, status: action === "sign" ? "Signed" : "Settled" }
        : loan
    );
    setLoans(updated);
  };

  return (
    <div className="p-8 font-sans max-w-4xl mx-auto text-gray-900 dark:text-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">📄 SyndiChain Dashboard</h1>
        <button
          className="px-4 py-1 border rounded text-sm bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>

      {toast && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
          {toast}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          className="border p-2 rounded bg-white dark:bg-gray-800"
          placeholder="Loan Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 rounded bg-white dark:bg-gray-800"
          placeholder="Borrower"
          value={form.borrower}
          onChange={(e) => setForm({ ...form, borrower: e.target.value })}
        />
        <input
          className="border p-2 rounded bg-white dark:bg-gray-800"
          placeholder="Lender"
          value={form.lender}
          onChange={(e) => setForm({ ...form, lender: e.target.value })}
        />
        <input
          className="border p-2 rounded bg-white dark:bg-gray-800"
          placeholder="Amount"
          type="text"
          inputMode="decimal"
          value={form.amount}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*(\.\d{0,2})?$/.test(val)) {
              setForm({ ...form, amount: val });
            }
          }}
        />
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700"
        onClick={createLoan}
      >
        ➕ Create Loan
      </button>

      <LoanTable loans={loans} onAction={updateLoanStatus} />
    </div>
  );
}

export default App;
