'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, DollarSign, Camera, User, Phone, MapPin } from 'lucide-react';
import { Booking, Staff } from '../types';

interface CreateBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBooking: (booking: Booking) => void;
  staffList: Staff[];
}

export const CreateBookingModal: React.FC<CreateBookingModalProps> = ({
  isOpen,
  onClose,
  onAddBooking,
  staffList
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [service, setService] = useState('Gói Cưới Ngoại Cảnh Premium');
  const [staffName, setStaffName] = useState(staffList[0]?.name || 'Trần Minh Anh');
  const [shootDate, setShootDate] = useState('08/10/2026');
  const [shootTime, setShootTime] = useState('09:00 - 11:30');
  const [location, setLocation] = useState('Studio Phòng 1');
  const [totalAmount, setTotalAmount] = useState('8500000');
  const [depositAmount, setDepositAmount] = useState('3000000');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const newBooking: Booking = {
      id: `b_${Date.now()}`,
      bookingCode: `BK-2026-${Math.floor(100 + Math.random() * 900)}`,
      customerName,
      customerPhone,
      service,
      staffName,
      creator: 'buonmethuatngaybuon@gmail.com',
      shootDate,
      shootTime,
      location,
      totalAmount: parseInt(totalAmount) || 0,
      depositAmount: parseInt(depositAmount) || 0,
      paidAmount: parseInt(depositAmount) || 0,
      status: 'cho_xac_nhan',
      createdAt: '07/10/2026',
      notes
    };

    onAddBooking(newBooking);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#fff' }}>+ Thêm lịch hẹn mới</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Tạo buổi chụp và tự động sinh hợp đồng dịch vụ cho khách hàng.
            </p>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Customer info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Họ và tên khách hàng *
              </label>
              <input
                required
                type="text"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                placeholder="VD: Nguyễn Mai Lan"
                className="input-dark"
              />
            </div>
            <div>
              <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Số điện thoại *
              </label>
              <input
                required
                type="text"
                value={customerPhone}
                onChange={e => setCustomerPhone(e.target.value)}
                placeholder="VD: 0912345678"
                className="input-dark"
              />
            </div>
          </div>

          {/* Service & Staff */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Gói dịch vụ chụp
              </label>
              <select value={service} onChange={e => setService(e.target.value)} className="input-dark">
                <option value="Gói Cưới Ngoại Cảnh Premium">Gói Cưới Ngoại Cảnh Premium</option>
                <option value="Gói Chân Dung Doanh Nhân & Profile">Gói Chân Dung Doanh Nhân & Profile</option>
                <option value="Gói Lookbook Thời Trang Thu Đông">Gói Lookbook Thời Trang Thu Đông</option>
                <option value="Gói Gia Đình Kỷ Niệm 10 Năm">Gói Gia Đình Kỷ Niệm 10 Năm</option>
                <option value="Gói Beauty Makeup & Nàng Thơ">Gói Beauty Makeup & Nàng Thơ</option>
                <option value="Gói Bé Yêu & Thôi Nôi">Gói Bé Yêu & Thôi Nôi</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Nhiếp ảnh phụ trách
              </label>
              <select value={staffName} onChange={e => setStaffName(e.target.value)} className="input-dark">
                {staffList.map(st => (
                  <option key={st.id} value={st.name}>{st.name} ({st.role})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date, Time & Location */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Ngày chụp
              </label>
              <input type="text" value={shootDate} onChange={e => setShootDate(e.target.value)} className="input-dark" />
            </div>
            <div>
              <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Khung giờ
              </label>
              <input type="text" value={shootTime} onChange={e => setShootTime(e.target.value)} className="input-dark" />
            </div>
            <div>
              <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Địa điểm / Phòng
              </label>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="input-dark" />
            </div>
          </div>

          {/* Payment */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Tổng chi phí (VNĐ)
              </label>
              <input type="number" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} className="input-dark" />
            </div>
            <div>
              <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Tiền đặt cọc trước (VNĐ)
              </label>
              <input type="number" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} className="input-dark" />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Ghi chú thêm về buổi chụp
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Yêu cầu tone màu, trang phục, phụ kiện..."
              className="input-dark"
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Hủy
            </button>
            <button type="submit" className="btn-primary">
              Tạo lịch hẹn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
