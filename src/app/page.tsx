'use client';

import React, { useState } from 'react';
import { Sidebar, NavigationTab } from '../components/Sidebar';
import { Header } from '../components/Header';
import { DashboardView } from '../components/DashboardView';
import { BookingsView } from '../components/BookingsView';
import { ScheduleTimelineView } from '../components/ScheduleTimelineView';
import { ConfirmationSlipsView } from '../components/ConfirmationSlipsView';
import { CustomersView } from '../components/CustomersView';
import { WorkScheduleView } from '../components/WorkScheduleView';
import { AlbumsView } from '../components/AlbumsView';
import { FinanceView } from '../components/FinanceView';
import { PayrollView } from '../components/PayrollView';
import { SettingsView } from '../components/SettingsView';
import { CreateBookingModal } from '../components/CreateBookingModal';
import { TourModal } from '../components/TourModal';
import { OnboardingModal } from '../components/OnboardingModal';

import { 
  initialWorkspace, 
  sampleBookings, 
  sampleCustomers, 
  sampleStaff, 
  sampleAlbums, 
  sampleConfirmationSlips 
} from '../data/mockData';
import { Booking, BookingStatus, Customer, ConfirmationSlip, WorkspaceConfig } from '../types';

export default function Home() {
  const [workspace, setWorkspace] = useState<WorkspaceConfig>(initialWorkspace);
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [albums, setAlbums] = useState(sampleAlbums);
  const [slips, setSlips] = useState<ConfirmationSlip[]>(sampleConfirmationSlips);
  const [staffList, setStaffList] = useState(sampleStaff);

  // Modals state
  const [isCreateBookingOpen, setIsCreateBookingOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Booking handlers
  const handleAddBooking = (newBooking: Booking) => {
    setBookings([newBooking, ...bookings]);
  };

  const handleUpdateBookingStatus = (id: string, newStatus: BookingStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  // Slip from booking handler
  const handleCreateSlipFromBooking = (bookingId: string) => {
    const targetBooking = bookings.find(b => b.id === bookingId);
    if (!targetBooking) return;

    const newSlip: ConfirmationSlip = {
      id: `slip_${Date.now()}`,
      slipCode: `HD-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}-PF`,
      bookingCode: targetBooking.bookingCode,
      customerName: targetBooking.customerName,
      customerPhone: targetBooking.customerPhone,
      customerAddress: targetBooking.location,
      studioName: `${workspace.name} - ${workspace.branch}`,
      studioPhone: '0901 234 567',
      studioAddress: `Chi nhánh ${workspace.branch}`,
      services: [
        {
          name: targetBooking.service,
          description: `Buổi chụp vào ngày ${targetBooking.shootDate} (${targetBooking.shootTime})`,
          price: targetBooking.totalAmount,
          quantity: 1,
          total: targetBooking.totalAmount
        }
      ],
      totalAmount: targetBooking.totalAmount,
      depositAmount: targetBooking.depositAmount,
      remainingAmount: targetBooking.totalAmount - targetBooking.depositAmount,
      paymentMethod: 'Chuyển khoản ngân hàng',
      terms: [
        'Khách hàng đặt cọc để giữ lịch chụp theo thỏa thuận.',
        'Lịch chụp có thể dời tối đa 02 lần nếu thông báo trước ít nhất 48 giờ.',
        'File ảnh gốc chất lượng cao được lưu trữ trên server trong vòng 06 tháng.'
      ],
      notes: targetBooking.notes || 'Không có ghi chú thêm.',
      signPerson: targetBooking.staffName,
      signRole: 'Quản lý Studio',
      status: 'da_xac_nhan',
      createdAt: new Date().toLocaleDateString('vi-VN')
    };

    setSlips([newSlip, ...slips]);
    setCurrentTab('confirmation_slips');
  };

  const handleAddCustomer = (newCust: Customer) => {
    setCustomers([newCust, ...customers]);
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        bookingCount={bookings.length}
      />

      {/* Main Content Layout */}
      <div className="main-layout">
        {/* Top Header */}
        <Header
          workspace={workspace}
          onOpenCreateBooking={() => setIsCreateBookingOpen(true)}
          onOpenTour={() => setIsTourOpen(true)}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
        />

        {/* Content Body */}
        <main className="content-body">
          {currentTab === 'dashboard' && (
            <DashboardView
              bookings={bookings}
              albums={albums}
              onNavigate={setCurrentTab}
              onOpenCreateBooking={() => setIsCreateBookingOpen(true)}
            />
          )}

          {currentTab === 'bookings' && (
            <BookingsView
              bookings={bookings}
              onOpenCreateBooking={() => setIsCreateBookingOpen(true)}
              onSelectBookingForSlip={b => handleCreateSlipFromBooking(b.id)}
              onUpdateStatus={handleUpdateBookingStatus}
            />
          )}

          {currentTab === 'schedule' && (
            <ScheduleTimelineView
              bookings={bookings}
              onOpenCreateBooking={() => setIsCreateBookingOpen(true)}
            />
          )}

          {currentTab === 'confirmation_slips' && (
            <ConfirmationSlipsView
              slips={slips}
              bookings={bookings}
              onCreateSlipFromBooking={handleCreateSlipFromBooking}
            />
          )}

          {currentTab === 'customers' && (
            <CustomersView
              customers={customers}
              onAddCustomer={handleAddCustomer}
            />
          )}

          {currentTab === 'work_schedule' && (
            <WorkScheduleView staffList={staffList} />
          )}

          {currentTab === 'albums' && (
            <AlbumsView albums={albums} />
          )}

          {currentTab === 'finance' && (
            <FinanceView bookings={bookings} />
          )}

          {['payroll', 'payroll_pending', 'payroll_settings'].includes(currentTab) && (
            <PayrollView staffList={staffList} />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              workspace={workspace}
              onUpdateWorkspace={setWorkspace}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <CreateBookingModal
        isOpen={isCreateBookingOpen}
        onClose={() => setIsCreateBookingOpen(false)}
        onAddBooking={handleAddBooking}
        staffList={staffList}
      />

      <TourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onSaveWorkspace={cfg => setWorkspace({ ...workspace, ...cfg })}
        initialName={workspace.name}
        initialBranch={workspace.branch}
      />
    </div>
  );
}
