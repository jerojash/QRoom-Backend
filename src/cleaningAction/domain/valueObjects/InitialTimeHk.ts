export class InitialTimeHk {
    constructor(
        private initial_time_hk: string
    ){}

    getTime(): string {
        return this.initial_time_hk;
    }
}