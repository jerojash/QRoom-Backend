export class CleaningTypeDescription {
    constructor(
        private description: string
    ){}

    public getName(): string {
        return this.description;
    }  
}