import { Component, ViewChild } from '@angular/core';
import { PgaTourService } from '../lib/pgatour/pgatour.service';
import { TournamentData, CurrentTournament } from '../lib/pgatour/pgatour.model';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
    constructor(private pgatourService: PgaTourService) {}
    tournamentMetaData: CurrentTournament;
    tournamentData: TournamentData;
    displayedColumns = ['current_position', 'player_bio', 'today', 'total', 'thru', 'teeTime', 'R1', 'R2', 'R3', 'R4'];
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

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
