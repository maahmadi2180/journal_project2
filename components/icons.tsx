
import React from 'react';

// FIX: Explicitly type iconProps to ensure properties like strokeLinecap and strokeLinejoin are correctly typed.
const iconProps: React.SVGProps<SVGSVGElement> = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const PlusCircleIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

export const ArrowRightLeftIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M8 3 4 7l4 4" />
    <path d="M4 7h16" />
    <path d="m16 21 4-4-4-4" />
    <path d="M20 17H4" />
  </svg>
);

export const BrainCircuitIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}>
        <path d="M12 5a3 3 0 1 0-5.993.142"/>
        <path d="M18 13a3 3 0 1 0-5.993.142"/>
        <path d="M20 7a3 3 0 1 0-6 0"/>
        <path d="M12 19a3 3 0 1 0-6 0"/>
        <path d="M14 13.5a3 3 0 1 0-4 0"/>
        <path d="M6.007 5.142A3 3 0 1 0 4 7"/>
        <path d="M18.007 7.142A3 3 0 1 0 16 9"/>
        <path d="M12 12v-2"/>
        <path d="M15 13a3 3 0 1 0-3-3"/>
        <path d="M12 12v2"/>
        <path d="M12 5v2"/>
        <path d="m14.5 5.5.5.5"/>
        <path d="m9.5 5.5-.5.5"/>
        <path d="m14.5 17.5.5.5"/>
        <path d="m9.5 17.5-.5.5"/>
        <path d="M18 13h2"/>
        <path d="M4 13h2"/>
        <path d="M20 7h2"/>
        <path d="M2 7h2"/>
    </svg>
);


export const LogOutIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export const DollarSignIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <line x1="12" y1="2" x2="12" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

export const TrendingUpIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
      <polyline points="16 7 22 7 22 13"></polyline>
  </svg>
);

export const XIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}>
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export const SettingsIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
);

export const KeyIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}>
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
);

export const EyeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

export const EyeOffIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}>
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
);
