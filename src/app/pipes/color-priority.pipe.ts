import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'colorPriority' })
export class ColorPriorityPipe implements PipeTransform {

  transform(value: string, byColor: boolean): string {
    switch (value) {
      case 'high':
        return 'danger';

      case 'medium':
        return 'warning';

      case 'low':
        return 'success';

      default:
        return 'success';
    }
  }
}