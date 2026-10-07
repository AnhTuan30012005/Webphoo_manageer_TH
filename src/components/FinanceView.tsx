'use client';

import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Wallet, 
  CreditCard,
  PieChart
} from 'lucide-react';
import { Booking } from '../types';

interface FinanceViewProps {
  bookings: Booking[];
}

export const FinanceView: React.FC<FinanceViewProps> = ({ bookings }) => {
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalPaid = bookings.reduce((sum, b) => sum + b.paidAmount, 0);
  const totalDebt = totalRevenue - totalPaid;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff' }}>Tài chính & Doanh thu</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Theo dõi dòng tiền, doanh thu đã thanh toán và công nợ của studio.
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#fff',
          fontWeight: 500
        }}>
          <Calendar size={14} color="var(--primary)" />
          <span>Tháng 10, 2026</span>
        </div>
      </div>

      {/* Top 3 KPI Cards (Matching video 01:40) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px'
      }}>
        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Doanh thu đã thanh toán</span>
            <div style={{ padding: '6px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--status-green)' }}>
              <TrendingUp size={16} />
            </div>
          </div>
          <span style={{ fontSize: '28px', fontWeight: 700, color: '#fff' }}>
            {totalPaid.toLocaleString('vi-VN')} đ
          </span>
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
            Đã thu từ cọc & tất toán booking
          </span>
        </div>

        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Khách còn nợ (Chưa thu)</span>
            <div style={{ padding: '6px', borderRadius: '6px', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--status-amber)' }}>
              <ArrowDownRight size={16} />
            </div>
          </div>
          <span style={{ fontSize: '28px', fontWeight: 700, color: 'var(--status-amber)' }}>
            {totalDebt.toLocaleString('vi-VN')} đ
          </span>
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
            Thu khi chụp xong hoặc giao album
          </span>
        </div>

        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Tổng giá trị hợp đồng</span>
            <div style={{ padding: '6px', borderRadius: '6px', background: 'rgba(139, 92, 246, 0.15)', color: 'var(--primary)' }}>
              <Wallet size={16} />
            </div>
          </div>
          <span style={{ fontSize: '28px', fontWeight: 700, color: 'var(--primary)' }}>
            {totalRevenue.toLocaleString('vi-VN')} đ
          </span>
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
            Tổng {bookings.length} lịch hẹn trong kỳ
          </span>
        </div>
      </div>

      {/* Cashflow Breakdown Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
      }}>
        {/* Left: Thu tiền theo booking */}
        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>Dòng tiền theo booking</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {bookings.slice(0, 4).map(b => (
              <div
                key={b.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  <div style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>{b.customerName}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '11.5px' }}>{b.service}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: 'var(--status-green)', fontSize: '13px', fontWeight: 600 }}>
                    +{b.paidAmount.toLocaleString('vi-VN')} đ
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                    {b.paidAmount === b.totalAmount ? 'Đã tất toán' : 'Đã cọc'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Chi phí vận hành */}
        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>Chi phí vận hành studio (T10/2026)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
              <span style={{ color: '#fff', fontSize: '13px' }}>Thuê mặt bằng studio</span>
              <span style={{ color: '#f87171', fontWeight: 600, fontSize: '13px' }}>-15.000.000 đ</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
              <span style={{ color: '#fff', fontSize: '13px' }}>Chi phí in ấn & gia công khung ảnh</span>
              <span style={{ color: '#f87171', fontWeight: 600, fontSize: '13px' }}>-4.800.000 đ</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
              <span style={{ color: '#fff', fontSize: '13px' }}>Điện, nước & internet studio</span>
              <span style={{ color: '#f87171', fontWeight: 600, fontSize: '13px' }}>-2.300.000 đ</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
              <span style={{ color: '#fff', fontSize: '13px' }}>Quảng cáo Facebook & TikTok Ads</span>
              <span style={{ color: '#f87171', fontWeight: 600, fontSize: '13px' }}>-6.500.000 đ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
