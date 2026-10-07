import { Booking, Customer, Staff, Album, ConfirmationSlip, WorkspaceConfig } from '../types';

export const initialWorkspace: WorkspaceConfig = {
  id: 'ws_1',
  name: 'Tơi Ten Hoa Studio',
  branch: 'Hà Tĩnh',
  ownerEmail: 'buonmethuatngaybuon@gmail.com',
  primaryColor: '#8b5cf6',
};

export const sampleStaff: Staff[] = [
  { id: 'st_1', name: 'Trần Minh Anh', role: 'Nhiếp ảnh chính', branch: 'Hà Tĩnh', phone: '0901234567', email: 'minhanh@studio.vn', baseSalary: 12000000, commissionRate: 15 },
  { id: 'st_2', name: 'Lê Hoàng Nam', role: 'Retoucher / Hậu kỳ', branch: 'Hà Tĩnh', phone: '0902345678', email: 'hoangnam@studio.vn', baseSalary: 10000000, commissionRate: 10 },
  { id: 'st_3', name: 'Nguyễn Thu Trang', role: 'Makeup & Stylist', branch: 'Hà Tĩnh', phone: '0903456789', email: 'thutrang@studio.vn', baseSalary: 9000000, commissionRate: 10 },
  { id: 'st_4', name: 'Phạm Tuấn Khang', role: 'Quản lý Studio', branch: 'Hà Tĩnh', phone: '0904567890', email: 'tuankhang@studio.vn', baseSalary: 15000000, commissionRate: 5 },
];

export const sampleCustomers: Customer[] = [
  { id: 'c_1', name: 'Nguyễn Thị Phương Thảo', phone: '0912345678', email: 'thao.nguyen@gmail.com', source: 'Facebook Ads', totalBookings: 3, totalSpent: 18500000, lastBookingDate: '05/10/2026', type: 'vip', albumLink: 'https://studio.framevis.com/album/thao-nguyen' },
  { id: 'c_2', name: 'Vũ Đức Thành & Mai Linh', phone: '0988776655', email: 'thanh.mai@gmail.com', source: 'Người quen giới thiệu', totalBookings: 2, totalSpent: 26000000, lastBookingDate: '02/10/2026', type: 'vip', albumLink: 'https://studio.framevis.com/album/wedding-thanh-mai' },
  { id: 'c_3', name: 'Trịnh Bảo Ngọc', phone: '0977665544', email: 'baongoc@gmail.com', source: 'TikTok', totalBookings: 1, totalSpent: 4500000, lastBookingDate: '07/10/2026', type: 'moi', albumLink: 'https://studio.framevis.com/album/portrait-baongoc' },
  { id: 'c_4', name: 'Đặng Tuấn Hưng', phone: '0933221100', email: 'tuanhung@gmail.com', source: 'Google Search', totalBookings: 2, totalSpent: 8200000, lastBookingDate: '28/09/2026', type: 'than_thiet' },
  { id: 'c_5', name: 'Phan Minh Tuyết', phone: '0966554433', email: 'tuyetphan@gmail.com', source: 'Instagram', totalBookings: 1, totalSpent: 3800000, lastBookingDate: '04/10/2026', type: 'moi' },
];

export const sampleBookings: Booking[] = [
  {
    id: 'b_1',
    bookingCode: 'BK-2026-001',
    customerName: 'Vũ Đức Thành & Mai Linh',
    customerPhone: '0988776655',
    service: 'Gói Cưới Ngoại Cảnh Premium',
    staffName: 'Trần Minh Anh',
    creator: 'buonmethuatngaybuon@gmail.com',
    shootDate: '07/10/2026',
    shootTime: '08:30 - 12:00',
    location: 'Studio Phòng 1 & Ngoại cảnh đồi thông',
    totalAmount: 15000000,
    depositAmount: 5000000,
    paidAmount: 5000000,
    status: 'dang_chup',
    createdAt: '01/10/2026',
    notes: 'Khách yêu cầu thêm tone màu cinematic ấm cúng, váy cưới dòng Luxury.'
  },
  {
    id: 'b_2',
    bookingCode: 'BK-2026-002',
    customerName: 'Nguyễn Thị Phương Thảo',
    customerPhone: '0912345678',
    service: 'Gói Chân Dung Doanh Nhân & Profile',
    staffName: 'Lê Hoàng Nam',
    creator: 'buonmethuatngaybuon@gmail.com',
    shootDate: '07/10/2026',
    shootTime: '14:00 - 16:30',
    location: 'Studio Phòng 2 (Phông trơn)',
    totalAmount: 4800000,
    depositAmount: 2000000,
    paidAmount: 4800000,
    status: 'da_xac_nhan',
    createdAt: '03/10/2026',
    notes: 'Trang phục vest đen, phong cách Forbes quyền lực.'
  },
  {
    id: 'b_3',
    bookingCode: 'BK-2026-003',
    customerName: 'Trịnh Bảo Ngọc',
    customerPhone: '0977665544',
    service: 'Gói Lookbook Thời Trang Thu Đông',
    staffName: 'Trần Minh Anh',
    creator: 'buonmethuatngaybuon@gmail.com',
    shootDate: '08/10/2026',
    shootTime: '09:00 - 15:00',
    location: 'Studio Concept Vintage',
    totalAmount: 8500000,
    depositAmount: 3000000,
    paidAmount: 3000000,
    status: 'cho_xac_nhan',
    createdAt: '06/10/2026',
    notes: 'Cần chuẩn bị đèn kino và máy tạo khói nhẹ.'
  },
  {
    id: 'b_4',
    bookingCode: 'BK-2026-004',
    customerName: 'Đặng Tuấn Hưng',
    customerPhone: '0933221100',
    service: 'Gói Gia Đình Kỷ Niệm 10 Năm',
    staffName: 'Trần Minh Anh',
    creator: 'buonmethuatngaybuon@gmail.com',
    shootDate: '04/10/2026',
    shootTime: '09:30 - 11:30',
    location: 'Studio Phòng 1',
    totalAmount: 6200000,
    depositAmount: 2000000,
    paidAmount: 6200000,
    status: 'dang_retouch',
    createdAt: '28/09/2026',
    notes: 'Đã hoàn thành chụp, đang sửa da 25 ảnh xuất album.'
  },
  {
    id: 'b_5',
    bookingCode: 'BK-2026-005',
    customerName: 'Phan Minh Tuyết',
    customerPhone: '0966554433',
    service: 'Gói Beauty Makeup & Nàng Thơ',
    staffName: 'Nguyễn Thu Trang',
    creator: 'buonmethuatngaybuon@gmail.com',
    shootDate: '02/10/2026',
    shootTime: '15:00 - 17:30',
    location: 'Studio Phòng 2',
    totalAmount: 3800000,
    depositAmount: 1500000,
    paidAmount: 3800000,
    status: 'dang_chon_anh',
    createdAt: '29/09/2026',
    notes: 'Đã gửi link album cho khách chọn 15 ảnh ưng ý.'
  },
  {
    id: 'b_6',
    bookingCode: 'BK-2026-006',
    customerName: 'Hoàng Anh Tuấn',
    customerPhone: '0944112233',
    service: 'Gói Bé Yêu & Thôi Nôi',
    staffName: 'Lê Hoàng Nam',
    creator: 'buonmethuatngaybuon@gmail.com',
    shootDate: '25/09/2026',
    shootTime: '08:30 - 11:00',
    location: 'Studio Concept Pastel',
    totalAmount: 3500000,
    depositAmount: 1500000,
    paidAmount: 3500000,
    status: 'hoan_thanh',
    createdAt: '20/09/2026',
    notes: 'Đã in album và giao ảnh cổng tận nhà.'
  }
];

