import React from 'react';
import { Share2, Users, DollarSign } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Referral = () => {
  const profile = useAuthStore((state) => state.profile);
  const referralCode = profile?.referral_code || '';
  const referralLink = `${window.location.origin}/auth?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Referral Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Users className="h-8 w-8 text-blue-600 mb-2" />
          <h3 className="text-lg font-semibold">Total Referrals</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <DollarSign className="h-8 w-8 text-green-600 mb-2" />
          <h3 className="text-lg font-semibold">Total Earnings</h3>
          <p className="text-3xl font-bold mt-2">$0.00</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Share2 className="h-8 w-8 text-purple-600 mb-2" />
          <h3 className="text-lg font-semibold">Bonus Per Referral</h3>
          <p className="text-3xl font-bold mt-2">$5.00</p>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Referral Link</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 p-2 border rounded-lg bg-gray-50"
          />
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <h3 className="font-semibold mb-2">Share Your Link</h3>
            <p className="text-gray-600">Share your unique referral link with friends</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold">2</span>
            </div>
            <h3 className="font-semibold mb-2">Friends Sign Up</h3>
            <p className="text-gray-600">Your friends create an account using your link</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold">3</span>
            </div>
            <h3 className="font-semibold mb-2">Earn Rewards</h3>
            <p className="text-gray-600">Get $5 for each friend who joins</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;