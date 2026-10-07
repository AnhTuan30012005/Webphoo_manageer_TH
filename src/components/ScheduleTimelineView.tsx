'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  Plus,
  Camera,
  MapPin,
  Bell,
  BellRing,
  ExternalLink,
  Download,
  Check,
  User,
  Phone,
  Filter,
  X
} from 'lucide-react';
import { Booking } from '../types';
import { requestAndSendDeviceNotification, getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendarSync';

interface ScheduleTimelineViewProps {
  bookings: Booking[];
  onOpenCreateBooking: () => void;
}

export const ScheduleTimelineView: React.FC<ScheduleTimelineViewProps> = ({
  bookings,
  onOpenCreateBooking
}) => {
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [currentDateIndex, setCurrentDateIndex] = useState(2); // Wednesday (07/10)

  const hours = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00'
  ];

  const weekDays = [
    { name: 'T2', date: '05/10', fullDate: '05/10/2026', isToday: false },
    { name: 'T3', date: '06/10', fullDate: '06/10/2026', isToday: false },
    { name: 'T4', date: '07/10', fullDate: '07/10/2026', isToday: true },
    { name: 'T5', date: '08/10', fullDate: '08/10/2026', isToday: false },
    { name: 'T6', date: '09/10', fullDate: '09/10/2026', isToday: false },
    { name: 'T7', date: '10/10', fullDate: '10/10/2026', isToday: false },
    { name: 'CN', date: '11/10', fullDate: '11/10/2026', isToday: false },
  ];

  const handleEnableNotification = async () => {
    const success = await requestAndSendDeviceNotification(
      '🔔 Framevis Studio: Đã bật chuông báo',
      'Hệ thống sẽ tự động gửi thông báo trực tiếp đến máy tính và điện thoại của bạn khi sắp tới ca chụp!'
    );
    if (success) {
      setNotificationsEnabled(true);
    }
  };

  const handleTestAlertForBooking = async (b: Booking) => {
    await requestAndSendDeviceNotification(
      `📸 Nhắc lịch chụp: ${b.customerName}`,
      `Lúc ${b.shootTime} ngày ${b.shootDate} (${b.service}). Phụ trách: ${b.staffName}`
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Top Google Calendar Navigation Bar */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        {/* Left: Google Cal Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setCurrentDateIndex(2)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'rgba(255,255,255,0.04)',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Hôm nay
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => setCurrentDateIndex(Math.max(0, currentDateIndex - 1))}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.03)',
                border: 'none',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={17} />
            </button>
            <button
              onClick={() => setCurrentDateIndex(Math.min(weekDays.length - 1, currentDateIndex + 1))}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.03)',
                border: 'none',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronRight size={17} />
            </button>
          </div>

          <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
            Tháng 10 năm 2026
          </span>
        </div>

        {/* Right: Notification Toggle + View mode + Add Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Device Notification Button */}
          <button
            onClick={handleEnableNotification}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12.5px',
              fontWeight: 500,
              cursor: 'pointer',
              background: notificationsEnabled ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
              color: notificationsEnabled ? 'var(--status-green)' : 'var(--status-amber)',
              border: notificationsEnabled ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)'
            }}
            title="Nhận thông báo trực tiếp trên máy tính hoặc điện thoại khi có lịch chụp"
          >
            {notificationsEnabled ? <BellRing size={14} /> : <Bell size={14} />}
            <span>{notificationsEnabled ? 'Chuông báo: Đang bật' : 'Bật chuông báo về máy'}</span>
          </button>

          {/* View switcher */}
          <div style={{
            display: 'flex',
            background: '#111116',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '3px'
          }}>
            {(['day', 'week', 'month'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '12.5px',
                  fontWeight: viewMode === mode ? 600 : 400,
                  color: viewMode === mode ? '#fff' : 'var(--text-muted)',
                  background: viewMode === mode ? 'var(--primary-gradient)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {mode === 'day' ? 'Ngày' : mode === 'week' ? 'Tuần' : 'Tháng'}
              </button>
            ))}
          </div>

          <button onClick={onOpenCreateBooking} className="btn-primary">
            <Plus size={16} strokeWidth={2.5} />
            <span>Thêm lịch</span>
          </button>
        </div>
      </div>

      {/* Main Calendar Viewport (Google Calendar Style) */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {viewMode === 'week' && (
          <div style={{ overflowX: 'auto' }}>
            {/* Week Days Header Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '70px repeat(7, 1fr)',
              borderBottom: '1px solid var(--border-color)',
              background: '#121217',
              minWidth: '900px'
            }}>
              <div style={{ padding: '12px 8px', textAlign: 'center', fontSize: '11px', color: 'var(--text-dim)', borderRight: '1px solid var(--border-color)' }}>
                GMT+7
              </div>
              {weekDays.map((day, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 8px',
                    textAlign: 'center',
                    borderRight: idx < weekDays.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                    background: day.isToday ? 'rgba(139, 92, 246, 0.08)' : 'transparent'
                  }}
                >
                  <div style={{ fontSize: '11.5px', color: day.isToday ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600 }}>
                    {day.name}
                  </div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    marginTop: '2px',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: day.isToday ? '#fff' : 'var(--text-secondary)',
                    background: day.isToday ? 'var(--primary)' : 'transparent'
                  }}>
                    {day.date.split('/')[0]}
                  </div>
                </div>
              ))}
            </div>

            {/* Time Grid with Event Blocks */}
            <div style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '70px repeat(7, 1fr)',
              minWidth: '900px',
              maxHeight: '620px',
              overflowY: 'auto'
            }}>
              {/* Hour rows */}
              {hours.map((hour, hIdx) => (
                <React.Fragment key={hour}>
                  <div style={{
                    height: '60px',
                    padding: '6px 8px',
                    textAlign: 'right',
                    fontSize: '11.5px',
                    color: 'var(--text-dim)',
                    borderRight: '1px solid var(--border-color)',
                    borderBottom: '1px solid #1a1a24',
                    background: '#101015'
                  }}>
                    {hour}
                  </div>

                  {weekDays.map((day, dIdx) => {
                    // Check bookings for this day
                    const dayBookings = bookings.filter(b => b.shootDate === day.fullDate);
                    // Match hour
                    const slotBookings = dayBookings.filter(b => b.shootTime.startsWith(hour.slice(0, 2)));

                    return (
                      <div
                        key={dIdx}
                        onClick={onOpenCreateBooking}
                        style={{
                          height: '60px',
                          borderRight: dIdx < weekDays.length - 1 ? '1px solid #1a1a24' : 'none',
                          borderBottom: '1px solid #1a1a24',
                          padding: '2px',
                          position: 'relative',
                          cursor: 'pointer',
                          background: day.isToday ? 'rgba(139, 92, 246, 0.02)' : 'transparent'
                        }}
                      >
                        {slotBookings.map(b => (
                          <div
                            key={b.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBooking(b);
                            }}
                            style={{
                              position: 'absolute',
                              top: '2px',
                              left: '3px',
                              right: '3px',
                              zIndex: 10,
                              background: b.status === 'dang_chup' 
                                ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.85) 0%, rgba(124, 58, 237, 0.95) 100%)'
                                : 'linear-gradient(135deg, rgba(16, 185, 129, 0.85) 0%, rgba(5, 150, 105, 0.95) 100%)',
                              borderRadius: '6px',
                              padding: '5px 8px',
                              color: '#fff',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                              border: '1px solid rgba(255,255,255,0.2)',
                              fontSize: '11.5px',
                              lineHeight: 1.2
                            }}
                          >
                            <div style={{ fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {b.customerName}
                            </div>
                            <div style={{ fontSize: '10.5px', opacity: 0.9, marginTop: '2px' }}>
                              {b.shootTime} • {b.staffName}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {viewMode === 'day' && (
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>
              Lịch chi tiết Thứ 4, 07/10/2026
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {bookings.filter(b => b.shootDate === '07/10/2026').map(b => (
                <div
                  key={b.id}
                  onClick={() => setSelectedBooking(b)}
                  style={{
                    padding: '16px',
                    borderRadius: '10px',
                    background: 'rgba(139, 92, 246, 0.12)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>{b.customerName}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      {b.service} • {b.location}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--primary)', marginTop: '4px' }}>
                      {b.shootTime} | Thợ: {b.staffName}
                    </div>
                  </div>
                  <span className={`badge-status badge-${b.status}`}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {viewMode === 'month' && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <CalendarIcon size={36} color="var(--primary)" style={{ margin: '0 auto 12px' }} />
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>Xem tổng quan toàn bộ tháng 10/2026</div>
            <p style={{ fontSize: '13px', marginTop: '6px' }}>Có tổng cộng {bookings.length} buổi chụp được phân bổ đều các tuần.</p>
          </div>
        )}
      </div>

      {/* Booking Detail Modal with Google Calendar Sync & Device Alert */}
      {selectedBooking && (
        <div className="modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase' }}>
                  CHI TIẾT LỊCH HẸN
                </span>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
                  {selectedBooking.customerName}
                </h3>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="btn-ghost" style={{ padding: '4px' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '13px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Mã Booking:</span>
                  <strong style={{ color: 'var(--primary)' }}>{selectedBooking.bookingCode}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Số điện thoại:</span>
                  <strong style={{ color: '#fff' }}>{selectedBooking.customerPhone}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Dịch vụ:</span>
                  <strong style={{ color: '#fff' }}>{selectedBooking.service}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Thời gian:</span>
                  <strong style={{ color: '#fff' }}>{selectedBooking.shootTime} ngày {selectedBooking.shootDate}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Địa điểm:</span>
                  <strong style={{ color: '#fff' }}>{selectedBooking.location}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Nhiếp ảnh phụ trách:</span>
                  <strong style={{ color: 'var(--status-green)' }}>{selectedBooking.staffName}</strong>
                </div>
              </div>

              {/* Action buttons: Google Calendar Sync, ICS, Push Notification */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                  TÍCH HỢP ĐỒNG BỘ VÀ BÁO VỀ MÁY:
                </div>

                {/* Google Calendar Direct Sync Link */}
                <a
                  href={getGoogleCalendarUrl(selectedBooking)}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: '#1a73e8',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(26, 115, 232, 0.35)'
                  }}
                >
                  <ExternalLink size={15} />
                  <span>Đồng bộ vào Google Calendar trên điện thoại</span>
                </a>

                {/* Test Device Push Alert */}
                <button
                  onClick={() => handleTestAlertForBooking(selectedBooking)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: 'rgba(245, 158, 11, 0.15)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    color: 'var(--status-amber)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <BellRing size={15} />
                  <span>Thử gửi chuông báo ngay về máy tính/điện thoại</span>
                </button>

                {/* Download .ICS */}
                <button
                  onClick={() => downloadIcsFile(selectedBooking)}
                  className="btn-secondary"
                  style={{ fontSize: '13px', padding: '10px 16px' }}
                >
                  <Download size={15} />
                  <span>Tải file lịch .ICS (Apple Calendar / Outlook)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
