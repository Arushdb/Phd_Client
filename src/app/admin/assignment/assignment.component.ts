import { Component, OnInit } from '@angular/core';

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
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
})
export class AssignmentComponent implements OnInit {

  // =====================================================
  // TYPE
  // =====================================================

  /*
   * supervisor
   * co-supervisor
   * reviewer
   * hod
   * dean
   * pg-dean
   */
  type: string = '';


  // =====================================================
  // FORM DATA
  // =====================================================

  data: any = {
    scholarId: null,
    userId: null,
    programId: null,
    departmentId: null,
    facultyId: null,
    role: ''
  };


  // =====================================================
  // DROPDOWN DATA
  // =====================================================

  faculties: any[] = [];
  departments: any[] = [];

  users: any[] = [];
  scholars: any[] = [];
  programs: any[] = [];

  assignments: any[] = [];


  // =====================================================
  // UI STATE
  // =====================================================

  loading = false;

  searchText = '';

  editId: number | null = null;

  isEdit = false;


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

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


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {

      const newType = params.get('type') || '';

      console.log('TYPE:', newType);

      if (this.type !== newType) {

        this.type = newType;

        console.log(
          'TYPE CHANGED:',
          this.type
        );

        this.setRole();

        this.resetComponent();

        this.loadData();

        this.loadAssignments();
      }

    });

  }


  // =====================================================
  // SET ROLE
  // =====================================================

  private setRole(): void {

    switch (this.type) {

      case 'supervisor':

        this.data.role = 'PRIMARY';

        break;


      case 'co-supervisor':

        this.data.role = 'CO_SUPERVISOR';

        break;


      case 'reviewer':

        this.data.role = 'ROLE_REVIEWER';

        break;


      case 'hod':

        this.data.role = 'ROLE_HOD';

        break;


      case 'dean':

        this.data.role = 'ROLE_DEAN';

        break;


      case 'pg-dean':

        this.data.role = 'ROLE_PG_DEAN';

        break;


      default:

        this.data.role = '';

        break;
    }

  }


  // =====================================================
  // SEARCH PLACEHOLDER
  // =====================================================

  getSearchPlaceholder(): string {

    switch (this.type) {

      case 'supervisor':
        return 'Search by scholar or supervisor';

      case 'co-supervisor':
        return 'Search by scholar or co-supervisor';

      case 'reviewer':
        return 'Search by program or reviewer';

      case 'hod':
        return 'Search by department or HOD';

      case 'dean':
        return 'Search by faculty or Dean';

      case 'pg-dean':
        return 'Search by PG Dean';

      default:
        return 'Search';
    }

  }


  // =====================================================
  // RESET COMPONENT
  // =====================================================

  resetComponent(): void {

    this.data = {
      scholarId: null,
      userId: null,
      programId: null,
      departmentId: null,
      facultyId: null,
      role: ''
    };

    this.users = [];

    this.scholars = [];

    this.assignments = [];

    this.programs = [];

    this.departments = [];

    this.faculties = [];

    this.searchText = '';

    this.editId = null;

    this.isEdit = false;

  }


  // =====================================================
  // LOAD DATA
  // =====================================================

  loadData(): void {

    this.users = [];
    this.scholars = [];
    this.programs = [];
    this.departments = [];
    this.faculties = [];

    this.loading = true;


    // ===================================================
    // SUPERVISOR / CO-SUPERVISOR
    // ===================================================

    if (
      this.type === 'supervisor' ||
      this.type === 'co-supervisor'
    ) {

      this.scholarService.getAll().subscribe({

        next: (res: any) => {

          console.log(
            'Scholars loaded:',
            res
          );

          this.scholars =
            res.data || res;

          this.loading = false;

        },

        error: (err: any) => {

          console.error(
            'Error loading scholars:',
            err
          );

          this.messageService.showError(
            err.error?.message ||
            'Failed to load scholars'
          );

          this.loading = false;

        }

      });

    }


    // ===================================================
    // REVIEWER
    // ===================================================

    if (this.type === 'reviewer') {

      this.programService.getAll().subscribe({

        next: (res: any) => {

          console.log(
            'Programs loaded:',
            res
          );

          this.programs =
            res.data || res;

          this.loading = false;

        },

        error: (err: any) => {

          console.error(
            'Error loading programs:',
            err
          );

          this.messageService.showError(
            err.error?.message ||
            'Failed to load programs'
          );

          this.loading = false;

        }

      });

    }


    // ===================================================
    // HOD
    // ===================================================

    if (this.type === 'hod') {

      this.departmentService.getAll().subscribe({

        next: (res: any) => {

          console.log(
            'Departments loaded:',
            res
          );

          this.departments =
            res.data || res;

          this.loading = false;

        },

        error: (err: any) => {

          console.error(
            'Error loading departments:',
            err
          );

          this.messageService.showError(
            err.error?.message ||
            'Failed to load departments'
          );

          this.loading = false;

        }

      });

    }


    // ===================================================
    // DEAN
    // ===================================================

    if (this.type === 'dean') {

      this.facultyService.getAll().subscribe({

        next: (res: any) => {

          console.log(
            'Faculties loaded:',
            res
          );

          this.faculties =
            res.data || res;

          this.loading = false;

        },

        error: (err: any) => {

          console.error(
            'Error loading faculties:',
            err
          );

          this.messageService.showError(
            err.error?.message ||
            'Failed to load faculties'
          );

          this.loading = false;

        }

      });

    }


    // ===================================================
    // USERS
    // ===================================================

    const roleMap: any = {

      'supervisor': 'ROLE_SUPERVISOR',

      'co-supervisor': 'ROLE_CO_SUPERVISOR',

      'reviewer': 'ROLE_REVIEWER',

      'hod': 'ROLE_HOD',

      'dean': 'ROLE_DEAN',

      'pg-dean': 'ROLE_PG_DEAN'

    };


    const userRole = roleMap[this.type];


    if (!userRole) {

      this.loading = false;

      return;
    }


    this.userService
      .getByRole(userRole)
      .subscribe({

        next: (res: any) => {

          console.log(
            'Users loaded:',
            res
          );

          this.users =
            res.data || res;

          /*
           * Do not automatically select the first user.
           * Let the administrator explicitly select a user.
           */

          this.data.userId = null;

          this.loading = false;

        },

        error: (err: any) => {

          console.error(
            'Error loading users:',
            err
          );

          this.messageService.showError(
            err.error?.message ||
            'Failed to load users'
          );

          this.loading = false;

        }

      });

  }


  // =====================================================
  // LOAD ASSIGNMENTS
  // =====================================================

  loadAssignments(): void {

    this.loading = true;


    // ===================================================
    // SUPERVISOR / CO-SUPERVISOR
    // ===================================================

    if (
      this.type === 'supervisor' ||
      this.type === 'co-supervisor'
    ) {

      this.assignmentService
        .getAllSupervisorAssignments()
        .subscribe({

          next: (res: any) => {

            console.log(
              'Supervisor assignments:',
              res
            );

            const allAssignments =
              res.data || res;

            /*
             * Supervisor table contains both:
             *
             * PRIMARY
             * CO_SUPERVISOR
             *
             * Display only the required type.
             */

            if (this.type === 'supervisor') {

              this.assignments =
                allAssignments.filter(
                  (a: any) =>
                    a.role === 'PRIMARY'
                );

            } else {
                debugger;
              this.assignments =
                allAssignments.filter(
                  (a: any) =>
                    a.role === 'CO_SUPERVISOR'
                );

            }

            this.loading = false;

          },

          error: (error: any) => {

            console.error(
              'Error loading supervisor assignments:',
              error
            );

            this.messageService.showError(
              error.error?.message ||
              'Failed to load assignments'
            );

            this.loading = false;

          }

        });

      return;
    }


    // ===================================================
    // REVIEWER
    // ===================================================

    if (this.type === 'reviewer') {

      this.assignmentService
        .getAllProgramRole()
        .subscribe({

          next: (res: any) => {

            console.log(
              'Program Roles:',
              res
            );

            this.assignments =
              (res.data || res).filter(
                (a: any) =>
                  a.role === 'ROLE_REVIEWER'
              );

            this.loading = false;

          },

          error: (error: any) => {

            console.error(
              'Error loading reviewer assignments:',
              error
            );

            this.messageService.showError(
              error.error?.message ||
              'Failed to load reviewer assignments'
            );

            this.loading = false;

          }

        });

      return;
    }


    // ===================================================
    // HOD
    // ===================================================

    if (this.type === 'hod') {

      this.assignmentService
        .getAllHodRoles()
        .subscribe({

          next: (res: any) => {

            console.log(
              'HOD Roles:',
              res
            );

            this.assignments =
              res.data || res;

            this.loading = false;

          },

          error: (error: any) => {

            console.error(
              'Error loading HOD assignments:',
              error
            );

            this.messageService.showError(
              error.error?.message ||
              'Failed to load HOD assignments'
            );

            this.loading = false;

          }

        });

      return;
    }


    // ===================================================
    // DEAN
    // ===================================================

    if (this.type === 'dean') {

      this.assignmentService
        .getAllDeanRoles()
        .subscribe({

          next: (res: any) => {

            console.log(
              'Dean Roles:',
              res
            );

            this.assignments =
              res.data || res;

            this.loading = false;

          },

          error: (error: any) => {

            console.error(
              'Error loading Dean assignments:',
              error
            );

            this.messageService.showError(
              error?.error?.message ||
              'Failed to load Dean assignments'
            );

            this.loading = false;

          }

        });

      return;
    }


    // ===================================================
    // PG DEAN
    // ===================================================

    if (this.type === 'pg-dean') {

      /*
       * PG DEAN is not scholar/program/department/faculty
       * specific in the workflow.
       *
       * If your existing getAllProgramRole() endpoint
       * supports ROLE_PG_DEAN, use it here.
       */

      this.assignmentService
        .getAllProgramRole()
        .subscribe({

          next: (res: any) => {

            console.log(
              'PG Dean Roles:',
              res
            );

            this.assignments =
              (res.data || res).filter(
                (a: any) =>
                  a.role === 'ROLE_PG_DEAN'
              );

            this.loading = false;

          },

          error: (error: any) => {

            console.error(
              'Error loading PG Dean assignments:',
              error
            );

            this.messageService.showError(
              error.error?.message ||
              'Failed to load PG Dean assignments'
            );

            this.loading = false;

          }

        });

      return;
    }


    this.loading = false;

  }


  // =====================================================
  // ASSIGN
  // =====================================================

  assign(): void {

    this.loading = true;

    let api$: any;


    // ===================================================
    // SUPERVISOR
    // ===================================================

    if (this.type === 'supervisor') {

      this.data.role = 'PRIMARY';

      api$ =
        this.assignmentService
          .assignSupervisor(this.data);

    }


    // ===================================================
    // CO-SUPERVISOR
    // ===================================================

    else if (this.type === 'co-supervisor') {

      this.data.role = 'CO_SUPERVISOR';

      api$ =
        this.assignmentService
          .assignSupervisor(this.data);

    }


    // ===================================================
    // REVIEWER
    // ===================================================

    else if (this.type === 'reviewer') {

      this.data.role = 'ROLE_REVIEWER';

      api$ =
        this.assignmentService
          .assignProgramRole(this.data);

    }


    // ===================================================
    // HOD
    // ===================================================

    else if (this.type === 'hod') {

      this.data.role = 'ROLE_HOD';

      console.log(
        'HOD data before API call:',
        this.data
      );

      api$ =
        this.assignmentService
          .assignHod(this.data);

    }


    // ===================================================
    // DEAN
    // ===================================================

    else if (this.type === 'dean') {

      this.data.role = 'ROLE_DEAN';

      console.log(
        'Dean data before API call:',
        this.data
      );

      api$ =
        this.assignmentService
          .assignDean(this.data);

    }


    // ===================================================
    // PG DEAN
    // ===================================================

    else if (this.type === 'pg-dean') {

      this.data.role = 'ROLE_PG_DEAN';

      /*
       * Using your existing program-role service
       * temporarily.
       *
       * If PG Dean has a dedicated backend endpoint,
       * replace this with that service method.
       */

      api$ =
        this.assignmentService
          .assignProgramRole(this.data);

    }


    // ===================================================
    // INVALID TYPE
    // ===================================================

    else {

      this.loading = false;

      this.messageService.showError(
        `Unsupported assignment type: ${this.type}`
      );

      return;
    }


    // ===================================================
    // API RESULT
    // ===================================================

    api$.subscribe({

      next: () => {

        this.messageService.showSuccess(
          `${this.type.toUpperCase()} assigned successfully`
        );

        this.resetForm();

        this.loadAssignments();

        this.loading = false;

      },

      error: (err: any) => {

        console.error(
          'Assignment error:',
          err
        );

        this.messageService.showError(
          err.error?.message ||
          'Assignment failed'
        );

        this.loading = false;

      }

    });

  }


  // =====================================================
  // DELETE ASSIGNMENT
  // =====================================================

  deleteAssignment(a: any): void {

    if (!confirm('Delete assignment?')) {
      return;
    }

    this.loading = true;


    // ===================================================
    // SUPERVISOR / CO-SUPERVISOR
    // ===================================================

    if (
      this.type === 'supervisor' ||
      this.type === 'co-supervisor'
    ) {

      this.assignmentService
        .deleteSupervisor(a.id)
        .subscribe({

          next: () => {

            this.messageService.showSuccess(
              'Assignment deleted successfully'
            );

            this.loadAssignments();

            this.loading = false;

          },

          error: (err: any) => {

            console.error(
              'Error deleting assignment:',
              err
            );

            this.messageService.showError(
              err.error?.message ||
              'Failed to delete assignment'
            );

            this.loading = false;

          }

        });

      return;
    }


    // ===================================================
    // REVIEWER
    // ===================================================

    if (this.type === 'reviewer') {

      this.assignmentService
        .removeReviewer(a.id)
        .subscribe({

          next: () => {

            this.messageService.showSuccess(
              'Reviewer deleted successfully'
            );

            this.loadAssignments();

            this.loading = false;

          },

          error: (err: any) => {

            console.error(
              'Error deleting reviewer:',
              err
            );

            this.messageService.showError(
              err.error?.message ||
              'Failed to delete reviewer'
            );

            this.loading = false;

          }

        });

      return;
    }


    // ===================================================
    // HOD
    // ===================================================

    if (this.type === 'hod') {

      this.assignmentService
        .removeHod(a.id)
        .subscribe({

          next: () => {

            this.messageService.showSuccess(
              'HOD deleted successfully'
            );

            this.loadAssignments();

            this.loading = false;

          },

          error: (err: any) => {

            console.error(
              'Error deleting HOD:',
              err
            );

            this.messageService.showError(
              err.error?.message ||
              'Failed to delete HOD'
            );

            this.loading = false;

          }

        });

      return;
    }


    // ===================================================
    // DEAN
    // ===================================================

    if (this.type === 'dean') {

      this.assignmentService
        .removeDean(a.id)
        .subscribe({

          next: () => {

            this.messageService.showSuccess(
              'Dean deleted successfully'
            );

            this.loadAssignments();

            this.loading = false;

          },

          error: (err: any) => {

            console.error(
              'Error deleting Dean:',
              err
            );

            this.messageService.showError(
              err.error?.message ||
              'Failed to delete Dean'
            );

            this.loading = false;

          }

        });

      return;
    }


    // ===================================================
    // PG DEAN
    // ===================================================

    if (this.type === 'pg-dean') {

      /*
       * At present there is no dedicated PG Dean
       * delete method in the AssignmentService shown
       * in your existing component.
       *
       * We therefore do not call an invented method here.
       */

      this.messageService.showError(
        'PG Dean delete service is not configured yet.'
      );

      this.loading = false;

      return;
    }


    this.loading = false;

  }


  // =====================================================
  // SEARCH
  // =====================================================

  search(): void {

    if (!this.searchText) {

      this.loadAssignments();

      return;
    }


    // ===================================================
    // SUPERVISOR / CO-SUPERVISOR
    // ===================================================

    if (
      this.type === 'supervisor' ||
      this.type === 'co-supervisor'
    ) {

      this.assignmentService
        .searchAssignments(this.searchText)
        .subscribe({

          next: (res: any) => {

            const allAssignments =
              res.data || res;

            if (this.type === 'supervisor') {

              this.assignments =
                allAssignments.filter(
                  (a: any) =>
                    a.role === 'PRIMARY'
                );

            } else {

              this.assignments =
                allAssignments.filter(
                  (a: any) =>
                    a.role === 'CO_SUPERVISOR'
                );

            }

          },

          error: (err: any) => {

            console.error(
              'Search error:',
              err
            );

            this.messageService.showError(
              err.error?.message ||
              'Search failed'
            );

          }

        });

      return;
    }


    // ===================================================
    // REVIEWER
    // ===================================================

    if (this.type === 'reviewer') {

      this.assignmentService
        .searchProgramRoles(
          this.searchText,
          'ROLE_REVIEWER'
        )
        .subscribe({

          next: (res: any) => {

            console.log(
              'Search program roles:',
              res
            );

            this.assignments =
              res.data || res;

          },

          error: (err: any) => {

            console.error(
              'Search reviewer error:',
              err
            );

            this.messageService.showError(
              err.error?.message ||
              'Search failed'
            );

          }

        });

      return;
    }


    // ===================================================
    // HOD
    // ===================================================

    if (this.type === 'hod') {

      this.assignmentService
        .searchHodRoles(this.searchText)
        .subscribe({

          next: (res: any) => {

            console.log(
              'Search HOD roles:',
              res
            );

            this.assignments =
              res.data || res;

          },

          error: (err: any) => {

            console.error(
              'Search HOD error:',
              err
            );

            this.messageService.showError(
              err.error?.message ||
              'Search failed'
            );

          }

        });

      return;
    }


    // ===================================================
    // DEAN
    // ===================================================

    if (this.type === 'dean') {

      this.assignmentService
        .searchDeanRoles(this.searchText)
        .subscribe({

          next: (res: any) => {

            console.log(
              'Search Dean roles:',
              res
            );

            this.assignments =
              res.data || res;

          },

          error: (err: any) => {

            console.error(
              'Search Dean error:',
              err
            );

            this.messageService.showError(
              err.error?.message ||
              'Search failed'
            );

          }

        });

      return;
    }


    // ===================================================
    // PG DEAN
    // ===================================================

    if (this.type === 'pg-dean') {

      this.assignmentService
        .searchProgramRoles(
          this.searchText,
          'ROLE_PG_DEAN'
        )
        .subscribe({

          next: (res: any) => {

            console.log(
              'Search PG Dean roles:',
              res
            );

            this.assignments =
              res.data || res;

          },

          error: (err: any) => {

            console.error(
              'Search PG Dean error:',
              err
            );

            this.messageService.showError(
              err.error?.message ||
              'Search failed'
            );

          }

        });

      return;
    }


    // ===================================================
    // DEFAULT
    // ===================================================

    this.assignmentService
      .searchProgramRoles(
        this.searchText,
        this.type.toUpperCase()
      )
      .subscribe({

        next: (res: any) => {

          this.assignments =
            res.data || res;

        },

        error: (err: any) => {

          console.error(
            'Search error:',
            err
          );

          this.messageService.showError(
            err.error?.message ||
            'Search failed'
          );

        }

      });

  }


  // =====================================================
  // RESET SEARCH
  // =====================================================

  resetSearch(): void {

    this.searchText = '';

    this.loadAssignments();

  }


  // =====================================================
  // RESET FORM
  // =====================================================

  resetForm(): void {

    this.data = {

      scholarId: null,

      userId: null,

      programId: null,

      departmentId: null,

      facultyId: null,

      role: this.getDefaultRole()

    };

    this.editId = null;

    this.isEdit = false;

  }


  // =====================================================
  // DEFAULT ROLE
  // =====================================================

  private getDefaultRole(): string {

    switch (this.type) {

      case 'supervisor':
        return 'PRIMARY';

      case 'co-supervisor':
        return 'CO_SUPERVISOR';

      case 'reviewer':
        return 'ROLE_REVIEWER';

      case 'hod':
        return 'ROLE_HOD';

      case 'dean':
        return 'ROLE_DEAN';

      case 'pg-dean':
        return 'ROLE_PG_DEAN';

      default:
        return '';

    }

  }

}