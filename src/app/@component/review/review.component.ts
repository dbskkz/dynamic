import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Input } from '@angular/core';
import { surData } from '../add/add.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-review',
  imports: [MatButtonModule,FormsModule,CommonModule,MatCheckboxModule,MatRadioModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent  implements OnChanges, OnInit{
  constructor(private router:Router,private route:ActivatedRoute){}

  @Input() data: surData = {
    title: '',
    preview: '',
    starday: null,
    enday: null,
    questions: []
  };
  @Input() mode: string = 'preview';
  dataSoure:Question[]=[];
  answers: {[key: number]: any} = {};
  fillerData = {
  name: '',
  phone: '',
  email: ''
};

ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
    console.log('data', this.data);
    console.log('mode', this.mode);
    if(changes['data'] && this.mode === 'preview') {
      this.dataSoure = this.data.title !== '' ? [this.data] : [];
    }
  }
  ngOnInit() {
    const routeMode = this.route.snapshot.queryParams['mode'];
    if(routeMode) this.mode = routeMode;

    if(this.mode !== 'preview') {
      this.dataSoure = ELEMENT_DATA;
    }
    if(this.mode === 'confirm') {
      this.fillerData = {
        name: 'XXX',
        phone: '0912345678',
        email: 'xxx@gmail.com'
      };
      this.answers = {
        0: '選項一',
        1: ['選項一', '選項三'],
        2: '這是問答回答'
      };
    }
  }

  back(){
    this.router.navigateByUrl('/back?login=true');
  }
  submit(){
    this.mode = 'confirm';
  }

  edit(){
    this.mode='fill';
  }
  send(){
    this.router.navigateByUrl('/back?login=true');

  }
  onCheckChange(event: MatCheckboxChange, qi: number, option: string){
    if(!this.answers[qi]) this.answers[qi] = [];
    if(event.checked) {
      this.answers[qi] = [...this.answers[qi], option];
    } else {
      this.answers[qi] = this.answers[qi].filter((o: string) => o !== option);
    }
  }

}
export interface QuestionDetail {
  name:string;
  type: string;
  options?: string[];
  required:boolean;
}

export interface Question {
  title: string;
  preview: string;
  questions: QuestionDetail[];
}

const ELEMENT_DATA: Question[] = [
  {
    title: '第一個問卷',
    preview: '我是說明',
    questions: [{
      name:'第一題題目',
      type: '單選題',
      options: ['選項一', '選項二', '選項三', '選項四'],
      required:false
    },
    {
      name:'第二題題目',
      type: '複選題',
      options: ['選項一', '選項二', '選項三', '選項四'],
      required:true
    },
    {
      name:'第三題題目',
      type: '問答題',
      required:false
    },

  ]}
];

export interface FilledSurvey {
  surveyName: string;      // 對應哪份問卷
  fillerName: string;      // 填寫人姓名
  fillerEmail: string;     // 填寫人email
  answers: {
    questionName: string;  // 題目名稱
    answer: string | string[]; // 單選/問答是string，複選是string[]
  }[];
}

const FILLED_DATA: FilledSurvey[] = [{
  surveyName: '第一個問卷',
  fillerName: 'XXX',
  fillerEmail: 'xxx@gmail.com',
  answers: [
    { questionName: '第一題題目', answer: '選項一' },
    { questionName: '第二題題目', answer: ['選項一', '選項三'] },
    { questionName: '第三題題目', answer: '這是問答回答' }
  ]
}];

