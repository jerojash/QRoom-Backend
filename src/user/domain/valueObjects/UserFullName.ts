export class UserFullName{
    constructor(
        private first_name: string,
        private last_name: string
    ){}

    public getFirstName():string{
        return this.first_name;
    }

    public getLastName(): string{
        return this.last_name;
    }

}