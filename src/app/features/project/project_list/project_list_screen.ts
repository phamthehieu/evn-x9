import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';

import {
  CalendarDays,
  EllipsisVertical,
  ListTodo,
  Search,
  UserRound,
  LucideAngularModule,
} from 'lucide-angular';

type ProjectStatus = 'inProgress' | 'completed' | 'overdue';

type ProjectRow = {
  name: string;
  code: string;
  leaderName: string;
  leaderInitials: string;
  startDate: string;
  deadline: string;
  status: ProjectStatus;
};

type StatusFilterOption = {
  label: string;
  value: 'all' | ProjectStatus;
};

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, ButtonModule, TableModule, SelectModule, LucideAngularModule],
  templateUrl: './project_list_screen.html',
  styleUrl: './project_list_screen.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListScreen {
  protected readonly icons = {
    header: ListTodo,
    date: CalendarDays,
    search: Search,
    leader: UserRound,
    more: EllipsisVertical,
  };

  readonly statusTabs: StatusFilterOption[] = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Đang thực hiện', value: 'inProgress' },
    { label: 'Hoàn thành', value: 'completed' },
    { label: 'Trễ hạn', value: 'overdue' },
  ];

  statusFilter: StatusFilterOption['value'] = 'all';
  searchTerm = '';

  readonly projects: ProjectRow[] = [
    {
      name: 'Xây dựng Trạm biến áp 110kV',
      code: 'DA-2023-001',
      leaderName: 'Lê Hồng Nam',
      leaderInitials: 'LHN',
      startDate: '10/01/2023',
      deadline: '20/12/2023',
      status: 'inProgress',
    },
    {
      name: 'Nâng cấp hệ thống lưới điện',
      code: 'DA-2023-002',
      leaderName: 'Trần Văn Bình',
      leaderInitials: 'TVB',
      startDate: '05/02/2023',
      deadline: '15/11/2023',
      status: 'completed',
    },
    {
      name: 'Bảo trì định kỳ khu vực Phía Nam',
      code: 'DA-2023-003',
      leaderName: 'Phạm Thu Hà',
      leaderInitials: 'PTH',
      startDate: '01/03/2023',
      deadline: '30/10/2023',
      status: 'overdue',
    },
    {
      name: 'Lắp đặt hệ thống năng lượng mặt trời',
      code: 'DA-2023-004',
      leaderName: 'Nguyễn Minh Quân',
      leaderInitials: 'NMQ',
      startDate: '15/05/2023',
      deadline: '10/01/2024',
      status: 'inProgress',
    },
  ];

  get filteredProjects(): ProjectRow[] {
    return this.projects.filter((project) => {
      const matchesStatus =
        this.statusFilter === 'all'
          ? true
          : project.status === this.statusFilter;

      const term = this.searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        project.name.toLowerCase().includes(term) ||
        project.code.toLowerCase().includes(term) ||
        project.leaderName.toLowerCase().includes(term);

      return matchesStatus && matchesSearch;
    });
  }

  statusChipLabel(status: ProjectStatus): string {
    if (status === 'inProgress') return 'ĐANG THỰC HIỆN';
    if (status === 'completed') return 'HOÀN THÀNH';
    return 'TRỄ HẠN';
  }
}
