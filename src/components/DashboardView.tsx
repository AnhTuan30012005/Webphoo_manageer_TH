'use client';

import React from 'react';
import { 
  Camera, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  ArrowRight, 
  Images, 
  Sparkles,
  ChevronRight,
  User,
  Plus
} from 'lucide-react';
import { Booking, Album } from '../types';

interface DashboardViewProps {
  bookings: Booking[];
  albums: Album[];
  onNavigate: (tab: any) => void;
  onOpenCreateBooking: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  bookings,
  albums,
  onNavigate,
  onOpenCreateBooking
}) => {
  const todayShoots = bookings.filter(b => b.status === 'dang_chup');
  const pendingConfirm = bookings.filter(b => b.status === 'cho_xac_nhan');
  const inProgress = bookings.filter(b => ['dang_chup', 'dang_chon_anh', 'dang_retouch'].includes(b.status));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Welcome Banner */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#ffffff',
          letterSpacing: '-0.02em',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          Chào buổi chiều, buonmethuatngaybuon@gmail.com 👋
        </h1>
        <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
          Hôm nay, Thứ 4, 07/10/2026. Có <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{bookings.length} buổi chụp</span> đang trong pipeline.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px'
      }}>
        {/* Card 1: Buổi chụp hôm nay */}
        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Buổi chụp hôm nay</span>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(139, 92, 246, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)'
            }}>
              <Camera size={17} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: '700', color: '#fff', lineHeight: 1 }}>
              {todayShoots.length}
            </span>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Có buổi chụp sáng & chiều
          </span>
        </div>

        {/* Card 2: Chờ xác nhận */}
        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Chờ xác nhận</span>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--status-amber)'
            }}>
              <AlertCircle size={17} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: '700', color: '#fff', lineHeight: 1 }}>
              {pendingConfirm.length}
            </span>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Cần phản hồi khách hàng
          </span>
        </div>

        {/* Card 3: Đang thực hiện */}
        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Đang thực hiện</span>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(56, 189, 248, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--status-cyan)'
            }}>
              <Clock size={17} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: '700', color: '#fff', lineHeight: 1 }}>
              {inProgress.length}
            </span>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Từ chụp đến khâu hậu kỳ
          </span>
        </div>

        {/* Card 4: Hạn giao ảnh */}
        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Hạn giao ảnh</span>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--status-green)'
            }}>
              <CheckCircle2 size={17} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: '700', color: '#fff', lineHeight: 1 }}>
              {albums.length}
            </span>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Không có hạn gấp quá hạn
          </span>
        </div>
      </div>

      {/* Tiến độ buổi chụp Section */}
      <div className="card-dark" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>Tiến độ buổi chụp</h2>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Theo dõi và kiểm soát từng giai đoạn từ nhận lịch đến giao ảnh
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              style={{
                background: 'var(--primary-gradient)',
                color: '#fff',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Đang chạy
            </button>
            <button
              style={{
                background: 'rgba(255,255,255,0.04)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Tháng này
            </button>
            <button
              onClick={() => onNavigate('bookings')}
              className="btn-ghost"
              style={{ fontSize: '12.5px', color: 'var(--primary)' }}
            >
              <span>Quản lý lịch hẹn</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Active pipeline booking cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
          {bookings.slice(0, 3).map((item) => (
            <div
              key={item.id}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'border-color 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{item.customerName}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{item.service}</div>
                </div>
                <span className={`badge-status badge-${item.status}`}>
                  <span className="dot" />
                  {item.status === 'dang_chup' && 'Đang chụp'}
                  {item.status === 'da_xac_nhan' && 'Đã xác nhận'}
                  {item.status === 'cho_xac_nhan' && 'Chờ xác nhận'}
                  {item.status === 'dang_retouch' && 'Đang retouch'}
                  {item.status === 'dang_chon_anh' && 'Đang chọn ảnh'}
                  {item.status === 'hoan_thanh' && 'Hoàn thành'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Calendar size={13} color="var(--primary)" />
                  <span>{item.shootDate}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={13} color="var(--primary)" />
                  <span>{item.shootTime}</span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '10px',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: '12px'
              }}>
                <span style={{ color: 'var(--text-muted)' }}>Nhân sự: <strong style={{ color: '#fff' }}>{item.staffName}</strong></span>
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{item.totalAmount.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2 Bottom Cards: Hạn giao ảnh & Lịch hôm nay */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
        {/* Hạn giao ảnh */}
        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>Hạn giao ảnh</span>
            <button
              onClick={() => onNavigate('albums')}
              className="btn-ghost"
              style={{ fontSize: '12px', color: 'var(--primary)' }}
            >
              <span>Quản lý album</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {albums.map((album) => (
              <div
                key={album.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#fff' }}>{album.customerName}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Hạn giao: {album.deadlineDate}</div>
                </div>
                <span style={{
                  fontSize: '11.5px',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: 'rgba(139, 92, 246, 0.15)',
                  color: 'var(--primary)'
                }}>
                  {album.selectedPhotos}/{album.totalPhotos} ảnh
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lịch hôm nay */}
        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>Lịch hôm nay</span>
            <button
              onClick={() => onNavigate('schedule')}
              className="btn-ghost"
              style={{ fontSize: '12px', color: 'var(--primary)' }}
            >
              <span>Xem tất cả</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {todayShoots.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {todayShoots.map((shoot) => (
                <div
                  key={shoot.id}
                  style={{
                    padding: '12px 14px',
                    background: 'rgba(139, 92, 246, 0.08)',
                    borderRadius: '8px',
                    border: '1px solid rgba(139, 92, 246, 0.25)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{shoot.customerName}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{shoot.shootTime} • {shoot.location}</div>
                  </div>
                  <span className="badge-status badge-dang_chup">
                    <span className="dot" />
                    Đang chụp
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '24px',
              color: 'var(--text-muted)',
              fontSize: '13px'
            }}>
              Không có buổi chụp nào hôm nay
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
