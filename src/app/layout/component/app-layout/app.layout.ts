import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, ButtonModule, Menu],
  templateUrl: './app.layout.html',
  styleUrl: './app.layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayout {
  sidebarCollapsed = signal(false);
  mobileDrawerOpen = signal(false);

  toggleSidebarCollapsed(): void {
    this.sidebarCollapsed.update((v) => !v);
  }

  toggleMobileDrawer(): void {
    this.mobileDrawerOpen.update((v) => !v);
  }

  closeMobileDrawer(): void {
    this.mobileDrawerOpen.set(false);
  }
}

