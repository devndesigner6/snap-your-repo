import { devIconsCdn, languageIconsMap } from '@/data';
import { mapLanguageToSvg } from '@/utils/mapping';

const iconPaths = {
  star: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXN0YXItaWNvbiBsdWNpZGUtc3RhciI+PHBhdGggZD0iTTExLjUyNSAyLjI5NWEuNTMuNTMgMCAwIDEgLjk1IDBsMi4zMSA0LjY3OWEyLjEyMyAyLjEyMyAwIDAgMCAxLjU5NSAxLjE2bDUuMTY2Ljc1NmEuNTMuNTMgMCAwIDEgLjI5NC45MDRsLTMuNzM2IDMuNjM4YTIuMTIzIDIuMTIzIDAgMCAwLS42MTEgMS44NzhsLjg4MiA1LjE0YS41My41MyAwIDAgMS0uNzcxLjU2bC00LjYxOC0yLjQyOGEyLjEyMiAyLjEyMiAwIDAgMC0xLjk3MyAwTDYuMzk2IDIxLjAxYS41My41MyAwIDAgMS0uNzctLjU2bC44ODEtNS4xMzlhMi4xMjIgMi4xMjIgMCAwIDAtLjYxMS0xLjg3OUwyLjE2IDkuNzk1YS41My41MyAwIDAgMSAuMjk0LS45MDZsNS4xNjUtLjc1NWEyLjEyMiAyLjEyMiAwIDAgMCAxLjU5Ny0xLjE2eiIvPjwvc3ZnPg==',
  fork: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdpdC1mb3JrLWljb24gbHVjaWRlLWdpdC1mb3JrIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjE4IiByPSIzIi8+PGNpcmNsZSBjeD0iNiIgY3k9IjYiIHI9IjMiLz48Y2lyY2xlIGN4PSIxOCIgY3k9IjYiIHI9IjMiLz48cGF0aCBkPSJNMTggOXYyYzAgLjYtLjQgMS0xIDFIN2MtLjYgMC0xLS40LTEtMVY5Ii8+PHBhdGggZD0iTTEyIDEydjMiLz48L3N2Zz4=',
  issues:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS1kb3QtaWNvbiBsdWNpZGUtY2lyY2xlLWRvdCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxIi8+PC9zdmc+',
};

const statIcons = {
  star: createIconImage(iconPaths.star),
  fork: createIconImage(iconPaths.fork),
  issues: createIconImage(iconPaths.issues),
};

export const canvasUi = {
  backgroundColor: '#0D1117',
  borderColor: '#e1e4e8',
  primaryTextColor: '#ffffff',
  secondaryTextColor: '#f9fafb',
  isDark: true,
  padding: 60,
};

export const themeConfigs: Record<string, any> = {
  dark: {
    backgroundColor: '#0b0f14',
    primaryTextColor: '#e5e7eb',
    secondaryTextColor: '#cbd5e1',
    borderColor: '#1f2937',
    isDark: true,
  },
  light: {
    backgroundColor: '#f9fafb',
    primaryTextColor: '#0b1220',
    secondaryTextColor: '#1f2937',
    borderColor: '#cbd5e1',
    isDark: false,
  },
  gradient: {
    backgroundColor: 'gradient',
    primaryTextColor: '#e5e7eb',
    secondaryTextColor: '#cbd5e1',
    borderColor: '#1f2937',
    isDark: true,
  },
  cyberpunk: {
    backgroundColor: '#0a0e27',
    primaryTextColor: '#00ff00',
    secondaryTextColor: '#00ccff',
    borderColor: '#ff00ff',
    isDark: true,
  },
};

export const canvas = { width: 1200, height: 630 };
export const quadrant = {
  width: canvas.width / 2,
  height: canvas.height / 2,
};

// Each quadrant's top-left corner
export const Q1 = { x: 0, y: 0 };
export const Q2 = { x: quadrant.width, y: 0 };
export const Q3 = { x: 0, y: quadrant.height };
export const Q4 = { x: quadrant.width, y: quadrant.height };

