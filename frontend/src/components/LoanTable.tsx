import React from "react";

interface Props {
  loans: Loan[];
  onAction: (id: number, action: "sign" | "settle") => void;
}

const LoanTable: React.FC<Props> = ({ loans, onAction }) => {
  return (
    <table className="w-full border mt-6">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="border p-2">ID</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Borrower</th>
          <th className="border p-2">Lender</th>
          <th className="border p-2">Amount</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {loans.map((loan) => (
          <tr key={loan.id}>
            <td className="border p-2">{loan.id}</td>
            <td className="border p-2">{loan.name}</td>
            <td className="border p-2">{loan.borrower}</td>
            <td className="border p-2">{loan.lender}</td>
            <td className="border p-2">${loan.amount.toLocaleString()}</td>
            <td className="border p-2">{loan.status}</td>
            <td className="border p-2 space-x-2">
              {loan.status === "Pending" && (
                <button
                  className="bg-yellow-500 px-2 py-1 text-white"
                  onClick={() => onAction(loan.id, "sign")}
                >
                  Sign
                </button>
              )}
              {loan.status === "Signed" && (
                <button
                  className="bg-green-600 px-2 py-1 text-white"
                  onClick={() => onAction(loan.id, "settle")}
                >
                  Settle
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LoanTable;
