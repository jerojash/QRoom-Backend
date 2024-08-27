export class CleaningCheckOrder {
    constructor(
        private order: number
    ){}

    public getOrder(): number {
        return this.order;
    }
}