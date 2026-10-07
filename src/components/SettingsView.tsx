'use client';

import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Building, 
  Sparkles, 
  FileCheck, 
  Camera, 
  Clock, 
  Package, 
  ShieldCheck, 
  Users, 
  FileSpreadsheet, 
  Activity,
  Save,
  Check
} from 'lucide-react';
import { WorkspaceConfig } from '../types';

interface SettingsViewProps {
  workspace: WorkspaceConfig;
  onUpdateWorkspace: (updated: WorkspaceConfig) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  workspace,
  onUpdateWorkspace
}) => {
  const [activeSubTab, setActiveSubTab] = useState('account');
  const [studioName, setStudioName] = useState(workspace.name);
  const [branchName, setBranchName] = useState(workspace.branch);
  const [phone, setPhone] = useState('0901 234 567');
  const [address, setAddress] = useState('143 Lý Chính Thắng, Phường Võ Thị Sáu, Quận 3, TP.HCM / Hà Tĩnh');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onUpdateWorkspace({
      ...workspace,
      name: studioName,
      branch: branchName
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const navItems = [
    { section: 'CÁ NHÂN', items: [
      { key: 'account', label: 'Tài khoản', icon: User },
      { key: 'google_calendar', label: 'Google Calendar', icon: Calendar },
    ]},
    { section: 'CHUNG', items: [
      { key: 'workspace', label: 'Workspace', icon: Building },
      { key: 'brand', label: 'Thương hiệu', icon: Sparkles },
      { key: 'slip_settings', label: 'Phiếu xác nhận', icon: FileCheck },
    ]},
    { section: 'STUDIO', items: [
      { key: 'rooms', label: 'Phòng chụp', icon: Camera },
      { key: 'shifts', label: 'Ca làm việc', icon: Clock },
      { key: 'packages', label: 'Gói dịch vụ', icon: Package },
    ]},
    { section: 'NHÂN SỰ', items: [
      { key: 'roles', label: 'Vai trò & quyền', icon: ShieldCheck },
      { key: 'members', label: 'Thành viên', icon: Users },
    ]},
    { section: 'TÍCH HỢP', items: [
      { key: 'google_sheets', label: 'Google Sheets', icon: FileSpreadsheet },
      { key: 'activity_log', label: 'Nhật ký hoạt động', icon: Activity },
    ]}
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff' }}>Cài đặt hệ thống</h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
          Quản lý tài khoản, thương hiệu studio, mẫu phiếu xác nhận và kết nối tích hợp.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px', alignItems: 'flex-start' }}>
        {/* Left Subnav (Matching video 01:50) */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {navItems.map((group, gIdx) => (
            <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 600, padding: '4px 10px', letterSpacing: '0.05em' }}>
                {group.section}
              </div>
              {group.items.map(item => {
                const Icon = item.icon;
                const isActive = activeSubTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveSubTab(item.key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? '#fff' : 'var(--text-secondary)',
                      background: isActive ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                      border: isActive ? '1px solid rgba(139, 92, 246, 0.35)' : '1px solid transparent',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <Icon size={15} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Right Settings Form Container */}
        <div className="card-dark" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Sub Tab: Account (Matching video 01:50) */}
          {activeSubTab === 'account' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>Thông tin tài khoản</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Thông tin cá nhân hiển thị trên toàn bộ hệ thống Framevis Studio.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Email đăng nhập</label>
                  <input disabled value={workspace.ownerEmail} className="input-dark" style={{ opacity: 0.7, background: '#101015' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Tên hiển thị</label>
                  <input value={studioName} onChange={e => setStudioName(e.target.value)} className="input-dark" />
                </div>
                <div>
                  <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Số điện thoại</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} className="input-dark" />
                </div>
              </div>
            </div>
          )}

          {/* Sub Tab: Google Calendar (Matching video 01:54) */}
          {activeSubTab === 'google_calendar' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>Kết nối Google Calendar</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Đồng bộ lịch hẹn của bạn sang Google Calendar cá nhân để nhận thông báo trên điện thoại.
                </p>
              </div>

              <div style={{
                background: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                borderRadius: '10px',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '14px' }}>Đồng bộ lịch hai chiều</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '12.5px', marginTop: '4px' }}>
                    Tự động tạo sự kiện lịch khi có lịch hẹn mới được xác nhận.
                  </div>
                </div>
                <button className="btn-primary" onClick={() => alert('Đã kết nối với Google Calendar!')}>
                  Kết nối Google
                </button>
              </div>
            </div>
          )}

          {/* Sub Tab: Slip Settings (Matching video 02:11) */}
          {activeSubTab === 'slip_settings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>Cấu hình mẫu phiếu xác nhận</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Tùy chỉnh thông tin studio, màu sắc và điều khoản in trên phiếu gửi khách hàng.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Tên Studio trên phiếu</label>
                  <input value={studioName} onChange={e => setStudioName(e.target.value)} className="input-dark" />
                </div>
                <div>
                  <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Địa chỉ Studio</label>
                  <input value={address} onChange={e => setAddress(e.target.value)} className="input-dark" />
                </div>
                <div>
                  <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Màu sắc thương hiệu chủ đạo</label>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                    {['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'].map(c => (
                      <div
                        key={c}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: c,
                          cursor: 'pointer',
                          border: workspace.primaryColor === c ? '2px solid #fff' : '2px solid transparent'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fallback for other sub tabs */}
          {['workspace', 'brand', 'rooms', 'shifts', 'packages', 'roles', 'members', 'google_sheets', 'activity_log'].includes(activeSubTab) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>
                Cấu hình {navItems.flatMap(g => g.items).find(i => i.key === activeSubTab)?.label}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Tất cả các mục đã được thiết lập sẵn mặc định và sẵn sàng đồng bộ dữ liệu.
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <button onClick={handleSave} className="btn-primary">
              {isSaved ? <Check size={16} /> : <Save size={16} />}
              <span>{isSaved ? 'Đã lưu thay đổi' : 'Lưu cài đặt'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
