import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Achievement } from '../../interfaces/achievement';
import { AchievementsService } from '../../services/achievements.service';



@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './achievements.component.html'
})
export class AchievementsComponent implements OnInit {

  @Input() reportId!: number;
  @Input() canEdit: boolean = false;

  achievements: Achievement[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private achievementsService: AchievementsService
  ) {}

  ngOnInit(): void {
    this.getAchievements();
  }

  getAchievements(): void {
    if (!this.reportId) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.achievementsService.getAchievements(this.reportId)
      .subscribe({
        next: (data) => {
          this.achievements = data || [];
          
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading achievements:', error);
          this.errorMessage = 'Unable to load achievements.';
          this.loading = false;
        }
      });
  }

  createEmptyAchievement(): Achievement {
    return {
      awards: '',
      patents: '',
      teachingHours: null,
      teachingType: ''
    };
  }

  addEmptyRow(): void {
    const hasEmptyRow = this.achievements.some(
      a => !a.id && !this.hasData(a)
    );

    if (!hasEmptyRow) {
      this.achievements.push(this.createEmptyAchievement());
    }
  }

  hasData(achievement: Achievement): boolean {
    console.log('Checking data for achievement:', achievement);
    return !!(
      achievement.awards?.trim() ||
      achievement.patents?.trim() ||
      achievement.teachingType?.trim() ||
      achievement.teachingHours !== null &&
      achievement.teachingHours !== undefined
    );
  }

  isRowValid(achievement: Achievement): boolean {
    if (!this.hasData(achievement)) {
      return false;
    }

    if (
      achievement.teachingHours !== null &&
      achievement.teachingHours !== undefined &&
      (
        !Number.isInteger(Number(achievement.teachingHours)) ||
        Number(achievement.teachingHours) < 0
      )
    ) {
      return false;
    }

    return true;
  }

  saveRow(index: number): void {
       if (!this.canEdit) {
    return;
  }
    const achievement = this.achievements[index];


    if (!this.isRowValid(achievement)) {
      this.errorMessage =
        'Enter valid achievement details. Teaching hours must be a non-negative whole number.';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    if (achievement.id) {
      this.achievementsService.updateAchievement(
        this.reportId,
        achievement.id,
        achievement
      ).subscribe({
        next: (updated) => {
          this.achievements[index] = updated;
          this.successMessage = 'Achievement updated successfully.';
          this.addEmptyRow();
        },
        error: (error) => {
          console.error('Error updating achievement:', error);
          this.errorMessage = 'Unable to update achievement.';
        }
      });
    } else {
      this.achievementsService.saveAchievement(
        this.reportId,
        achievement
      ).subscribe({
        next: (saved) => {
          this.achievements[index] = saved;
          this.successMessage = 'Achievement saved successfully.';
          this.addEmptyRow();
        },
        error: (error) => {
          console.error('Error saving achievement:', error);
          this.errorMessage = 'Unable to save achievement.';
        }
      });
    }
  }

  deleteRow(index: number): void {
       if (!this.canEdit) {
    return;
  }
    const achievement = this.achievements[index];

    if (!achievement.id) {
      this.achievements.splice(index, 1);
      this.addEmptyRow();
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.achievementsService.deleteAchievement(
      this.reportId,
      achievement.id
    ).subscribe({
      next: () => {
        this.achievements.splice(index, 1);
        this.addEmptyRow();
        this.successMessage = 'Achievement deleted successfully.';
      },
      error: (error) => {
        console.error('Error deleting achievement:', error);
        this.errorMessage = 'Unable to delete achievement.';
      }
    });
  }

  isEmptyRow(achievement: Achievement): boolean {
    return !achievement.id && !this.hasData(achievement);
  }
  addAchievementRow(): void {
       if (!this.canEdit) {
    return;
  }
  this.achievements.push(this.createEmptyAchievement());
}
}