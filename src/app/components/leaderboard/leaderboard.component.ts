import { Component, ViewChild } from '@angular/core';
import { PgaTourService } from '../../lib/pgatour/pgatour.service';
import { TournamentData, CurrentTournament, Player } from '../../lib/pgatour/pgatour.model';
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
    // displayedColumns = ['current_position', 'player_bio', 'today', 'total', 'thru', 'teeTime', 'R1', 'R2', 'R3', 'R4'];
    displayedColumns = ['current_position', 'player_bio', 'today', 'total', 'thru', 'R1', 'R2', 'R3', 'R4'];
    tableDataSource: any;

    @ViewChild(MatSort) sort: MatSort;

    trimDate = (date): string =>  String(date).substring(11);
    filterPosition = (player: Player): string => player.status.toLowerCase() === 'cut' ? 'CUT' : player.current_position;
    isCut = (player: Player): boolean => player.status.toLowerCase() === 'cut' ? true : false;
    filterScore = (score: number): string => score > 0 ? "+" + score : score < 0 ? String(score) : "E";
    setScoreColor = (score: number) => score > 0 ? 'green' : score < 0 ? 'red' : 'black';

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