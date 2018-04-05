export class CurrentTournament {
    header: TournamentHeader;
    tc: string; //Which Golf tour.
    tid: string; // Tournament id
    tid0: string; // ditto
    notes: TournamentNote[];
}

export class TournamentHeader {
    version: string;
}

export class TournamentNote {
    active: string;
    html: string;

    isActive = (): boolean => this.active.toLowerCase() === 'n' ? false : true;
}

export class TournamentData {
    debug: DebugData;
    last_updated: Date;
    time_stamp: Date;
    leaderboard: TournamentLeaderboard;
}

export class DebugData {
    msg_id: string;
    setup_file_found: boolean;
    setup_generated: Date;
    setup_year: string;
    current_round_in_setup: number;
    last_round_in_setup: number;
    schedule_file_found: boolean;
    schedule_generated: Date;
    tournament_in_schedule_file_found: boolean;
    tournament_in_schedule_file_name: string;
    format_in_schedule_file_name: string;
}

export class TournamentLeaderboard {
    tour_code: string;
    tour_name: string;
    tournament_id: string;
    tournament_name: string;
    start_date: Date;
    end_date: Date;
    tournament_format: string;
    scoring_type: string;
    in_cup: boolean;
    total_rounds: number;
    is_started: boolean;
    is_finished: boolean;
    current_round: number;
    round_state: string;
    in_playoff: boolean;
    courses: GolfCourse[];
    cut_line: CutLine;
    players: Player[];
}

export class GolfCourse {
    course_id: string;
    course_code: string;
    course_name: string;
    is_host: boolean;
    par_in: string;
    par_out: string;
    par_total: string;
    distance_in: number;
    distance_out: number;
    distance_total: number;

    getParIn = (): number => Number(this.par_in)
    getParOut = (): number => Number(this.par_out)
    getParTotal = (): number => Number(this.par_total)

    getDistanceIn = (): number => this.distance_in / 36;
    getDistanceOut = (): number => this.distance_out / 36;
    getDistanceTotal = (): number => this.distance_total / 36;
}

export class CutLine {
    show_cut_line: boolean;
    cut_count: number;
    cut_line_score: number;
    show_projected: boolean;
    projected_count: number;
    paid_players_making_cut: number;
}

export class Player {
    debug: DebugPlayerData;
    player_id: string;
    player_bio: PlayerBio;
    current_position: string = "N/A";
    start_position: string;
    status: string;
    thru: string;
    start_hole: number;
    course_id: string;
    current_round: number;
    course_hole: number;
    today: number = Infinity;
    total: number = 0;
    total_strokes: number;
    rounds: TournamentRound[];
    rankings: TourRankings;
    group_id: string;

    public getGroupId = (): number => Number(this.group_id);
}

export class DebugPlayerData {
    found_in_setup_file: boolean;
}

export class PlayerBio {
    is_amateur: boolean;
    first_name: string;
    short_name: string;
    last_name: string;
    country: string;
    is_member: boolean;
}

export class TournamentRound {
    round_number: number;
    strokes: number;
    tee_time: Date;
}

export class TourRankings {
    cup_points: number;
    cup_rank: string;
    cup_trailing: number;
    projected_cup_points_total: number;
    projected_cup_points_event: number;
    projected_cup_rank: string;
    projected_money_total: number;
    projected_money_event: number;
    projected_money_rank: string;
    priority_proj_rank: string;
    priority_proj_sort: number;
    priority_start_rank: string;
    priority_start_sort: number;
    priority_seed: number;
    schwab_start_rank: string;
    schwab_proj_rank: string;
    money_start_rank: string;
    money_proj_rank: string;
    top25_seed: number;
    start_rank: string;
    proj_rank: string;
    proj_sort: number;
}