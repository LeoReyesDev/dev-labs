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

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      console.log("Loaded from localStorage");
      setLoans(JSON.parse(stored));
    } else {
      console.log("Seeding localStorage with default loans");
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultLoans));
      setLoans(defaultLoans);
    }
  }, []);

  useEffect(() => {
    // Avoid storing empty array on first mount
    if (loans.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(loans));
    }
  }, [loans]);

  const createLoan = () => {
    const { name, borrower, lender, amount } = form;
    if (!name || !borrower || !lender || !amount) {
      alert("All fields are required");
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
    <div className="p-8 font-sans max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📄 SyndiChain Dashboard</h1>

      {/* Form to create loan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          className="border p-2"
          placeholder="Loan Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Borrower"
          value={form.borrower}
          onChange={(e) => setForm({ ...form, borrower: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Lender"
          value={form.lender}
          onChange={(e) => setForm({ ...form, lender: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
        onClick={createLoan}
      >
        ➕ Create Loan
      </button>

      {/* Loan Table */}
      <LoanTable loans={loans} onAction={updateLoanStatus} />
    </div>
  );
}

export default App;
