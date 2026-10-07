'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Bell, 
  Plus, 
  ChevronDown, 
  User, 
  Sparkles,
  HelpCircle,
  LogOut,
  ExternalLink
} from 'lucide-react';
import { WorkspaceConfig } from '../types';

interface HeaderProps {
  workspace: WorkspaceConfig;
  onOpenCreateBooking: () => void;
  onOpenTour: () => void;
  onOpenOnboarding: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  workspace,
  onOpenCreateBooking,
  onOpenTour,
  onOpenOnboarding
}) => {
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header style={{
      height: '64px',
      backgroundColor: 'var(--bg-header)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }}>
      {/* Left: Workspace & Branch selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Workspace Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-color)',
              padding: '6px 12px',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '13.5px',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            <Building2 size={16} color="var(--primary)" />
            <span>{workspace.name}</span>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>

          {showWorkspaceMenu && (
            <div style={{
              position: 'absolute',
              top: '110%',
              left: 0,
              width: '240px',
              background: '#16161e',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              padding: '6px',
              zIndex: 50
            }}>
              <div style={{ padding: '8px 10px', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Không gian làm việc
              </div>
              <div style={{
                padding: '8px 10px',
                borderRadius: '6px',
                background: 'rgba(139, 92, 246, 0.15)',
                color: '#fff',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span>{workspace.name}</span>
                <span style={{ fontSize: '11px', color: 'var(--primary)' }}>Hiện tại</span>
              </div>
              <button
                onClick={() => {
                  setShowWorkspaceMenu(false);
                  onOpenOnboarding();
                }}
                style={{
                  width: '100%',
                  marginTop: '4px',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  background: 'transparent',
                  border: '1px dashed var(--border-color)',
                  color: 'var(--text-secondary)',
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  justifyContent: 'center'
                }}
              >
                <Plus size={14} /> Tạo workspace mới
              </button>
            </div>
          )}
        </div>

        {/* Branch Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-secondary)',
          fontSize: '13px',
          padding: '6px 10px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)'
        }}>
          <MapPin size={15} color="#a78bfa" />
          <span>{workspace.branch}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Tour Guide Button */}
        <button
          onClick={onOpenTour}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            color: '#c084fc',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '12.5px',
            fontWeight: 500,
            cursor: 'pointer'
          }}
          title="Xem lại hướng dẫn nhanh"
        >
          <Sparkles size={14} />
          <span>Xem hướng dẫn</span>
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              position: 'relative',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Bell size={17} />
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ec4899',
              boxShadow: '0 0 6px #ec4899'
            }} />
          </button>

          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '115%',
              right: 0,
              width: '320px',
              background: '#16161e',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
              padding: '12px',
              zIndex: 50
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Thông báo mới</span>
                <span style={{ fontSize: '11px', color: 'var(--primary)', cursor: 'pointer' }}>Đã đọc hết</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ padding: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', fontSize: '12px' }}>
                  <div style={{ color: '#fff', fontWeight: 500 }}>Lịch hẹn mới: BK-2026-003</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '2px' }}>Khách Trịnh Bảo Ngọc - Lookbook Thu Đông</div>
                </div>
                <div style={{ padding: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', fontSize: '12px' }}>
                  <div style={{ color: '#fff', fontWeight: 500 }}>Sắp đến giờ chụp</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '2px' }}>Vũ Đức Thành & Mai Linh (08:30 - 12:00)</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Button: + Thêm lịch hẹn */}
        <button
          onClick={onOpenCreateBooking}
          className="btn-primary"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Thêm lịch hẹn</span>
        </button>

        {/* User Profile */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              border: '2px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            T
          </button>

          {showUserMenu && (
            <div style={{
              position: 'absolute',
              top: '115%',
              right: 0,
              width: '260px',
              background: '#16161e',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
              padding: '12px',
              zIndex: 50
            }}>
              <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px', marginBottom: '8px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{workspace.name}</div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>{workspace.ownerEmail}</div>
              </div>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onOpenTour();
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  padding: '8px',
                  borderRadius: '6px',
                  fontSize: '12.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <HelpCircle size={15} />
                <span>Xem lại hướng dẫn</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
