'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Plus, 
  ChevronDown, 
  MoreVertical,
  Check,
  Eye,
  FileCheck,
  User,
  Clock,
  Phone
} from 'lucide-react';
import { Booking, BookingStatus } from '../types';

interface BookingsViewProps {
  bookings: Booking[];
  onOpenCreateBooking: () => void;
  onSelectBookingForSlip?: (booking: Booking) => void;
  onUpdateStatus: (id: string, newStatus: BookingStatus) => void;
}

export const BookingsView: React.FC<BookingsViewProps> = ({
  bookings,
  onOpenCreateBooking,
  onSelectBookingForSlip,
  onUpdateStatus
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');

  const statusList = [
    { key: 'all', label: 'Tất cả', count: bookings.length },
    { key: 'cho_xac_nhan', label: 'Chờ xác nhận', count: bookings.filter(b => b.status === 'cho_xac_nhan').length },
    { key: 'da_xac_nhan', label: 'Đã xác nhận', count: bookings.filter(b => b.status === 'da_xac_nhan').length },
    { key: 'dang_chup', label: 'Đang chụp', count: bookings.filter(b => b.status === 'dang_chup').length },
    { key: 'dang_chon_anh', label: 'Đang chọn ảnh', count: bookings.filter(b => b.status === 'dang_chon_anh').length },
    { key: 'dang_retouch', label: 'Đang retouch', count: bookings.filter(b => b.status === 'dang_retouch').length },
    { key: 'hoan_thanh', label: 'Hoàn thành', count: bookings.filter(b => b.status === 'hoan_thanh').length },
    { key: 'huy', label: 'Đã hủy', count: bookings.filter(b => b.status === 'huy').length }
  ];

  const filteredBookings = bookings.filter(item => {
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesSearch = searchQuery === '' || 
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerPhone.includes(searchQuery) ||
      item.bookingCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService = serviceFilter === 'all' || item.service === serviceFilter;
    return matchesStatus && matchesSearch && matchesService;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff' }}>Quản lý lịch hẹn</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Theo dõi và xác nhận các buổi chụp sắp tới của studio.
          </p>
        </div>

        <button onClick={onOpenCreateBooking} className="btn-primary">
          <Plus size={16} strokeWidth={2.5} />
          <span>Thêm lịch hẹn</span>
        </button>
      </div>

      {/* Control Filter Bar */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        {/* Top Filters Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Month selector */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              background: '#111116',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontSize: '13px',
              color: '#fff',
              fontWeight: 500
            }}>
              <Calendar size={14} color="var(--primary)" />
              <span>Tháng 10, 2026</span>
              <ChevronDown size={14} color="var(--text-muted)" />
            </div>

            {/* Quick buttons */}
            <button style={{
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'var(--primary-gradient)',
              color: '#fff',
              fontSize: '12.5px',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer'
            }}>
              Tất cả ({bookings.length})
            </button>
            <button style={{
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              fontSize: '12.5px',
              cursor: 'pointer'
            }}>
              Hôm nay (1)
            </button>
          </div>

          {/* Search box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '280px', flex: 1, maxWidth: '420px' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '10px' }} />
              <input
                type="text"
                placeholder="Tìm mã booking, tên khách, SĐT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-dark"
                style={{ paddingLeft: '36px' }}
              />
            </div>
          </div>
        </div>

        {/* Status Tabs Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '2px',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '12px'
        }}>
          {statusList.map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedStatus(tab.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: selectedStatus === tab.key ? 600 : 400,
                color: selectedStatus === tab.key ? '#fff' : 'var(--text-muted)',
                background: selectedStatus === tab.key ? 'rgba(139, 92, 246, 0.25)' : 'transparent',
                border: selectedStatus === tab.key ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{tab.label}</span>
              <span style={{
                fontSize: '11px',
                padding: '1px 5px',
                borderRadius: '10px',
                background: selectedStatus === tab.key ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
                color: selectedStatus === tab.key ? '#fff' : 'var(--text-dim)'
              }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
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
                <th>Khách hàng / Tên Job</th>
                <th>Dịch vụ</th>
                <th>Nhân sự</th>
                <th>Người tạo</th>
                <th>Lịch chụp</th>
                <th>Thanh toán</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <div>
                        <div style={{ color: '#fff', fontWeight: 600, fontSize: '13.5px' }}>{b.customerName}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                          <Phone size={11} />
                          <span>{b.customerPhone}</span>
                          <span style={{ margin: '0 4px' }}>•</span>
                          <span style={{ color: 'var(--primary)' }}>{b.bookingCode}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{b.service}</span>
                    </td>

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: 'rgba(139, 92, 246, 0.2)',
                          color: 'var(--primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: 600
                        }}>
                          {b.staffName.charAt(0)}
                        </div>
                        <span style={{ color: '#fff', fontSize: '13px' }}>{b.staffName}</span>
                      </div>
                    </td>

                    <td>
                      <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{b.creator.split('@')[0]}</span>
                    </td>

                    <td>
                      <div>
                        <div style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>{b.shootDate}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '11.5px', marginTop: '1px' }}>{b.shootTime}</div>
                      </div>
                    </td>

                    <td>
                      <div>
                        <div style={{ color: 'var(--status-green)', fontWeight: 600, fontSize: '13px' }}>
                          {b.paidAmount.toLocaleString('vi-VN')} đ
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                          Tổng: {b.totalAmount.toLocaleString('vi-VN')} đ
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={`badge-status badge-${b.status}`}>
                        <span className="dot" />
                        {b.status === 'dang_chup' && 'Đang chụp'}
                        {b.status === 'da_xac_nhan' && 'Đã xác nhận'}
                        {b.status === 'cho_xac_nhan' && 'Chờ xác nhận'}
                        {b.status === 'dang_retouch' && 'Đang retouch'}
                        {b.status === 'dang_chon_anh' && 'Đang chọn ảnh'}
                        {b.status === 'hoan_thanh' && 'Hoàn thành'}
                        {b.status === 'huy' && 'Đã hủy'}
                      </span>
                    </td>

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {onSelectBookingForSlip && (
                          <button
                            onClick={() => onSelectBookingForSlip(b)}
                            title="Tạo/Xem phiếu xác nhận dịch vụ"
                            style={{
                              background: 'rgba(139, 92, 246, 0.15)',
                              border: '1px solid rgba(139, 92, 246, 0.3)',
                              color: 'var(--primary)',
                              padding: '5px 8px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '11.5px'
                            }}
                          >
                            <FileCheck size={13} />
                            <span>Phiếu</span>
                          </button>
                        )}

                        {b.status === 'cho_xac_nhan' && (
                          <button
                            onClick={() => onUpdateStatus(b.id, 'da_xac_nhan')}
                            title="Xác nhận lịch chụp"
                            style={{
                              background: 'rgba(16, 185, 129, 0.15)',
                              border: '1px solid rgba(16, 185, 129, 0.3)',
                              color: 'var(--status-green)',
                              padding: '5px 8px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              fontSize: '11.5px'
                            }}
                          >
                            <Check size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                    Chưa có lịch hẹn nào phù hợp với bộ lọc
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