export const sampleAlbums: Album[] = [
  {
    id: 'alb_1',
    bookingId: 'b_1',
    customerName: 'Vũ Đức Thành & Mai Linh',
    service: 'Gói Cưới Ngoại Cảnh Premium',
    totalPhotos: 840,
    selectedPhotos: 45,
    retouchedPhotos: 12,
    deadlineDate: '15/10/2026',
    shareLink: 'https://studio.framevis.com/select/thanh-mai-wedding',
    status: 'dang_retouch'
  },
  {
    id: 'alb_2',
    bookingId: 'b_5',
    customerName: 'Phan Minh Tuyết',
    service: 'Gói Beauty Makeup & Nàng Thơ',
    totalPhotos: 220,
    selectedPhotos: 0,
    retouchedPhotos: 0,
    deadlineDate: '10/10/2026',
    shareLink: 'https://studio.framevis.com/select/tuyet-phan-beauty',
    status: 'cho_khach_chon'
  },
  {
    id: 'alb_3',
    bookingId: 'b_4',
    customerName: 'Đặng Tuấn Hưng',
    service: 'Gói Gia Đình Kỷ Niệm 10 Năm',
    totalPhotos: 350,
    selectedPhotos: 25,
    retouchedPhotos: 25,
    deadlineDate: '08/10/2026',
    shareLink: 'https://studio.framevis.com/select/tuan-hung-family',
    status: 'dang_retouch'
  }
];

export const sampleConfirmationSlips: ConfirmationSlip[] = [
  {
    id: 'slip_1',
    slipCode: 'HD-20260921-0001-PF',
    bookingCode: 'BK-2026-001',
    customerName: 'Vũ Đức Thành & Mai Linh',
    customerPhone: '0988776655',
    customerAddress: 'Số 45 đường Nguyễn Du, TP. Hà Tĩnh',
    studioName: 'Ánh Dương Studio - Hà Tĩnh',
    studioPhone: '0901 234 567',
    studioAddress: '143 Lý Chính Thắng, Phường Võ Thị Sáu, Quận 3, TP.HCM / Chi nhánh Hà Tĩnh',
    services: [
      { name: 'Gói chụp cưới Pre-wedding Luxury', description: 'Chụp ngoại cảnh và studio, váy cưới cao cấp', price: 12000000, quantity: 1, total: 12000000 },
      { name: 'Nâng cấp album Photobook 30x30 mở phẳng', description: 'Giấy mỹ thuật cán màng ngọc trai', price: 2000000, quantity: 1, total: 2000000 },
      { name: 'Ảnh cổng pha lê tráng gương 60x90', description: 'Khung gỗ sồi viền kim loại cao cấp', price: 1000000, quantity: 1, total: 1000000 }
    ],
    totalAmount: 15000000,
    depositAmount: 5000000,
    remainingAmount: 10000000,
    paymentMethod: 'Chuyển khoản Vietcombank',
    terms: [
      'Khách hàng đặt cọc tối thiểu 30% giá trị gói dịch vụ để giữ lịch chụp.',
      'Lịch chụp có thể dời tối đa 02 lần nếu thông báo trước ít nhất 48 giờ.',
      'Khách hàng hoàn tất thanh toán phần còn lại vào ngày thực hiện buổi chụp.',
      'File ảnh gốc chất lượng cao được lưu trữ trên server trong vòng 06 tháng.'
    ],
    notes: 'Phục vụ kèm xe đưa đón ngoại cảnh và hoa tươi cầm tay.',
    signPerson: 'Trần Minh Anh',
    signRole: 'Quản lý Studio',
    status: 'da_xac_nhan',
    createdAt: '21/09/2026'
  }
];