export function drawBackground(
  ctx: CanvasRenderingContext2D,
  bgColor: string,
  canvasWidth: number,
  canvasHeight: number,
) {
  if (bgColor === 'gradient') {
    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(0.5, '#111827');
    gradient.addColorStop(1, '#0b1220');
    ctx.fillStyle = gradient;
  } else {
    ctx.fillStyle = bgColor;
  }
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

export function drawAvatar(
  ctx: CanvasRenderingContext2D,
  imageUrl: string,
  quadrantX: number,
  quadrantY: number,
  quadrantW: number,
  quadrantH: number,
  theme?: any,
) {
  // 1. Calculate center position within quadrant
  const centerX = quadrantX + canvasUi.padding + quadrantW / 2;
  const centerY = quadrantY + quadrantH / 1.5;
  const radius = 100; // avatar size

  // 2. Load image (async!)
  const img = new Image();
  img.crossOrigin = 'anonymous'; // important for GitHub URLs

  img.onload = () => {
    ctx.save();

    // 3. Create circular clipping path
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip(); // everything drawn now is clipped to this circle

    // 4. Draw the image
    ctx.drawImage(img, centerX - radius, centerY - radius, radius * 2, radius * 2);

    ctx.restore();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = (theme || canvasUi).borderColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  img.src = imageUrl;
}

export function drawAvatarDirect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  quadrantX: number,
  quadrantY: number,
  quadrantW: number,
  quadrantH: number,
  theme?: any,
) {
  // Draw already-loaded image synchronously
  const centerX = quadrantX + canvasUi.padding + quadrantW / 2;
  const centerY = quadrantY + quadrantH / 1.5;
  const radius = 100;

  ctx.save();

  // Create circular clipping path
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  // Draw the image
  ctx.drawImage(img, centerX - radius, centerY - radius, radius * 2, radius * 2);

  ctx.restore();

  // Draw border
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = (theme || canvasUi).borderColor;
  ctx.lineWidth = 3;
  ctx.stroke();
}

export function drawRepoInfo(
  ctx: CanvasRenderingContext2D,
  username: string,
  repoName: string,
  description: string = '',
  quadrantX: number,
  quadrantY: number,
  quadrantW: number,
  quadrantH: number,
  theme?: any,
) {
  const currentTheme = theme || canvasUi;
  const padding = canvasUi.padding;
  const maxWidth = quadrantW - padding * 2;

  const usernameFont = '62px sans-serif';
  const repoFont = 'bold 62px sans-serif';
  const descFont = '24px sans-serif';

  const usernameFontSize = 62;
  const repoFontSize = 62;
  const descFontSize = 24;
  const descLineHeight = 1.4;
  const gapBetweenRepoAndDesc = 40;

  // Wrap description
  ctx.font = descFont;
  const descLines = wrapText(ctx, description, maxWidth);

  // Calculate available space for description
  const fixedContentHeight = usernameFontSize + repoFontSize + gapBetweenRepoAndDesc;
  const availableDescHeight = quadrantH - fixedContentHeight;
  const lineHeightPx = descFontSize * descLineHeight;
  const maxLines = Math.floor(availableDescHeight / lineHeightPx);

  // Truncate if needed
  const visibleDescLines = descLines.slice(0, Math.max(0, maxLines));

  // Calculate total content height with actual visible lines
  const totalHeight = usernameFontSize + repoFontSize + gapBetweenRepoAndDesc + lineHeightPx;

  let currentY = quadrantY + (quadrantH - totalHeight);
  const startX = quadrantX + padding;

  // Line 1: Username + separator
  ctx.font = usernameFont;
  ctx.fillStyle = currentTheme.secondaryTextColor;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(username + ' / ', startX, currentY);
  currentY += usernameFontSize;

  // Line 2: Repo name
  ctx.font = repoFont;
  ctx.fillStyle = currentTheme.primaryTextColor;
  const wrappedRepoName = wrapRepoName(ctx, repoName, quadrantW + padding * 3);
  ctx.fillText(wrappedRepoName, startX, currentY);
  currentY += repoFontSize + gapBetweenRepoAndDesc;

  // Description block (truncated)
  ctx.font = descFont;
  ctx.fillStyle = currentTheme.secondaryTextColor;
  visibleDescLines.forEach((line) => {
    ctx.fillText(line, startX, currentY);
    currentY += lineHeightPx;
  });
}

function wrapRepoName(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  if (!text) return '';
  if (ctx.measureText(text).width <= maxWidth) {
    return text;
  }

  // Find where to break (prefer breaking at separators)
  let breakIndex = text.length;

  // Binary search-ish approach: find the longest substring that fits with ellipsis
  while (breakIndex > 0) {
    const testText = text.substring(0, breakIndex) + '...';
    if (ctx.measureText(testText).width <= maxWidth) {
      break;
    }
    breakIndex--;
  }

  return text.substring(0, breakIndex) + '...';
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  if (!text) return [];

  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach((word) => {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

export function drawStats(
  ctx: CanvasRenderingContext2D,
  stats: { stars: number; forks: number; issues: number },
  quadrantX: number,
  quadrantY: number,
  quadrantW: number,
  quadrantH: number,
  theme?: any,
) {
  const currentTheme = theme || canvasUi;
  const { stars, forks, issues } = stats;

  const statItems = [
    { icon: statIcons.star, value: stars, label: 'Stars' },
    { icon: statIcons.fork, value: forks, label: 'Forks' },
    { icon: statIcons.issues, value: issues, label: 'Issues' },
  ];

  // Layout config
  const itemWidth = quadrantW / statItems.length;
  const centerY = quadrantY + quadrantH / 2;

  // Draw each stat
  statItems.forEach((stat, index) => {
    const itemX = quadrantX + index * itemWidth;
    const itemCenterX = itemX + itemWidth / 2;

    drawStatItem(ctx, stat, itemCenterX, centerY, currentTheme);
  });
}

function drawStatItem(
  ctx: CanvasRenderingContext2D,
  stat: { icon: HTMLImageElement; value: number; label: string },
  centerX: number,
  centerY: number,
  theme: any,
) {
  const iconSize = 24;
  const numberFont = 'bold 24px sans-serif';
  const labelFont = '18px sans-serif';
  const iconNumberGap = 8;
  const numberLabelGap = 10;

  // Measure text widths for centering
  ctx.font = numberFont;
  const numberText = formatNumber(stat.value);
  const numberWidth = ctx.measureText(numberText).width;

  ctx.font = labelFont;

  // Calculate total width of the item (icon + gap + number)
  const topRowWidth = iconSize + iconNumberGap + numberWidth;

  // Calculate starting positions for horizontal centering
  const topRowStartX = centerX - topRowWidth / 2;
  const labelStartX = topRowStartX + iconSize + iconNumberGap;

  // Calculate vertical positions (icon+number on top, label below)
  const topRowHeight = Math.max(iconSize, 24); // max of icon height and number height
  const totalHeight = topRowHeight + numberLabelGap + 16; // 16 is label font size
  const startY = centerY - totalHeight / 2;

  // Draw icon
  ctx.save();
  if (!theme.isDark) {
    ctx.filter = 'invert(1)';
  }
  ctx.drawImage(stat.icon, topRowStartX, startY, iconSize, iconSize);
  ctx.restore();

  // Draw number (aligned to icon baseline)
  ctx.font = numberFont;
  ctx.fillStyle = theme.primaryTextColor;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(numberText, topRowStartX + iconSize + iconNumberGap, startY);

  // Draw label (centered below)
  ctx.font = labelFont;
  ctx.fillStyle = theme.secondaryTextColor;
  ctx.textAlign = 'left';
  ctx.fillText(stat.label, labelStartX, startY + topRowHeight + numberLabelGap);
}

export function drawLogo(
  ctx: CanvasRenderingContext2D,
  quadrantX: number,
  quadrantY: number,
  quadrantW: number,
  quadrantH: number,
  theme?: any,
) {
  const img = new Image();

  img.onload = () => {
    // Calculate logo dimensions
    const logoWidth = 68;
    const logoHeight = (img.height / img.width) * logoWidth;

    // Position in bottom-right of quadrant
    const x = quadrantX + quadrantW - logoWidth - canvasUi.padding;
    const y = quadrantY + quadrantH - logoHeight - canvasUi.padding;

    ctx.save();
    ctx.globalAlpha = theme?.isDark === false ? 0.5 : 0.28;
    ctx.drawImage(img, x, y, logoWidth, logoHeight);
    ctx.restore();
  };

  img.src = '/snaprepo-logo.png';
}

export function drawTopLanguages(
  ctx: CanvasRenderingContext2D,
  languages: string[] | undefined,
  quadrantX: number,
  quadrantY: number,
  quadrantW: number,
  quadrantH: number,
  theme?: any,
  centerRatio: number = 0.55,
) {
  if (!languages || languages.length === 0) {
    return;
  }

  const currentTheme = theme || canvasUi;
  const isDark = currentTheme.isDark ?? true;

  // Use top 3 languages max
  const topLanguages = languages.slice(0, 3);

  // 2. Layout config
  const iconSize = 32;
  const itemGap = 16;
  const badgeHeight = 44;
  const badgePadding = 12;
  const labelFont = 'bold 13px sans-serif';

  // 3. Measure total width needed
  ctx.font = labelFont;

  const badges: { lang: string; width: number }[] = [];
  let totalWidth = 0;

  topLanguages.forEach((lang, index) => {
    const textWidth = ctx.measureText(lang).width;
    const badgeWidth = iconSize + badgePadding * 2 + textWidth + 8;
    badges.push({ lang, width: badgeWidth });
    totalWidth += badgeWidth;
    if (index < topLanguages.length - 1) {
      totalWidth += itemGap;
    }
  });

  // 4. Calculate starting position (center horizontally and vertically)
  const startX = quadrantX + (quadrantW - totalWidth) / 2;
  const centerY = quadrantY + quadrantH * centerRatio;

  // 5. Render each language badge
  let currentX = startX;

  badges.forEach((badge, index) => {
    const lang = badge.lang;
    const badgeWidth = badge.width;
    const badgeX = currentX;
    const badgeY = centerY - badgeHeight / 2;

    // Draw badge background
    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)';
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(15, 23, 42, 0.2)';
    ctx.lineWidth = 1.5;
    
    // Rounded rectangle
    const radius = 22;
    ctx.beginPath();
    ctx.moveTo(badgeX + radius, badgeY);
    ctx.lineTo(badgeX + badgeWidth - radius, badgeY);
    ctx.quadraticCurveTo(badgeX + badgeWidth, badgeY, badgeX + badgeWidth, badgeY + radius);
    ctx.lineTo(badgeX + badgeWidth, badgeY + badgeHeight - radius);
    ctx.quadraticCurveTo(badgeX + badgeWidth, badgeY + badgeHeight, badgeX + badgeWidth - radius, badgeY + badgeHeight);
    ctx.lineTo(badgeX + radius, badgeY + badgeHeight);
    ctx.quadraticCurveTo(badgeX, badgeY + badgeHeight, badgeX, badgeY + badgeHeight - radius);
    ctx.lineTo(badgeX, badgeY + radius);
    ctx.quadraticCurveTo(badgeX, badgeY, badgeX + radius, badgeY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Try to load and draw icon
    const iconSvg = mapLanguageToSvg(lang);
    const iconX = badgeX + badgePadding;
    const iconY = badgeY + (badgeHeight - iconSize) / 2;

    const drawFallbackIcon = () => {
      ctx.save();
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.12)';
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(iconX + iconSize / 2, iconY + iconSize / 2, iconSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.font = 'bold 16px sans-serif';
      ctx.fillStyle = currentTheme.primaryTextColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(lang.charAt(0).toUpperCase(), iconX + iconSize / 2, iconY + iconSize / 2 + 1);
      ctx.restore();
    };

    if (iconSvg) {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        ctx.drawImage(img, iconX, iconY, iconSize, iconSize);
      };

      img.onerror = () => drawFallbackIcon();

      img.src = `${devIconsCdn}/${iconSvg}`;
    } else {
      drawFallbackIcon();
    }

    // Draw language text
    ctx.font = labelFont;
    ctx.fillStyle = currentTheme.primaryTextColor;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    const textX = badgeX + badgePadding + iconSize + 6;
    const textY = badgeY + badgeHeight / 2;
    ctx.fillText(lang, textX, textY);

    // Move to next badge position
    currentX += badgeWidth + itemGap;
  });
}

function formatNumber(num: number) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

function createIconImage(dataUrl: string, convertToWhite = true): HTMLImageElement {
  // Decode base64
  const base64 = dataUrl.split(',')[1];
  let svgString = atob(base64);

  // Replace currentColor with white
  if (convertToWhite) {
    svgString = svgString.replace(/stroke="currentColor"/g, 'stroke="#ffffff"');
  }

  // Re-encode
  const newDataUrl = 'data:image/svg+xml;base64,' + btoa(svgString);

  const img = new Image();
  img.src = newDataUrl;

  img.onerror = () => console.error('Failed to load image');
  return img;
}

export function drawWatermark(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  primaryTextColor: string,
  theme?: any,
) {
  const logoSize = 18;
  const gap = 6;
  const textFont = 'bold 15px "Instrument Serif", serif';
  
  ctx.save();
  
  // Draw text first (right-to-left layout)
  ctx.font = textFont;
  ctx.fillStyle = primaryTextColor;
  ctx.globalAlpha = theme?.isDark === false ? 0.85 : 0.65;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x - logoSize - gap * 2, y);
  
  // Draw logo at the end
  const logoImg = new Image();
  logoImg.onload = () => {
    ctx.globalAlpha = theme?.isDark === false ? 0.9 : 0.7;
    ctx.drawImage(logoImg, x - logoSize, y - logoSize / 2, logoSize, logoSize);
    ctx.restore();
  };
  logoImg.onerror = () => ctx.restore();
  logoImg.src = '/snaprepo-logo.png';
}
