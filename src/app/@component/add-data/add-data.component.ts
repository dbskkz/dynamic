import { QuestionDetail } from './../review/review.component';
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDrag, moveItemInArray, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-data',
  imports: [MatCheckboxModule, FormsModule, CommonModule,
     CdkDrag, MatTableModule, MatIconModule, MatButtonModule, CdkDragHandle,],
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.scss'
})
export class AddDataComponent {
  errorMsg='';
  constructor(private router:Router,private cdr: ChangeDetectorRef){}

select:string='';
required:boolean=false;
title:string='';
items:string[]=[];


trackByIndex(index: number): number {
  return index;
}

typeMap:{[key:string]:string}={
  'Single':'單選題',
  'Multiple':'複選題',
  'question':'問答題'
};

displayedColumns: string[] = [ 'drag','name', 'type','actions'];
dataSource : QuestionDetail[]=[];

@Output() dataChange = new EventEmitter<any[]>();

drop(event:CdkDragDrop<PeriodicElement[]>){
  moveItemInArray(this.dataSource,event.previousIndex,event.currentIndex);
  this.dataSource=[...this.dataSource];
}


addItem(){
  this.items.push('');
  setTimeout(() => {
    const inputs = document.querySelectorAll('.input-area input');
    (inputs[inputs.length - 1] as HTMLElement).focus();
  }),50;
}

removeItem(index:number){
  this.items.splice(index,1)
}

addQuestion(){

  if(this.title?.trim()){
    if(this.select!='')
    {
      if(this.select !== 'question') {
        if(this.items.length <= 1) {
          alert('請至少新增兩個選項');
           return;
        }
        if(this.items.some(item => item.trim() === '')) {
          alert('請填寫所有選項內容');
           return;
        }
      }
      const typeName=this.typeMap[this.select];
      const type=this.required?typeName+"必填":typeName;
      this.dataSource=[...this.dataSource,{
      name: this.title,
      type: typeName,  // 不加必填
      options: this.select !== 'question' ? [...this.items] : [],
      required: this.required  // 獨立存
      }]
      this.dataChange.emit(this.dataSource); // 每次新增都往上傳最新的題目列表

      this.select='';
      this.required=false;
      this.title='';
      this.items=[];
    }
    else
      alert("請選擇題目類型");
  }
  else
    alert("請輸入題目");
}

Delete(){
  //刪除方法
}

compare(option1:any,option2:any):boolean{
  return option1==option2;
}



}
export interface PeriodicElement {
  name:string;
  type: string;
  options?: string[];
  required: boolean;
}

// const ELEMENT_DATA: PeriodicElement={
//   name:'',
//   type:'',
//   questions?:[]
// };
