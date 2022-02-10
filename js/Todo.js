export class Todo {
    constructor(titolo, testo) {
        this.titolo = titolo;
        this.testo = testo;
        this.fullTodo = () => this.titolo + ' - ' + this.testo;
    }
}