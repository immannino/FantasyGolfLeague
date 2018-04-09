import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Team } from '../../lib/model/team.model';

@Component({
  selector: 'add-team',
  templateUrl: './add-team.html',
  styleUrls: ['./add-team.css']
})
export class AddTeamComponent {
    constructor(public dialog: MatDialog) {}

    tempTeam: Team;
    
    @Output()
    teamAdded: EventEmitter<Team> = new EventEmitter<Team>();

    ngOnInit() {
    }

    isValidTeam = (): boolean => this.tempTeam.teamName && this.tempTeam.firstName && this.tempTeam.lastName ? true : false;
    
    openDialog(): void {
      this.tempTeam = new Team();

      let dialogRef = this.dialog.open(AddTeamDialogTemplate, {
        width: '500px',
        data: { 
            teamName: undefined, 
            firstName: undefined,
            lastName: undefined,
            email: "",
            teamColor: "#076652"
          }
      });
  
      dialogRef.afterClosed().subscribe(teamInfo => {
        this.tempTeam = teamInfo;

        if (this.isValidTeam()) {
          this.teamAdded.emit(this.tempTeam);
        }

        this.tempTeam = null;
      });
    }
}


@Component({
  selector: 'add-team-dialog-template',
  templateUrl: 'add-team-dialog-template.html',
})
export class AddTeamDialogTemplate {

  constructor(
    public dialogRef: MatDialogRef<AddTeamDialogTemplate>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}