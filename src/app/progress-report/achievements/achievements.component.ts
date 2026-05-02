import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html'
})
export class AchievementsComponent {

  // =========================
  // INPUT
  // =========================
  @Input() data: any = {};

  // =========================
  // OUTPUT
  // =========================
  @Output() dataChange = new EventEmitter<any>();

  ngOnInit() {
    if (!this.data) {
      this.data = this.createDefault();
    }
  }

  // =========================
  // DEFAULT STRUCTURE
  // =========================
  createDefault() {
    return {
      awards: '',
      patents: '',
      teachingHours: '',
      teachingType: ''
    };
  }

  // =========================
  // EMIT CHANGES
  // =========================
  emitChanges() {
    this.dataChange.emit(this.data);
  }
}