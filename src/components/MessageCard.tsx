import React from 'react';
import { YearbookMessage, Student } from '../types';
import { Calendar, UserCheck, Heart, Sparkles } from 'lucide-react';

interface MessageCardProps {
  message: YearbookMessage;
  recipientStudent?: Student;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  message,
  recipientStudent,
}) => {
  // Format readable Indonesian date
  const formattedDate = new Date(message.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      id={`message-card-${message.id}`}
      className="relative bg-white/90 backdrop-blur-xs border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group hover:-translate-y-0.5"
    >
      {/* Decorative subtle pin / corner tape */}
      <div className="absolute -top-2.5 right-6 w-10 h-5 bg-amber-200/60 rounded-xs -rotate-3 border border-amber-300/40 pointer-events-none" />

      <div>
        {/* Recipient Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500/30" />
            <span>
              {recipientStudent
                ? `Kepada: ${recipientStudent.name} (${recipientStudent.nickname})`
                : 'Kepada: Seluruh Angkatan 🎓'}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-stone-400">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Message Quote Text */}
        <p className="font-serif italic text-stone-800 text-sm sm:text-base leading-relaxed mb-4">
          "{message.message}"
        </p>
      </div>

      {/* Footer: Sender details & Real Digital Signature */}
      <div className="pt-3 border-t border-stone-100 flex items-end justify-between gap-4">
        <div>
          <div className="font-semibold text-xs sm:text-sm text-stone-900 flex items-center gap-1">
            <span>{message.sender}</span>
          </div>
          {message.senderRole && (
            <div className="text-[11px] text-stone-500 font-medium">
              {message.senderRole}
            </div>
          )}
        </div>

        {/* Real Signature Image rendered from Canvas Data URL */}
        {message.signature && (
          <div className="text-right">
            <div className="text-[10px] text-stone-400 uppercase tracking-wider mb-0.5 font-mono">
              Tanda Tangan
            </div>
            <div className="bg-stone-50/80 px-2 py-1 rounded-lg border border-stone-200/60 inline-block">
              <img
                src={message.signature}
                alt={`Tanda tangan ${message.sender}`}
                className="h-9 sm:h-10 max-w-[130px] object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
