// src/app/menu.config.ts
import { MenuItem } from './models/menu.model';

export const MENU_ITEMS: MenuItem[] = [
  {
    id:1,
    label: 'Dashboard',
    path: '/dashboard',
    roles: ['ADMIN', 'FACULTY', 'SCHOLAR'],
    children: [
    {id:11,label: 'Dashboard Admin',
    path: '/dashboardadmin',
    roles: ['ADMIN']},
    {id:12,label: 'Dashboard Scholar',
    path: '/scholar/dashboard',
    roles: ['SCHOLAR']},
    {id:13,label: 'Dashboard Reviewer',
    path: '/dashboardreviewer',
    roles: ['SUPERVISOR']}
  ]
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
    label: 'Import Scholar',
    path: '/yearmonth',
    roles: ['ADMIN']
  },
  {
    id:6,
    label: 'Scholar Registration',
    path: '/ScholarRegistration',
    roles: ['SCHOLAR']
  },
  {
    id:7,
    label: 'Progress Report',
    path: '/progress-report/submit',
    roles: ['SCHOLAR']
  },
  {
    id:8,
    label: 'Review Progress Report',
    path: '/progress-report/review',
    roles: ['ADMIN', 'FACULTY']
  },

  {
    id:50,
    label: 'Reports',
    children: [
      { id:501,label: 'Monthly', path: '/reports/monthly', roles: ['ADMIN'] },
      { id:502,label: 'Supervisor', path: '/reports/supervisor', roles: ['FACULTY'] }
    ]
  },
  {id:51,
    label: 'Help',
    path: '/help'
    // visible to all (no roles provided)
  }
];
