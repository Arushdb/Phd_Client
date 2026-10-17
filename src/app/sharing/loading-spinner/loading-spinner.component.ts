import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-overlay" *ngIf="loadingService.loading$ | async">
      <div class="spinner"></div>
      <p>Please wait...</p>
    </div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      inset: 0;
      background: rgba(255, 255, 255, 0.65);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 99999;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid #ddd;
      border-top: 5px solid #1976d2;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    p {
      margin-top: 12px;
      font-size: 16px;
      color: #333;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `]
})
export class LoadingSpinnerComponent {
  loadingService = inject(LoadingService);
}