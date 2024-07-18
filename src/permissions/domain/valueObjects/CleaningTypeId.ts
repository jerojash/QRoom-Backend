
export class CleaningTypeId{
    constructor(
        private id?: string
    ){
        this.id = id;
    }

    getIdCleaningType(): string{
        return this.id;
    }
}

