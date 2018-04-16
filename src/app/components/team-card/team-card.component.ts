import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Team } from '../../lib/model/team.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Player, PlayerBio, CurrentTournament, TournamentData } from '../../lib/pgatour/pgatour.model';
import { PgaTourService } from '../../lib/pgatour/pgatour.service';
import { DisplayHelpers } from '../../lib/utilities/display.helpers';

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
  playerFilterList = [];
  tournamentPlayers: Player[];
  filteredPlayers: Observable<string[]>;
  isEditable: boolean = false;
  displayTeam: boolean = false;

  constructor(private pgaService: PgaTourService, private displayHelper: DisplayHelpers) {}

  toggleAddNewPlayer = () => this.isAddNewPlayer = !this.isAddNewPlayer;
  toggleEditable = () => this.isEditable = !this.isEditable;
  filter = (val: string): string[] => {
    return val ? this.playerFilterList.filter(option => option.toLowerCase().includes(val.toLowerCase())) : val == "" ? this.playerFilterList : [];
  }
  displayTeamStats(): boolean {
    return (!this.isEditable && this.displayTeam && this.team.players && (this.team.players.length != 0))
  }
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
      let name = this.playerControl.value.split(' ');
      let tempPlayer: Player = this.getPlayerObject(name[0], name[1]);
      
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
    this.tournamentPlayers = new Array<Player>();

    this.pgaService.getCurrentTournamentId().subscribe((data: CurrentTournament) => {
      this.pgaService.getTournamentData(data.tid).subscribe((data: TournamentData) => {
        let players = [];
        let localPlayers = data.leaderboard.players;

        for (let i = 0; i < localPlayers.length; i++) {
          players.push(localPlayers[i].player_bio.first_name + ' ' + localPlayers[i].player_bio.last_name);
        }

        this.playerFilterList = players;
        this.tournamentPlayers = localPlayers;

        this.updateTeamPlayerScores();
      })
    })
  }

  updateTeamPlayerScores() {
    if (this.team.players && this.team.players.length) {
      let tempPlayerList: Player[] = new Array<Player>();

      for (let i = 0; i < this.team.players.length; i++) {
        let tempPlayer: Player = this.getPlayerObject(this.team.players[i].player_bio.first_name, this.team.players[i].player_bio.last_name);

        tempPlayerList.push(tempPlayer);
      }

      this.team.players = tempPlayerList;
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

  getTeamStrokes(): number {
    return this.team.players.map(option => option.total_strokes).reduce((a, c) => a + c);
  }

  filterTeamScore(): number {
    return this.team.players.map(option => option.total).reduce((a, c) => a + c);
  }

  selectRandomPlayers() {
    let localPlayers = this.playerFilterList;
    this.team.players = new Array<Player>();

    if (!this.team.players) this.team.players = new Array<Player>();

    for (let i = 0; i < this.maxPlayers; i++) {
      let randomIndex = Math.round(Math.random() * (localPlayers.length - 1));
      let playerName = localPlayers[randomIndex];
      let nameArray = playerName.split(' ');
      let player: Player = this.getPlayerObject(nameArray[0], nameArray[1]);

      this.team.players.push(player);

      // Remove currently selected player from list to limit duplicates.
      localPlayers.splice(randomIndex, 1);
    }
  }
}
