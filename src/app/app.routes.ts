import { Routes } from '@angular/router';
import { BackComponent } from './@component/back/back.component';
import { AddDataComponent } from './@component/add-data/add-data.component';
import { FailComponent } from './@component/fail/fail.component';
import { LongInComponent } from './@component/long-in/long-in.component';
import { ReviewComponent } from './@component/review/review.component';
import { FeedbackComponent } from './@component/feedback/feedback.component';
import { StatisticsComponent } from './@component/statistics/statistics.component';
import { AddComponent } from './@component/add/add.component';


export const routes: Routes = [
  {path:'back',component:BackComponent},
  {path:'create',component:AddComponent},
  {path:'add-data',component:AddDataComponent},
  {path:'fail',component:FailComponent,children:[
    {path:'feeed',component:FeedbackComponent},
    {path:'statistics',component:StatisticsComponent}
  ]},
  {path:'longin',component:LongInComponent},
  {path:'review',component:ReviewComponent}
];
