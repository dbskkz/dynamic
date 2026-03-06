import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { AddDataComponent } from "../add-data/add-data.component";
import { ReviewComponent } from "../review/review.component";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-add',
  imports: [FormsModule, MatFormFieldModule, MatDatepickerModule, MatInputModule,
    MatIconModule,MatButtonToggleModule, CommonModule, MatButtonModule, AddDataComponent, ReviewComponent],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class AddComponent {
  constructor(private router:Router){}
  name:string='';
  explain!:'';//說明文，可能是空的
  starday:Date|null=null;
  enday:Date|null=null;
  today:Date=new Date();

  showreview:boolean=false;

  reset(){
    //清除網頁中的資料
    this.name='';
    this.explain='';
    this.starday=null;
    this.enday=null;
    this.questions=[];
  }


  get surveyData():surData{
    return{
      title:this.name,
      preview:this.explain,
      starday:this.starday,
      enday:this.enday,
      questions:this.questions
    };
  }
  questions:QuestionDetail[]=[];


  onDataChange(questions: any[]){
    this.questions= questions
  }

  view()
  {
    this.showreview=!this.showreview;
  }
  save(){
    alert("已儲存到DB");
    //回存至DB
  }
  send(){
    if(!this.name?.trim()){
      alert("請輸入問卷名稱");
      return;
    }
    if(this.starday == null && this.enday == null){
      alert("請設定問卷期間");
      return;
    }
    if(this.starday == null){
      alert("請設定開始日期");
      return;
    }
    if(this.enday == null){
      alert("請設定結束日期");
      return;
    }
    if(this.questions.length === 0){
      alert("至少需要一個問題");
      return;
    }
    alert("發布問卷");
    this.router.navigateByUrl('/back');
  }

  back(){
    this.router.navigateByUrl('/back?login=true');
  }
}

export interface surData{
  title:string;
  preview:string;
  starday:Date|null;
  enday:Date|null;
  questions:QuestionDetail[];
}

export interface QuestionDetail {
  name:string;
  type: string;
  options?: string[];
  required:boolean;
}

const ELEMENT_question:surData={
  title: '',
  preview: '',
  starday: null,
  enday: null,
  questions: []
};
