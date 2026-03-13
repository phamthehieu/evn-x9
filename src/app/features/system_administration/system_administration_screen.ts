import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import {
  Building2,
  FileText,
  Settings,
  UserPlus,
  Users,
  LucideAngularModule,
  LucideIconData,
} from 'lucide-angular';

import { SystemUserScreen } from './system_user/system_user_screen';
import { SystemDepartmentsScreen } from './system_departments/system_departments';
import { SystemProjectFrameworkScreen } from './system_project_framework/system_project_framework';
import { SystemGeneralProfileScreen } from './system_general_profile/system_general_profile';

type AdminTab = 'users' | 'departments' | 'framework' | 'masterProfile';

type Option<T extends string = string> = {
  label: string;
  value: T;
};

type HeaderMeta = {
  title: string;
  subtitle: string;
  icon: LucideIconData;
};

@Component({
  selector: 'app-system-administration',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, ButtonModule, SystemUserScreen, SystemDepartmentsScreen, SystemProjectFrameworkScreen, SystemGeneralProfileScreen, LucideAngularModule],
  templateUrl: './system_administration_screen.html',
  styleUrl: './system_administration_screen.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemAdministrationScreen {
  protected readonly icons = {
    add: UserPlus,
    users: Users,
    departments: Building2,
    framework: Settings,
    masterProfile: FileText,
  };

  activeTab: AdminTab = 'users';

  readonly tabs: Option<AdminTab>[] = [
    { label: 'Quản lý người dùng', value: 'users' },
    { label: 'Quản lý Phòng ban', value: 'departments' },
    { label: 'Cấu hình Khung dự án', value: 'framework' },
    { label: 'Quản lý Hồ sơ tổng', value: 'masterProfile' },
  ];

  protected get headerMeta(): HeaderMeta {
    const mapping: Record<AdminTab, HeaderMeta> = {
      users: {
        title: 'Quản lý người dùng',
        subtitle: 'Quản trị hệ thống • Danh sách & phân quyền người dùng',
        icon: this.icons.users,
      },
      departments: {
        title: 'Quản lý phòng ban',
        subtitle: 'Quản trị hệ thống • Cơ cấu tổ chức & đơn vị',
        icon: this.icons.departments,
      },
      framework: {
        title: 'Cấu hình khung dự án',
        subtitle: 'Quản trị hệ thống • Thiết lập mẫu quy trình công việc',
        icon: this.icons.framework,
      },
      masterProfile: {
        title: 'Quản lý hồ sơ tổng',
        subtitle: 'Quản trị hệ thống • Danh mục hồ sơ và tài liệu dự án',
        icon: this.icons.masterProfile,
      },
    };

    return mapping[this.activeTab];
  }

  // UI mock
  addUser(): void {}
}
