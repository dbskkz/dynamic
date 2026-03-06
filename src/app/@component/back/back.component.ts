import {Component} from '@angular/core';
import {MatTableModule,MatTableDataSource,} from '@angular/material/table';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ActivatedRoute,  Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


export interface PeriodicElement {
  name: string;
  Starday: Date;
  Endday: Date;
  fettle:string;//狀態
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: '第一個問卷', Starday:new Date('2026-03-01'),Endday:new Date('2026-04-01'), fettle: '進行中'},
  {name: '第二個問卷', Starday:new Date('2030-01-01'),Endday:new Date('2030-12-31'), fettle: '未發布'},
  {name: '第三個問卷', Starday:new Date('2019-11-01'),Endday:new Date('2019-11-01'), fettle: '已結束'},
  {name: '第四個問卷', Starday:new Date('2029-11-01'),Endday:new Date('2029-12-01'), fettle: '未開始'},


];

@Component({
  selector: 'app-back',
  imports: [MatTableModule,MatButtonToggleModule,
    MatIconModule,FormsModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule,CommonModule,MatButtonModule,],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './back.component.html',
  styleUrl: './back.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class BackComponent {

  constructor(private router:Router,private route:ActivatedRoute ){}

  minDate:Date|null=null;
  maxDate:Date|null=null;
  inputDate!:string;

  displayedColumns: string[] = ['name', 'Starday', 'Endday', 'fettle', 'view'];
  dataSource =new MatTableDataSource<PeriodicElement>( ELEMENT_DATA);
  isLoggedIn: boolean = false;

  goToFill() {
    this.router.navigate(['/review'], { queryParams: { mode: 'fill' } });
  }
  ngOnInit() {
    if(this.route.snapshot.queryParams['login'] === 'true') {
        this.isLoggedIn = true;
        this.displayedColumns =['name', 'Starday', 'Endday', 'fettle','Date']
      }

    // else{
    //   this.displayedColumns=['name', 'Starday', 'Endday', 'fettle','view'];
    // }

    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) =>
      {
        const nameMatch = filter === 'trigger' ? true : data.name.includes(filter);
        const startMatch = this.minDate
        ? data.Starday.getFullYear() === this.minDate.getFullYear() &&
        data.Starday.getMonth() === this.minDate.getMonth() &&
        data.Starday.getDate() === this.minDate.getDate()
        : true;
        const endMatch = this.maxDate ? data.Endday.getFullYear() === this.maxDate.getFullYear() &&
        data.Endday.getMonth() === this.maxDate.getMonth() &&
        data.Endday.getDate() === this.maxDate.getDate()
        : true;

        const fettleMeth=this.isLoggedIn?true:data.fettle!=='未發布';

        return nameMatch && startMatch && endMatch&&fettleMeth;
      }


    this.dataSource.filter = 'trigger';
  }
  toReview(){
    console.log("let me seesee");
    this.router.navigate(['/review'], { queryParams: { mode: 'confirm' } });
  }

  onEdit(){

    this.router.navigateByUrl('/create');
  }
  Delete(){
    console.log("確定刪除?");
    //串接刪除方法
  }

  orderbyname(event:Event){
    //event傳入排序參數，點擊一次正序再點擊倒序以此類推
  }
  orderbyDate(event:Event){
    //event傳入排序參數，點擊一次正序再點擊倒序以此類推
    }
  orderby(event:Event){
    //event傳入排序參數，點擊一次正序再點擊倒序以此類推
    }

  create(){
    this.router.navigateByUrl('/create');
  }
  login(){
    this.router.navigateByUrl('/longin');
  //   this.authService.login(account, password).subscribe(response => {
  //   if(response.success) {
  //     this.isLoggedIn = true;
  //     // 通常還會把 token 存起來
  //     localStorage.setItem('token', response.token);
  //   }
  // });
  }
  logout(){
    this.isLoggedIn=false;
    this.displayedColumns = ['name', 'Starday', 'Endday', 'fettle', 'view'];
    this.dataSource.filter = 'trigger';
    this.router.navigate(['/back']); // 不帶任何 queryParams 重新導頁
  }
  onDateChange(){
    this.dataSource.filter='trigger';
  }
  gettext(event:Event){
    this.dataSource.filter = this.inputDate || 'trigger';
  }
  reset(){
    //清除網頁中的資料
    this.inputDate='';
    this.minDate=null;
    this.maxDate=null;
    this.dataSource.filter = '';
  }
  goToResult(){
    this.router.navigateByUrl('/fail');
  }
}
