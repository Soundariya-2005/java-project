/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  DollarSign, 
  Calendar, 
  Tag, 
  FileText, 
  PieChart, 
  ArrowLeft,
  ChevronRight,
  Code
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Expense {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
  description: string;
}

const CATEGORIES = ['Food', 'Travel', 'Bills', 'Shopping', 'Other'];

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, title: 'Amazon Purchase', category: 'Shopping', amount: 45.00, date: '2026-05-15', description: 'Office supplies' },
    { id: 2, title: 'Starbucks Coffee', category: 'Food', amount: 6.50, date: '2026-05-16', description: 'Morning coffee' },
    { id: 3, title: 'Monthly Rent', category: 'Bills', amount: 800.00, date: '2026-05-01', description: 'Apartment rent' },
    { id: 4, title: 'Uber Ride', category: 'Travel', amount: 12.30, date: '2026-05-17', description: 'To the airport' }
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'records' | 'reports'>('dashboard');
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Food',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const [notification, setNotification] = useState<string | null>(null);

  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const foodExpense = expenses.filter(ex => ex.category === 'Food').reduce((sum, item) => sum + item.amount, 0);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenForm = (expense?: Expense) => {
    if (expense) {
      setEditingExpense(expense);
      setFormData({
        title: expense.title,
        category: expense.category,
        amount: expense.amount.toString(),
        date: expense.date,
        description: expense.description
      });
    } else {
      setEditingExpense(null);
      setFormData({
        title: '',
        category: 'Food',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
    }
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingExpense) {
      setExpenses(expenses.map(ex => 
        ex.id === editingExpense.id 
          ? { ...ex, ...formData, amount: parseFloat(formData.amount) } 
          : ex
      ));
      showNotification('Expense updated successfully!');
    } else {
      const newExp = {
        ...formData,
        id: Date.now(),
        amount: parseFloat(formData.amount)
      };
      setExpenses([newExp, ...expenses]);
      showNotification('Expense added successfully!');
    }
    setIsFormOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(ex => ex.id !== id));
      showNotification('Expense deleted.');
    }
  };

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col font-sans text-slate-900 overflow-hidden">
      {/* Navigation */}
      <nav className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800 leading-none">ExpenTrack</h1>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mt-1">Servlet-JDBC-MySQL v1.0</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`transition-all pb-1 border-b-2 ${activeTab === 'dashboard' ? 'text-indigo-600 border-indigo-600' : 'hover:text-indigo-600 border-transparent'}`}
          >
            Dashboard
          </button>
          <button 
             onClick={() => setActiveTab('records')}
             className={`transition-all pb-1 border-b-2 ${activeTab === 'records' ? 'text-indigo-600 border-indigo-600' : 'hover:text-indigo-600 border-transparent'}`}
          >
            View Records
          </button>
          <button 
            onClick={() => setActiveTab('reports')}
            className={`transition-all pb-1 border-b-2 ${activeTab === 'reports' ? 'text-indigo-600 border-indigo-600' : 'hover:text-indigo-600 border-transparent'}`}
          >
            Reports
          </button>
          <div className="h-4 w-px bg-slate-200"></div>
          <div className="flex items-center gap-2 text-slate-500 font-normal">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            DB Connected
          </div>
        </div>
      </nav>

      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Available Balance</p>
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">$12,450.00</h2>
              <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
                <ChevronRight className="w-3 h-3 rotate-[-90deg]" /> 4.2% from last month
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Quick Actions</h3>
            <button 
              onClick={() => handleOpenForm()}
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add New Expense
            </button>
            <button className="w-full bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
              Export CSV
            </button>
            <button 
              onClick={() => setActiveTab('reports')}
              className="w-full bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Generate Monthly Report
            </button>
          </div>

          <div className="mt-8">
             <div className="flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-50 px-3 py-2 rounded-lg border border-amber-100">
               <Code className="w-4 h-4 shrink-0" />
               <span className="leading-tight">Java Source available in File Explorer</span>
             </div>
          </div>

          <div className="mt-auto border-t border-slate-100 pt-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                <FileText className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Admin User</p>
                <p className="text-[10px] text-slate-400">Database System v1</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <section className="flex-1 p-8 flex flex-col gap-6 overflow-hidden bg-slate-50/50">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"
              >
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Expenses</p>
                <h4 className="text-2xl font-bold mt-1 text-rose-600">${totalExpense.toFixed(2)}</h4>
                <div className="h-1.5 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="h-full bg-rose-500 rounded-full transition-all duration-1000" 
                    style={{ width: `${Math.min((totalExpense / 2500) * 100, 100)}%` }} 
                  />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"
              >
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Food & Beverage</p>
                <h4 className="text-2xl font-bold mt-1 text-slate-800">${foodExpense.toFixed(2)}</h4>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">Top Category This Month</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"
              >
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Savings Target</p>
                <h4 className="text-2xl font-bold mt-1 text-slate-800">$2,000.00</h4>
                <div className="h-1.5 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full w-1/2"></div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Table Container or Reports */}
          <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
            {activeTab !== 'reports' ? (
              <>
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-indigo-600" />
                    {activeTab === 'dashboard' ? 'Recent Transactions' : 'All Records'}
                  </h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <FileText className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Search transactions..." 
                        className="text-xs border border-slate-200 pl-9 pr-3 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-auto custom-scrollbar">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead className="bg-slate-50/80 text-slate-500 font-semibold sticky top-0 backdrop-blur-md z-10 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">ID</th>
                        <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Title</th>
                        <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Category</th>
                        <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <AnimatePresence mode="popLayout">
                        {expenses.map((expense, idx) => (
                          <motion.tr 
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            key={expense.id}
                            className="hover:bg-slate-50/50 transition-colors group"
                          >
                            <td className="px-6 py-4 font-mono text-[10px] text-slate-400">EXP-{(idx + 1).toString().padStart(3, '0')}</td>
                            <td className="px-6 py-4 font-semibold text-slate-800">{expense.title}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                expense.category === 'Food' ? 'bg-orange-50 text-orange-600' :
                                expense.category === 'Travel' ? 'bg-purple-50 text-purple-600' :
                                expense.category === 'Bills' ? 'bg-blue-50 text-blue-600' :
                                expense.category === 'Shopping' ? 'bg-emerald-50 text-emerald-600' :
                                'bg-slate-100 text-slate-600'
                              }`}>
                                {expense.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-bold text-slate-800">${expense.amount.toFixed(2)}</td>
                            <td className="px-6 py-4 text-slate-500 font-medium">{new Date(expense.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => handleOpenForm(expense)}
                                  className="text-indigo-600 font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => handleDelete(expense.id)}
                                  className="text-rose-500 font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>

                  {expenses.length === 0 && (
                    <div className="py-20 text-center">
                      <PieChart className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                      <p className="text-slate-400 font-medium">No transactions found</p>
                      <button 
                        onClick={() => handleOpenForm()}
                        className="mt-4 text-indigo-600 text-sm font-bold hover:underline"
                      >
                        Add record
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 p-8 space-y-8 overflow-y-auto">
                 <div className="flex items-center justify-between">
                    <div>
                       <h2 className="text-2xl font-bold text-slate-800">Expenses Report</h2>
                       <p className="text-slate-400 text-sm">Summary of your spending patterns</p>
                    </div>
                    <div className="bg-slate-100 px-4 py-2 rounded-lg font-mono text-xs text-slate-500">
                       REF: {new Date().getFullYear()}-GEN-01
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Category Distribution</h3>
                       <div className="space-y-3">
                          {CATEGORIES.map(cat => {
                            const catTotal = expenses.filter(e => e.category === cat).reduce((s, i) => s + i.amount, 0);
                            const percent = (catTotal / totalExpense) * 100 || 0;
                            return (
                              <div key={cat} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                   <span className="font-semibold text-slate-700">{cat}</span>
                                   <span className="text-slate-500">${catTotal.toFixed(2)}</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                   <div 
                                      className={`h-full rounded-full transition-all duration-1000 ${
                                        cat === 'Food' ? 'bg-orange-500' :
                                        cat === 'Travel' ? 'bg-purple-500' :
                                        cat === 'Bills' ? 'bg-blue-500' :
                                        cat === 'Shopping' ? 'bg-emerald-500' :
                                        'bg-slate-400'
                                      }`} 
                                      style={{ width: `${percent}%` }}
                                   />
                                </div>
                              </div>
                            );
                          })}
                       </div>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 relative overflow-hidden">
                       <div className="relative z-10">
                          <h3 className="text-indigo-900 font-bold mb-2">Spending Insight</h3>
                          <p className="text-indigo-700 text-sm leading-relaxed mb-4">
                             Your highest expenditure is currently in the <span className="font-bold underline">
                               {expenses.length > 0 ? CATEGORIES.reduce((a, b) => 
                                 expenses.filter(e => e.category === a).reduce((s, i) => s + i.amount, 0) > 
                                 expenses.filter(e => e.category === b).reduce((s, i) => s + i.amount, 0) ? a : b 
                               ) : 'None'}
                             </span> category. 
                             Consider setting a budget limit to optimize your savings.
                          </p>
                          <div className="flex gap-2">
                             <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md shadow-indigo-200">Set Budget</button>
                             <button className="bg-white text-indigo-600 border border-indigo-200 px-4 py-2 rounded-lg text-xs font-bold">Details</button>
                          </div>
                       </div>
                       <PieChart className="w-32 h-32 absolute -right-8 -bottom-8 text-indigo-500/10 rotate-12" />
                    </div>
                 </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="h-10 bg-slate-900 border-t border-slate-800 px-8 flex items-center justify-between text-[10px] text-slate-500 font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ENVIRONMENT: APACHE TOMCAT 9.0</span>
          <span className="text-slate-700">|</span>
          <span>JDBC POOL: ACTIVE (HikariCP)</span>
        </div>
        <div className="flex gap-4">
          <span>PORT: 3000</span>
          <span className="text-slate-700">|</span>
          <span>DATABASE: expensetracker_db</span>
          <span className="text-slate-700">|</span>
          <span>SCHEMA: CRUD_v1</span>
        </div>
      </footer>

      {/* Expense Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setIsFormOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-indigo-600">
                    {editingExpense ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 leading-tight">
                      {editingExpense ? 'Edit Transaction' : 'Record Transaction'}
                    </h2>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">JDBC Entry v1.0</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-200 text-slate-400 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white overflow-y-auto max-h-[70vh]">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Item Title</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Server Hosting"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-slate-800 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
                      <select 
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all bg-white text-slate-800 font-semibold"
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Amount</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                        <input 
                          type="number" 
                          step="0.01"
                          required
                          value={formData.amount}
                          onChange={e => setFormData({ ...formData, amount: e.target.value })}
                          placeholder="0.00"
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-slate-800 font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Transaction Date</label>
                        <input 
                          type="date" 
                          required
                          value={formData.date}
                          onChange={e => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all bg-white text-slate-800 font-semibold"
                        />
                      </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Notes</label>
                    <textarea 
                      rows={2}
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Add transaction details..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all resize-none text-slate-700 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                   <button 
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
                  >
                    {editingExpense ? 'Update Entry' : 'Save Entry'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-14 left-1/2 -translate-x-1/2 z-[110] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-slate-800"
          >
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

