import { Player } from "../pgatour/pgatour.model";
import { Injectable } from "@angular/core";

@Injectable()
export class DisplayHelpers {
    public filterPosition = (player: Player): string => player.status.toLowerCase() === 'cut' ? 'CUT' : player.current_position;
    public isCut = (player: Player): boolean => player.status.toLowerCase() === 'cut' ? true : false;
    public filterScore = (score: number): string => score > 0 ? "+" + score : score < 0 ? String(score) : "E";
    public setScoreColor = (score: number) => score > 0 ? 'green' : score < 0 ? 'red' : 'black';
}