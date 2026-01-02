import { Repository } from '@/types';
import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  canvas,
  canvasUi,
  drawAvatar,
  drawAvatarDirect,
  drawBackground,
  drawLogo,
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

  ngAfterViewInit(): void {
    this.#initSetup();
  }

  #draw() {
    this.#drawSnapshot();
  }

  #drawSnapshot() {
    const theme = themeConfigs[this.cardTheme()] || themeConfigs['dark'];
    
    drawBackground(this.#ctx, theme.backgroundColor, canvas.width, canvas.height);
    
    // Load avatar image and redraw when ready
    const avatarImg = new Image();
    avatarImg.crossOrigin = 'anonymous';
    
    avatarImg.onload = () => {
      // Redraw everything with avatar and theme
      drawBackground(this.#ctx, theme.backgroundColor, canvas.width, canvas.height);
      drawAvatarDirect(this.#ctx, avatarImg, Q2.x, Q2.y, quadrant.width, quadrant.height);
      drawRepoInfo(
        this.#ctx,
        this.canvasData().owner,
        this.canvasData().name,
        this.canvasData().description,
        Q1.x,
        Q1.y,
        quadrant.width,
        quadrant.height,
        theme,
      );
      drawStats(
        this.#ctx,
        {
          stars: this.canvasData().stars,
          forks: this.canvasData().forks,
          issues: this.canvasData().issues,
        },
        Q3.x,
        Q3.y,
        quadrant.width,
        quadrant.height,
        theme,
      );
      drawTopLanguages(
        this.#ctx,
        this.canvasData().topLanguages,
        Q4.x,
        Q4.y,
        quadrant.width,
        quadrant.height,
        theme,
      );
      drawLogo(this.#ctx, Q4.x, Q4.y, quadrant.width, quadrant.height, theme);
      
      // Draw watermark if enabled
      if (this.showWatermark()) {
        drawWatermark(
          this.#ctx,
          'Made with SnapRepo',
          canvas.width - 60,
          canvas.height - 40,
          theme.primaryTextColor,
          theme,
        );
      }
    };
    
    avatarImg.onerror = () => {
      // If avatar fails, draw without it but continue
      drawRepoInfo(
        this.#ctx,
        this.canvasData().owner,
        this.canvasData().name,
        this.canvasData().description,
        Q1.x,
        Q1.y,
        quadrant.width,
        quadrant.height,
        theme,
      );
      drawStats(
        this.#ctx,
        {
          stars: this.canvasData().stars,
          forks: this.canvasData().forks,
          issues: this.canvasData().issues,
        },
        Q3.x,
        Q3.y,
        quadrant.width,
        quadrant.height,
        theme,
      );
      drawTopLanguages(
        this.#ctx,
        this.canvasData().topLanguages,
        Q4.x,
        Q4.y,
        quadrant.width,
        quadrant.height,
        theme,
      );
      drawLogo(this.#ctx, Q4.x, Q4.y, quadrant.width, quadrant.height, theme);
      
      if (this.showWatermark()) {
        drawWatermark(
          this.#ctx,
          'Made with SnapRepo',
          canvas.width - 60,
          canvas.height - 40,
          theme.primaryTextColor,
          theme,
        );
      }
    };
    
    avatarImg.src = this.canvasData().avatarUrl;
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

  downloadImage() {
    const canvasURL = this.canvas().nativeElement.toDataURL();
    const el = document.createElement('a');
    el.href = canvasURL;
    el.download = this.#imageName;
    el.click();
    el.remove();
  }
}
