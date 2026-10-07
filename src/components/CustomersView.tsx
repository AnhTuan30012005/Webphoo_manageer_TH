'use client';

import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  TrendingUp, 
  Search, 
  Plus, 
  ExternalLink, 
  Phone, 
  Mail,
  Award
} from 'lucide-react';
import { Customer } from '../types';

interface CustomersViewProps {
  customers: Customer[];
  onAddCustomer: (customer: Customer) => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({
  customers,
  onAddCustomer
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New customer form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [source, setSource] = useState('Facebook Ads');

  const totalSpentAll = customers.reduce((acc, c) => acc + c.totalSpent, 0);
  const returningCustomers = customers.filter(c => c.totalBookings >= 2);
  const newCustomersThisMonth = customers.filter(c => c.type === 'moi');

  const filteredCustomers = customers.filter(c => {
    const matchesType = filterType === 'all' || c.type === filterType;
    const matchesSearch = searchQuery === '' || 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.phone.includes(searchQuery);
    return matchesType && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const newCust: Customer = {
      id: `c_${Date.now()}`,
      name,
      phone,
      email: email || `${phone}@client.vn`,
      source,
      totalBookings: 1,
      totalSpent: 0,
      lastBookingDate: '07/10/2026',
      type: 'moi'
    };

    onAddCustomer(newCust);
    setShowAddModal(false);
    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff' }}>Khách hàng</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Quản lý thông tin & lịch sử sử dụng của họ.
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn-primary">
          <Plus size={16} strokeWidth={2.5} />
          <span>Thêm khách</span>
        </button>
      </div>

      {/* 4 Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Tổng khách hàng</span>
            <Users size={16} color="var(--primary)" />
          </div>
          <span style={{ fontSize: '28px', fontWeight: 700, color: '#fff' }}>{customers.length}</span>
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>đang theo dõi</span>
        </div>

        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Khách mới tháng này</span>
            <UserPlus size={16} color="var(--status-cyan)" />
          </div>
          <span style={{ fontSize: '28px', fontWeight: 700, color: '#fff' }}>{newCustomersThisMonth.length}</span>
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>trong tháng 10</span>
        </div>

        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Khách quay lại</span>
            <UserCheck size={16} color="var(--status-amber)" />
          </div>
          <span style={{ fontSize: '28px', fontWeight: 700, color: '#fff' }}>{returningCustomers.length}</span>
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>từ 2 buổi trở lên</span>
        </div>

        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Doanh thu từ khách</span>
            <TrendingUp size={16} color="var(--status-green)" />
          </div>
          <span style={{ fontSize: '28px', fontWeight: 700, color: 'var(--status-green)' }}>
            {(totalSpentAll / 1000000).toFixed(1)} tr
          </span>
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>tổng đã chi trả</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setFilterType('all')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12.5px',
              fontWeight: filterType === 'all' ? 600 : 400,
              background: filterType === 'all' ? 'var(--primary-gradient)' : 'rgba(255,255,255,0.04)',
              color: filterType === 'all' ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Tất cả ({customers.length})
          </button>
          <button
            onClick={() => setFilterType('vip')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12.5px',
              fontWeight: filterType === 'vip' ? 600 : 400,
              background: filterType === 'vip' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255,255,255,0.04)',
              color: filterType === 'vip' ? 'var(--status-amber)' : 'var(--text-secondary)',
              border: filterType === 'vip' ? '1px solid var(--status-amber)' : '1px solid transparent',
              cursor: 'pointer'
            }}
          >
            VIP ({customers.filter(c => c.type === 'vip').length})
          </button>
          <button
            onClick={() => setFilterType('than_thiet')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12.5px',
              fontWeight: filterType === 'than_thiet' ? 600 : 400,
              background: filterType === 'than_thiet' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255,255,255,0.04)',
              color: filterType === 'than_thiet' ? 'var(--status-cyan)' : 'var(--text-secondary)',
              border: filterType === 'than_thiet' ? '1px solid var(--status-cyan)' : '1px solid transparent',
              cursor: 'pointer'
            }}
          >
            Thân thiết ({customers.filter(c => c.type === 'than_thiet').length})
          </button>
          <button
            onClick={() => setFilterType('moi')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12.5px',
              fontWeight: filterType === 'moi' ? 600 : 400,
              background: filterType === 'moi' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255,255,255,0.04)',
              color: filterType === 'moi' ? 'var(--status-green)' : 'var(--text-secondary)',
              border: filterType === 'moi' ? '1px solid var(--status-green)' : '1px solid transparent',
              cursor: 'pointer'
            }}
          >
            Khách mới ({customers.filter(c => c.type === 'moi').length})
          </button>
        </div>

        <div style={{ position: 'relative', minWidth: '280px' }}>
          <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '10px' }} />
          <input
            type="text"
            placeholder="Tìm tên, số điện thoại..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-dark"
            style={{ paddingLeft: '36px' }}
          />
        </div>
      </div>

      {/* Customer Table */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Liên hệ</th>
                <th>Link Album</th>
                <th>Nguồn</th>
                <th>Số buổi</th>
                <th>Tổng chi tiêu</th>
                <th>Lần gần nhất</th>
                <th>Phân loại</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))',
                        border: '1px solid rgba(139, 92, 246, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '12.5px'
                      }}>
                        {c.name.charAt(0)}
                      </div>
                      <span style={{ color: '#fff', fontWeight: 600, fontSize: '13.5px' }}>{c.name}</span>
                    </div>
                  </td>

                  <td>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                      <div>{c.phone}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{c.email}</div>
                    </div>
                  </td>

                  <td>
                    {c.albumLink ? (
                      <a
                        href={c.albumLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: 'var(--primary)',
                          fontSize: '12px',
                          textDecoration: 'none'
                        }}
                      >
                        <span>Xem album</span>
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span style={{ color: 'var(--text-dim)', fontSize: '12px' }}>Chưa có</span>
                    )}
                  </td>

