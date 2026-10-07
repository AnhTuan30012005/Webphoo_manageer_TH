'use client';

import React, { useState } from 'react';
import { Clock, Calendar as CalendarIcon, User, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Staff } from '../types';

interface WorkScheduleViewProps {
  staffList: Staff[];
}

export const WorkScheduleView: React.FC<WorkScheduleViewProps> = ({ staffList }) => {
  const daysOfWeek = ['Thứ 2 (05/10)', 'Thứ 3 (06/10)', 'Thứ 4 (07/10)', 'Thứ 5 (08/10)', 'Thứ 6 (09/10)', 'Thứ 7 (10/10)', 'CN (11/10)'];

  const shiftColors = {
    sang: { label: 'Ca Sáng (08:00 - 12:00)', bg: 'rgba(56, 189, 248, 0.15)', text: '#38bdf8', border: 'rgba(56, 189, 248, 0.3)' },
    chieu: { label: 'Ca Chiều (13:30 - 17:30)', bg: 'rgba(139, 92, 246, 0.15)', text: '#c084fc', border: 'rgba(139, 92, 246, 0.3)' },
    toi: { label: 'Ca Tối (18:00 - 21:00)', bg: 'rgba(236, 72, 153, 0.15)', text: '#f472b6', border: 'rgba(236, 72, 153, 0.3)' },
    nghi: { label: 'Nghỉ phép', bg: 'rgba(107, 114, 128, 0.15)', text: '#9ca3af', border: 'rgba(107, 114, 128, 0.2)' },
    truc: { label: 'Trực studio', bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', border: 'rgba(16, 185, 129, 0.3)' }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff' }}>Lịch làm việc</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Phân ca làm việc và lịch trực của đội ngũ studio trong tuần.
          </p>
        </div>

        <button className="btn-primary" onClick={() => alert('Đã lưu lịch làm việc')}>
          <Plus size={16} strokeWidth={2.5} />
          <span>Thêm ca làm việc</span>
        </button>
      </div>

      {/* Week Selector Bar */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: '#fff', cursor: 'pointer' }}>
            <ChevronLeft size={16} />
          </button>
          <button style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: '#fff', cursor: 'pointer' }}>
            <ChevronRight size={16} />
          </button>
          <span style={{ fontSize: '14.5px', fontWeight: 600, color: '#fff' }}>Tuần 41 (05/10/2026 - 11/10/2026)</span>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8' }}><span className="dot" /> Sáng</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#c084fc' }}><span className="dot" /> Chiều</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f472b6' }}><span className="dot" /> Tối</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399' }}><span className="dot" /> Trực</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af' }}><span className="dot" /> Nghỉ</span>
        </div>
      </div>

      {/* Schedule Grid */}
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
                <th style={{ minWidth: '180px' }}>NHÂN SỰ</th>
                {daysOfWeek.map((day, idx) => (
                  <th key={idx} style={{ textAlign: 'center', minWidth: '120px' }}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff, sIdx) => (
                <tr key={staff.id}>
                  <td>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 600 }}>{staff.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '11.5px' }}>{staff.role}</div>
                    </div>
                  </td>
                  {daysOfWeek.map((_, dIdx) => {
                    const shiftType = (sIdx + dIdx) % 5 === 0 ? 'sang' : (sIdx + dIdx) % 5 === 1 ? 'chieu' : (sIdx + dIdx) % 5 === 2 ? 'toi' : (sIdx + dIdx) % 5 === 3 ? 'truc' : 'nghi';
                    const shiftInfo = shiftColors[shiftType];

                    return (
                      <td key={dIdx} style={{ textAlign: 'center', padding: '8px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          background: shiftInfo.bg,
                          color: shiftInfo.text,
                          border: `1px solid ${shiftInfo.border}`,
                          fontSize: '11px',
                          fontWeight: 600,
                          width: '100%'
                        }}>
                          {shiftType.toUpperCase()}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
