'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BannerSlide, NavigationTab, Announcement } from '@/lib/types';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Pause, 
  Play,
  Sparkles
} from 'lucide-react';

interface HomeSliderProps {
  slides: BannerSlide[];
  onSelectTab: (tab: NavigationTab) => void;
  onOpenAnnouncementDetail?: (announcement: Announcement) => void;
  announcements?: Announcement[];
}

export default function HomeSlider({ 
  slides, 
  onSelectTab,
  onOpenAnnouncementDetail,
  announcements = []
}: HomeSliderProps) {
  const activeSlides = slides.filter(s => s.statusAktif).sort((a, b) => a.urutan - b.urutan);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const total = activeSlides.length;

  const nextSlide = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex(prev => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex(prev => (prev - 1 + total) % total);
  }, [total]);

  // Automatically transition to the next slide every 5 seconds (5000ms),
  // pausing the interval whenever the mouse hovers over the .slider-container
  useEffect(() => {
    if (isHovered || isManualPaused || total <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, isManualPaused, total, nextSlide]);

  if (total === 0) return null;

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  const handleSlideClick = (slide: BannerSlide) => {
    // If the slide has a specific announcementId, open its detail modal
    if (slide.announcementId && announcements.length > 0 && onOpenAnnouncementDetail) {
      const found = announcements.find(a => a.id === slide.announcementId);
      if (found) {
        onOpenAnnouncementDetail(found);
        return;
      }
    }

    // If slide specifically targets pengumuman and announcement detail handler exists
    if (slide.targetTab === 'pengumuman' && announcements.length > 0 && onOpenAnnouncementDetail) {
      const matched = slide.announcementId 
        ? announcements.find(a => a.id === slide.announcementId) 
        : announcements[0];
      if (matched) {
        onOpenAnnouncementDetail(matched);
        return;
      }
    }

    // Default: navigate to the relevant navigation tab
    onSelectTab(slide.targetTab);
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide(); // Swiped left
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide(); // Swiped right
    }
  };

  // Keyboard arrow navigation for accessibility (WCAG Carousel pattern)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setCurrentIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setCurrentIndex(total - 1);
    }
  };

  return (
    <div 
      className="slider-container relative w-full mb-8 select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 rounded-3xl"
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Sorotan Informasi dan Program BPJS Kesehatan Rumah Sakit. Gunakan tombol panah kiri dan kanan pada keyboard untuk berpindah slide."
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Screen Reader Live Region Announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Menampilkan slide {currentIndex + 1} dari {total}: {currentSlide.judul}
      </div>

      {/* Main Slide Card with Background Photo & Cinematic Gradient */}
      <div 
        role="group"
        aria-roledescription="slide"
        aria-label={`Slide ${currentIndex + 1} dari ${total}: ${currentSlide.judul}. Tekan Enter untuk membuka.`}
        tabIndex={0}
        onClick={() => handleSlideClick(currentSlide)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSlideClick(currentSlide);
          }
        }}
        className="slider-card relative w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-950/25 border border-slate-200/80 hover:border-emerald-500/40 cursor-pointer group bg-slate-900 transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.012] will-change-transform focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        {/* Photo Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url(${currentSlide.foto})` }}
        />

        {/* Multi-stage High-Contrast Gradient Overlay for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent max-w-3xl" />

        {/* Slide Content */}
        <div className="absolute inset-0 p-6 sm:p-8 md:p-12 flex flex-col justify-end text-white max-w-3xl z-10">
          {/* Badge / Kicker */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            {currentSlide.badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/90 text-slate-950 backdrop-blur-xs shadow-xs">
                <Sparkles className="w-3 h-3 text-slate-950" />
                {currentSlide.badge}
              </span>
            )}
            <span className="text-xs font-semibold text-emerald-300 drop-shadow-xs">
              {currentSlide.subjudul}
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-2 sm:mb-3 group-hover:text-emerald-200 transition-colors drop-shadow-sm">
            {currentSlide.judul}
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 max-w-2xl drop-shadow-xs">
            {currentSlide.deskripsi}
          </p>

          {/* Clickable Action Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSlideClick(currentSlide);
              }}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all group-hover:shadow-emerald-900/50 group-hover:translate-x-1"
            >
              <span>{currentSlide.labelTombol}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-300 hidden sm:inline-block font-medium">
              Klik banner untuk membuka informasi langsung
            </span>
          </div>
        </div>

        {/* Previous & Next Control Arrows */}
        <div className="absolute inset-y-0 right-4 flex items-center gap-2 z-20 pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="w-10 h-10 rounded-full bg-slate-950/60 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Slide sebelumnya (Gunakan Panah Kiri)"
              title="Slide sebelumnya (Panah Kiri)"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="w-10 h-10 rounded-full bg-slate-950/60 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Slide berikutnya (Gunakan Panah Kanan)"
              title="Slide berikutnya (Panah Kanan)"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Floating Interactive Pagination Dots at the bottom-center of the slide card */}
        <div 
          className="absolute bottom-3 sm:bottom-4 inset-x-0 flex items-center justify-center z-20 pointer-events-none"
          role="tablist"
          aria-label="Pilihan slide visual melayang"
        >
          <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 shadow-md">
            {activeSlides.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={`card-dot-${slide.id}`}
                  type="button"
                  role="tab"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  title={`Slide ${index + 1}: ${slide.judul}`}
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  className={`group relative flex items-center justify-center py-1 transition-all duration-300 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white rounded-full ${
                    isActive ? 'w-6 sm:w-8' : 'w-2.5 sm:w-3'
                  }`}
                  aria-label={`Lihat Slide ${index + 1} dari ${total}: ${slide.judul}`}
                >
                  <span
                    className={`block h-2 sm:h-2.5 w-full rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-emerald-400 shadow-sm shadow-emerald-400/80 ring-2 ring-emerald-300/40'
                        : 'bg-white/40 hover:bg-white/80'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Slider Mini-Nav, Pagination Dots & Progress Bar */}
      <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-3 px-1">
        {/* Row of Interactive Pagination Dots */}
        <div 
          className="slider-pagination-dots flex items-center gap-2 py-1.5 px-3 bg-white border border-slate-200 rounded-xl shadow-2xs"
          role="tablist"
          aria-label="Paginasi tombol titik slide"
        >
          <span className="text-[11px] font-semibold text-slate-500 mr-1 hidden sm:inline">
            Slide:
          </span>
          {activeSlides.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={`pagination-dot-${slide.id}`}
                type="button"
                role="tab"
                onClick={() => setCurrentIndex(index)}
                aria-selected={isActive}
                aria-label={`Lompat ke slide ${index + 1} dari ${total}: ${slide.judul}`}
                title={`Lompat ke slide ${index + 1}: ${slide.judul}`}
                tabIndex={isActive ? 0 : -1}
                className={`relative flex items-center justify-center p-1 rounded-full transition-all duration-300 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                  isActive ? 'scale-105' : 'hover:scale-125'
                }`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-7 h-2.5 bg-emerald-700 shadow-xs ring-2 ring-emerald-200'
                      : 'w-2.5 h-2.5 bg-slate-300 hover:bg-emerald-500'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Pagination Pills & Slide Title Indicator */}
        <div 
          className="flex items-center gap-2 overflow-x-auto max-w-full pb-1"
          role="tablist"
          aria-label="Daftar judul slide informasi"
        >
          {activeSlides.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                onClick={() => setCurrentIndex(index)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 text-left whitespace-nowrap hover:-translate-y-0.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                  isActive
                    ? 'bg-emerald-800 text-white font-bold shadow-sm ring-1 ring-emerald-600'
                    : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:shadow-xs border border-slate-200'
                }`}
                aria-selected={isActive}
                aria-label={`Buka slide ${index + 1} dari ${total}: ${slide.judul}`}
                title={slide.judul}
              >
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-300' : 'bg-slate-300'}`} aria-hidden="true" />
                <span className="truncate max-w-[130px] sm:max-w-[180px]">{slide.judul}</span>
              </button>
            );
          })}
        </div>

        {/* Counter and Play/Pause indicator */}
        <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
          <button
            type="button"
            onClick={() => setIsManualPaused(!isManualPaused)}
            className="p-1 hover:text-slate-800 text-slate-400 transition-colors rounded focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600"
            aria-label={isManualPaused ? "Lanjutkan putar otomatis slide" : "Jeda putar otomatis slide"}
            title={isManualPaused ? 'Lanjutkan otomatis (5 detik)' : 'Jeda otomatis'}
          >
            {isManualPaused ? <Play className="w-3.5 h-3.5" aria-hidden="true" /> : <Pause className="w-3.5 h-3.5" aria-hidden="true" />}
          </button>
          <span aria-label={`Menampilkan slide ${currentIndex + 1} dari total ${total} slide`}>
            Slide <strong className="text-slate-800">{currentIndex + 1}</strong> dari {total}
          </span>
        </div>
      </div>
    </div>
  );
}
