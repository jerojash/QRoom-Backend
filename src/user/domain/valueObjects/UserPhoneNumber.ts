export class UserPhoneNumber{
    constructor(
        private code_area_1: string,
        private phone_number_1: string,
    ){}

    public getCodeArea1(): string{
        return this.code_area_1;
    }

    public getPhoneNumer1(): string{
        return this.phone_number_1;
    }

}