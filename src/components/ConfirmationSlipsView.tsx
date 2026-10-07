'use client';

import React, { useState } from 'react';
import { 
  FileCheck, 
  Plus, 
  Printer, 
  Download, 
  Share2, 
  CheckCircle, 
  Building, 
  Phone, 
  Mail, 
  Calendar,
  X
} from 'lucide-react';
import { ConfirmationSlip, Booking } from '../types';

interface ConfirmationSlipsViewProps {
  slips: ConfirmationSlip[];
  bookings: Booking[];
  onCreateSlipFromBooking: (bookingId: string) => void;
}

export const ConfirmationSlipsView: React.FC<ConfirmationSlipsViewProps> = ({
  slips,
  bookings,
  onCreateSlipFromBooking
}) => {
  const [selectedSlip, setSelectedSlip] = useState<ConfirmationSlip | null>(slips[0] || null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string>('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff' }}>Phiếu xác nhận dịch vụ</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Phiếu sẽ tự điền dịch vụ, lịch chụp và thanh toán sinh từ booking gửi khách dưới dạng ảnh hoặc PDF.
          </p>
        </div>

        <button 
          onClick={() => setShowCreateModal(true)} 
          className="btn-primary"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Tạo phiếu từ booking</span>
        </button>
      </div>

      {/* Main Slips Content: Left List & Right Document Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px', alignItems: 'flex-start' }}>
        {/* Left: Slips List */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
            Danh sách phiếu xác nhận ({slips.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {slips.map((slip) => (
              <div
                key={slip.id}
                onClick={() => setSelectedSlip(slip)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: selectedSlip?.id === slip.id ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  border: selectedSlip?.id === slip.id ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{slip.customerName}</span>
                  <span className={`badge-status badge-${slip.status}`} style={{ fontSize: '10.5px', padding: '1px 6px' }}>
                    {slip.status === 'da_xac_nhan' ? 'Đã xác nhận' : 'Nháp'}
                  </span>
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Mã: {slip.slipCode}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600, marginTop: '4px' }}>
                  {slip.totalAmount.toLocaleString('vi-VN')} đ
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Slip Document Preview (Matching video 02:12) */}
        {selectedSlip ? (
          <div style={{
            background: '#15151c',
            border: '1px solid var(--border-color)',
            borderRadius: '14px',
            padding: '32px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            {/* Top Slip Action Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '16px'
            }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Mã phiếu: <strong style={{ color: '#fff' }}>{selectedSlip.slipCode}</strong>
              </span>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => window.print()}
                  className="btn-secondary"
                  style={{ fontSize: '12.5px', padding: '6px 12px' }}
                >
                  <Printer size={14} />
                  <span>In phiếu</span>
                </button>
                <button
                  onClick={() => alert('Đang tải phiếu PDF...')}
                  className="btn-primary"
                  style={{ fontSize: '12.5px', padding: '6px 12px' }}
                >
                  <Download size={14} />
                  <span>Xuất PDF</span>
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div style={{
              background: '#0d0d12',
              border: '1px solid #2a2a38',
              borderRadius: '10px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              {/* Studio Info Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em' }}>
                    {selectedSlip.studioName}
                  </h2>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '400px', lineHeight: 1.5 }}>
                    {selectedSlip.studioAddress}
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Hotline: {selectedSlip.studioPhone}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    PHIẾU XÁC NHẬN DỊCH VỤ
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Ngày tạo: {selectedSlip.createdAt}
                  </div>
                </div>
              </div>

              {/* Customer Info Card */}
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '14px 18px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                fontSize: '13px'
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Khách hàng: </span>
                  <strong style={{ color: '#fff' }}>{selectedSlip.customerName}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Số điện thoại: </span>
                  <strong style={{ color: '#fff' }}>{selectedSlip.customerPhone}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Mã Booking: </span>
                  <strong style={{ color: 'var(--primary)' }}>{selectedSlip.bookingCode}</strong>
                </div>
              </div>

              {/* Services Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                    <th style={{ padding: '10px 0' }}>DỊCH VỤ & CHI TIẾT</th>
                    <th style={{ padding: '10px 0', textAlign: 'center' }}>SL</th>
                    <th style={{ padding: '10px 0', textAlign: 'right' }}>ĐƠN GIÁ</th>
                    <th style={{ padding: '10px 0', textAlign: 'right' }}>THÀNH TIỀN</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSlip.services.map((srv, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #1a1a24' }}>
                      <td style={{ padding: '12px 0' }}>
                        <div style={{ color: '#fff', fontWeight: 500 }}>{srv.name}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '11.5px', marginTop: '2px' }}>{srv.description}</div>
                      </td>
                      <td style={{ padding: '12px 0', textAlign: 'center', color: '#fff' }}>{srv.quantity}</td>
                      <td style={{ padding: '12px 0', textAlign: 'right', color: 'var(--text-secondary)' }}>
                        {srv.price.toLocaleString('vi-VN')} đ
                      </td>
                      <td style={{ padding: '12px 0', textAlign: 'right', color: '#fff', fontWeight: 600 }}>
                        {srv.total.toLocaleString('vi-VN')} đ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Payment Summary */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>Tổng tiền dịch vụ:</span>
                    <strong style={{ color: '#fff' }}>{selectedSlip.totalAmount.toLocaleString('vi-VN')} đ</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--status-green)' }}>
                    <span>Đã đặt cọc (Lần 1):</span>
                    <strong>- {selectedSlip.depositAmount.toLocaleString('vi-VN')} đ</strong>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '8px',
                    borderTop: '1px solid var(--border-color)',
                    fontSize: '14.5px',
                    color: 'var(--primary)',
                    fontWeight: 700
                  }}>
                    <span>Còn lại thanh toán:</span>
                    <span>{selectedSlip.remainingAmount.toLocaleString('vi-VN')} đ</span>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '8px',
                padding: '14px',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                lineHeight: 1.6
              }}>
                <div style={{ fontWeight: 600, color: '#fff', marginBottom: '6px' }}>ĐIỀU KHOẢN STUDIO:</div>
                <ul style={{ paddingLeft: '18px' }}>
                  {selectedSlip.terms.map((term, tIdx) => (
                    <li key={tIdx}>{term}</li>
                  ))}
                </ul>
              </div>

              {/* Signatures */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-subtle)',
                textAlign: 'center',
                fontSize: '13px'
              }}>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Xác nhận của khách hàng</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '2px' }}>(Ký và ghi rõ họ tên)</div>
                  <div style={{ marginTop: '50px', fontWeight: 600, color: '#fff' }}>{selectedSlip.customerName}</div>
                </div>

                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Đại diện {selectedSlip.studioName}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '2px' }}>{selectedSlip.signRole}</div>
                  <div style={{ marginTop: '50px', fontWeight: 600, color: 'var(--primary)' }}>{selectedSlip.signPerson}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Chọn một phiếu để xem chi tiết
          </div>
        )}
      </div>

      {/* Modal: Tạo phiếu từ Booking (Matching video 01:29) */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileCheck size={16} color="#fff" />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>Tạo phiếu từ booking</h3>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="btn-ghost" style={{ padding: '4px' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Phiếu sẽ tự điền dịch vụ, lịch chụp và các khoản đã thu từ booking thông tin studio và điều khoản lấy theo cấu hình sẵn có.
              </p>

              <div>
                <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
                  Chọn lịch hẹn / booking:
                </label>
                <select
                  value={selectedBookingId}
                  onChange={(e) => setSelectedBookingId(e.target.value)}
                  className="input-dark"
                  style={{ padding: '10px' }}
                >
                  <option value="">-- Chọn một booking --</option>
                  {bookings.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.bookingCode} - {b.customerName} ({b.service})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button onClick={() => setShowCreateModal(false)} className="btn-secondary">
                  Hủy
                </button>
                <button
                  disabled={!selectedBookingId}
                  onClick={() => {
                    onCreateSlipFromBooking(selectedBookingId);
                    setShowCreateModal(false);
                  }}
                  className="btn-primary"
                  style={{ opacity: selectedBookingId ? 1 : 0.5 }}
                >
                  Tiếp tục tạo phiếu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
