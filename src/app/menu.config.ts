// src/app/menu.config.ts
import { MenuItem } from './models/menu.model';

export const MENU_ITEMS: MenuItem[] = [
  // {
  //   id:1,
  //   label: 'Dashboard',
  //   path: '/dashboard',
  //   roles: ['ADMIN', 'ROLE_SCHOLAR','ROLE_SUPERVISOR'],
  //   children: [
  //   {id:11,label: 'Dashboard Admin',
  //   path: '/admin-dashboard',
  //   roles: ['ADMIN']},
  //   {id:12,label: 'Dashboard Scholar',
  //   path: '/scholar-dashboard',
  //   roles: ['ROLE_SCHOLAR']},
  //   {id:13,label: 'Dashboard Reviewer',
  //   path: '/reviewer-dashboard',
  //   roles: ['ROLE_SUPERVISOR']}
  // ]
  // },
{
    id:1,
    label: 'Dashboard Scholar',
    path: '/scholar-dashboard',
    roles: ['ROLE_SCHOLAR','ROLE_ADMIN']
  },


{
    id:2,
    label: 'Dashboard Reviewer',
    path: '/reviewer-dashboard',
    roles: ['ROLE_SUPERVISOR','ROLE_DEAN','ROLE_CO-SUPERVISOR','ROLE_HOD','ROLE_ADMIN' ]
  },


  // {
  //   id:2,
  //   label: 'PhD Applications',
  //   path: '/applications',
  //   roles: ['ADMIN', 'FACULTY']
  // },
  // {
  //   id:3,
  //   label: 'My Profile',
  //   path: '/profile',
  //   roles: ['ROLE_SCHOLAR', 'ROLE_ADMIN']
  // },
  {
    id:4,
    label: 'Student Management',
    path: '/students',
    roles: ['ROLE_ADMIN']
  },
   {
    id:5,
    label: 'Import Scholar',
    path: '/yearmonth',
    roles: ['ROLE_ADMIN']
  },
  {
    id:6,
    label: 'Scholar Registration',
    path: '/ScholarRegistration',
    roles: ['ROLE_SCHOLAR','ROLE_ADMIN']
  },
  // {
  //   id:7,
  //   label: 'Progress Report',
  //   path: '/progress-report/submit',
  //   roles: ['ROLE_SCHOLAR','ROLE_ADMIN']
  // },
  // {
  //   id:8,
  //   label: 'Review Progress Report',
  //   path: '/progress-report/review',
  //   roles: ['ROLE_ADMIN',  'ROLE_SUPERVISOR']
  // },

  {
    id:50,
    label: 'Reports',
    children: [
      { id:501,label: 'Monthly', path: '/reports/monthly', roles: ['ROLE_ADMIN','ROLE_FACULTY'] },
      { id:502,label: 'Supervisor', path: '/reports/supervisor', roles: ['ROLE_FACULTY','ROLE_ADMIN'] }
    ]
  },
  {id:51,
    label: 'Help',
    path: '/help'
    // visible to all (no roles provided)
  }
];
