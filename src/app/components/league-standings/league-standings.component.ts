import { Component, OnInit } from '@angular/core';
import { Team } from '../../lib/model/team.model';
import { League } from '../../lib/model/league.model';
import { LeagueService } from '../../lib/firebase/league.service';
import { Player, CurrentTournament, TournamentData } from '../../lib/pgatour/pgatour.model';
import { DisplayHelpers } from '../../lib/utilities/display.helpers';
import { PgaTourService } from '../../lib/pgatour/pgatour.service';

@Component({
  selector: 'league-standings',
  templateUrl: './league-standings.html',
  styleUrls: ['./league-standings.css']
})
export class LeagueStandingsComponent {
    league: League;
    tournamentPlayers: Player[];
    displayTeam: boolean = false;
    currentTournamentColumns = [ 'position', 'team', 'team_score', 'team_strokes', 'players_active'];

    constructor(private leagueService: LeagueService, private displayHelper: DisplayHelpers, private pgaService: PgaTourService) {}

    ngOnInit() {
      this.league = this.leagueService.getLeague();
      this.loadPlayersList();
    }

    loadPlayersList() {
      this.tournamentPlayers = new Array<Player>();
  
      this.pgaService.getCurrentTournamentId().subscribe((data: CurrentTournament) => {
        this.pgaService.getTournamentData(data.tid).subscribe((data: TournamentData) => {
          let players = [];
          let localPlayers = data.leaderboard.players;
  
          for (let i = 0; i < localPlayers.length; i++) {
            players.push(localPlayers[i].player_bio.first_name + ' ' + localPlayers[i].player_bio.last_name);
          }
  
          this.tournamentPlayers = localPlayers;
  
          this.updateTeamPlayerScores();
        })
      })
    }

    updateTeamPlayerScores() {
      for (let i = 0; i < this.league.teams.length; i++) {
        if (this.league.teams[i].players && this.league.teams[i].players.length) {
          let tempPlayerList: Player[] = new Array<Player>();
    
          for (let z = 0; z < this.league.teams[i].players.length; z++) {
            let tempPlayer: Player = this.getPlayerObject(this.league.teams[i].players[z].player_bio.first_name, this.league.teams[i].players[z].player_bio.last_name);
    
            tempPlayerList.push(tempPlayer);
          }
    
          this.league.teams[i].players = tempPlayerList;
        }
      }
  
      this.displayTeam = true;
    }

    getPlayerObject(firstName: string, lastName: string): Player {
      let filterFirstName = (firstName: string) => this.tournamentPlayers.filter((option: Player) => option.player_bio.first_name.toLowerCase().includes(firstName.toLowerCase()));
      let filterLastName = (lastName: string, list: Player[]) => list.filter((option: Player) => option.player_bio.last_name.toLowerCase().includes(lastName.toLowerCase()));
      let filteredList = filterFirstName(firstName);
  
      if (filteredList.length > 1) {
        filteredList = filterLastName(lastName, filteredList);
      }
  
      return filteredList[0];
    }

    filterTeamStrokes(players: Player[]): number {
      return players && players.length ? players.map(option => option.total_strokes).reduce((a, c) => a + c) : Infinity;
    }
  
    filterTeamScore(players: Player[]): number {
      return players && players.length  ? players.map(option => option.total).reduce((a, c) => a + c) : Infinity;
    }

    filterActivePlayers(players: Player[]): number {
      console.log(players);
      return players && players.length  ? players.map(option => option.status).filter(position => position.toLowerCase() != 'cut').length : Infinity;
    }
}
