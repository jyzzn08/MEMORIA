/**
 * Definisi Tipe Data untuk MEMORIA — Digital Yearbook
 * Didesain rapi agar mudah dipahami untuk pembelajaran Informatika SMA/SMK
 */

export type BentoSpanType = 'normal' | 'wide' | 'tall' | 'featured' | 'landscape' | 'portrait' | 'large';

export interface Student {
  id: number;
  name: string;
  nickname: string;
  class: string;
  bio: string;
  quote: string;
  hobbies: string[];
  extracurriculars: string[];
  photo: string;
  bentoSpan: BentoSpanType; // Untuk manipulasi CSS Grid (normal, landscape, portrait, large)
  dreamCareer?: string;
  socialHandle?: string;
  favoriteMemory?: string;
}

export interface YearbookMessage {
  id: string;
  studentId: number | null; // Hubungan relasional ke student (null = untuk angkatan umum)
  sender: string;
  senderRole?: string;
  message: string;
  signature: string; // Base64 data URL yang digenerate oleh HTML5 Canvas
  createdAt: string;
}

export type FilterType = 'all' | 'hobby' | 'extracurricular';
