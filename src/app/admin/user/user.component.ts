import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


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

  showForm: boolean = false;
  isEdit: boolean = false;
  searchText: string = '';

  user: any = this.getEmptyUser();

  // =========================
  // CONSTRUCTOR
  // =========================
  constructor(private userService: UserService) {}

  // =========================
  // INIT
  // =========================
  ngOnInit(): void {
    this.loadUsers();
    this.loadRoleIds();
  }

  // =========================
  // LOAD USERS
  // =========================
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (res) => {this.users = res; console.log('Users loaded:', res);},
      error: () => alert('Failed to load users')
    });
  }

  // =========================
  // OPEN CREATE FORM
  // =========================
  openForm(): void {
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
  edit(u: any): void {

    console.log('Editing user:', u);

    this.user = {
      id: u.id,
      username: u.username,
      name: u.name,
      email: u.email,
      roleIds: this.extractRoleIds(u.roles),
      enrollmentNo: u.enrollmentNo || ''
    };
console.log('Editing roles:', u.roles, 'Extracted roleIds:', this.user.roleIds);
    console.log('Editing user:', this.user);
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


  extractRoleIds(roles: any[]): number[] {
    console.log('Extracting role IDs from:', roles);

  if (!roles || roles.length === 0) return [];

    return roles.map(roleName => {
      console.log('Mapping role name:', roleName);
      const matched = this.roles.find(r => r.name === roleName.name);
console.log('Available roles:', this.roles, 'Matched role:', matched);
      if (matched) {
        console.log('Matched role:', matched);
        return matched.id;
      } else {
        console.warn('Role not found:', roleName);
        return null;
      }
    }).filter(id => id !== null) as number[];
  

  
}

  // =========================
  // ROLE NAME → ID MAPPING
  // =========================
  mapRoleNameToId(roleName: string): number {

    const roleMap: any = {
      'SCHOLAR': 1,
      'SUPERVISOR': 2,
      'REVIEWER': 3,
      'HOD': 4,
      'DEAN': 5
    };

    return roleMap[roleName] || 0;
  }

  loadRoleIds(): void {
    this.userService.getRoles().subscribe(res => {
      console.log('Available roles:', res);
      this.roles = res;
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
}