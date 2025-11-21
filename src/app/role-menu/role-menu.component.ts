// src/app/components/role-menu/role-menu.component.ts
import { Component, OnInit } from '@angular/core';


import { AuthService, User } from '../services/auth.service';
import { MenuItem } from '../models/menu.model';
import { MenuService } from '../services/menu.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-role-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './role-menu.component.html',
  styleUrls: ['./role-menu.component.css']
})
export class RoleMenuComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(
    private auth: AuthService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe((user: User | null) => {
      if (user) {
        this.menuItems = this.menuService.getMenuForRoles(user.roles);
      } else {
        this.menuItems = [];
      }
    });
  }
}
