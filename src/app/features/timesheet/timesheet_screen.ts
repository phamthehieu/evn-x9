import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';

import { ClipboardPenLine, History, Send, SquareCheckBig, Timer, LucideAngularModule } from 'lucide-angular';

type Option<T extends string = string> = {
  label: string;
  value: T;
};

type TimesheetRow = {
  date: string; // dd/MM
  weekday: string;
  project: string;
  content: string;
  hours: number;
  status: 'approved' | 'pending' | 'rejected';
};

@Component({
  selector: 'app-timesheet',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, ButtonModule, TableModule, SelectModule, LucideAngularModule],
  templateUrl: './timesheet_screen.html',
  styleUrl: './timesheet_screen.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetScreen {
  protected readonly icons = {
    form: ClipboardPenLine,
    history: History,
    send: Send,
    summary: Timer,
    approved: SquareCheckBig,
  };

  readonly projectOptions: Option[] = [
    { label: 'Dự án Lưới điện Miền Trung', value: 'grid' },
    { label: 'Dự án Trạm biến áp 500kV', value: 'tba500' },
    { label: 'Phát triển App ProManage', value: 'promanage' },
  ];

  readonly activityOptions: Option[] = [
    { label: 'Khảo sát hiện trường', value: 'survey' },
    { label: 'Thiết kế bản vẽ', value: 'design' },
    { label: 'Họp tiến độ', value: 'meeting' },
    { label: 'Kiểm tra kỹ thuật', value: 'qa' },
  ];

  selectedProject = this.projectOptions[0]?.value ?? '';
  selectedActivity = this.activityOptions[0]?.value ?? '';
  taskContent = '';
  startTime = '08:00';
  endTime = '17:30';

  readonly rangeOptions: Option<'thisWeek' | 'lastWeek'>[] = [
    { label: 'Tuần này', value: 'thisWeek' },
    { label: 'Tuần trước', value: 'lastWeek' },
  ];
  selectedRange: (typeof this.rangeOptions)[number]['value'] = 'thisWeek';

  readonly rows: TimesheetRow[] = [
    {
      date: '14/05',
      weekday: 'Chủ nhật',
      project: 'Lưới điện Miền Trung',
      content: 'Phân tích dữ liệu vận hành tháng 4...',
      hours: 8.0,
      status: 'approved',
    },
    {
      date: '13/05',
      weekday: 'Thứ Bảy',
      project: 'Trạm TBA 500kV',
      content: 'Kiểm tra bảo dưỡng thiết bị định kỳ',
      hours: 4.5,
      status: 'pending',
    },
    {
      date: '12/05',
      weekday: 'Thứ Sáu',
      project: 'App ProManage',
      content: 'Fix bug màn hình timesheet',
      hours: 8.5,
      status: 'approved',
    },
    {
      date: '11/05',
      weekday: 'Thứ Năm',
      project: 'Trạm TBA 500kV',
      content: 'Họp khảo sát trạm mới',
      hours: 2.0,
      status: 'rejected',
    },
  ];

  get todayLabel(): string {
    return new Date().toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  get todayHours(): number {
    // mock
    return 8.5;
  }

  get approvedHours(): number {
    return this.rows.filter((r) => r.status === 'approved').reduce((sum, r) => sum + r.hours, 0);
  }

  get pendingHours(): number {
    return this.rows.filter((r) => r.status === 'pending').reduce((sum, r) => sum + r.hours, 0);
  }

  get weekTotalHours(): number {
    return this.rows.reduce((sum, r) => sum + r.hours, 0);
  }

  submit(): void {
    // UI mock: để trống, sau này nối API
  }

  statusLabel(status: TimesheetRow['status']): string {
    if (status === 'approved') return 'Đã duyệt';
    if (status === 'pending') return 'Đang chờ';
    return 'Từ chối';
  }
}

