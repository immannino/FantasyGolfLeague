import { OnInit, Injectable } from "@angular/core";
import { League } from "../model/league.model";
import { Team } from "../model/team.model";
import { Player, PlayerBio } from "../pgatour/pgatour.model";

@Injectable()
export class LeagueService {
    constructor() {}
    public league: League;

    ngOnInit() {
        this.createLeagueTeams();
    }

    getLeague(): League {
        if (!this.league) this.createLeagueTeams()

        return this.league;
    }
    createLeagueTeams() {
        let players: Player[] = new Array<Player>();

        let robert: Player = new Player();
        robert.player_bio = new PlayerBio();
        robert.player_bio.first_name = "Robert";
        robert.player_bio.last_name = "Streb";

        let matthew: Player = new Player();
        matthew.player_bio = new PlayerBio();
        matthew.player_bio.first_name = "Matthew";
        matthew.player_bio.last_name = "Fitzpatrick";
        
        let jeff: Player = new Player();
        jeff.player_bio = new PlayerBio();
        jeff.player_bio.first_name = "Jeff";
        jeff.player_bio.last_name = "Maggert";

        let kevin: Player = new Player();
        kevin.player_bio = new PlayerBio();
        kevin.player_bio.first_name = "Kevin";
        kevin.player_bio.last_name = "Na";

        let fran: Player = new Player();
        fran.player_bio = new PlayerBio();
        fran.player_bio.country = 'USA';
        fran.player_bio.first_name = "Francesco";
        fran.player_bio.last_name = "Molinari";

        players.push(robert);
        players.push(matthew);
        players.push(jeff);
        players.push(kevin);
        players.push(fran);

        // this.league.teams.push(new Team("Team Spike", "Spike", "McBullah", this.randomHexColorCode(), "email@test.ts"));
        // this.league.teams.push(new Team("Team Schmidt", "Schmidt", "", this.randomHexColorCode(), "email@test.ts"));
        // this.league.teams.push(new Team("Team Tys", "Matty", "Tys", this.randomHexColorCode(), "email@test.ts"));
        // this.league.teams.push(new Team("Team Neppach", "Mike", "Biggums", this.randomHexColorCode(), "email@test.ts"));
        this.league = new League();
        this.league.teams = new Array<Team>();
        this.league.teams.push(new Team("Team Test", "Tones", "Malones", this.randomHexColorCode(), "email@test.ts", players));
        this.league.teams.push(new Team("Team Brock", "Brock", "Samford", this.randomHexColorCode(), "email@test.ts"));
    }

    randomHexColorCode = () => {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        return '#' + n.slice(0, 6);
    };
}