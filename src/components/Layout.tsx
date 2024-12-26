import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Crown, CreditCard, DollarSign, HeadphonesIcon, LogOut, Users, Coins } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Footer from './Footer';

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const signOut = useAuthStore((state) => state.signOut);
  const updateDailyReward = useAuthStore((state) => state.updateDailyReward);

  useEffect(() => {
    updateDailyReward();
    const interval = setInterval(updateDailyReward, 60000);
    return () => clearInterval(interval);
  }, [updateDailyReward]);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'VIP', href: '/vip', icon: Crown },
    { name: 'Recharge', href: '/recharge', icon: CreditCard },
    { name: 'Withdrawal', href: '/withdrawal', icon: DollarSign },
    { name: 'Referral', href: '/referral', icon: Users },
    { name: 'Customer Service', href: '/customer-service', icon: HeadphonesIcon },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <div className="flex items-center space-x-2">
              <Coins className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-blue-600">PI Coin</h1>
            </div>
            <button className="lg:hidden" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                    location.pathname === item.href
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={signOut}
              className="flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 w-full"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <header className="h-16 flex items-center justify-between px-4 lg:px-8 bg-white border-b">
          <button className="lg:hidden" onClick={() => setIsOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome to PI Coin</span>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;