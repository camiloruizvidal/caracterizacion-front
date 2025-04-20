import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EConditions } from '../../interfaces/interface';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface IDateCondition {
  type: 'relative' | 'absolute';
  condition: EConditions;
  years?: number;
  months?: number;
  days?: number;
  endYears?: number;
  endMonths?: number;
  endDays?: number;
  absoluteDate?: NgbDateStruct;
}

@Component({
  selector: 'app-date-condition-selector',
  templateUrl: './date-condition-selector.component.html',
  styleUrls: ['./date-condition-selector.component.scss']
})
export class DateConditionSelectorComponent {
  @Input() condition: IDateCondition = {
    type: 'relative',
    condition: EConditions.MENOR_QUE
  };
  @Output() conditionChange = new EventEmitter<IDateCondition>();

  // Hacemos EConditions disponible en el template
  EConditions = EConditions;

  conditions = [
    { value: EConditions.MENOR_QUE, label: 'Menor que' },
    { value: EConditions.IGUAL_QUE, label: 'Igual que' },
    { value: EConditions.RANGO_FECHA, label: 'Entre' }
  ];

  onInputClick(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      input.select();
    }
  }

  onTypeChange(type: 'relative' | 'absolute') {
    this.condition.type = type;
    this.conditionChange.emit(this.condition);
  }

  onConditionChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.condition.condition = select.value as EConditions;
    this.conditionChange.emit(this.condition);
  }

  onYearsChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.condition.years = input.value ? parseInt(input.value) : undefined;
    this.conditionChange.emit(this.condition);
  }

  onMonthsChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.condition.months = input.value ? parseInt(input.value) : undefined;
    this.conditionChange.emit(this.condition);
  }

  onDaysChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.condition.days = input.value ? parseInt(input.value) : undefined;
    this.conditionChange.emit(this.condition);
  }

  onEndYearsChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.condition.endYears = input.value ? parseInt(input.value) : undefined;
    this.conditionChange.emit(this.condition);
  }

  onEndMonthsChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.condition.endMonths = input.value ? parseInt(input.value) : undefined;
    this.conditionChange.emit(this.condition);
  }

  onEndDaysChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.condition.endDays = input.value ? parseInt(input.value) : undefined;
    this.conditionChange.emit(this.condition);
  }

  onAbsoluteDateChange(date: NgbDateStruct) {
    this.condition.absoluteDate = date;
    this.conditionChange.emit(this.condition);
  }
}
