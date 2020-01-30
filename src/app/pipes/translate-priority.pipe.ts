import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'translatePriority' })
export class TranslatePriorityPipe implements PipeTransform {

  transform(value: string, byColor: boolean): string {
    switch (value) {
      case 'high':
        return byColor ? 'danger' : 'alta';

      case 'medium':
        return byColor ? 'warning' : 'media';

      case 'low':
        return byColor ? 'success' : 'baixa';

      default:
        return 'sem prioridade';
    }
  }
}