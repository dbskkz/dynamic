import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-feedback',
  imports: [MatIconModule,FormsModule,MatTableModule,CommonModule,MatButtonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})


export class FeedbackComponent {
  constructor (private router:Router){}

  dataSource=FEEDBACK_Data;
  displayedColumns: string[] = [ 'No','Name', 'Date','actions'];

  Check(){
    this.router.navigate(['/review'], { queryParams: { mode: 'confirm' } });
  }

}

export interface UserDate{
name:string;
data:Date;
}

const FEEDBACK_Data:UserDate[]=[{
  name:'XXX',
  data:new Date('2019-10-20')
},
{
  name:'ooo',
  data:new Date('2019-11-01')
}];
