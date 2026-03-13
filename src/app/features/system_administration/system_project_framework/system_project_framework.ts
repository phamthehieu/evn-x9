
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { TreeTable, TreeTableModule } from 'primeng/treetable';

import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Filter,
  Folder,
  FolderOpen,
  GripVertical,
  Info,
  Link2,
  Paperclip,
  PlusCircle,
  PlusSquare,
  Save,
  Search,
  Settings,
  Trash2,
  Upload,
  LucideAngularModule,
} from 'lucide-angular';

type DeliveryUnitOption = { label: string; value: string };

type WbsRow = {
  code: string;
  name: string;
  unit: string;
  slaDays: number;
  pre?: string;
  hasAttachment?: boolean;
};

type NodeContext = {
  list: TreeNode<WbsRow>[];
  index: number;
  node: TreeNode<WbsRow>;
};

type DropPlacement = 'before' | 'after';
type FrameworkTemplate = {
  id: string;
  name: string;
  typeCode?: string;
  createdBy?: string;
  description: string;
  workItems: number;
  slaDays: number;
  popular?: boolean;
};

type NewFrameworkTemplateForm = {
  name: string;
  typeCode: string;
  createdBy: string;
  description: string;
};

@Component({
  selector: 'app-system-project-framework',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    TreeTableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    InputNumberModule,
    TagModule,
    LucideAngularModule,
  ],
  templateUrl: './system_project_framework.html',
  styleUrl: './system_project_framework.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemProjectFrameworkScreen {
  @ViewChild('wbsTreeTable') private readonly wbsTreeTable?: TreeTable;
  @ViewChild('treeScrollContainer') private readonly treeScrollContainer?: ElementRef<HTMLElement>;

  protected readonly icons = {
    search: Search,
    collapsePanel: ChevronLeft,
    expandPanel: ChevronRight,
    expandAll: ChevronDown,
    collapseAll: ChevronUp,
    filter: Filter,
    settings: Settings,
    download: Download,
    save: Save,
    grip: GripVertical,
    folder: Folder,
    folderOpen: FolderOpen,
    file: FileText,
    upload: Upload,
    paperclip: Paperclip,
    link: Link2,
    add: PlusSquare,
    addCircle: PlusCircle,
    delete: Trash2,
    info: Info,
  };

  protected readonly deliveryUnitOptions: DeliveryUnitOption[] = [
    { label: 'Ban Giám Đốc', value: 'Ban Giám Đốc' },
    { label: 'Phòng Kế Hoạch', value: 'Phòng Kế Hoạch' },
    { label: 'Phòng Kỹ Thuật', value: 'Phòng Kỹ Thuật' },
    { label: 'BA Team', value: 'BA Team' },
    { label: 'BA Junior', value: 'BA Junior' },
  ];

  protected searchValue = '';
  protected frameworkSearchValue = '';
  protected isFrameworkListCollapsed = false;
  protected selectedFrameworkId: string | null = null;
  protected draggedNodeKey: string | null = null;
  protected dragOverNodeKey: string | null = null;
  protected dragOverPlacement: DropPlacement = 'before';
  private dragGhostEl: HTMLElement | null = null;
  protected isCreateFrameworkDialogOpen = false;
  protected readonly defaultTemplateSummary = {
    workItems: 14,
    slaDays: 45,
  };
  protected newFrameworkTemplateForm: NewFrameworkTemplateForm = this.getDefaultTemplateForm();

  protected wbsNodes: TreeNode<WbsRow>[] = [
    {
      key: '1',
      data: {
        code: '1.0',
        name: 'Khởi tạo và Lập kế hoạch dự án',
        unit: 'Ban Giám Đốc',
        slaDays: 12,
      },
      expanded: true,
      children: [
        {
          key: '1.1',
          data: {
            code: '1.1',
            name: 'Xác định phạm vi dự án',
            unit: 'Phòng Kế Hoạch',
            slaDays: 5,
            pre: '1.0',
            hasAttachment: true,
          },
          expanded: true,
          children: [
            {
              key: '1.1.1',
              data: {
                code: '1.1.1',
                name: 'Thu thập yêu cầu stakeholder',
                unit: 'BA Team',
                slaDays: 3,
                pre: '1.1',
                hasAttachment: true,
              },
              expanded: true,
              children: [
                {
                  key: '1.1.1.1',
                  data: {
                    code: '1.1.1.1',
                    name: 'Phỏng vấn người dùng cuối',
                    unit: 'BA Junior',
                    slaDays: 2,
                    hasAttachment: true,
                  },
                },
              ],
            },
          ],
        },
        {
          key: '1.2',
          data: {
            code: '1.2',
            name: 'Thiết kế kiến trúc hệ thống',
            unit: 'Phòng Kỹ Thuật',
            slaDays: 7,
            pre: '1.1',
            hasAttachment: true,
          },
          expanded: true,
        },
      ],
    },
  ];

  protected readonly frameworkTemplates: FrameworkTemplate[] = [
    {
      id: 'project-type-a',
      name: 'Dự án Loại A',
      description: 'Quy trình chuẩn cho các dự án hạ tầng lưới điện trọng điểm cấp 1.',
      workItems: 12,
      slaDays: 45,
      popular: true,
    },
    {
      id: 'project-type-b',
      name: 'Dự án Loại B',
      description: 'Quy trình rút gọn cho dự án bảo trì, sửa chữa lưới điện trung thế.',
      workItems: 8,
      slaDays: 20,
    },
    {
      id: 'project-type-c',
      name: 'Dự án Loại C',
      description: 'Cấu trúc mẫu cho các dự án công nghệ thông tin và chuyển đổi số.',
      workItems: 15,
      slaDays: 60,
    },
  ];

  protected get filteredFrameworkTemplates(): FrameworkTemplate[] {
    const keyword = this.frameworkSearchValue.trim().toLowerCase();
    if (!keyword) return this.frameworkTemplates;
    return this.frameworkTemplates.filter(
      (item) =>
        item.name.toLowerCase().includes(keyword) || item.description.toLowerCase().includes(keyword),
    );
  }

  protected get hasSelectedFramework(): boolean {
    return !!this.selectedFrameworkId;
  }

  protected get totalWorkItems(): number {
    return this.countNodes(this.wbsNodes);
  }

  protected get totalSlaDays(): number {
    return this.sumSlaDays(this.wbsNodes);
  }

  protected applySearch(value: string): void {
    this.searchValue = value;
    this.wbsTreeTable?.filterGlobal(value, 'contains');
  }

  protected toggleFrameworkList(): void {
    this.isFrameworkListCollapsed = !this.isFrameworkListCollapsed;
  }

  protected selectFrameworkTemplate(item: FrameworkTemplate): void {
    this.selectedFrameworkId = item.id;
  }

  protected createFrameworkTemplate(): void {
    this.newFrameworkTemplateForm = this.getDefaultTemplateForm();
    this.isCreateFrameworkDialogOpen = true;
  }

  protected closeCreateFrameworkDialog(): void {
    this.isCreateFrameworkDialogOpen = false;
  }

  protected submitCreateFrameworkTemplate(): void {
    const templateName = this.newFrameworkTemplateForm.name.trim();
    const typeCode = this.newFrameworkTemplateForm.typeCode.trim();
    const description = this.newFrameworkTemplateForm.description.trim();
    if (!templateName || !typeCode) return;

    const item: FrameworkTemplate = {
      id: `project-type-${Date.now()}`,
      name: templateName,
      typeCode,
      createdBy: this.newFrameworkTemplateForm.createdBy,
      description:
        description || 'Khung dự án mới được tạo. Vui lòng cập nhật thông tin và cấu trúc đầu việc.',
      workItems: this.defaultTemplateSummary.workItems,
      slaDays: this.defaultTemplateSummary.slaDays,
      popular: false,
    };

    this.frameworkTemplates.unshift(item);
    this.selectedFrameworkId = item.id;
    this.frameworkSearchValue = '';
    this.isCreateFrameworkDialogOpen = false;
  }

  protected expandAll(): void {
    this.setExpandedRecursive(this.wbsNodes, true);
    this.wbsNodes.forEach((n) => (n.expanded = true));
  }

  protected collapseAll(): void {
    this.setExpandedRecursive(this.wbsNodes, false);
  }

  protected isFolder(node: TreeNode<WbsRow> | { node: TreeNode<WbsRow> }): boolean {
    const normalizedNode = this.getNode(node);
    return !!normalizedNode?.children?.length;
  }

  protected addChild(node: TreeNode<WbsRow> | { node: TreeNode<WbsRow> }): void {
    const normalizedNode = this.getNode(node);
    if (!normalizedNode) return;

    const parentCode = normalizedNode.data?.code ?? '';
    const nextIdx = (normalizedNode.children?.length ?? 0) + 1;
    const childCode = parentCode ? `${parentCode}.${nextIdx}` : `${nextIdx}`;

    const child: TreeNode<WbsRow> = {
      key: `${normalizedNode.key ?? 'x'}.${nextIdx}`,
      data: {
        code: childCode,
        name: 'Đầu việc mới',
        unit: this.deliveryUnitOptions[0]?.value ?? 'Ban Giám Đốc',
        slaDays: 1,
      },
    };

    normalizedNode.children = [...(normalizedNode.children ?? []), child];
    normalizedNode.expanded = true;
    this.refreshTree();
  }

  protected addRootItem(): void {
    const nextIdx = this.wbsNodes.length + 1;
    this.wbsNodes.push({
      key: `${nextIdx}`,
      data: {
        code: `${nextIdx}.0`,
        name: 'Danh mục công việc mới',
        unit: this.deliveryUnitOptions[0]?.value ?? 'Ban Giám Đốc',
        slaDays: 1,
      },
      expanded: true,
      children: [],
    });
    this.refreshTree();
  }

  protected removeNode(node: TreeNode<WbsRow> | { node: TreeNode<WbsRow> }): void {
    const normalizedNode = this.getNode(node);
    if (!normalizedNode?.key) return;
    if (this.removeNodeRecursive(this.wbsNodes, normalizedNode.key)) {
      this.refreshTree();
    }
  }

  protected getNodeLevel(node: TreeNode<WbsRow> | { node: TreeNode<WbsRow> }): number {
    const n = this.getNode(node);
    if (!n?.key) return 1;
    return n.key.split('.').length;
  }

  protected isSlaReadonly(node: TreeNode<WbsRow> | { node: TreeNode<WbsRow> }): boolean {
    const n = this.getNode(node);
    return !!n?.children?.length;
  }

  protected getLevelIcon(node: TreeNode<WbsRow> | { node: TreeNode<WbsRow> }) {
    const level = this.getNodeLevel(node);
    if (level === 1) return this.icons.settings;
    if (level === 2) return this.icons.folder;
    if (level === 3) return this.icons.link;
    return this.icons.file;
  }

  protected onGripDragStart(
    event: DragEvent,
    node: TreeNode<WbsRow> | { node: TreeNode<WbsRow> },
  ): void {
    const normalizedNode = this.getNode(node);
    if (!normalizedNode?.key) return;

    this.draggedNodeKey = normalizedNode.key;
    this.dragOverNodeKey = null;
    this.dragOverPlacement = 'before';

    const sourceRow = (event.currentTarget as HTMLElement | null)?.closest('tr') ?? null;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', normalizedNode.key);
      this.dragGhostEl = this.createDragGhost(sourceRow);
      if (this.dragGhostEl) {
        event.dataTransfer.setDragImage(this.dragGhostEl, 24, 18);
      }
    }
  }

  protected onGripDragEnd(): void {
    this.draggedNodeKey = null;
    this.dragOverNodeKey = null;
    this.dragOverPlacement = 'before';
    this.cleanupDragGhost();
  }

  @HostListener('document:dragend')
  protected onDocumentDragEnd(): void {
    if (!this.draggedNodeKey) return;
    this.onGripDragEnd();
  }

  @HostListener('document:drop')
  protected onDocumentDrop(): void {
    if (!this.draggedNodeKey) return;
    // Defer one tick to avoid racing with row drop handlers.
    queueMicrotask(() => this.onGripDragEnd());
  }

  @HostListener('document:keydown.escape')
  protected onDocumentEscape(): void {
    if (!this.draggedNodeKey) return;
    this.onGripDragEnd();
  }

  @HostListener('document:mouseup')
  protected onDocumentMouseUp(): void {
    if (!this.draggedNodeKey) return;
    this.onGripDragEnd();
  }

  @HostListener('window:blur')
  protected onWindowBlur(): void {
    if (!this.draggedNodeKey) return;
    this.onGripDragEnd();
  }

  protected onRowDragOver(
    event: DragEvent,
    node: TreeNode<WbsRow> | { node: TreeNode<WbsRow> },
  ): void {
    if (!this.draggedNodeKey) return;
    const normalizedNode = this.getNode(node);
    if (!normalizedNode?.key || normalizedNode.key === this.draggedNodeKey) return;

    event.preventDefault();
    this.autoScrollWhileDragging(event);

    const placement = this.getDropPlacement(event);
    this.dragOverNodeKey = normalizedNode.key;
    this.dragOverPlacement = placement;
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';

    const sourceCtx = this.findNodeContextByKey(this.wbsNodes, this.draggedNodeKey);
    const targetCtx = this.findNodeContextByKey(this.wbsNodes, normalizedNode.key);
    if (!sourceCtx || !targetCtx || sourceCtx.list !== targetCtx.list) return;

    let targetIndex = targetCtx.index + (placement === 'after' ? 1 : 0);
    if (sourceCtx.index < targetIndex) targetIndex -= 1;
    if (targetIndex === sourceCtx.index) return;

    const [movedNode] = sourceCtx.list.splice(sourceCtx.index, 1);
    sourceCtx.list.splice(targetIndex, 0, movedNode);
    this.refreshTree();
  }

  protected onRowDrop(event: DragEvent, node: TreeNode<WbsRow> | { node: TreeNode<WbsRow> }): void {
    event.preventDefault();
    const normalizedNode = this.getNode(node);
    if (!this.draggedNodeKey || !normalizedNode?.key || this.draggedNodeKey === normalizedNode.key) {
      this.onGripDragEnd();
      return;
    }

    this.onGripDragEnd();
  }

  protected isDragOver(node: TreeNode<WbsRow> | { node: TreeNode<WbsRow> }): boolean {
    const normalizedNode = this.getNode(node);
    return !!normalizedNode?.key && this.dragOverNodeKey === normalizedNode.key;
  }

  protected isDragOverBefore(node: TreeNode<WbsRow> | { node: TreeNode<WbsRow> }): boolean {
    return this.isDragOver(node) && this.dragOverPlacement === 'before';
  }

  protected isDragOverAfter(node: TreeNode<WbsRow> | { node: TreeNode<WbsRow> }): boolean {
    return this.isDragOver(node) && this.dragOverPlacement === 'after';
  }

  protected isDragging(node: TreeNode<WbsRow> | { node: TreeNode<WbsRow> }): boolean {
    const normalizedNode = this.getNode(node);
    return !!normalizedNode?.key && this.draggedNodeKey === normalizedNode.key;
  }

  protected exportExcel(): void {}
  protected saveWorkflow(): void {}
  protected cancelConfig(): void {}
  protected activateWorkflow(): void {}
  protected openFilter(): void {}
  protected openSettings(): void {}

  private setExpandedRecursive(nodes: TreeNode<WbsRow>[], expanded: boolean): void {
    nodes.forEach((n) => {
      n.expanded = expanded;
      if (n.children?.length) this.setExpandedRecursive(n.children, expanded);
    });
  }

  private countNodes(nodes: TreeNode<WbsRow>[]): number {
    return nodes.reduce(
      (acc, n) => acc + 1 + (n.children?.length ? this.countNodes(n.children) : 0),
      0,
    );
  }

  private sumSlaDays(nodes: TreeNode<WbsRow>[]): number {
    return nodes.reduce((acc, n) => {
      const val = n.data?.slaDays ?? 0;
      return acc + val + (n.children?.length ? this.sumSlaDays(n.children) : 0);
    }, 0);
  }

  private removeNodeRecursive(nodes: TreeNode<WbsRow>[], key: string): boolean {
    const idx = nodes.findIndex((n) => n.key === key);
    if (idx >= 0) {
      nodes.splice(idx, 1);
      return true;
    }
    for (const n of nodes) {
      if (n.children?.length && this.removeNodeRecursive(n.children, key)) return true;
    }
    return false;
  }

  private findNodeContextByKey(nodes: TreeNode<WbsRow>[], key: string): NodeContext | null {
    const index = nodes.findIndex((n) => n.key === key);
    if (index >= 0) {
      return { list: nodes, index, node: nodes[index] };
    }
    for (const n of nodes) {
      if (!n.children?.length) continue;
      const found = this.findNodeContextByKey(n.children, key);
      if (found) return found;
    }
    return null;
  }

  private getDropPlacement(event: DragEvent): DropPlacement {
    const targetElement = event.currentTarget as HTMLElement | null;
    const targetRect = targetElement?.getBoundingClientRect();
    if (!targetRect) return 'before';
    return event.clientY >= targetRect.top + targetRect.height / 2 ? 'after' : 'before';
  }

  private autoScrollWhileDragging(event: DragEvent): void {
    const container = this.treeScrollContainer?.nativeElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const threshold = 48;
    const step = 18;

    if (event.clientY < rect.top + threshold) {
      container.scrollTop -= step;
    } else if (event.clientY > rect.bottom - threshold) {
      container.scrollTop += step;
    }
  }

  private createDragGhost(sourceRow: Element | null): HTMLElement | null {
    if (!sourceRow) return null;

    const ghost = document.createElement('div');
    ghost.className = 'wbs-drag-ghost';
    ghost.textContent = sourceRow.textContent?.replace(/\s+/g, ' ').trim() ?? '';
    ghost.style.maxWidth = '560px';
    ghost.style.padding = '10px 14px';
    ghost.style.borderRadius = '10px';
    ghost.style.border = '1px solid rgba(56, 83, 164, 0.32)';
    ghost.style.background = '#fff';
    ghost.style.color = 'rgba(15, 23, 42, 0.92)';
    ghost.style.boxShadow = '0 12px 28px rgba(15, 23, 42, 0.25)';
    ghost.style.fontSize = '13px';
    ghost.style.fontWeight = '700';
    ghost.style.whiteSpace = 'nowrap';
    ghost.style.overflow = 'hidden';
    ghost.style.textOverflow = 'ellipsis';
    ghost.style.pointerEvents = 'none';
    ghost.style.position = 'fixed';
    ghost.style.top = '-1000px';
    ghost.style.left = '-1000px';
    document.body.appendChild(ghost);
    return ghost;
  }

  private cleanupDragGhost(): void {
    this.dragGhostEl?.remove();
    this.dragGhostEl = null;
  }

  private refreshTree(): void {
    this.recalculateWbsCodes(this.wbsNodes);
    this.wbsNodes = [...this.wbsNodes];
  }

  private recalculateWbsCodes(nodes: TreeNode<WbsRow>[], parentCode?: string): void {
    nodes.forEach((node, index) => {
      const position = index + 1;
      const code = this.buildWbsCode(parentCode, position);
      if (node.data) node.data.code = code;
      if (node.children?.length) this.recalculateWbsCodes(node.children, code);
    });
  }

  private buildWbsCode(parentCode: string | undefined, position: number): string {
    if (!parentCode) return `${position}.0`;
    const parentPrefix = parentCode.endsWith('.0')
      ? parentCode.slice(0, -2)
      : parentCode;
    return `${parentPrefix}.${position}`;
  }

  private getNode(node: TreeNode<WbsRow> | { node: TreeNode<WbsRow> }): TreeNode<WbsRow> | null {
    if (!node) return null;
    return 'node' in node ? node.node : node;
  }

  private getDefaultTemplateForm(): NewFrameworkTemplateForm {
    return {
      name: '',
      typeCode: '',
      createdBy: 'Phòng Kỹ Thuật',
      description: '',
    };
  }
}
