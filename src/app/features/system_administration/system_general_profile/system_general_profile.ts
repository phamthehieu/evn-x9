import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { LucideAngularModule, CalendarDays, Download, Eye, Search, Trash2, Upload } from 'lucide-angular';

type Option<T extends string = string> = {
  label: string;
  value: T;
};

type DocumentType = 'Bao cao du an' | 'Hop dong' | 'Tai chinh' | 'Ky thuat';

type ProfileDocument = {
  id: number;
  name: string;
  type: DocumentType;
  project: string;
  uploader: string;
  updatedAt: string;
  size: string;
};

@Component({
  selector: 'app-system-general-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    TableModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    LucideAngularModule,
  ],
  templateUrl: './system_general_profile.html',
  styleUrl: './system_general_profile.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemGeneralProfileScreen {
  protected readonly icons = {
    search: Search,
    calendar: CalendarDays,
    upload: Upload,
    view: Eye,
    download: Download,
    delete: Trash2,
  };

  protected searchTerm = '';
  protected selectedProject = 'all';
  protected selectedDepartment = 'all';
  protected selectedRange = '01/01/2024 - 31/12/2024';

  protected readonly projectOptions: Option[] = [
    { label: 'Tat ca du an', value: 'all' },
    { label: 'Nang luong tai tao', value: 'renewable' },
    { label: 'Truyen tai dien', value: 'transmission' },
    { label: 'Xay dung ha tang', value: 'infrastructure' },
  ];

  protected readonly departmentOptions: Option[] = [
    { label: 'Tat ca phong ban', value: 'all' },
    { label: 'Ky thuat', value: 'technical' },
    { label: 'Tai chinh', value: 'finance' },
    { label: 'Ke hoach', value: 'planning' },
  ];

  protected readonly documents: ProfileDocument[] = [
    {
      id: 1,
      name: 'Bao cao kha thi_V1.pdf',
      type: 'Bao cao du an',
      project: 'Dien gio Bac Lieu - Giai doan 3',
      uploader: 'Le Minh Tam',
      updatedAt: '12/03/2024',
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'Hop dong tu van thiet ke.docx',
      type: 'Hop dong',
      project: 'Tram bien ap 500kV Long Thanh',
      uploader: 'Tran Thi Hoa',
      updatedAt: '10/03/2024',
      size: '856 KB',
    },
    {
      id: 3,
      name: 'Bang du toan chi phi 2024.xlsx',
      type: 'Tai chinh',
      project: 'Nhiet dien Quang Trach I',
      uploader: 'Pham Van Nam',
      updatedAt: '05/03/2024',
      size: '1.2 MB',
    },
    {
      id: 4,
      name: 'Ban ve thiet ke ky thuat_final.pdf',
      type: 'Ky thuat',
      project: 'Duong day 500kV mach 3',
      uploader: 'Hoang Anh Tuan',
      updatedAt: '01/03/2024',
      size: '15.8 MB',
    },
  ];

  protected get filteredDocuments(): ProfileDocument[] {
    const keyword = this.searchTerm.trim().toLowerCase();
    return this.documents.filter((doc) => {
      const matchesSearch =
        !keyword || doc.name.toLowerCase().includes(keyword) || doc.project.toLowerCase().includes(keyword);
      const matchesProject = this.selectedProject === 'all' || this.matchProject(doc.project, this.selectedProject);
      const matchesDepartment =
        this.selectedDepartment === 'all' || this.matchDepartment(doc.type, this.selectedDepartment);
      return matchesSearch && matchesProject && matchesDepartment;
    });
  }

  protected get totalDocuments(): number {
    return this.documents.length;
  }

  protected uploadDocument(): void {}

  protected viewDocument(_doc: ProfileDocument): void {}

  protected downloadDocument(_doc: ProfileDocument): void {}

  protected deleteDocument(_doc: ProfileDocument): void {}

  private matchProject(projectName: string, selectedProject: string): boolean {
    const normalized = projectName.toLowerCase();
    if (selectedProject === 'renewable') return normalized.includes('gio');
    if (selectedProject === 'transmission') return normalized.includes('500kv') || normalized.includes('duong day');
    if (selectedProject === 'infrastructure') return normalized.includes('tram');
    return true;
  }

  private matchDepartment(type: DocumentType, selectedDepartment: string): boolean {
    if (selectedDepartment === 'technical') return type === 'Ky thuat';
    if (selectedDepartment === 'finance') return type === 'Tai chinh';
    if (selectedDepartment === 'planning') return type === 'Bao cao du an' || type === 'Hop dong';
    return true;
  }
}
