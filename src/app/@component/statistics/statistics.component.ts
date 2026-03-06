import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  imports: [MatTableModule,MatButtonModule,CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit {

  questions: QuestionStat[] = FAKE_DATA;

  ngOnInit() {
    setTimeout(() => {
      this.questions.forEach((q, i) => {
        if(q.type !== '問答題') {
          this.createChart(i, q);
        }
      });
    }, 100);
  }

  createChart(index: number, q: QuestionStat) {
    const canvas = document.getElementById('chart' + index) as HTMLCanvasElement;
    if(!canvas) return;
    new Chart(canvas, {
      type: 'pie',
      data: {
        labels: q.options!.map(o => o.option),
        datasets: [{
          data: q.options!.map(o => o.count),
          backgroundColor: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0']
        }]
      }

    });

  }

}

interface OptionStat {
  option: string;
  count: number;
  percent: number;
}

interface QuestionStat {
  name: string;
  type: string; // 單選題/複選題/問答題
  options?: OptionStat[];
  answers?: string[]; // 問答題的回答列表
  showAnswers?: boolean; // 控制展開/收合
}

const FAKE_DATA: QuestionStat[] = [
  {
    name: '第一題題目',
    type: '單選題',
    options: [
      { option: '選項一', count: 1, percent: 50 },
      { option: '選項二', count: 1, percent: 50 },
    ]
  },
  {
    name: '第二題題目',
    type: '複選題',
    options: [
      { option: '選項一', count: 2, percent: 100 },
      { option: '選項二', count: 1, percent: 50 },
    ]
  },
  {
    name: '第三題題目',
    type: '問答題',
    answers: ['回答一', '回答二'],
    showAnswers: false
  }
];
