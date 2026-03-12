import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

type MenuItem = {
  link: string;
  icon: string;
  label: string;
  exact?: boolean;
};

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  @Input() isCollapsed = false;

  private readonly router = inject(Router);

  readonly items: MenuItem[] = [
    { link: '/dashboard', icon: 'bx-home', label: 'Dashboard', exact: false },
  ];

  get selectedPath(): string {
    return this.router.url || '';
  }
}

