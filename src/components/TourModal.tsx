'use client';

import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Camera, Calendar, Images, DollarSign, Coins, Settings, LayoutDashboard } from 'lucide-react';

interface TourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TourModal: React.FC<TourModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      stepNum: '01 / 07',
      tag: 'GIỚI THIỆU',
      title: 'Chào mừng đến Framevis',
      description: 'Cùng đi một vòng 30 giây để nắm nhanh từng chức năng nhé!',
      points: [
        'Lịch hẹn, khách hàng, album ở thanh bên trái',
        'Tài chính và lương cho vận hành studio',
        'Bấm "Tiếp" để đi qua từng mục'
      ],
      icon: Camera
    },
    {
      stepNum: '02 / 07',
      tag: 'TÍNH NĂNG - 01',
      title: 'Dashboard',
      description: 'Trung tâm chỉ huy trực quan của toàn bộ studio.',
      points: [
        'Doanh thu và các chỉ số tài chính chủ chốt',
        'Lịch hẹn sắp tới và tiến độ các ca chụp',
        'Tổng quan hoạt động và hiệu suất studio'
      ],
      icon: LayoutDashboard
    },
    {
      stepNum: '03 / 07',
      tag: 'TÍNH NĂNG - 02',
      title: 'Lịch hẹn & Bảng phân công',
      description: 'Quản lý lịch chụp và phân công nhân sự chặt chẽ.',
      points: [
        'Tạo và quản lý toàn diện buổi chụp',
        'Phân công ekip cho từng buổi (Nhiếp ảnh, Makeup, Stylist)',
        'Theo dõi trạng thái: đặt -> chụp -> giao ảnh'
      ],
      icon: Calendar
    },
    {
      stepNum: '04 / 07',
      tag: 'TÍNH NĂNG - 03',
      title: 'Quản lý album & Khách chọn ảnh',
      description: 'Trải nghiệm chọn ảnh chuyên nghiệp cho khách hàng.',
      points: [
        'Tạo album trực tuyến sau buổi chụp',
        'Chia sẻ link cho khách chọn ảnh, lấy mã ảnh hậu kỳ',
        'Giao ảnh đã chỉnh sửa chất lượng cao'
      ],
      icon: Images
    },
    {
      stepNum: '05 / 07',
      tag: 'TÍNH NĂNG - 04',
      title: 'Tài chính & Thu chi',
      description: 'Báo cáo doanh thu, tiền cọc và công nợ minh bạch.',
      points: [
        'Theo dõi doanh thu thực tế và chi phí vận hành',
        'Theo dõi thanh toán và công nợ của khách hàng',
        'Quản lý dòng tiền studio minh bạch'
      ],
      icon: DollarSign
    },
    {
      stepNum: '06 / 07',
      tag: 'TÍNH NĂNG - 05',
      title: 'Lương & Tính khoán nhân sự',
      description: 'Tự động tính lương theo ca chụp và hoa hồng doanh số.',
      points: [
        'Chạy kỳ lương định kỳ theo tháng',
        'Tính thù lao, lương khoán cho từng nhân sự',
        'Cài đặt lương khoán, doanh số cho từng thành viên'
      ],
      icon: Coins
    },
    {
      stepNum: '07 / 07',
      tag: 'THIẾT LẬP',
      title: 'Cài đặt - thiết lập studio',
      description: 'Hoàn tất các bước thiết lập dưới đây để bắt đầu vận hành!',
      points: [
        'Cài đặt gói dịch vụ, phòng chụp, ca làm việc',
        'Mời thành viên & cấu hình phân quyền',
        'Cấu hình mẫu phiếu in xác nhận dịch vụ'
      ],
      icon: Settings
    }
  ];

  const current = steps[currentStep];
  const Icon = current.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '720px',
          background: '#15151c',
          border: '1px solid #2b2b38',
          borderRadius: '16px',
          overflow: 'hidden'
        }}
      >
        {/* Header Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {current.tag}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>•</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{current.stepNum}</span>
          </div>

          <button onClick={onClose} className="btn-ghost" style={{ padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Content Box */}
        <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '28px', alignItems: 'center' }}>
          {/* Visual Left Preview */}
          <div style={{
            height: '180px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.15) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '16px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'var(--primary-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 8px 20px rgba(139, 92, 246, 0.4)'
            }}>
              <Icon size={24} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff', textAlign: 'center' }}>
              {current.title}
            </span>
          </div>

          {/* Text Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
                {current.title}
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {current.description}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
              {current.points.map((pt, pIdx) => (
                <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: 'var(--text-primary)' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--status-green)',
                    marginTop: '2px',
                    flexShrink: 0
                  }}>
                    <Check size={10} strokeWidth={3} />
                  </div>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'rgba(0,0,0,0.2)'
        }}>
          <button
            onClick={onClose}
            className="btn-ghost"
            style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}
          >
            Bỏ qua
          </button>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {steps.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentStep(idx)}
                style={{
                  width: idx === currentStep ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '9999px',
                  background: idx === currentStep ? 'var(--primary)' : 'rgba(255,255,255,0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {currentStep > 0 && (
              <button onClick={handlePrev} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12.5px' }}>
                <ChevronLeft size={14} />
                <span>Lùi</span>
              </button>
            )}
            <button onClick={handleNext} className="btn-primary" style={{ padding: '6px 14px', fontSize: '12.5px' }}>
              <span>{currentStep === steps.length - 1 ? 'Bắt đầu sử dụng' : 'Tiếp'}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
