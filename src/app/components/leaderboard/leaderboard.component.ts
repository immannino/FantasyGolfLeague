import { Component, ViewChild } from '@angular/core';
import { PgaTourService } from '../../lib/pgatour/pgatour.service';
import { TournamentData, CurrentTournament } from '../../lib/pgatour/pgatour.model';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'leaderboard',
  templateUrl: './leaderboard.html',
  styleUrls: ['./leaderboard.css']
})
export class LeaderboardComponent {
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
    
    filterScore(score: number): string {
      if (score > 0 ) { return "+" + score; }
      else if (score < 0) { return String(score); }
      else { return "E"; } 
    }

    setScoreColor(score: number) {
      if (score > 0) { return 'green'; }
      else if (score < 0) { return 'red'; }
      else { return 'black'; }
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