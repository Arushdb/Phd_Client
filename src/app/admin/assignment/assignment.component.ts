import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



import { AssignmentService } from '../../services/assignment.service';
import { UserService } from '../../services/user.service';
import { ScholarService } from '../../services/scholar.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule,CommonModule],
  selector: 'app-assignment',
  templateUrl: './assignment.component.html'
})
export class AssignmentComponent implements OnInit {

  type: string = '';
  data: any = {};

  scholars: any[] = [];
  users: any[] = [];
  departments: any[] = [];
  faculties: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: AssignmentService,
    private userService: UserService,
    private scholarService: ScholarService
  ) {}

  ngOnInit() {

    this.type = this.route.snapshot.params['type'];

    // load scholars if needed
    if (this.type === 'supervisor' || this.type === 'reviewer') {
      this.scholarService.getAll().subscribe(res => this.scholars = res);
    }

    // load users based on role
    if (this.type === 'supervisor') {
      this.userService.getByRole('SUPERVISOR').subscribe(res => this.users = res);
    }

    if (this.type === 'reviewer') {
      this.userService.getByRole('REVIEWER').subscribe(res => this.users = res);
    }

    if (this.type === 'hod') {
      this.userService.getByRole('HOD').subscribe(res => this.users = res);
    }

    if (this.type === 'dean') {
      this.userService.getByRole('DEAN').subscribe(res => this.users = res);
    }
  }

  assign() {

    if (this.type === 'supervisor') {
      this.service.assignSupervisor(this.data).subscribe(() => alert('Assigned'));
    }

    if (this.type === 'reviewer') {
      this.service.assignReviewer(this.data).subscribe(() => alert('Assigned'));
    }

    if (this.type === 'hod') {
      this.service.assignHod(this.data).subscribe(() => alert('Assigned'));
    }

    if (this.type === 'dean') {
      this.service.assignDean(this.data).subscribe(() => alert('Assigned'));
    }
  }
}