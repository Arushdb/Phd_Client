import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) {}

  success(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['my-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  error(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['snackbar-error']
    });
  }

  info(message: string) {
    this.snackBar.open(message, '', {
      duration: 4000,
      panelClass: ['snackbar-info']
    });
  }
}
