import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-long-in',
  imports: [],
  templateUrl: './long-in.component.html',
  styleUrl: './long-in.component.scss'
})
export class LongInComponent {

constructor(private router:Router){}
longin(){
  this.router.navigate(['/back'], { queryParams: { login: true } });
}
}
