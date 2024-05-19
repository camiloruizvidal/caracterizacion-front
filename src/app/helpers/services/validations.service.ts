import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {
  constructor() {}

  public isVisibility(
    itemInputs: any,
    card: any,
    isCamelCase = false
  ): boolean {
    let isVisibility: boolean = true;
    if (typeof itemInputs.visibility === 'boolean') {
      return itemInputs.visibility;
    } else if (itemInputs.visibility && itemInputs.visibility?.rules) {
      isVisibility = this.isValidatedRules(
        itemInputs.visibility,
        card,
        isCamelCase
      );
    }
    return isVisibility;
  }

  private esRangoFechaValido(valueForm: any, rule: any): boolean {
    return true;
  }

  private isValidatedRules(
    visibility: any,
    card: any,
    isCamelCase = false
  ): boolean {
    let isVisilty = true;
    return isVisilty; //TODO Validaciones no funcionan en detalle.components.ts
    visibility?.rules?.forEach((rule: any) => {
      const valueForm = this.searchValueFromColumn(rule.columnDepend, card);
      switch (rule.rule) {
        case '=':
          isVisilty = valueForm?.value === rule.value;
          break;
        case 'rangoFecha':
          isVisilty = this.esRangoFechaValido(valueForm?.value, rule.value);
          break;
      }
    });

    return isVisilty;
  }

  private searchValueFromColumn(columnName: string, card: any) {
    return card.values.find((values: any) => values.columnName === columnName);
  }

  public snakeCaseToCamelCase(text: string) {
    return text.replace(/_([a-z])/g, function (match, group1) {
      return group1.toUpperCase();
    });
  }
}
