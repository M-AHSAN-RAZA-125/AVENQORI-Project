import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { TeacherAPI } from '../../services/api';

export default function TeacherEarningsPage() {
  const { toast } = useApp();
  const [earnings, setEarnings] = useState(null);
  const [timeFilter, setTimeFilter] = useState('30 Days');
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState('JazzCash');
  const [withdrawAmount, setWithdrawAmount] = useState('500');

  useEffect(() => {
    TeacherAPI.getEarnings().then(res => setEarnings(res));
  }, []);

  if (!earnings) return <div className="card p text-center text-muted">Loading Earnings Data...</div>;

  const handleWithdraw = () => {
    toast(`Withdrawal request of $${withdrawAmount} submitted via ${payoutMethod}! Estimated arrival: 24 hrs.`, 'success');
    setWithdrawModal(false);
  };

  return (
    <div className="teacher-earnings-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">💰</div>
        <div className="banner-text">
          <h1>My Earnings & Payout Wallet</h1>
          <p>Track your revenue, inspect escrow-cleared student transactions, and withdraw directly to your account.</p>
        </div>
        <div className="banner-art">💵</div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid-4 mb-20">
        <div className="stat-card">
          <div className="stat-icon purple">💲</div>
          <div className="stat-info">
            <strong>${earnings.totalEarnings.toFixed(2)}</strong>
            <span>Total Earnings</span>
          </div>
          <span className="stat-change">↑12%</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">👛</div>
          <div className="stat-info">
            <strong>${earnings.availableBalance.toFixed(2)}</strong>
            <span>Available Balance</span>
          </div>
          <span className="stat-change">↑8%</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">📅</div>
          <div className="stat-info">
            <strong>${earnings.thisMonth.toFixed(2)}</strong>
            <span>This Month</span>
          </div>
          <span className="stat-change">↑15%</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">⭐</div>
          <div className="stat-info">
            <strong>${earnings.totalPayouts.toFixed(2)}</strong>
            <span>Total Payouts</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Chart + Quick Actions */}
      <div className="grid-2 mb-20" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
        {/* Earnings Chart */}
        <div className="card p">
          <div className="flex-b mb-16">
            <h3>📈 Earnings Growth Trajectory</h3>
            <div className="flex gap-4">
              {['7 Days', '30 Days', '3 Months', '1 Year'].map(f => (
                <button
                  key={f}
                  className={`tab-btn btn-sm ${timeFilter === f ? 'active' : ''}`}
                  style={{ padding: '4px 10px', fontSize: '11px' }}
                  onClick={() => setTimeFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <svg width="100%" height="160" viewBox="0 0 380 160">
              <defs>
                <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6c3ef4" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#6c3ef4" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="30" y1="20" x2="360" y2="20" stroke="#f1f5f9" strokeDasharray="3" />
              <line x1="30" y1="60" x2="360" y2="60" stroke="#f1f5f9" strokeDasharray="3" />
              <line x1="30" y1="100" x2="360" y2="100" stroke="#f1f5f9" strokeDasharray="3" />

              <text x="10" y="25" fontSize="9" fill="#94a3b8">$1,000</text>
              <text x="10" y="65" fontSize="9" fill="#94a3b8">$750</text>
              <text x="10" y="105" fontSize="9" fill="#94a3b8">$500</text>
              <text x="10" y="145" fontSize="9" fill="#94a3b8">$0</text>

              <path
                d="M 40 140 Q 90 120 140 110 T 210 95 T 280 65 T 350 70 L 350 145 L 40 145 Z"
                fill="url(#earnGrad)"
              />
              <path
                d="M 40 140 Q 90 120 140 110 T 210 95 T 280 65 T 350 70"
                fill="none"
                stroke="#6c3ef4"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="280" cy="65" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
              <rect x="250" y="32" width="60" height="20" rx="4" fill="#1e1052" />
              <text x="280" y="46" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="bold">$720.50</text>

              <text x="40" y="155" fontSize="9" fill="#94a3b8">Oct 23</text>
              <text x="120" y="155" fontSize="9" fill="#94a3b8">Nov 01</text>
              <text x="200" y="155" fontSize="9" fill="#94a3b8">Nov 07</text>
              <text x="280" y="155" fontSize="9" fill="#94a3b8">Nov 10</text>
              <text x="350" y="155" fontSize="9" fill="#94a3b8">Nov 16</text>
            </svg>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p">
          <h3 className="mb-14">⚡ Payout & Withdrawal Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className="btn btn-primary btn-full" style={{ justifyContent: 'flex-start', padding: '14px' }} onClick={() => setWithdrawModal(true)}>
              <span style={{ fontSize: '20px' }}>👛</span>
              <div>
                <strong>Request Withdrawal</strong>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>Transfer funds to JazzCash, Easypaisa, or Bank</p>
              </div>
            </button>

            <button className="btn btn-ghost btn-full" style={{ justifyContent: 'flex-start', padding: '12px' }} onClick={() => toast('Displaying full 12-month transaction audit...', 'info')}>
              <span style={{ fontSize: '20px' }}>🕒</span>
              <div>
                <strong>View Transaction History</strong>
                <p className="text-xs text-muted" style={{ margin: 0 }}>Inspect all course purchases and escrow clearings</p>
              </div>
            </button>

            <button className="btn btn-ghost btn-full" style={{ justifyContent: 'flex-start', padding: '12px' }} onClick={() => toast('Generating official PDF statement for tax/accounts...', 'success')}>
              <span style={{ fontSize: '20px' }}>📥</span>
              <div>
                <strong>Download Statement (PDF)</strong>
                <p className="text-xs text-muted" style={{ margin: 0 }}>Download monthly breakdown for tax and accounting</p>
              </div>
            </button>

            <button className="btn btn-ghost btn-full" style={{ justifyContent: 'flex-start', padding: '12px' }} onClick={() => toast('Payment gateway settings: JazzCash / Easypaisa accounts up to date.', 'info')}>
              <span style={{ fontSize: '20px' }}>💳</span>
              <div>
                <strong>Update Payment Details</strong>
                <p className="text-xs text-muted" style={{ margin: 0 }}>Configure local Pakistan & international payout channels</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions & Insights */}
      <div className="grid-2 mb-20" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
        {/* Recent Transactions Table */}
        <div className="card p">
          <div className="flex-b mb-14">
            <h3>📑 Recent Transactions</h3>
            <span className="text-xs text-purple font-bold" style={{ cursor: 'pointer' }} onClick={() => toast('All transactions loaded', 'info')}>
              View All →
            </span>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)', color: 'var(--muted)' }}>
                <th style={{ padding: '8px' }}>Type</th>
                <th style={{ padding: '8px' }}>Description</th>
                <th style={{ padding: '8px' }}>Amount</th>
                <th style={{ padding: '8px' }}>Date</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {earnings.transactions.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '10px 8px' }}>
                    <span style={{ fontSize: '16px' }}>{t.isCredit ? '⬆️' : '⬇️'}</span>
                  </td>
                  <td style={{ padding: '10px 8px' }}>
                    <strong>{t.desc}</strong>
                    <div className="text-xs text-muted">{t.type}</div>
                  </td>
                  <td style={{ padding: '10px 8px', fontWeight: 700, color: t.isCredit ? 'var(--ok)' : 'var(--bad)' }}>
                    {t.isCredit ? `+$${t.amount.toFixed(2)}` : `-$${t.amount.toFixed(2)}`}
                  </td>
                  <td style={{ padding: '10px 8px', color: 'var(--muted)', fontSize: '12px' }}>{t.date}</td>
                  <td style={{ padding: '10px 8px', textAlign: 'right' }}>
                    <span className={`badge ${t.status === 'Completed' ? 'badge-green' : 'badge-blue'}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Earnings Insights */}
        <div className="card p" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 className="mb-14">💡 Earnings Insights</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="flex-c gap-10 p-10" style={{ background: 'var(--bg)', borderRadius: '10px' }}>
                <span style={{ fontSize: '24px' }}>📈</span>
                <p className="text-xs" style={{ margin: 0 }}>
                  <strong>Your earnings are up by 15% this month!</strong> Keep up the great work with active student interaction.
                </p>
              </div>

              <div className="flex-c gap-10 p-10" style={{ background: 'var(--bg)', borderRadius: '10px' }}>
                <span style={{ fontSize: '24px' }}>⭐</span>
                <p className="text-xs" style={{ margin: 0 }}>
                  <strong>Top performing course:</strong> Python Programming generated $380.50 this week.
                </p>
              </div>

              <div className="flex-c gap-10 p-10" style={{ background: 'var(--bg)', borderRadius: '10px' }}>
                <span style={{ fontSize: '24px' }}>🏆</span>
                <p className="text-xs" style={{ margin: 0 }}>
                  <strong>You have earned $1,095.25 in verified payouts</strong> to your connected bank account so far!
                </p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <span style={{ fontSize: '42px' }}>🏆</span>
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {withdrawModal && (
        <div className="modal-overlay" onClick={() => setWithdrawModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Request Payout Withdrawal</h3>
              <button className="modal-close" onClick={() => setWithdrawModal(false)}>✕</button>
            </div>

            <div className="card p mb-16" style={{ background: 'var(--bg2)', textAlign: 'center' }}>
              <span className="text-xs text-muted">Available Balance to Withdraw</span>
              <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--purple)' }}>${earnings.availableBalance.toFixed(2)}</div>
            </div>

            <div className="form-group">
              <label className="form-label">Withdrawal Amount ($ USD)</label>
              <input
                type="number"
                className="form-input"
                value={withdrawAmount}
                onChange={e => setWithdrawAmount(e.target.value)}
                min="10"
                max={earnings.availableBalance}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Payout Method</label>
              <select className="form-select" value={payoutMethod} onChange={e => setPayoutMethod(e.target.value)}>
                <option value="JazzCash">JazzCash (Pakistan Mobile Wallet)</option>
                <option value="Easypaisa">Easypaisa (Pakistan Mobile Wallet)</option>
                <option value="Bank Transfer">Bank Transfer (IBAN / Local Bank)</option>
                <option value="Payoneer">Payoneer / International Wire</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Account Number / Phone / IBAN</label>
              <input className="form-input" placeholder="e.g. 0300 1234567 or PK36..." defaultValue="0300 1234567" />
            </div>

            <div className="flex gap-12 mt-20">
              <button className="btn btn-ghost flex-1" onClick={() => setWithdrawModal(false)}>Cancel</button>
              <button className="btn btn-primary flex-1" onClick={handleWithdraw}>Submit Withdrawal →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
