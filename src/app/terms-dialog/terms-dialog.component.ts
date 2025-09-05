import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-terms-dialog',
  templateUrl: './terms-dialog.component.html',
  styleUrls: ['./terms-dialog.component.scss']
})
export class TermsDialogComponent {
  constructor(public dialogRef: MatDialogRef<TermsDialogComponent>) {}

  onAccept(): void {
    // Logic to handle acceptance of terms
    this.dialogRef.close(true);
  }

  onReject(): void {
    // Logic to handle rejection of terms
    this.dialogRef.close(false);
  }
}