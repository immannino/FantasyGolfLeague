import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input()
  maxPlayers; number;
  @Output()
  teamDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  isAddNewPlayer: boolean = false;
  playerControl: FormControl = new FormControl();
  players = [];
  filteredPlayers: Observable<string[]>;
  isEditable: boolean = false;

  constructor(private pgaService: PgaTourService) {}

  toggleAddNewPlayer = () => this.isAddNewPlayer = !this.isAddNewPlayer;
  toggleEditable = () => this.isEditable = !this.isEditable;
  filter = (val: string): string[] => this.players.filter(option => option.toLowerCase().includes(val.toLowerCase()));
  removePlayer = (index: number) => this.team.players.splice(index, 1);

  ngOnInit() {
    this.maxPlayers = this.maxPlayers || 5;

    this.filteredPlayers = this.playerControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );

    this.loadPlayersList();
  }

  addNewPlayer() {
    this.toggleAddNewPlayer();

    if (this.filter(this.playerControl.value).length != 0) {
      console.log("okay?");
      let tempPlayer: Player = new Player();
      let bio: PlayerBio = new PlayerBio();
      let name = this.playerControl.value.split(' ');
      bio.first_name = name[0];
      bio.last_name = name[1];
  
      tempPlayer.player_bio = bio;
      
      if (!this.team.players) this.team.players = new Array<Player>();
  
      this.team.players.push(tempPlayer);
    }

    this.playerControl.reset();
  }

  /** 
   * Its been a good run comrade, but every rose has it's thorn. 
   * 
   * Live long, and prosper.
   * 
   * Goodnight sweet prince.
  */
  order66() {
    //Eventually make a firebase call and delete this teams index or some shit
    // currently just beam me up. (Tell parent component to remove me from list of teams)
    // Update team to have a firebase ID or some shit.

    //Add confirmation popup:
    // 1. Display team name in card dialog
    // 2. Ask to type in Team Name to confirm delete
    // Have delete button disabled until team name typed is same as team name
    this.teamDeleted.emit(true);
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
  selectRandomPlayers() {
    let localPlayers = this.players;
    this.team.players = new Array<Player>();

    if (!this.team.players) this.team.players = new Array<Player>();

    for (let i = 0; i < this.maxPlayers; i++) {
      let tempPlayer: Player = new Player();
      let bio: PlayerBio = new PlayerBio();
      let randomIndex = Math.round(Math.random() * (localPlayers.length - 1));
      let playerName = localPlayers[randomIndex];
      let nameArray = playerName.split(' ');

      bio.first_name = nameArray[0];
      bio.last_name = nameArray[1];
    
      tempPlayer.player_bio = bio;
      this.team.players.push(tempPlayer);

      // Remove currently selected player from list to limit duplicates.
      localPlayers.splice(randomIndex, 1);
    }
  }
}
