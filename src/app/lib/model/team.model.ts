import { LeagueIdentifier } from "./league.model";
import { Player } from "../pgatour/pgatour.model";

export class Team {
    teamName: string;
    firstName: string;
    lastName: string;
    teamColor: string;
    email: string;
    currentWeek: WeekScore;
    pastResults: WeekScore[];
    wins: WinMeta[];
    league: LeagueIdentifier;
    players: Player[];

    constructor(teamName: string = "", firstName: string = "", lastName: string = "", teamColor: string = "#076652", email: string = "", players: Player[] = []) {
        this.teamName = teamName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.teamColor = teamColor;
        this.players = players;
    }
}

export class WeekScore {
    weekDate: string; //
    weekYear: number;
    weekNumber: number; //Which out of the 52 weeks. 
    tournamentId: string;
    tournamentName: string;
    totalStrokes: number;
    cutPlayers: number;
}

export class WinMeta {
    tournamentId: string;
    year: number;
    week: number;
    totalStrokes: number;
    cutPlayers: number;
}