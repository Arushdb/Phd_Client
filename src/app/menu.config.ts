// src/app/menu.config.ts
import { MenuItem } from './models/menu.model';

export const MENU_ITEMS: MenuItem[] = [
  {
    id:1,
    label: 'Dashboard',
    path: '/dashboard',
    roles: ['ADMIN', 'FACULTY', 'SCHOLAR'],
    children: [{id:11,label: 'Dashboard1',
    path: '/dashboard',
    roles: ['ADMIN', 'FACULTY', 'SCHOLAR']}]
  },
  {
    id:2,
    label: 'PhD Applications',
    path: '/applications',
    roles: ['ADMIN', 'FACULTY']
  },
  {
    id:3,
    label: 'My Profile',
    path: '/profile',
    roles: ['SCHOLAR', 'FACULTY', 'ADMIN']
  },
  {
    id:4,
    label: 'Student Management',
    path: '/students',
    roles: ['ADMIN']
  },
  {
    id:5,
    label: 'Reports',
    children: [
      { id:51,label: 'Monthly', path: '/reports/monthly', roles: ['ADMIN'] },
      { id:52,label: 'Supervisor', path: '/reports/supervisor', roles: ['FACULTY'] }
    ]
  },
  {id:6,
    label: 'Help',
    path: '/help'
    // visible to all (no roles provided)
  }
];
