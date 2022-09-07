import { Component } from '@angular/core';
import { parse as csvParse } from 'papaparse';
import { vocabulary } from "./vocabulary";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calCalculator';
  rows?: string[][];

  onUpload(target: any) {
    const file = (target as HTMLInputElement).files?.item(0);

    if (file) csvParse(file as any, {
      dynamicTyping: false,
      step: undefined,
      complete: results => {
        console.log("Parsing complete:", results);
        if (results.data.length) this.processData(results.data as any);
        else console.error('Empty file provided');
      },
      skipEmptyLines: true,
      fastMode: undefined,
      transform: undefined,
    })
  }

  processData(data: string[][]) {
    // if (String(results.data[0]).includes('פירוט')) console.log('file format is correct');

    if (data[0].length === 1) {
      data.pop();
      data.shift();
      data.shift();
      data.shift();
    }

    data.forEach(line => {
      if (line.length < 5) line.push('');
      const translationItem = vocabulary.find(item => line[1].includes(item.keyword));
      if (translationItem) line.push(translationItem.translation)
    })

    this.rows = data;
  }



}
