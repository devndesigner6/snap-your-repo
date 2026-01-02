import { Repository } from '@/types';
import { AfterViewInit, Component, ElementRef, effect, input, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  canvas,
  canvasUi,
  drawAvatar,
  drawAvatarDirect,
  drawBackground,
  drawRepoInfo,
  drawStats,
  drawTopLanguages,
  drawWatermark,
  Q1,
  Q2,
  Q3,
  Q4,
  quadrant,
  themeConfigs,
} from './canvas.utils';

@Component({
  selector: 'snaprepo-canvas',
  imports: [MatButtonModule],
  templateUrl: './canvas.html',
})
export class Canvas implements AfterViewInit {
  canvasData = input.required<Repository>();
  cardTheme = input<string>('dark');
  showWatermark = input<boolean>(true);
  canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('snaprepoCanvas');

  #ctx: CanvasRenderingContext2D;
  #imageName = 'snaprepo-image.png';
  #redrawEffect = effect(() => {
    const data = this.canvasData();
    this.cardTheme();
    this.showWatermark();

    if (!this.#ctx || !data) return;
    this.#drawSnapshot();
  });

  ngAfterViewInit(): void {
    this.#initSetup();
  }

  #draw() {
    this.#drawSnapshot();
  }

  #drawSnapshot() {
    const data = this.canvasData();
    if (!data) return;

    const theme = themeConfigs[this.cardTheme()] || themeConfigs['dark'];
    
    drawBackground(this.#ctx, theme.backgroundColor, canvas.width, canvas.height);
    
    // Load avatar image and redraw when ready
    const avatarImg = new Image();
    avatarImg.crossOrigin = 'anonymous';
    
    avatarImg.onload = () => {
      // Redraw everything with avatar and theme
      drawBackground(this.#ctx, theme.backgroundColor, canvas.width, canvas.height);
      drawAvatarDirect(this.#ctx, avatarImg, Q2.x, Q2.y, quadrant.width, quadrant.height, theme);
      drawRepoInfo(
        this.#ctx,
        data.owner,
        data.name,
        data.description,
        Q1.x,
        Q1.y,
        quadrant.width,
        quadrant.height,
        theme,
      );
      drawStats(
        this.#ctx,
        {
          stars: data.stars,
          forks: data.forks,
          issues: data.issues,
        },
        Q3.x,
        Q3.y,
        quadrant.width,
        quadrant.height,
        theme,
      );
      drawTopLanguages(this.#ctx, data.topLanguages, Q2.x, Q2.y, quadrant.width, quadrant.height, theme, 0.8);
      
      // Draw watermark if enabled
      if (this.showWatermark()) {
        drawWatermark(
          this.#ctx,
          'SnapRepo',
          canvas.width - 60,
          canvas.height - 40,
          theme.primaryTextColor,
          theme,
        );
      }
    };
    
    avatarImg.onerror = () => {
      // If avatar fails, draw without it but continue
      drawRepoInfo(this.#ctx, data.owner, data.name, data.description, Q1.x, Q1.y, quadrant.width, quadrant.height, theme);
      drawStats(
        this.#ctx,
        {
          stars: data.stars,
          forks: data.forks,
          issues: data.issues,
        },
        Q3.x,
        Q3.y,
        quadrant.width,
        quadrant.height,
        theme,
      );
      drawTopLanguages(this.#ctx, data.topLanguages, Q2.x, Q2.y, quadrant.width, quadrant.height, theme, 0.8);
      
      if (this.showWatermark()) {
        drawWatermark(
          this.#ctx,
          'SnapRepo',
          canvas.width - 60,
          canvas.height - 40,
          theme.primaryTextColor,
          theme,
        );
      }
    };
    
    avatarImg.src = data.avatarUrl;
  }

  #setupCanvas() {
    const canvasEl = this.canvas().nativeElement;
    const dpr = window.devicePixelRatio || 1;

    // Set actual canvas buffer size (high-res)
    canvasEl.width = canvas.width * dpr;
    canvasEl.height = canvas.height * dpr;

    // Set CSS display size (what user sees)
    canvasEl.style.width = '100%';
    canvasEl.style.height = 'auto';
    canvasEl.style.maxWidth = canvasEl.width + 'px';

    this.#ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;

    // Scale all drawing operations
    this.#ctx.scale(dpr, dpr);
  }

  #initSetup() {
    this.#setupCanvas();
    this.#draw();
  }

  public downloadImage = () => {
    const canvasEl = this.canvas()?.nativeElement;
    if (!canvasEl) return;
    const canvasURL = canvasEl.toDataURL();
    const el = document.createElement('a');
    el.href = canvasURL;
    el.download = this.#imageName;
    el.click();
    el.remove();
    
    // Trigger confetti animation
    this.#triggerConfetti();
  };

  #triggerConfetti() {
    const colors = ['#5b7bff', '#7fb2ff', '#5ee4d6', '#60a5fa', '#34d399'];
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animation = `confetti-fall ${2 + Math.random()}s ease-in forwards`;
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 2500);
    }
  }
}
