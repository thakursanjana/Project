import React from 'react';
import { MessageCircle, Mail, Phone } from 'lucide-react';

const CustomerService = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Customer Support</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg text-center">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600">24/7 Support</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Start Chat
            </button>
          </div>

          <div className="p-4 border rounded-lg text-center">
            <Mail className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-gray-600">support@picoin.app</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Send Email
            </button>
          </div>

          <div className="p-4 border rounded-lg text-center">
            <Phone className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-sm text-gray-600">+1 (800) 123-4567</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Call Now
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">How do I upgrade my VIP level?</h4>
              <p className="text-sm text-gray-600 mt-2">
                Visit the VIP page and choose your desired level. You can use your available balance to upgrade.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">When do I receive my daily rewards?</h4>
              <p className="text-sm text-gray-600 mt-2">
                Daily rewards are automatically credited to your account at 00:00 UTC.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerService;