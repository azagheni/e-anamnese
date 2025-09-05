import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.scss']
})
export class WelcomeDialogComponent {
  constructor(public dialogRef: MatDialogRef<WelcomeDialogComponent>) {}

  onAccept(): void {
    // Logic to handle acceptance of welcome
    this.dialogRef.close(true);
  }

  onReject(): void {
    // Logic to handle rejection of welcome
    this.dialogRef.close(false);
  }
}