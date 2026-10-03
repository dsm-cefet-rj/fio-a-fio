import React from 'react';

export const Logo = ({ size = 'md', showText = true, className = '' }) => {
  const sizeMap = {
    sm: { icon: 24, text: 'text-base' },
    md: { icon: 34, text: 'text-xl' },
    lg: { icon: 44, text: 'text-2xl' },
    xl: { icon: 56, text: 'text-3xl' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Contemporary Stylized Yarn Ball SVG Icon */}
      <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xs"
        >
          {/* Outer Yarn Circle / Shadow */}
          <circle cx="20" cy="20" r="18" fill="#FEF1F4" stroke="#EADED5" strokeWidth="1.5" />
          
          {/* Main Yarn Woven Loops */}
          <path
            d="M 10,20 C 10,12 28,10 30,20 C 32,30 12,28 10,20 Z"
            fill="none"
            stroke="#E55B86"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 12,15 C 16,8 30,14 28,24 C 26,34 10,24 12,15 Z"
            fill="none"
            stroke="#E55B86"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 15,28 C 22,34 32,22 25,12 C 18,2 10,18 15,28 Z"
            fill="none"
            stroke="#EF9FB1"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Crochet Hook Threading Through */}
          <path
            d="M 7,33 L 33,7"
            stroke="#17151A"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Hook Tip */}
          <path
            d="M 33,7 C 34.5,5.5 36,6.5 35,8"
            stroke="#17151A"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Sparkle Heart Accent */}
          <circle cx="27" cy="13" r="2.5" fill="#E55B86" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`${currentSize.text} font-black tracking-tight text-[#17151A] group-hover:text-[#E55B86] transition-colors duration-200`}>
            Fio a Fio
          </span>
          <span className="text-[9px] font-bold text-[#896B70] tracking-widest uppercase -mt-0.5">
            Manuais & Crochê
          </span>
        </div>
      )}
    </div>
  );
};
