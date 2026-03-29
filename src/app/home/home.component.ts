// src/app/home/home.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  //templateUrl: './home.component.html',
  imports: [RouterModule],
 // templateUrl: './home.component.html',
  template: `
   <div class="home-welcome">
     <h2>Welcome {{loggedInUserName}}  </h2>
     <p>Please select a menu item  on left to proceed.TESTING
     </p>
   </div>
   
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentuser=localStorage.getItem('currentUser');
  loggedInUserName: string | null = this.currentuser ? JSON.parse(this.currentuser)["name"] : null;
}
