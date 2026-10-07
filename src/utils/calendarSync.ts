import { Booking } from '../types';

/**
 * Request notification permission and send a device notification
 */
export async function requestAndSendDeviceNotification(title: string, body: string): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    alert('Trình duyệt của bạn không hỗ trợ tính năng Web Notification.');
    return false;
  }

  let permission = Notification.permission;
  if (permission === 'default') {
    permission = await Notification.requestPermission();
  }

  if (permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'framevis-schedule'
      });
      return true;
    } catch (e) {
      console.error('Failed to trigger notification', e);
      return false;
    }
  } else {
    alert('Bạn đã chặn thông báo. Vui lòng bật lại thông báo trên trình duyệt (góc trên thanh địa chỉ) để nhận cảnh báo về máy.');
    return false;
  }
}

/**
 * Generate Google Calendar URL for an appointment
 */
export function getGoogleCalendarUrl(booking: Booking): string {
  const title = encodeURIComponent(`[Studio] Buổi chụp: ${booking.customerName} (${booking.service})`);
  const details = encodeURIComponent(
    `Khách hàng: ${booking.customerName}\nSố điện thoại: ${booking.customerPhone}\nDịch vụ: ${booking.service}\nNhân sự phụ trách: ${booking.staffName}\nĐịa điểm: ${booking.location}\nGhi chú: ${booking.notes || 'Không có'}`
  );
  const location = encodeURIComponent(booking.location || 'Studio');

  // Convert shootDate (DD/MM/YYYY) and shootTime (HH:mm - HH:mm) into ISO format YYYYMMDDTHHmmSS
  const parts = booking.shootDate.split('/');
  const day = parts[0]?.padStart(2, '0') || '07';
  const month = parts[1]?.padStart(2, '0') || '10';
  const year = parts[2] || '2026';

  let startHour = '090000';
  let endHour = '120000';

  if (booking.shootTime.includes('-')) {
    const timeParts = booking.shootTime.split('-');
    const startStr = timeParts[0]?.trim().replace(':', '') || '0900';
    const endStr = timeParts[1]?.trim().replace(':', '') || '1200';
    startHour = `${startStr.padEnd(4, '0')}00`;
    endHour = `${endStr.padEnd(4, '0')}00`;
  }

  const startDate = `${year}${month}${day}T${startHour}`;
  const endDate = `${year}${month}${day}T${endHour}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
}

/**
 * Generate .ics calendar file download (Apple Calendar, Google Calendar, Outlook)
 */
export function downloadIcsFile(booking: Booking) {
  const parts = booking.shootDate.split('/');
  const day = parts[0]?.padStart(2, '0') || '07';
  const month = parts[1]?.padStart(2, '0') || '10';
  const year = parts[2] || '2026';

  const dtStart = `${year}${month}${day}T090000`;
  const dtEnd = `${year}${month}${day}T120000`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Framevis Studio//VN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `SUMMARY:[Studio] Buổi chụp: ${booking.customerName}`,
    `DESCRIPTION:${booking.service} - Khách: ${booking.customerName} (${booking.customerPhone})`,
    `LOCATION:${booking.location}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Nhắc lịch chụp studio sắp diễn ra',
    'TRIGGER:-PT30M',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `lich-chup-${booking.bookingCode}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
