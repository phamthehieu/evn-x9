import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';

import {
  Activity,
  BarChart3,
  BriefcaseBusiness,
  Clock,
  FolderKanban,
  LayoutDashboard,
  Settings,
  TriangleAlert,
  Users,
  LucideAngularModule
} from 'lucide-angular';

type SummaryCard = {
  label: string;
  value: string;
  iconBgClass: string;
  iconTextClass: string;
};

type BarItem = {
  label: string;
  heightPercent: number;
};

type ActivityRow = {
  projectName: string;
  activity: string;
  ownerInitials: string;
  ownerName: string;
  statusLabel: string;
  statusClass: 'success' | 'warning' | 'error';
  progressPercent: number;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CardModule, ButtonModule, TableModule, SelectModule, LucideAngularModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {
  protected readonly icons = {
    brand: Activity,
    overview: LayoutDashboard,
    timesheet: Clock,
    projects: FolderKanban,
    reports: BarChart3,
    admin: Settings,
    totalProjects: BriefcaseBusiness,
    inProgress: Activity,
    slaLate: TriangleAlert,
    workMonth: Users
  };

  readonly timeRanges = [
    { label: 'Tháng này', value: 'thisMonth' as const },
    { label: 'Tháng trước', value: 'lastMonth' as const }
  ];

  selectedTimeRange: (typeof this.timeRanges)[number]['value'] = 'thisMonth';

  readonly summaryCards: SummaryCard[] = [
    { label: 'Tổng số dự án', value: '125', iconBgClass: 'bg-blue-50', iconTextClass: 'text-evn-blue' },
    { label: 'Đang thực hiện', value: '84', iconBgClass: 'bg-green-50', iconTextClass: 'text-green-500' },
    { label: 'Trễ hạn SLA', value: '12', iconBgClass: 'bg-red-50', iconTextClass: 'text-red-500' },
    { label: 'Công tháng này', value: '2.450h', iconBgClass: 'bg-purple-50', iconTextClass: 'text-purple-500' }
  ];

  readonly barItems: BarItem[] = [
    { label: 'ERP', heightPercent: 60 },
    { label: 'Mobile App', heightPercent: 85 },
    { label: 'Cloud', heightPercent: 40 },
    { label: 'AI Chatbot', heightPercent: 30 },
    { label: 'Portal', heightPercent: 55 },
    { label: 'Billing', heightPercent: 70 }
  ];

  readonly activityRows: ActivityRow[] = [
    {
      projectName: 'Hệ thống ERP - Giai đoạn 2',
      activity: 'Cập nhật API module kho',
      ownerInitials: 'NVA',
      ownerName: 'Nguyễn Văn A',
      statusLabel: 'Đúng hạn',
      statusClass: 'success',
      progressPercent: 75
    },
    {
      projectName: 'App Di Động Khách Hàng',
      activity: 'Kiểm thử giao diện UI/UX',
      ownerInitials: 'TTB',
      ownerName: 'Trần Thị B',
      statusLabel: 'Lưu ý',
      statusClass: 'warning',
      progressPercent: 45
    }
  ];

  // Donut segments: đúng tiến độ 65%, lưu ý 25%, trễ 10% (giống mockup)
  readonly donut = {
    success: 65,
    warning: 25,
    error: 10
  };
}

