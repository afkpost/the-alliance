export class NewGame {}
export class JoinGame {
    constructor(public pin: string, public name: string) {}
}