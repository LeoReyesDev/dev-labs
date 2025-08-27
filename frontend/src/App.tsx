import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:3001/loan';

function App() {
  const [loans, setLoans] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', borrower: '', lender: '', amount: '' });

  const fetchLoans = async () => {
    const res = await axios.get(API);
    setLoans(res.data);
  };

  const createLoan = async () => {
    await axios.post(API, { ...form, amount: parseFloat(form.amount) });
    fetchLoans();
  };

  const updateStatus = async (id: number, action: 'sign' | 'settle') => {
    await axios.post(\`\${API}/\${id}/\${action}\`);
    fetchLoans();
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="p-8 font-sans max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📄 SyndiChain Dashboard</h1>
      <div className="mb-4 space-y-2">
        <input className="border p-2 w-full" placeholder="Loan Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="border p-2 w-full" placeholder="Borrower" onChange={e => setForm({ ...form, borrower: e.target.value })} />
        <input className="border p-2 w-full" placeholder="Lender" onChange={e => setForm({ ...form, lender: e.target.value })} />
        <input className="border p-2 w-full" placeholder="Amount" type="number" onChange={e => setForm({ ...form, amount: e.target.value })} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={createLoan}>Create Loan</button>
      </div>

      <table className="w-full border mt-6">
        <thead>
          <tr className="bg-gray-100">
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
            <tr key={loan.id} className="text-center">
              <td className="border p-2">{loan.id}</td>
              <td className="border p-2">{loan.name}</td>
              <td className="border p-2">{loan.borrower}</td>
              <td className="border p-2">{loan.lender}</td>
              <td className="border p-2">${loan.amount.toLocaleString()}</td>
              <td className="border p-2">{loan.status}</td>
              <td className="border p-2 space-x-2">
                {loan.status === 'Pending' && <button className="bg-yellow-500 px-2 py-1 text-white" onClick={() => updateStatus(loan.id, 'sign')}>Sign</button>}
                {loan.status === 'Signed' && <button className="bg-green-600 px-2 py-1 text-white" onClick={() => updateStatus(loan.id, 'settle')}>Settle</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;