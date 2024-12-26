import React from 'react';
import { Crown } from 'lucide-react';
import { useTransactionStore } from '../store/transactionStore';
import { useAuthStore } from '../store/authStore';

const vipLevels = [
  { level: 0, price: 0, reward: 0.1 },
  { level: 1, price: 20, reward: 1 },
  { level: 2, price: 30, reward: 2 },
  { level: 3, price: 50, reward: 3 },
];

const VIP = () => {
  const { purchaseVIP, processing } = useTransactionStore();
  const profile = useAuthStore((state) => state.profile);
  const currentLevel = profile?.vip_level || 0;

  const handleUpgrade = async (level: number, price: number) => {
    if (level <= currentLevel) {
      alert('You already have this VIP level or higher!');
      return;
    }

    try {
      await purchaseVIP(level, price);
      alert('VIP upgrade successful!');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {vipLevels.map((vip) => (
        <div key={vip.level} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 p-4 text-white text-center">
            <Crown className="h-8 w-8 mx-auto mb-2" />
            <h3 className="text-xl font-bold">VIP {vip.level}</h3>
          </div>
          <div className="p-6">
            <div className="text-center mb-4">
              <p className="text-3xl font-bold">${vip.price}</p>
              <p className="text-sm text-gray-600">One-time payment</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm">
                • Daily Reward: ${vip.reward.toFixed(2)}
              </p>
              <p className="text-sm">
                • Priority Support
              </p>
              {vip.level > 0 && (
                <p className="text-sm">
                  • Exclusive Features
                </p>
              )}
            </div>
            <button
              onClick={() => handleUpgrade(vip.level, vip.price)}
              disabled={processing || vip.level <= currentLevel}
              className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {vip.level <= currentLevel ? 'Current Level' : 'Upgrade Now'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};