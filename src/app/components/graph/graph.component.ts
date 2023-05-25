import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from "@swimlane/ngx-charts";

type GraphData = { name: string, value: number };

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
  chartData: GraphData[] = [];
  activeCategory: any;

  @Output() messageEvent = new EventEmitter<string>();

  onCategorySelect({name}: GraphData) {
    this.activeCategory = [{ name,  value: '#ff6200' }];
    this.messageEvent.emit(name);
  }
}
