export type BookingStatus = 
  | 'cho_xac_nhan' 
  | 'da_xac_nhan' 
  | 'dang_chup' 
  | 'dang_chon_anh' 
  | 'dang_retouch' 
  | 'hoan_thanh' 
  | 'huy';

export interface Booking {
  id: string;
  bookingCode: string;
  customerName: string;
  customerPhone: string;
  service: string;
  staffName: string;
  creator: string;
  shootDate: string;
  shootTime: string;
  location: string;
  totalAmount: number;
  depositAmount: number;
  paidAmount: number;
  status: BookingStatus;
  createdAt: string;
  notes: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  albumLink?: string;
  totalBookings: number;
  totalSpent: number;
  lastBookingDate: string;
  type: 'vip' | 'than_thiet' | 'moi';
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  branch: string;
  phone: string;
  email: string;
  baseSalary: number;
  commissionRate: number;
  avatar?: string;
}

export interface ShiftSchedule {
  id: string;
  staffId: string;
  staffName: string;
  date: string;
  shift: 'sang' | 'chieu' | 'toi' | 'nghi' | 'truc';
}

export interface Album {
  id: string;
  bookingId: string;
  customerName: string;
  service: string;
  totalPhotos: number;
  selectedPhotos: number;
  retouchedPhotos: number;
  deadlineDate: string;
  shareLink: string;
  status: 'cho_khach_chon' | 'dang_retouch' | 'da_giao';
}

export interface ConfirmationSlip {
  id: string;
  slipCode: string;
  bookingCode: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  studioName: string;
  studioPhone: string;
  studioAddress: string;
  services: {
    name: string;
    description: string;
    price: number;
    quantity: number;
    total: number;
  }[];
  totalAmount: number;
  depositAmount: number;
  remainingAmount: number;
  paymentMethod: string;
  terms: string[];
  notes: string;
  signPerson: string;
  signRole: string;
  status: 'nhap' | 'cho_xac_nhan' | 'da_xac_nhan' | 'thu_hoi';
  createdAt: string;
}

export interface WorkspaceConfig {
  id: string;
  name: string;
  branch: string;
  logoUrl?: string;
  ownerEmail: string;
  primaryColor: string;
}
