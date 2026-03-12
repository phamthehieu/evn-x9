import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import {
  Building2,
  Network,
  Users,
  ClipboardList,
  History,
  CheckCircle2,
  LucideAngularModule
} from 'lucide-angular';

type PermissionRole = 'ADMIN' | 'MANAGER' | 'USER' | 'VIEWER';

type PermissionRow = {
  feature: string;
  description: string;
  permissions: Record<PermissionRole, boolean>;
};

type DepartmentInfo = {
  code: string;
  name: string;
  head: string;
  memberCount: number;
};

@Component({
  selector: 'app-system-departments',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, ButtonModule, LucideAngularModule],
  templateUrl: './system_departments.html',
  styleUrl: './system_departments.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SystemDepartmentsScreen {
  protected readonly icons = {
    org: Network,
    building: Building2,
    users: Users,
    history: History,
    feature: ClipboardList,
    check: CheckCircle2
  };

  readonly selectedDepartment: DepartmentInfo = {
    code: 'EVN-TECH-01',
    name: 'Phòng Kỹ thuật',
    head: 'Lê Quang Minh',
    memberCount: 24
  };

  readonly permissionRows: PermissionRow[] = [
    {
      feature: 'Quản lý dự án',
      description: 'Cho phép tạo, sửa, xóa dự án kỹ thuật',
      permissions: {
        ADMIN: true,
        MANAGER: true,
        USER: false,
        VIEWER: false
      }
    },
    {
      feature: 'Khai báo Timesheet',
      description: 'Ghi nhận giờ làm việc hàng ngày',
      permissions: {
        ADMIN: true,
        MANAGER: true,
        USER: true,
        VIEWER: false
      }
    },
    {
      feature: 'Xem báo cáo',
      description: 'Xem các báo cáo tiến độ và hiệu suất',
      permissions: {
        ADMIN: true,
        MANAGER: true,
        USER: true,
        VIEWER: true
      }
    },
    {
      feature: 'Quản trị Admin',
      description: 'Phân quyền và cấu hình hệ thống',
      permissions: {
        ADMIN: true,
        MANAGER: false,
        USER: false,
        VIEWER: false
      }
    }
  ];

  hasPermission(row: PermissionRow, role: PermissionRole): boolean {
    return !!row.permissions[role];
  }

  // UI mock: nối API sau
  cancel(): void {}
  save(): void {}
}

