import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroCompletado',
  pure: false
})
export class FiltersPipe implements PipeTransform {

  transform(list: Array<Lista>, complete: boolean = true): Array<Lista> {
    return list.filter(data => data.finish === complete);
  }

}
