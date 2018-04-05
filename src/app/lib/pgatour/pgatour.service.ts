import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'

import { CurrentTournament, TournamentData } from "./pgatour.model";

@Injectable()
export class PgaTourService {
    constructor(private http: HttpClient) {}

    getCurrentTournamentId(): Observable<CurrentTournament> {
        let url: string = "https://statdata.pgatour.com/r/current/message.json";

        return this.http.get<CurrentTournament>(url);
    }

    getTournamentData(tournamentId: string): Observable<TournamentData> {
        let url: string = "https://statdata.pgatour.com/r/" + tournamentId + "/leaderboard-v2mini.json";

        return this.http.get<TournamentData>(url);
    }
}