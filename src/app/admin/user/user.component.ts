import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreatedAccount } from '../../interfaces/useraccount';
import { ScholarService } from '../../services/scholar.service';
import { AuthService } from '../../services/auth.service';


@Component({
  standalone: true, 
  imports: [FormsModule,RouterModule,CommonModule],
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  // =========================
  // VARIABLES
  // =========================
  users: any[] = [];
  roles: any[] = [];
  isAdmin = false;

  showForm: boolean = false;
  isEdit: boolean = false;
  searchText: string = '';

  user: any = this.getEmptyUser();

  // =========================
  // CONSTRUCTOR
  // =========================
  constructor(private userService: UserService, 
    private scholarService: ScholarService,
    private authService: AuthService
    ) {}

  // =========================
  // INIT
  // =========================
  ngOnInit(): void {
    
    
      this.loadUsers();
    this.isAdmin = this.authService.isAdmin();  
    this.loadRoleIds();
  }

  // =========================
  // LOAD USERS
  // =========================
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
         
        console.log('Users loaded:', res);
        

      },
      error: () => alert('Failed to load users')
    });
  }

  // =========================
  // OPEN CREATE FORM
  // =========================
  openForm(): void {
     this.isEdit = false;
  this.showForm = true;
    this.resetForm();
    this.showForm = true;
    this.isEdit = false;
  }

  // =========================
  // SAVE USER (CREATE / UPDATE)
  // =========================
  save(): void {

    if (!this.user.username || !this.user.name) {
      alert('Username and Name are required');
      return;
    }

    if (this.isEdit) {
      console.log('Updating user:', this.user);

      this.userService.updateUser(this.user.id, this.user)
        .subscribe({
          next: () => {
            alert('User Updated Successfully');
            this.afterSave();
          },
          error: () => alert('Update failed')
        });

    } else {

      if (!this.user.password) {
        alert('Password is required');
        return;
      }

      this.userService.createUser(this.user)
        .subscribe({
          next: () => {
            alert('User Created Successfully');
            this.afterSave();
          },
          error: () => alert('Creation failed')
        });
    }
  }

  // =========================
  // EDIT USER
  // =========================
//   edit(u: any): void {

//     console.log('Editing user:', u);

//     this.user = {
//       id: u.id,
//       username: u.username,
//       name: u.name,
//       email: u.email,
//       phone: u.phone || '',
//       //roleIds: this.extractRoleIds(u.roles),
//       roleIds: u.roles.map((role: any) => role.id), // Assuming roles is an array of role objects
//       enrollmentNo: u.enrollmentNo || ''
//     };
// console.log('Editing roles:', u.roles, 'Extracted roleIds:', this.user.roleIds);
//     console.log('Editing user:', this.user);
//     this.showForm = true;
//     this.isEdit = true;
//   }

  edit(u: any): void {

  console.log('Editing user:', u);
  console.log('User roles:', u.roles);
  console.log('Role IDs:', u.roles?.map((role: any) => role.id));

  this.user = {
    id: u.id,
    username: u.username,
    name: u.name,
    email: u.email,
    phone: u.phone || '',
    roleIds: u.roles?.map((role: any) => role.id) || [],
    enrollmentNo: u.enrollmentNo || ''
  };

  console.log('Final user object:', this.user);

  this.showForm = true;
  this.isEdit = true;
}

  // =========================
  // DELETE USER
  // =========================
  delete(id: number): void {

    if (!confirm('Are you sure you want to delete this user?')) return;

    this.userService.deleteUser(id)
      .subscribe({
        next: () => {
          alert('User Deleted');
          this.loadUsers();
        },
        error: () => alert('Delete failed')
      });
  }

  // =========================
  // AFTER SAVE
  // =========================
  afterSave(): void {
    this.loadUsers();
    this.showForm = false;
    this.resetForm();
  }

  // =========================
  // RESET FORM
  // =========================
  resetForm(): void {
    this.user = this.getEmptyUser();
  }

  // =========================
  // EMPTY USER TEMPLATE
  // =========================
  getEmptyUser() {
    return {
      id: null,
      username: '',
      password: '',
      name: '',
      email: '',
      roleIds: [],
      enrollmentNo: ''
    };
  }

  // =========================
  // CHECK SCHOLAR ROLE
  // =========================
  isScholarSelected(): boolean {
    return this.user.roleIds.includes(1); // 1 = SCHOLAR
  }

  // =========================
  // HELPER: EXTRACT ROLE IDS
  // =========================
  // extractRoleIds(roles: any[]): number[] {

  //   if (!roles) return [];

  //   // If backend sends role names
  //   if (typeof roles[0] === 'string') {
  //     this.roles.map(r => {
  //       console.log('Available role:', r);
  //       if (r.name==roles[0] ){
  //         console.log('Matched role:', r);
  //       } ) { 
      
  //     });

  //     return roles.map(r => this.mapRoleNameToId(r));
  //   }

  //   // If backend sends role objects
  //   return roles.map(r => r.id);
  // }


