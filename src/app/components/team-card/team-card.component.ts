import { Component, Input } from '@angular/core';
import { Team } from '../../lib/model/team.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Player, PlayerBio, CurrentTournament, TournamentData } from '../../lib/pgatour/pgatour.model';
import { PgaTourService } from '../../lib/pgatour/pgatour.service';

@Component({
  selector: 'team-card',
  templateUrl: './team-card.html',
  styleUrls: ['./team-card.css']
})
export class TeamCardComponent {
  @Input()
  team: Team;
  isAddNewPlayer: boolean = false;
  playerControl: FormControl = new FormControl();
  players = [];
  // players = [
  //   'Tiger Woods',
  //   'Rory McIlroy',
  //   'Bubba Watson',
  //   'Jordan Spieth',
  //   'Patric Reed',
  //   'Rickie Fowler',
  //   'Henrik Stenson',
  //   'Marc Leishman',
  //   'Tony Finau',
  //   'Dustin Johnson',
  //   'Justin Rose',
  //   'Justin Thomas',
  //   'Jason Day',
  //   'Si Woo Kim',
  //   'Matt Kuchar'
  // ];

  filteredPlayers: Observable<string[]>;

  constructor(private pgaService: PgaTourService) {}

  toggleAddNewPlayer = () => this.isAddNewPlayer = !this.isAddNewPlayer;
  filter = (val: string): string[] => this.players.filter(option => option.toLowerCase().includes(val.toLowerCase()));

  ngOnInit() {
    this.filteredPlayers = this.playerControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );

    this.loadPlayersList();
  }

  addNewPlayer() {
    this.toggleAddNewPlayer();

    let tempPlayer: Player = new Player();
    let bio: PlayerBio = new PlayerBio();
    let name = this.playerControl.value.split(' ');
    bio.first_name = name[0];
    bio.last_name = name[1];

    tempPlayer.player_bio = bio;
    
    if (!this.team.players) this.team.players = new Array<Player>();

    this.team.players.push(tempPlayer);

    this.playerControl.reset();
  }

  loadPlayersList() {
    this.pgaService.getCurrentTournamentId().subscribe((data: CurrentTournament) => {
      this.pgaService.getTournamentData(data.tid).subscribe((data: TournamentData) => {
        let players = [];
        let localPlayers = data.leaderboard.players;
        for (let i = 0; i < localPlayers.length; i++) {
          players.push(localPlayers[i].player_bio.first_name + ' ' + localPlayers[i].player_bio.last_name);
        }

        this.players = players;
      })
    })
  }
}
