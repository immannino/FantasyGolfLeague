import { Component, ViewChild } from '@angular/core';
import { PgaTourService } from '../../lib/pgatour/pgatour.service';
import { TournamentData, CurrentTournament, Player } from '../../lib/pgatour/pgatour.model';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DisplayHelpers } from '../../lib/utilities/display.helpers';

@Component({
  selector: 'leaderboard',
  templateUrl: './leaderboard.html',
  styleUrls: ['./leaderboard.css']
})
export class LeaderboardComponent {
    constructor(private pgatourService: PgaTourService,  private displayHelper: DisplayHelpers) {}

    tournamentMetaData: CurrentTournament;
    tournamentData: TournamentData;
    // displayedColumns = ['current_position', 'player_bio', 'today', 'total', 'thru', 'teeTime', 'R1', 'R2', 'R3', 'R4'];
    displayedColumns = ['current_position', 'player_bio', 'today', 'total', 'thru', 'R1', 'R2', 'R3', 'R4'];
    tableDataSource: any;

    @ViewChild(MatSort) sort: MatSort;

    trimDate = (date): string =>  String(date).substring(11);

    ngOnInit() {
      this.tournamentData = new TournamentData();
      this.tournamentMetaData = new CurrentTournament();

      this.getTournamentMetadata();
    }

    getTournamentMetadata() {
      this.pgatourService.getCurrentTournamentId().subscribe((data) => {
        this.tournamentMetaData = data;
        this.getFullTournamentDataOnLoad();
      })
    }

    getFullTournamentDataOnLoad() {
      this.pgatourService.getTournamentData(this.tournamentMetaData.tid).subscribe((data) => {
        this.tournamentData = data;
        this.tableDataSource = new MatTableDataSource(this.tournamentData.leaderboard.players);
        this.tableDataSource.sort = this.sort;
      })
    }

    getFullTournamentData() {
      this.pgatourService.getTournamentData(this.tournamentMetaData.tid).subscribe((data) => {
        this.tournamentData = data;
      })
    }
}