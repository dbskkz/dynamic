import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-fail',
  imports: [MatTabsModule, RouterOutlet, RouterLink, RouterLinkActive,MatIconModule],
  templateUrl: './fail.component.html',
  styleUrl: './fail.component.scss'
})
export class FailComponent {

  constructor(private router:Router){}
  ngOnInit() {
    this.router.navigate(['fail/feeed']);
  }

  links = [
    {label:'f-label',path:'feeed'},
    {label:'s-label',path:'statistics'},
  ];
  activeLink = this.links[0];

  back(){
    this.router.navigateByUrl('/back?login=true');
  }

}
