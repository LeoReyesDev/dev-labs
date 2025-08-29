import React, { useState, useMemo } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Loan } from "../types";

interface Props {
  loans: Loan[];
  onAction: (id: number, action: "sign" | "settle") => void;
}

const LoanTable: React.FC<Props> = ({ loans, onAction }) => {
  const [sortField, setSortField] = useState<keyof Loan>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState("");

  // Filter + Sort logic
  const filteredLoans = useMemo(() => {
    const search = filter.toLowerCase();

    const filtered = loans.filter((loan) =>
      [
        loan.name,
        loan.borrower,
        loan.lender,
        loan.amount.toString(),
        loan.status,
      ].some((field) => field.toLowerCase().includes(search))
    );

    const sorted = [...filtered].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      } else {
        return sortDirection === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      }
    });

    return sorted;
  }, [loans, filter, sortField, sortDirection]);

  const toggleSort = (field: keyof Loan) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ["ID", "Name", "Borrower", "Lender", "Amount", "Status"],
      ...filteredLoans.map((loan) => [
        loan.id,
        loan.name,
        loan.borrower,
        loan.lender,
        `$${loan.amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}`,
        loan.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "loans_report.csv";
    link.click();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Loans Report", 14, 10);
    autoTable(doc, {
      startY: 20,
      head: [["ID", "Name", "Borrower", "Lender", "Amount", "Status"]],
      body: filteredLoans.map((loan) => [
        loan.id,
        loan.name,
        loan.borrower,
        loan.lender,
        `$${loan.amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}`,
        loan.status,
      ]),
    });
    doc.save("loans_report.pdf");
  };

  return (
    <div className="w-full space-y-4 mt-6">
      {/* Filter and Export */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <input
          type="text"
          placeholder="🔍 Search by name, borrower, lender, status..."
          className="p-2 rounded-md border dark:border-gray-700 dark:bg-gray-900 dark:text-white w-full md:w-1/2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={exportToCSV}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Export CSV
          </button>
          <button
            onClick={exportToPDF}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-auto max-h-[500px] border dark:border-gray-700 rounded-md">
        <table className="min-w-full text-sm md:text-base dark:text-white text-left">
          <thead className="sticky top-0 z-10 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white">
            <tr>
              {["id", "name", "borrower", "lender", "amount", "status"].map(
                (field) => (
                  <th
                    key={field}
                    className="p-3 cursor-pointer select-none"
                    onClick={() => toggleSort(field as keyof Loan)}
                  >
                    <span className="flex items-center gap-1 font-semibold">
                      {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                      {sortField === field &&
                        (sortDirection === "asc" ? "▲" : "▼")}
                    </span>
                  </th>
                )
              )}
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan, idx) => (
              <tr
                key={loan.id}
                className={`${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
              >
                <td className="p-3">{loan.id}</td>
                <td className="p-3">{loan.name}</td>
                <td className="p-3">{loan.borrower}</td>
                <td className="p-3">{loan.lender}</td>
                <td className="p-3">
                  $
                  {loan.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td className="p-3">{loan.status}</td>
                <td className="p-3">
                  {loan.status === "Pending" && (
                    <button
                      onClick={() => onAction(loan.id, "sign")}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded"
                    >
                      Sign
                    </button>
                  )}
                  {loan.status === "Signed" && (
                    <button
                      onClick={() => onAction(loan.id, "settle")}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Settle
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanTable;
