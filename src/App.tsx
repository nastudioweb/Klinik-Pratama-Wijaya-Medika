/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { DoctorSchedule } from './components/DoctorSchedule';
import { FacilityGallery } from './components/FacilityGallery';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { CLINIC_INFO } from './data/clinicData';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedDoctor, setPreselectedDoctor] = useState<string | undefined>(undefined);

  const handleOpenBooking = (doctorName?: string) => {
    setPreselectedDoctor(doctorName);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPreselectedDoctor(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      {/* Top Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 6 Core Medical Services */}
        <ServicesSection onOpenBooking={handleOpenBooking} />

        {/* Online Doctor Schedule */}
        <DoctorSchedule onSelectDoctorToBook={handleOpenBooking} />

        {/* Responsive Facilities & Interior Image Gallery */}
        <FacilityGallery onOpenBooking={handleOpenBooking} />

        {/* Patient Reviews & 4.7 Rating */}
        <ReviewsSection />

        {/* Location, Route, Google Maps & Peak Hours */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedDoctor={preselectedDoctor}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={`https://wa.me/${CLINIC_INFO.phoneClean}?text=Halo%20Klinik%20Pratama%20Wijaya%20Medika,%20saya%20ingin%20konsultasi%20atau%20membuat%20janji%20temu.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi WhatsApp Klinik"
        className="fixed bottom-5 right-5 z-40 p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        <span className="hidden sm:inline text-xs font-semibold pr-1">
          Chat WhatsApp ({CLINIC_INFO.phone})
        </span>
      </a>
    </div>
  );
}
