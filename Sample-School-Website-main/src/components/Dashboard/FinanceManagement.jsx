import React, { useState, useEffect } from 'react';
import { FaRupeeSign, FaArrowUp, FaArrowDown, FaFileInvoice, FaFilter, FaDownload } from 'react-icons/fa';
import { ButtonActions } from './ButtonActions';

const FinanceManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockTransactions = [
      { _id: '1', studentName: 'Arjun Sharma', transactionType: 'fee_payment', amount: 15000, status: 'completed', paymentMethod: 'upi', paidDate: '2024-01-15', receiptNumber: 'RCP000001' },
      { _id: '2', studentName: 'Priya Patel', transactionType: 'transport', amount: 2500, status: 'completed', paymentMethod: 'card', paidDate: '2024-01-14', receiptNumber: 'RCP000002' },
      { _id: '3', studentName: 'Aarav Singh', transactionType: 'books', amount: 1200, status: 'pending', paymentMethod: 'cash', paidDate: null, receiptNumber: 'RCP000003' },
      { _id: '4', studentName: 'Kavya Kumar', transactionType: 'uniform', amount: 1800, status: 'completed', paymentMethod: 'bank_transfer', paidDate: '2024-01-13', receiptNumber: 'RCP000004' },
      { _id: '5', studentName: 'Diya Gupta', transactionType: 'fine', amount: 200, status: 'completed', paymentMethod: 'cash', paidDate: '2024-01-12', receiptNumber: 'RCP000005' },
    ];
    
    setTimeout(() => {
      setTransactions(mockTransactions);
      setLoading(false);
    }, 1000);
  }, []);

  const getTransactionTypeColor = (type) => {
    const colors = {
      fee_payment: 'bg-green-100 text-green-800',
      transport: 'bg-blue-100 text-blue-800',
      books: 'bg-purple-100 text-purple-800',
      uniform: 'bg-orange-100 text-orange-800',
      fine: 'bg-red-100 text-red-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const totalRevenue = transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
  const pendingAmount = transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0);
  const completedTransactions = transactions.filter(t => t.status === 'completed').length;

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Finance Management</h2>
        <div className="flex gap-2">
          <button 
            onClick={ButtonActions.finance.exportReport}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <FaDownload className="w-4 h-4" />
            Export Report
          </button>
          <button 
            onClick={ButtonActions.finance.generateInvoice}
            className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
          >
            <FaFileInvoice className="w-4 h-4" />
            Generate Invoice
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-green-800 flex items-center">
                <FaRupeeSign className="w-5 h-5 mr-1" />
                {totalRevenue.toLocaleString()}
              </p>
            </div>
            <FaArrowUp className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-green-600 text-sm mt-2">+12% from last month</p>
        </div>
        
        <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">Pending Amount</p>
              <p className="text-2xl font-bold text-yellow-800 flex items-center">
                <FaRupeeSign className="w-5 h-5 mr-1" />
                {pendingAmount.toLocaleString()}
              </p>
            </div>
            <FaArrowDown className="w-8 h-8 text-yellow-600" />
          </div>
          <p className="text-yellow-600 text-sm mt-2">-5% from last month</p>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Completed Transactions</p>
              <p className="text-2xl font-bold text-blue-800">{completedTransactions}</p>
            </div>
            <FaFileInvoice className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-blue-600 text-sm mt-2">This month</p>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Collection Rate</p>
              <p className="text-2xl font-bold text-purple-800">
                {Math.round((completedTransactions / transactions.length) * 100)}%
              </p>
            </div>
            <FaArrowUp className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-purple-600 text-sm mt-2">+8% from last month</p>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue Trend</h3>
        <div className="h-64 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <FaArrowUp className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <p className="text-gray-600">Revenue Chart</p>
            <p className="text-sm text-gray-500">Interactive chart showing monthly revenue trends</p>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
            <div className="flex gap-2">
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="all">All Transactions</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <button 
                onClick={() => ButtonActions.common.filter('status', filter)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaFilter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.studentName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTransactionTypeColor(transaction.transactionType)}`}>
                      {transaction.transactionType.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 flex items-center">
                      <FaRupeeSign className="w-3 h-3 mr-1" />
                      {transaction.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {transaction.paymentMethod.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.paidDate ? new Date(transaction.paidDate).toLocaleDateString() : 'Pending'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.receiptNumber}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinanceManagement;