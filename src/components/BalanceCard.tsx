import React from 'react';

interface BalanceCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
}

const BalanceCard = ({ title, amount, icon }: BalanceCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold">${amount.toFixed(2)}</p>
    </div>
  );
};

export default BalanceCard;