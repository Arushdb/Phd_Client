// src/app/home/home.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  //templateUrl: './home.component.html',
  imports: [RouterModule],
  template: `
    <div class="home-welcome">
      <h2>Welcome {{loggedInUserName}}  </h2>
      <p>Please select a menu item  on left to proceed.</p>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loggedInUserName: string | null = localStorage.getItem('username') ; 
}
