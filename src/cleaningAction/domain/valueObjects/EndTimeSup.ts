export class EndTimeSup {
    constructor(
        private end_time_sup: string
    ){}

    getTime(): string {
        return this.end_time_sup;
    }    
}