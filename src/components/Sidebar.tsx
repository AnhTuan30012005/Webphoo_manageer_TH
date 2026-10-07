'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  CalendarCheck, 
  FileText, 
  Users, 
  Clock, 
  Images, 
  DollarSign, 
  Coins, 
  Settings, 
  Share2, 
  Headphones, 
  ChevronDown, 
  ChevronRight,
  Sparkles,
  Camera
} from 'lucide-react';

export type NavigationTab = 
  | 'dashboard'
  | 'bookings'
  | 'schedule'
  | 'confirmation_slips'
  | 'customers'
  | 'work_schedule'
  | 'albums'
  | 'finance'
  | 'payroll'
  | 'payroll_pending'
  | 'payroll_settings'
  | 'settings';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  bookingCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab, bookingCount = 6 }) => {
  const [bookingsOpen, setBookingsOpen] = useState(true);
  const [payrollOpen, setPayrollOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      height: '100vh',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      userSelect: 'none'
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '20px 20px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 0 16px rgba(139, 92, 246, 0.4)'
          }}>
            <Camera size={18} />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
            <span style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '-0.02em', color: '#fff' }}>
              framevis
            </span>
            <span style={{ 
              fontSize: '11px', 
              color: 'var(--primary)', 
              fontWeight: '600',
              textTransform: 'lowercase',
              opacity: 0.9 
            }}>
              studio
            </span>
          </div>
        </div>

        <span style={{
          fontSize: '10px',
          padding: '2px 6px',
          background: 'rgba(139, 92, 246, 0.2)',
          color: 'var(--primary)',
          borderRadius: '4px',
          fontWeight: 600
        }}>
          PRO
        </span>
      </div>

      {/* Navigation Links Scrollable */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        {/* Dashboard */}
        <button
          onClick={() => onSelectTab('dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '13.5px',
            fontWeight: currentTab === 'dashboard' ? '600' : '400',
            color: currentTab === 'dashboard' ? '#fff' : 'var(--text-secondary)',
            backgroundColor: currentTab === 'dashboard' ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
            border: currentTab === 'dashboard' ? '1px solid rgba(139, 92, 246, 0.35)' : '1px solid transparent',
            cursor: 'pointer',
            textAlign: 'left',
            width: '100%',
            transition: 'all 0.15s ease'
          }}
        >
          <LayoutDashboard size={17} color={currentTab === 'dashboard' ? 'var(--primary)' : 'var(--text-muted)'} />
          <span>Dashboard</span>
        </button>

        {/* Lịch Hẹn Submenu */}
        <div style={{ marginTop: '6px' }}>
          <button
            onClick={() => setBookingsOpen(!bookingsOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '13.5px',
              color: ['bookings', 'schedule', 'confirmation_slips'].includes(currentTab) ? '#fff' : 'var(--text-secondary)',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CalendarDays size={17} color={['bookings', 'schedule', 'confirmation_slips'].includes(currentTab) ? 'var(--primary)' : 'var(--text-muted)'} />
              <span style={{ fontWeight: ['bookings', 'schedule', 'confirmation_slips'].includes(currentTab) ? '600' : '400' }}>
                Lịch hẹn
              </span>
            </div>
            {bookingsOpen ? <ChevronDown size={14} color="var(--text-muted)" /> : <ChevronRight size={14} color="var(--text-muted)" />}
          </button>

          {bookingsOpen && (
            <div style={{ paddingLeft: '28px', marginTop: '2px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <button
                onClick={() => onSelectTab('bookings')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: currentTab === 'bookings' ? '600' : '400',
                  color: currentTab === 'bookings' ? '#fff' : 'var(--text-muted)',
                  backgroundColor: currentTab === 'bookings' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                <span>Quản lý lịch hẹn</span>
                {bookingCount > 0 && (
                  <span style={{
                    fontSize: '11px',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    background: 'rgba(139, 92, 246, 0.25)',
                    color: 'var(--primary)',
                    fontWeight: 600
                  }}>
                    {bookingCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => onSelectTab('schedule')}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: currentTab === 'schedule' ? '600' : '400',
                  color: currentTab === 'schedule' ? '#fff' : 'var(--text-muted)',
                  backgroundColor: currentTab === 'schedule' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                Bảng phân công
              </button>

              <button
                onClick={() => onSelectTab('confirmation_slips')}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: currentTab === 'confirmation_slips' ? '600' : '400',
                  color: currentTab === 'confirmation_slips' ? '#fff' : 'var(--text-muted)',
                  backgroundColor: currentTab === 'confirmation_slips' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                Phiếu xác nhận
              </button>
            </div>
          )}
        </div>

        {/* Khách hàng */}
        <button
          onClick={() => onSelectTab('customers')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '13.5px',
            fontWeight: currentTab === 'customers' ? '600' : '400',
            color: currentTab === 'customers' ? '#fff' : 'var(--text-secondary)',
            backgroundColor: currentTab === 'customers' ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
            border: currentTab === 'customers' ? '1px solid rgba(139, 92, 246, 0.35)' : '1px solid transparent',
            cursor: 'pointer',
            textAlign: 'left',
            width: '100%'
          }}
        >
          <Users size={17} color={currentTab === 'customers' ? 'var(--primary)' : 'var(--text-muted)'} />
          <span>Khách hàng</span>
        </button>

        {/* Lịch làm việc */}
        <button
          onClick={() => onSelectTab('work_schedule')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '13.5px',
            fontWeight: currentTab === 'work_schedule' ? '600' : '400',
            color: currentTab === 'work_schedule' ? '#fff' : 'var(--text-secondary)',
            backgroundColor: currentTab === 'work_schedule' ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
            border: currentTab === 'work_schedule' ? '1px solid rgba(139, 92, 246, 0.35)' : '1px solid transparent',
            cursor: 'pointer',
            textAlign: 'left',
            width: '100%'
          }}
        >
          <Clock size={17} color={currentTab === 'work_schedule' ? 'var(--primary)' : 'var(--text-muted)'} />
          <span>Lịch làm việc</span>
        </button>

        {/* Quản lý album */}
        <button
          onClick={() => onSelectTab('albums')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '13.5px',
            fontWeight: currentTab === 'albums' ? '600' : '400',
            color: currentTab === 'albums' ? '#fff' : 'var(--text-secondary)',
            backgroundColor: currentTab === 'albums' ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
            border: currentTab === 'albums' ? '1px solid rgba(139, 92, 246, 0.35)' : '1px solid transparent',
            cursor: 'pointer',
            textAlign: 'left',
            width: '100%'
          }}
        >
          <Images size={17} color={currentTab === 'albums' ? 'var(--primary)' : 'var(--text-muted)'} />
          <span>Quản lý album</span>
        </button>

        {/* Tài chính */}
        <button
          onClick={() => onSelectTab('finance')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '13.5px',
            fontWeight: currentTab === 'finance' ? '600' : '400',
            color: currentTab === 'finance' ? '#fff' : 'var(--text-secondary)',
            backgroundColor: currentTab === 'finance' ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
            border: currentTab === 'finance' ? '1px solid rgba(139, 92, 246, 0.35)' : '1px solid transparent',
            cursor: 'pointer',
            textAlign: 'left',
            width: '100%'
          }}
        >
          <DollarSign size={17} color={currentTab === 'finance' ? 'var(--primary)' : 'var(--text-muted)'} />
          <span>Tài chính</span>
        </button>

        {/* Lương Submenu */}
        <div style={{ marginTop: '4px' }}>
          <button
            onClick={() => setPayrollOpen(!payrollOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '13.5px',
              color: ['payroll', 'payroll_pending', 'payroll_settings'].includes(currentTab) ? '#fff' : 'var(--text-secondary)',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Coins size={17} color={['payroll', 'payroll_pending', 'payroll_settings'].includes(currentTab) ? 'var(--primary)' : 'var(--text-muted)'} />
              <span style={{ fontWeight: ['payroll', 'payroll_pending', 'payroll_settings'].includes(currentTab) ? '600' : '400' }}>
                Lương
              </span>
            </div>
            {payrollOpen ? <ChevronDown size={14} color="var(--text-muted)" /> : <ChevronRight size={14} color="var(--text-muted)" />}
          </button>

          {payrollOpen && (
            <div style={{ paddingLeft: '28px', marginTop: '2px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <button
                onClick={() => onSelectTab('payroll')}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: currentTab === 'payroll' ? '600' : '400',
                  color: currentTab === 'payroll' ? '#fff' : 'var(--text-muted)',
                  backgroundColor: currentTab === 'payroll' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                Kỳ lương
              </button>

              <button
                onClick={() => onSelectTab('payroll_pending')}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: currentTab === 'payroll_pending' ? '600' : '400',
                  color: currentTab === 'payroll_pending' ? '#fff' : 'var(--text-muted)',
                  backgroundColor: currentTab === 'payroll_pending' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                Cần xử lý
              </button>

              <button
                onClick={() => onSelectTab('payroll_settings')}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: currentTab === 'payroll_settings' ? '600' : '400',
                  color: currentTab === 'payroll_settings' ? '#fff' : 'var(--text-muted)',
                  backgroundColor: currentTab === 'payroll_settings' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                Cài đặt lương
              </button>
            </div>
          )}
        </div>

        {/* Cài đặt */}
        <button
          onClick={() => onSelectTab('settings')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '13.5px',
            fontWeight: currentTab === 'settings' ? '600' : '400',
            color: currentTab === 'settings' ? '#fff' : 'var(--text-secondary)',
            backgroundColor: currentTab === 'settings' ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
            border: currentTab === 'settings' ? '1px solid rgba(139, 92, 246, 0.35)' : '1px solid transparent',
            cursor: 'pointer',
            textAlign: 'left',
            width: '100%'
          }}
        >
          <Settings size={17} color={currentTab === 'settings' ? 'var(--primary)' : 'var(--text-muted)'} />
          <span>Cài đặt</span>
        </button>
      </div>

      {/* Sidebar Footer Links */}
      <div style={{
        padding: '14px 16px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 10px',
          borderRadius: '6px',
          color: 'var(--text-dim)',
          fontSize: '12.5px',
          cursor: 'pointer',
          transition: 'color 0.15s ease'
        }}>
          <Share2 size={15} />
          <span>Tiếp thị liên kết</span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 10px',
          borderRadius: '6px',
          color: 'var(--text-dim)',
          fontSize: '12.5px',
          cursor: 'pointer',
          transition: 'color 0.15s ease'
        }}>
          <Headphones size={15} />
          <span>Liên hệ hỗ trợ</span>
        </div>
      </div>
    </aside>
  );
};
