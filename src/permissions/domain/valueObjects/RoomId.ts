
export class RoomId{
    constructor(
        private id?: string
    ){
        this.id = id;
    }

    getIdRoom(): string{
        return this.id;
    }
}

