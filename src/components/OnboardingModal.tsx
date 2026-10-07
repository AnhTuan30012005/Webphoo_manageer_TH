'use client';

import React, { useState } from 'react';
import { 
  Camera, 
  Calendar, 
  DollarSign, 
  Users, 
  Building2, 
  ArrowRight,
  Sparkles,
  MapPin,
  X
} from 'lucide-react';
import { WorkspaceConfig } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveWorkspace: (config: Partial<WorkspaceConfig>) => void;
  initialName?: string;
  initialBranch?: string;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onSaveWorkspace,
  initialName = 'Tơi Ten Hoa Studio',
  initialBranch = 'Hà Tĩnh'
}) => {
  const [name, setName] = useState(initialName);
  const [branch, setBranch] = useState(initialBranch);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    setLoading(true);
    setTimeout(() => {
      onSaveWorkspace({ name, branch });
      setLoading(false);
      onClose();
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '920px',
          background: '#13131a',
          border: '1px solid #282836',
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1.15fr',
          minHeight: '520px'
        }}
      >
        {/* Left Presentation Column (Matching video 00:00) */}
        <div style={{
          background: 'linear-gradient(145deg, #181528 0%, #111117 100%)',
          padding: '36px',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '24px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--primary-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <Camera size={18} />
              </div>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>framevis <span style={{ color: 'var(--primary)', fontSize: '12px' }}>studio</span></span>
            </div>

            <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              THIẾT LẬP STUDIO
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', marginTop: '8px', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
              Vận hành studio nhiếp ảnh, gọn trong một nơi.
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.5 }}>
              Không gian làm việc giúp bạn tập lịch hẹn, khách hàng, tài chính và đội ngũ của bạn.
            </p>

            {/* Highlights List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ padding: '6px', borderRadius: '6px', background: 'rgba(139, 92, 246, 0.2)', color: 'var(--primary)' }}>
                  <Calendar size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Lịch hẹn & khách hàng</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Theo dõi buổi chụp và lời khách</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ padding: '6px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--status-green)' }}>
                  <DollarSign size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Tài chính & doanh thu</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Thu chi, công nợ minh bạch</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ padding: '6px', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.2)', color: 'var(--status-cyan)' }}>
                  <Users size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Đội ngũ & phân quyền</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Quản lý nhân sự và tính lương</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ padding: '6px', borderRadius: '6px', background: 'rgba(236, 72, 153, 0.2)', color: '#ec4899' }}>
                  <Building2 size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Nhiều chi nhánh</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Quản lý tập trung mọi cơ sở</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column (Matching video 00:01) */}
        <div style={{
          padding: '36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            className="btn-ghost"
            style={{ position: 'absolute', top: '16px', right: '16px', padding: '6px' }}
          >
            <X size={18} />
          </button>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                • BẮT ĐẦU
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginTop: '4px' }}>
                Tạo không gian làm việc
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                Chào <strong style={{ color: '#fff' }}>buonmethuatngaybuon@gmail.com</strong>! Đặt tên và thêm chi nhánh đầu tiên — nơi mọi thứ của bạn sẽ ở đây.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Tên không gian làm việc:
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="VD: Ánh Dương Studio"
                  className="input-dark"
                  style={{ padding: '10px 14px', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Chi nhánh:
                </label>
                <input
                  required
                  type="text"
                  value={branch}
                  onChange={e => setBranch(e.target.value)}
                  placeholder="VD: Hà Tĩnh / TP. Hồ Chí Minh"
                  className="input-dark"
                  style={{ padding: '10px 14px', fontSize: '14px' }}
                />
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '11.5px',
              color: 'var(--text-muted)',
              lineHeight: 1.5
            }}>
              Tên không gian, tên chi nhánh và mọi thiết lập đều có thể chỉnh sửa sau trong <strong>Cài đặt -&gt; Workspace</strong>.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                fontWeight: 600,
                marginTop: '8px'
              }}
            >
              <span>{loading ? 'Đang tạo...' : 'Tạo và vào dashboard'}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
