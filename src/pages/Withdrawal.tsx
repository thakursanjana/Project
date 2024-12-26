import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { useTransactionStore } from '../store/transactionStore';

const withdrawalAmounts = [25, 30, 35, 50, 100];

const Withdrawal = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const { withdraw, processing } = useTransactionStore();
  const [bankAccount, setBankAccount] = useState('');
  const [accountName, setAccountName] = useState('');

  const handleWithdrawal = async () => {
    if (!selectedAmount || !bankAccount || !accountName) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await withdraw(selectedAmount);
      alert('Withdrawal request submitted successfully!');
      setSelectedAmount(null);
      setBankAccount('');
      setAccountName('');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <DollarSign className="h-6 w-6 text-green-600 mr-2" />
          <h2 className="text-xl font-semibold">Withdraw Funds</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {withdrawalAmounts.map((amount) => (
            <button
              key={amount}
              className={`p-4 border-2 rounded-lg text-center transition-colors ${
                selectedAmount === amount
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-300 hover:border-green-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              onClick={() => setSelectedAmount(amount)}
              disabled={processing}
            >
              <p className="text-2xl font-bold text-green-600">${amount}</p>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Bank Account Number</label>
            <input
              type="text"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              disabled={processing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Account Holder Name</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              disabled={processing}
            />
          </div>

          <button
            onClick={handleWithdrawal}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedAmount || !bankAccount || !accountName || processing}
          >
            {processing ? 'Processing...' : 'Request Withdrawal'}
          </button>

          <p className="text-sm text-gray-600">
            * Withdrawal requests are processed within 24-48 hours
          </p>
        </div>
      </div>
    </div>
  );
};