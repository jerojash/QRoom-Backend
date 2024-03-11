export class InitialTimeSup {
    constructor(
        private initial_time_sup: string
    ){}

    getTime(): string {
        return this.initial_time_sup;
    }    
}