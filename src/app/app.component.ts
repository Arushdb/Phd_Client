// src/app/app.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router,RouterModule  } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { RoleMenuComponent } from './role-menu/role-menu.component';
import { MenuItem } from './models/menu.model';
import { MenuService } from './services/menu.service';
import { CommonModule } from '@angular/common';
import { AuthService, User } from './services/auth.service';

// app.component.ts
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,  CommonModule],  // include RoleMenuComponent 
  templateUrl: './app.component.html'
})
export class AppComponent {
  currentUser$!: Observable<User | null>;
  mobileMenuOpen = false;
  menuItems: MenuItem[] = [];
   
    currentUser: User | null = null;
     private userSub!: Subscription;
  currentYear = new Date().getFullYear();

  constructor(private authService: AuthService,private menuService: MenuService
     ,private router: Router) {
    console.log("Test message");
    this.currentUser$ = this.authService.currentUser$;
  }
  ngOnInit(): void {
    this.userSub = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.menuItems = this.menuService.getMenuForRoles(user.roles);
      } else {
        this.menuItems = [];
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}

