const PATH =
  'M33 1.5H72C89 1.5 100 18 100 41C100 67 89 87.5 70 87.5H1.5C9 71 24 60.5 44 59.5L57 59C66 58.5 71 52 71 44C71 36 67 30 60 30H50.5L47.5 42.5C46.8 45 45 46.5 42 46.5H19C16 46.5 14.8 44.3 15.8 41.5L27.5 5.5C28.5 3 30.5 1.5 33 1.5Z';

const GRADIENTS = {
  light: ['#22D9A0', '#0E9A6F', '#0A3A2F'],
  dark: ['#3BE6B0', '#14B07F', '#0B8060'],
};

export function LogoMark({ variant = 'light', width = 40, height = 36, solid }) {
  const id = `dbLogo-${variant}`;
  const [a, b, c] = GRADIENTS[variant];
  return (
    <svg width={width} height={height} viewBox="0 0 100 90" aria-hidden="true" focusable="false">
      {!solid && (
        <defs>
          <linearGradient id={id} x1="0.25" y1="0" x2="0.7" y2="1">
            <stop offset="0" stopColor={a} />
            <stop offset="0.5" stopColor={b} />
            <stop offset="1" stopColor={c} />
          </linearGradient>
        </defs>
      )}
      <path d={PATH} fill={solid || `url(#${id})`} />
    </svg>
  );
}
