import React from 'react';
import { CreditCard } from 'lucide-react';
import { useTransactionStore } from '../store/transactionStore';

const rechargeAmounts = [10, 20, 30, 50, 100];

const Recharge = () => {
  const { recharge, processing } = useTransactionStore();

  const handleRecharge = async (amount: number) => {
    try {
      await recharge(amount);
      alert('Recharge successful!');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <CreditCard className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Recharge Your Account</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {rechargeAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => handleRecharge(amount)}
              disabled={processing}
              className="p-4 border-2 border-blue-600 rounded-lg text-center hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <p className="text-2xl font-bold text-blue-600">${amount}</p>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-600 mb-4">
            * Recharge amount can only be used to purchase VIP levels
          </p>
        </div>
      </div>
    </div>
  );
};