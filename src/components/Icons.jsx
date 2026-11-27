const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
};

const make = (paths, defaults = {}) =>
  function Icon({ size = 24, color = 'currentColor', width = defaults.width ?? 1.8, ...rest }) {
    return (
      <svg width={size} height={size} stroke={color} strokeWidth={width} {...base} {...rest}>
        {paths}
      </svg>
    );
  };

export const Check = make(<path d="M5 12.5l4.5 4.5L19 7.5" />, { width: 2.6 });
export const Chat = make(<><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5z" /><path d="M9 10.5c.3 1.6 1.9 3.2 3.5 3.5l1.2-1 1.8.8c-.2 1-1 1.7-2 1.7-3 0-5.5-2.5-5.5-5.5 0-1 .7-1.8 1.7-2l.8 1.8z" /></>, { width: 1.7 });
export const Cross = make(<path d="M6 6l12 12M18 6L6 18" />, { width: 2.4 });
export const Arrow = make(<path d="M5 12h14M13 6l6 6-6 6" />, { width: 2.4 });
export const Phone = make(
  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
);
export const Menu = make(<path d="M4 7h16M4 12h16M4 17h16" />, { width: 2.2 });
export const Close = make(<path d="M6 6l12 12M18 6L6 18" />, { width: 2.2 });
export const Invoice = make(<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h4" /></>);
export const Box = make(<><path d="M21 8l-9-5-9 5v8l9 5 9-5z" /><path d="M3 8l9 5 9-5" /><path d="M12 13v8" /></>);
export const Truck = make(<><path d="M3 6h11v10H3z" /><path d="M14 9h4l3 3v4h-7" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></>);
export const People = make(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><circle cx="17" cy="9" r="2.5" /><path d="M16 14.2a5 5 0 0 1 5.5 4.8" /></>);
export const Factory = make(<path d="M3 21V10l5 3V10l5 3V10l5 3V5h3v16z" />);
export const Globe = make(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>);
export const Ledger = make(<><path d="M4 4h12a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2z" /><path d="M8 8h6M8 12h6M8 16h3" /></>);
export const Cart = make(<><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M2 3h3l2.6 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L22 7H6" /></>);
export const Chart = make(<><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 6-7" /><path d="M16 7h4v4" /></>);
export const Monitor = make(<><rect x="4" y="4" width="16" height="11" rx="1.5" /><path d="M2 19h20" /></>);
export const Barcode = make(<path d="M4 5v14M7 5v14M10 5v14M14 5v14M17 5v14M20 5v14" />);
export const Bell = make(<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a2 2 0 0 0 3.4 0" /></>);
export const Gear = make(<><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1" /></>);
export const Layers = make(<><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>);
export const Building = make(<><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3" /></>);
export const Clipboard = make(<><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1" /><path d="M9 13l2 2 4-4" /></>);
export const Calendar = make(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>);
export const Devices = make(<><rect x="2" y="4" width="14" height="10" rx="1.5" /><path d="M1 18h12" /><rect x="16" y="8" width="6" height="12" rx="1.5" /></>);
export const Sliders = make(<><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></>);
export const Mobile = make(<><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 18.5h2" /></>);
export const Pin = make(<><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>);
export const Mail = make(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>);
export const Clock = make(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
export const Plus = make(<path d="M12 5v14M5 12h14" />, { width: 2.2 });

// Filled star for review ratings.
export function Star({ size = 18, filled = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z"
        fill={filled ? '#F2B25C' : '#ECE7DD'}
      />
    </svg>
  );
}

export const Tag = make(<><path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z" /><circle cx="8" cy="8" r="1.6" /></>);
export const Bag = make(<><path d="M5 8h14l-1 13H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>);
export const Percent = make(<><path d="M19 5L5 19" /><circle cx="7" cy="7" r="2.2" /><circle cx="17" cy="17" r="2.2" /></>);
export const Bank = make(<><path d="M3 9l9-5 9 5" /><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18" /></>);
export const Lock = make(<><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>);
export const Send = make(<><path d="M21 3L10 14" /><path d="M21 3l-7 18-4-7-7-4z" /></>);
