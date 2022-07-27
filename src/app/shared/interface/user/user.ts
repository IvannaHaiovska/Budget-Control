export interface IUser {
    id: number,
    username: string,
    usersurname: string,
    email: string,
    password: string,
    balance: number,
    expenses: number,
    income: number,
    imagePath:string,
    create_at: Date
}
