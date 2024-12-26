import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import BalanceCard from '../components/BalanceCard';
import { Coins } from 'lucide-react';

const mockData = [
  { date: '2024-01', value: 100 },
  { date: '2024-02', value: 150 },
  { date: '2024-03', value: 180 },
  { date: '2024-04', value: 220 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <BalanceCard
          title="Total Balance"
          amount={220}
          icon={<Coins className="h-6 w-6 text-green-500" />}
        />
        <BalanceCard
          title="Available Balance"
          amount={180}
          icon={<Coins className="h-6 w-6 text-blue-500" />}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">PI Coin Growth</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3B82F6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;