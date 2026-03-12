import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { UserPlus, Users, LucideAngularModule } from 'lucide-angular';

import { SystemUserScreen } from './system_user/system_user_screen';
import { SystemDepartmentsScreen } from './system_departments/system_departments';

type AdminTab = 'users' | 'departments' | 'framework' | 'masterProfile';

type Option<T extends string = string> = {
  label: string;
  value: T;
};

@Component({
  selector: 'app-system-administration',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, ButtonModule, SystemUserScreen, SystemDepartmentsScreen, LucideAngularModule],
  templateUrl: './system_administration_screen.html',
  styleUrl: './system_administration_screen.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemAdministrationScreen {
  protected readonly icons = {
    header: Users,
    add: UserPlus,
  };

  activeTab: AdminTab = 'users';

  readonly tabs: Option<AdminTab>[] = [
    { label: 'Quản lý người dùng', value: 'users' },
    { label: 'Quản lý Phòng ban', value: 'departments' },
    { label: 'Cấu hình Khung dự án', value: 'framework' },
    { label: 'Quản lý Hồ sơ tổng', value: 'masterProfile' },
  ];

  // UI mock
  addUser(): void {}
}
