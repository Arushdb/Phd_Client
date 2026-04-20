import { Component, OnInit, provideEnvironmentInitializer } from '@angular/core';
import { AssignmentService } from '../../services/assignment.service';
import { UserService } from '../../services/user.service';
import { ScholarService } from '../../services/scholar.service';
import { ProgramService } from '../../services/program.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { DepartmentService } from '../../services/department.service';
import { FacultyService } from '../../services/faculty.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
})
export class AssignmentComponent implements OnInit {
  type: string = ''; // supervisor | reviewer | hod | dean

  data: any = {
    scholarId: null,
    userId: null,
    programId: null,
    role: '',
  };
  faculties: any[] = [];
  departments: any[] = [];

  users: any[] = [];
  scholars: any[] = [];
  programs: any[] = [];
  assignments: any[] = [];

  loading = false;
  searchText = '';

  editId: number | null = null;
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private userService: UserService,
    private scholarService: ScholarService,
    private programService: ProgramService,
    private messageService: MessageService,
    private departmentService: DepartmentService, 
    private facultyService: FacultyService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const newType = params.get('type') || '';
      console.log('type', newType);

      if (this.type !== newType) {
        this.type = newType;

        console.log('TYPE CHANGED:', this.type);
        if (this.type === 'hod') {
          this.data.role = 'HOD';
        }

        if (this.type === 'dean') {
          this.data.role = 'DEAN';
        }

        this.resetComponent(); // reset everything
        this.loadData(); // load dropdowns
        this.loadAssignments(); // load table
      }
    });
  }
  getSearchPlaceholder(): string {
    if (this.type === 'supervisor') {
      return 'Search by scholar or supervisor';
    }
    return `Search by program or ${this.type}`;
  }
  resetComponent(): void {
    this.data = {};
    this.users = [];
    this.scholars = [];
    this.assignments = [];
    this.programs = [];
    this.departments = [];
    this.searchText = '';
    this.editId = null;
    this.isEdit = false;
  }
  // =========================
  // LOAD DATA BASED ON TYPE
  // =========================
  loadData() {
    this.users = [];
    this.scholars = [];
    this.programs = [];
    this.loading = true;
    if (this.type === 'supervisor') {
      this.scholarService.getAll().subscribe({
        next: (res: any) => {
          this.loading = false;
          console.log('Scholars loaded:', res);
          this.scholars = res.data || res;
          //this.data=this.scholars;
          //console.log('Data object after assigning scholars:', this.data);
          //console.log('Scholars array:', this.scholars, 'First scholar:', this.scholars[0].scholarid);
          //this.data.scholarId = this.scholars.length > 0 ? this.scholars[0].scholarid : null;
          //console.log('Data object after loading scholars:', this.data);
        },
        error: (err: any) => {
          console.error('Error loading scholars:', err);
          this.loading = false;
        }
      });

      // this.userService.getByRole('ROLE_SUPERVISOR').subscribe({next:(res:any)=> {
      //   console.log('Users loaded:', res);
      //   this.users = res.data || res;
      //   this.loading = false;
      // }, error:(err:any)
      //  => {        console.error('Error loading scholars:', err);
      //   this.loading = false;
      // }});
    }
    if (this.type === 'reviewer') {
      this.programService.getAll().subscribe({
        next: (res: any) => {
          console.log('Programs loaded:', res);
          this.programs = res.data || res;
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error loading scholars:', err);
          this.loading = false;
        }
      });
    }
     if (this.type === 'hod') {
      this.departmentService.getAll().subscribe({
        next: (res: any) => {
          console.log('Departments loaded:', res);
          this.departments = res.data || res;
          this.loading = false;

        },
        error: (err: any) => {
          console.error('Error loading departments:', err);
          this.messageService.showError(err.error?.message || 'Failed to load departments');
          this.loading = false;
        }
      });
    }

     if (this.type === 'dean') {
      this.facultyService.getAll().subscribe({
        next: (res: any) => {
          console.log('Faculties loaded:', res);
          this.faculties = res.data || res;
          this.loading = false;

        },
        error: (err: any) => {
          console.error('Error loading faculties:', err);
          this.messageService.showError(err.error?.message || 'Failed to load faculties');
          this.loading = false;
        }
      });
    }
    const roleMap: any = {
      supervisor: 'ROLE_SUPERVISOR',
      reviewer: 'ROLE_REVIEWER',
      hod: 'ROLE_HOD',
      dean: 'ROLE_DEAN',
    };
    this.loading = true;
    this.userService.getByRole(roleMap[this.type]).subscribe(
      {next:(res: any) => {
      console.log('Users loaded:', res);
      this.users = res.data || res;
      this.data.userId = this.users.length > 0 ? this.users[0].id : null;
      this.loading = false;
    }, error: (err: any) => {
      console.error('Error loading users:', err);
      this.loading = false;
    }});

    console.log('Data after loadData call:', {
      type: this.type,
      users: this.users,  
    });
    console.log('Data object:', this.data);
  }

  // =========================
  // LOAD ASSIGNMENTS
  // =========================

  loadAssignments() {
    this.loading = true;
 if (this.type === 'supervisor') {
    this.assignmentService.getAllSupervisorAssignments().subscribe({
      next: (res: any) => {
        console.log('Assignments', res);
        this.assignments = res.data || res;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading assignments:', error);
        this.loading = false;
      },
    });
  }

  if (this.type === 'reviewer') {
    this.assignmentService.getAllProgramRole().subscribe({
      next: (res: any) => {
        console.log('Program Roles', res);
        this.assignments = res.data || res;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading assignments:', error);
        this.loading = false;
      },
    });
  }

  if (this.type === 'hod') {
    this.assignmentService.getAllHodRoles().subscribe({
      next: (res: any) => {
        console.log('HOD Roles', res);
        this.assignments = res.data || res;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading assignments:', error);
        this.loading = false;
      },
    });
  }

   if (this.type === 'dean') {
    this.assignmentService.getAllDeanRoles().subscribe({
      next: (res: any) => {
        console.log('Dean Roles', res);
        this.assignments = res.data || res;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading assignments:', error);
        this.loading = false;
      },
    });
  }
  
}

  // =========================
  // ASSIGN
  // =========================
  assign() {
    this.loading = true;
    let api$;
     const roleMap: any = {
        reviewer: 'ROLE_REVIEWER',
        hod: 'ROLE_HOD',
        dean: 'ROLE_DEAN',
      };

    if (this.type === 'supervisor') {
      api$ = this.assignmentService.assignSupervisor(this.data);
    } else if (this.type === 'reviewer' ) {
     
      this.data.role = roleMap[this.type];
      api$ = this.assignmentService.assignProgramRole(this.data);
    }
      else if (this.type === 'hod' ) {
        //this.data.role = roleMap[this.type];
        console.log('Data before API call:', this.data);
        api$ = this.assignmentService.assignHod(this.data);
      } 
      else if ( this.type === 'dean') {
        console.log('Data before API call:', this.data);
        api$ = this.assignmentService.assignDean(this.data);
      }
      
      else {
        // Handle unexpected type to prevent undefined api$
        throw new Error(`Unsupported assignment type: ${this.type}`);
      }

    api$.subscribe({
      next: () => {
       // alert(`${this.type.toUpperCase()} assigned successfully`);
          this.messageService.showSuccess( `${this.type.toUpperCase()} assigned successfully` );
        this.resetForm();
        this.loadAssignments();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        //alert('Assignment failed'+ err.error?.message || '');
        this.messageService.showError( err.error?.message || 'Assignment failed');
        this.loading = false;

      },
    });
  }

  // =========================
  // DELETE
  // =========================
  deleteAssignment(a: any) {
    this.loading = true;
    if (!confirm('Delete assignment?')) return;
    if (this.type === 'supervisor') {   
    this.assignmentService
      .deleteSupervisor(a.id)
      .subscribe(() => {this.loadAssignments(); this.loading = false;});
    }
      else if (this.type === 'reviewer') { 
        console.log("reviewer",a); 
        this.assignmentService.removeReviewer(a.id).subscribe(
          { next:() => { this.loadAssignments(); this.loading = false; },
        error: (err) => {          console.error('Error deleting assignment:', err);
          alert('Failed to delete assignment');
          this.loading = false;
        }
      }   
      );
      }

       else if (this.type === 'hod') { 
        console.log("hod",a); 
        this.assignmentService.removeHod(a.id).subscribe(
          { next:() => { this.loadAssignments(); this.loading = false; },
        error: (err) => {          console.error('Error deleting assignment:', err);
          alert('Failed to delete assignment');
          this.loading = false;
        }
      }   
      );
      }
       else if (this.type === 'dean') { 
        console.log("dean",a); 
        this.assignmentService.removeDean(a.id).subscribe(
          { next:() => { this.loadAssignments(); this.loading = false; },
        error: (err) => {          console.error('Error deleting assignment:', err);
          alert('Failed to delete assignment');
          this.loading = false;
        }
      }   
      );
      }
    }

  // =========================
  // SEARCH
  // =========================
  // search() {
  //   if (!this.searchText) {
  //     this.loadAssignments();
  //     return;
  //   }

  //   this.assignmentService.searchAssignments(this.searchText)
  //     .subscribe((res:any) => {
  //       this.assignments = res.data || res;
  //     });
  // }

  search() {
    if (!this.searchText) {
      this.loadAssignments();
      return;
    }

    if (this.type === 'supervisor') {
      this.assignmentService
        .searchAssignments(this.searchText)
        .subscribe((res: any) => {
          this.assignments = res.data || res;
        });
    } else if (this.type === 'reviewer') {
      this.assignmentService
        .searchProgramRoles(this.searchText, 'ROLE_REVIEWER')  
        .subscribe((res: any) => {
          console.log("search program roles",res);
                    this.assignments = res.data || res;
        });
     } else if (this.type === 'hod') {  
        this.assignmentService
        .searchHodRoles(this.searchText)
        .subscribe((res: any) => {
          console.log("search hod roles",res);
          this.assignments = res.data || res;
        }); 
      } else if (this.type === 'dean') {  
        this.assignmentService
        .searchDeanRoles(this.searchText)
        .subscribe((res: any) => {
          console.log("search dean roles",res);
          this.assignments = res.data || res;
        });
      }
    
    else {
      this.assignmentService
        .searchProgramRoles(this.searchText, this.type.toUpperCase())
        .subscribe((res: any) => {
          this.assignments = res.data || res;
        });
    }
  }

  resetSearch() {
    this.searchText = '';
    this.loadAssignments();
  }

  // =========================
  // RESET FORM
  // =========================
  resetForm() {
    this.data = {
      scholarId: null,
      userId: null,
      programId: null,
      role: '',
    };
    this.editId = null;
    this.isEdit = false;
  }
}
