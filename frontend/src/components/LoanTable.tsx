import React from "react";

export interface Loan {
  id: number;
  name: string;
  borrower: string;
  lender: string;
  amount: number;
  status: "Pending" | "Signed" | "Settled";
}

interface Props {
  loans: Loan[];
  onAction: (id: number, action: "sign" | "settle") => void;
}

const LoanTable: React.FC<Props> = ({ loans, onAction }) => {
  return (
    <div className="overflow-x-auto rounded-md shadow border border-gray-300 dark:border-gray-700">
      <table className="w-full text-left border-collapse dark:text-white text-sm md:text-base">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white">
            <th className="p-3 border-b border-gray-300 dark:border-gray-700">
              ID
            </th>
            <th className="p-3 border-b border-gray-300 dark:border-gray-700">
              Name
            </th>
            <th className="p-3 border-b border-gray-300 dark:border-gray-700">
              Borrower
            </th>
            <th className="p-3 border-b border-gray-300 dark:border-gray-700">
              Lender
            </th>
            <th className="p-3 border-b border-gray-300 dark:border-gray-700">
              Amount
            </th>
            <th className="p-3 border-b border-gray-300 dark:border-gray-700">
              Status
            </th>
            <th className="p-3 border-b border-gray-300 dark:border-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan, idx) => (
            <tr
              key={loan.id}
              className={`${
                idx % 2 === 0
                  ? "bg-white dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
              } hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
            >
              <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                {loan.id}
              </td>
              <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                {loan.name}
              </td>
              <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                {loan.borrower}
              </td>
              <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                {loan.lender}
              </td>
              <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                $
                {loan.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </td>
              <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                {loan.status}
              </td>
              <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                {loan.status === "Pending" && (
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-3 py-1 rounded"
                    onClick={() => onAction(loan.id, "sign")}
                  >
                    Sign
                  </button>
                )}
                {loan.status === "Signed" && (
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1 rounded"
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
    </div>
  );
};

export default LoanTable;