                  <td>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      color: 'var(--text-muted)',
                      fontSize: '12px'
                    }}>
                      {c.source}
                    </span>
                  </td>

                  <td>
                    <span style={{ color: '#fff', fontWeight: 600, fontSize: '13px' }}>{c.totalBookings}</span>
                  </td>

                  <td>
                    <span style={{ color: 'var(--status-green)', fontWeight: 600, fontSize: '13px' }}>
                      {c.totalSpent.toLocaleString('vi-VN')} đ
                    </span>
                  </td>

                  <td>
                    <span style={{ color: 'var(--text-muted)', fontSize: '12.5px' }}>{c.lastBookingDate}</span>
                  </td>

                  <td>
                    {c.type === 'vip' && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '3px 8px',
                        borderRadius: '9999px',
                        background: 'rgba(245, 158, 11, 0.15)',
                        color: 'var(--status-amber)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        fontSize: '11.5px',
                        fontWeight: 600
                      }}>
                        <Award size={12} />
                        VIP
                      </span>
                    )}
                    {c.type === 'than_thiet' && (
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '9999px',
                        background: 'rgba(56, 189, 248, 0.15)',
                        color: 'var(--status-cyan)',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        fontSize: '11.5px',
                        fontWeight: 600
                      }}>
                        Thân thiết
                      </span>
                    )}
                    {c.type === 'moi' && (
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '9999px',
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: 'var(--status-green)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        fontSize: '11.5px',
                        fontWeight: 600
                      }}>
                        Khách mới
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>Thêm khách hàng mới</h3>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Họ và tên *</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="VD: Lê Thị Hồng" className="input-dark" />
              </div>
              <div>
                <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Số điện thoại *</label>
                <input required type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="VD: 0987654321" className="input-dark" />
              </div>
              <div>
                <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="VD: hong.le@gmail.com" className="input-dark" />
              </div>
              <div>
                <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Nguồn khách</label>
                <select value={source} onChange={e => setSource(e.target.value)} className="input-dark">
                  <option value="Facebook Ads">Facebook Ads</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Người quen giới thiệu">Người quen giới thiệu</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">Hủy</button>
                <button type="submit" className="btn-primary">Lưu khách hàng</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
