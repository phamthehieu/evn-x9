import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';

import { Lock, LockOpen, Pencil, Search, UserPlus, Users, LucideAngularModule } from 'lucide-angular';

type AdminTab = 'users' | 'departments' | 'framework' | 'masterProfile';

type Option<T extends string = string> = {
  label: string;
  value: T;
};

type UserRole = 'ADMIN' | 'MANAGER' | 'USER';

type UserRow = {
  name: string;
  email: string;
  department: string;
  orgUnit: string;
  role: UserRole;
  locked: boolean;
  initials: string;
};

@Component({
  selector: 'app-system-administration',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, ButtonModule, TableModule, SelectModule, LucideAngularModule],
  templateUrl: './system_administration_screen.html',
  styleUrl: './system_administration_screen.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemAdministrationScreen {
  protected readonly icons = {
    header: Users,
    search: Search,
    add: UserPlus,
    edit: Pencil,
    lock: Lock,
    unlock: LockOpen,
  };

  activeTab: AdminTab = 'users';

  readonly tabs: Option<AdminTab>[] = [
    { label: 'Quản lý người dùng', value: 'users' },
    { label: 'Quản lý Phòng ban', value: 'departments' },
    { label: 'Cấu hình Khung dự án', value: 'framework' },
    { label: 'Quản lý Hồ sơ tổng', value: 'masterProfile' },
  ];

  searchTerm = '';

  readonly departmentOptions: Option<string>[] = [
    { label: 'Tất cả Phòng ban', value: 'all' },
    { label: 'Phòng Kỹ thuật', value: 'kt' },
    { label: 'Phòng Kế hoạch', value: 'kh' },
    { label: 'Phòng Hành chính', value: 'hc' },
    { label: 'Ban Viễn thông', value: 'vt' },
    { label: 'Ban Pháp chế', value: 'pc' },
  ];

  selectedDepartment: (typeof this.departmentOptions)[number]['value'] = 'all';

  readonly users: UserRow[] = [
    {
      name: 'Nguyễn Văn An',
      email: 'annv@evn.com.vn',
      department: 'Phòng Kỹ thuật',
      orgUnit: 'Tổng công ty',
      role: 'ADMIN',
      locked: true,
      initials: 'NVA',
    },
    {
      name: 'Trần Thị Bình',
      email: 'binhtt@evn.com.vn',
      department: 'Phòng Kế hoạch',
      orgUnit: 'Điện lực Miền Bắc',
      role: 'MANAGER',
      locked: true,
      initials: 'TTB',
    },
    {
      name: 'Lê Văn Cường',
      email: 'cuonglv@evn.com.vn',
      department: 'Ban Viễn thông',
      orgUnit: 'Tổng công ty',
      role: 'USER',
      locked: false,
      initials: 'LVC',
    },
    {
      name: 'Phạm Minh Đức',
      email: 'ducpm@evn.com.vn',
      department: 'Phòng Kỹ thuật',
      orgUnit: 'Điện lực Miền Trung',
      role: 'USER',
      locked: true,
      initials: 'PMD',
    },
    {
      name: 'Hoàng Thị Hoa',
      email: 'hoaht@evn.com.vn',
      department: 'Ban Pháp chế',
      orgUnit: 'Tổng công ty',
      role: 'USER',
      locked: true,
      initials: 'HTH',
    },
  ];

  get filteredUsers(): UserRow[] {
    return this.users.filter((u) => {
      const term = this.searchTerm.trim().toLowerCase();
      const matchesSearch = !term || u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term);

      const matchesDepartment =
        this.selectedDepartment === 'all'
          ? true
          : u.department.toLowerCase().includes(this.departmentLabel(this.selectedDepartment).toLowerCase());

      return matchesSearch && matchesDepartment;
    });
  }

  roleLabel(role: UserRole): string {
    return role;
  }

  departmentLabel(value: string): string {
    return this.departmentOptions.find((d) => d.value === value)?.label ?? '';
  }

  // UI mock
  addUser(): void {}
  editUser(_row: UserRow): void {}
  toggleLock(_row: UserRow): void {}
}
