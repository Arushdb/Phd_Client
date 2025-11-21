// src/app/services/menu.service.ts
import { Injectable } from '@angular/core';
import { MENU_ITEMS } from '../menu.config';
import { MenuItem } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  getMenuForRoles(userRoles: string[]): MenuItem[] {
    const filterItems = (items: MenuItem[]): MenuItem[] => {
      return items
        .map(item => {
          // check access: if no roles defined then accessible to all
          const hasAccess = !item.roles || item.roles.some(r => userRoles.includes(r));
          if (!hasAccess) {
            return null;
          }
          const newItem: MenuItem = { ...item };
          if (newItem.children) {
            newItem.children = filterItems(newItem.children);
            // optionally skip parent if children array empty and no path
            if (newItem.children.length === 0 && !newItem.path) {
              return null;
            }
          }
          return newItem;
        })
        .filter(i => i !== null) as MenuItem[];
    };

    return filterItems(MENU_ITEMS);
  }
}
