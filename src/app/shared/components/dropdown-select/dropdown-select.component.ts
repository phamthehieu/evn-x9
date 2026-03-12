import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface DropdownOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-dropdown-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-select.component.html',
  styleUrl: './dropdown-select.component.scss',
})
export class DropdownSelectComponent {
  @Input() placeholder = 'All';

  @Input() options: DropdownOption[] = [
    { value: 'all', label: 'All' },
    { value: 'option-1', label: 'option-1' },
    { value: 'option-2', label: 'option-2' },
    { value: 'option-3', label: 'option-3' },
  ];

  @Input() value: string | null = 'all';
  @Output() valueChange = new EventEmitter<string>();

  isOpen = false;

  get selectedLabel(): string {
    const found = this.options.find((o) => o.value === this.value);
    return found ? found.label : this.placeholder;
  }

  toggleOpen(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.isOpen = !this.isOpen;
  }

  select(option: DropdownOption, event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.value = option.value;
    this.valueChange.emit(option.value);
    this.isOpen = false;
  }
}

