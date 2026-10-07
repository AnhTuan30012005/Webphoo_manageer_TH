'use client';

import React from 'react';
import { Coins, CheckCircle, Clock, Calendar, Download, AlertCircle } from 'lucide-react';
import { Staff } from '../types';

interface PayrollViewProps {
  staffList: Staff[];
}

export const PayrollView: React.FC<PayrollViewProps> = ({ staffList }) => {
  const totalBase = staffList.reduce((acc, s) => acc + s.baseSalary, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff' }}>Kỳ lương • Tháng 10, 2026</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Lương khoán theo job của từng thành viên và lương office (công + % doanh thu/doanh số), tổng hợp theo kỳ.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={() => alert('Xuất bảng lương Excel')}>
            <Download size={15} />
            <span>Xuất Excel</span>
          </button>
          <button className="btn-primary" onClick={() => alert('Đã chốt kỳ lương Tháng 10/2026')}>
            <CheckCircle size={15} />
            <span>Chốt kỳ lương</span>
          </button>
        </div>
      </div>

      {/* 4 Payroll Metric Cards (Matching video 01:42) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tổng chi lương kỳ</span>
          <span style={{ fontSize: '26px', fontWeight: 700, color: '#fff' }}>
            {(totalBase + 6500000).toLocaleString('vi-VN')} đ
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>4 nhân sự</span>
        </div>

        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Khoán theo job</span>
          <span style={{ fontSize: '26px', fontWeight: 700, color: 'var(--primary)' }}>
            6.500.000 đ
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Hoa hồng chụp & retouch</span>
        </div>

        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Lương cứng (Office)</span>
          <span style={{ fontSize: '26px', fontWeight: 700, color: 'var(--status-cyan)' }}>
            {totalBase.toLocaleString('vi-VN')} đ
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Theo hợp đồng lao động</span>
        </div>

        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Cần xử lý</span>
          <span style={{ fontSize: '26px', fontWeight: 700, color: 'var(--status-green)' }}>
            0 dòng
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Đã đối soát đầy đủ</span>
        </div>
      </div>

      {/* Detailed Payroll Table */}
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
                <th>NHÂN SỰ</th>
                <th>VỊ TRÍ</th>
                <th>CÔNG</th>
                <th>KHOÁN JOB</th>
                <th>LƯƠNG CỨNG</th>
                <th>% DOANH THU</th>
                <th>THƯỞNG</th>
                <th>TỔNG NHẬN</th>
                <th>TRẠNG THÁI</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((st, idx) => {
                const jobBonus = idx === 0 ? 3500000 : idx === 1 ? 2000000 : 1000000;
                const total = st.baseSalary + jobBonus;

                return (
                  <tr key={st.id}>
                    <td>
                      <div>
                        <div style={{ color: '#fff', fontWeight: 600 }}>{st.name}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '11.5px' }}>{st.phone}</div>
                      </div>
                    </td>

                    <td>
                      <span style={{ color: 'var(--text-secondary)' }}>{st.role}</span>
                    </td>

                    <td>
                      <span style={{ color: '#fff', fontWeight: 600 }}>26 / 26</span>
                    </td>

                    <td>
                      <span style={{ color: 'var(--primary)', fontWeight: 600 }}>
                        {jobBonus.toLocaleString('vi-VN')} đ
                      </span>
                    </td>

                    <td>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {st.baseSalary.toLocaleString('vi-VN')} đ
                      </span>
                    </td>

                    <td>
                      <span style={{ color: 'var(--status-amber)' }}>{st.commissionRate}%</span>
                    </td>

                    <td>
                      <span style={{ color: 'var(--status-green)' }}>+500.000 đ</span>
                    </td>

                    <td>
                      <span style={{ color: 'var(--status-green)', fontWeight: 700, fontSize: '14px' }}>
                        {(total + 500000).toLocaleString('vi-VN')} đ
                      </span>
                    </td>

                    <td>
                      <span className="badge-status badge-da_xac_nhan">
                        <span className="dot" />
                        Đã sẵn sàng
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
