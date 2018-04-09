import { Component } from '@angular/core';
import { League } from '../../lib/model/league.model';
import { Team } from '../../lib/model/team.model';
import { Player, PlayerBio } from '../../lib/pgatour/pgatour.model';

@Component({
  selector: 'teams',
  templateUrl: './teams.html',
  styleUrls: ['./teams.css']
})
export class TeamComponent {
  league: League;
  constructor() {}

  ngOnInit() {
    this.league = new League();
    this.league.teams = new Array<Team>();
    // this.createLeagueTeams();
  }

  handleNewTeam(newTeam: Team) {
    this.league.teams.push(newTeam);
  }
  createLeagueTeams() {

    let players: Player[] = new Array<Player>();
    let player: Player = new Player();
    player.current_position = "T5";
    player.current_round = 4;
    player.player_bio = new PlayerBio();
    player.player_bio.country = 'USA';
    player.player_bio.first_name = "Tiger";
    player.player_bio.last_name = "Woods";
    player.player_bio.short_name = "Tiger";
    player.today = -5;
    player.total = -10;

    players.push(player);
    players.push(player);
    players.push(player);
    players.push(player);
    players.push(player);

    this.league.teams.push(new Team("Team Spike", "Spike", "McBullah", this.randomHexColorCode(), "email@test.ts", players));
    this.league.teams.push(new Team("Team Schmidt", "Schmidt", "", this.randomHexColorCode(), "email@test.ts", players));
    this.league.teams.push(new Team("Team Tys", "Matty", "Tys", this.randomHexColorCode(), "email@test.ts", players));
    this.league.teams.push(new Team("Team Neppach", "Mike", "Neppach", this.randomHexColorCode(), "email@test.ts", players));
    this.league.teams.push(new Team("Team Tones", "Tones", "McBones", this.randomHexColorCode(), "email@test.ts", players));
  }

  randomHexColorCode = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
  };
}
