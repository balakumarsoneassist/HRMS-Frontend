import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpipe',
  pure: false,
})
export class SearchpipePipe implements PipeTransform {
  transform(value: any[], searchstring: string): any[] {
    if (!searchstring || !value || value.length === 0) {
      return value;
    }

    const lowerSearch = searchstring.toLowerCase();

    return value.filter(item => {
      // Check all values of the object
      return Object.values(item).some(val =>
        val !== null &&
        val !== undefined &&
        val.toString().toLowerCase().includes(lowerSearch)
      );
    });
  }
}