//   extractRoleIds(roles: any[]): number[] {
//     console.log('Extracting role IDs from:', roles);

//   if (!roles || roles.length === 0) return [];

//     return roles.map(roleName => {
//       console.log('Mapping role name:', roleName);
//       const matched = this.roles.find(r => r.name === roleName.name);
// console.log('Available roles:', this.roles, 'Matched role:', matched);
//       if (matched) {
//         console.log('Matched role:', matched);
//         return matched.id;
//       } else {
//         console.warn('Role not found:', roleName);
//         return null;
//       }
//     }).filter(id => id !== null) as number[];
  

  
// }

extractRoleIds(roles: any[]): number[] {
  if (!roles || roles.length === 0) {
    return [];
  }

  return roles.map(role => role.id);
}

  // =========================
  // ROLE NAME → ID MAPPING
  // =========================
  // mapRoleNameToId(roleName: string): number {

  //   const roleMap: any = {
  //     'SCHOLAR': 1,
  //     'SUPERVISOR': 2,
  //     'REVIEWER': 3,
  //     'HOD': 4,
  //     'DEAN': 5
  //   };

  //   return roleMap[roleName] || 0;
  // }

//   loadRoleIds(): void {
//     this.userService.getRoles().subscribe(res => {
//       console.log('Available roles:', res);
//       this.roles = res;
//       console.log('Roles loaded:', this.roles);
//     });

// }

loadRoleIds(): void {
  this.userService.getRoles().subscribe({
    next: (res: any[]) => {
      console.log('Available roles:', res);
      console.log('Is Admin:', this.isAdmin);
      this.roles = this.isAdmin
        ? res
        : res.filter(role => role.name !== 'ROLE_ADMIN');

      console.log('Roles available for selection:', this.roles);
    },
    error: (err) => {
      console.error('Error loading roles:', err);
    }
  });
}

search(): void {

  if (!this.searchText.trim()) {
    this.loadUsers(); // reset
    return;
  }

  this.userService.searchUsers(this.searchText)
    .subscribe({
      next: (res) => this.users = res,
      error: () => alert('Search failed')
    });
}
// createScholarAccount(scholarId: number): void {
//   if (!confirm(
//     'Create this scholar account and send a password setup link?'
//   )) {
//     return;
//   }

//   this.scholarService.createScholarAccount(scholarId)
//     .subscribe({
//       next: (result) => {
//         alert(result.status);
//         this.loadScholarsWithoutAccounts();
//       },
//       error: (err) => {
//         console.error('Account creation failed:', err);

//         alert(
//           err.error?.message ||
//           'Unable to create scholar account.'
//         );
//       }
//     });
// }

// Existing normal-user password reset
// sendPasswordReset(userId: number): void {
//   this.userService.sendResetLink(userId).subscribe({
//     next: () => alert('Password reset link sent.'),
//     error: () => alert('Unable to send reset link.')
//   });
// }

// // Create a login account for an existing scholar
// createScholarAccount(scholarId: number): void {
//   this.scholarService.createScholarAccount(scholarId).subscribe({
//     next: result => {
//       alert(result.status);
//       // Refresh the scholar list here
//     },
//     error: err => {
//       alert(err.error?.message || 'Account creation failed.');
//     }
//   });
// }
createScholarAccounts(): void {
  if (!confirm(
    'Create accounts for all eligible scholars without user accounts?'
  )) {
    return;
  }

  this.scholarService.createScholarAccounts()
    .subscribe({
      next: (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');

        a.href = url;
        a.download = 'Scholar_Credentials.xlsx';
        a.click();

        window.URL.revokeObjectURL(url);
        alert('Scholar account processing completed.');
        this.loadUsers();
      },
      error: (err) => {
        console.error(err);
        alert('Unable to create scholar accounts.');
      }
    });
}

sendPasswordReset(userId: number): void {
  if (!confirm('Send a password reset link to this user?')) {
    return;
  }

  this.userService.sendResetLink(userId).subscribe({
    next: () => {
      alert('Password reset link requested successfully.');
    },
    error: (err) => {
      console.error(err);
      alert(
        err.error?.message ||
        'Unable to send password reset link.'
      );
    }
  });
}

}