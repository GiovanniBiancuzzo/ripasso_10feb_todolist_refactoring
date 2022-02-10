import { Todo } from '../js/Todo.js';

let todolist = [];

document.addEventListener('DOMContentLoaded', function () {//caricamento della pagina $(()=>)
    stampaTodo();
    let button = document.querySelector('.todo button');//pulsante inserisci
    button.addEventListener('click', function () {//al click
        let titolo = document.querySelector('#titolo');
        let testo = document.querySelector('#testo');
        let todo = new Todo(titolo.value, testo.value);//istanziazione elemento lista todo
        todolist.push(todo);//pusha nell'array 
        localStorage.setItem('listaTodo', JSON.stringify(todolist));//cosa aggiunge nello storage? guarda in console
        stampaTodo();//stampa
    });
});

let stampaTodo = () => {
    let lista = document.querySelector('.lista ul');//individua la lista
    lista.innerHTML = '';//svuota inizialmente la lista per poi riempirla

    let localLista = localStorage.getItem('listaTodo');//recupera dallo storage, ma perché
    if (localLista !== null) {
        todolist = JSON.parse(localLista);//trasformazione in oggetto e push nel local?
    }

    todolist.forEach((todo) => {//per ogni elemento nell'array chiamo una funzione freccia con parametro todo
        let li = document.createElement('li');//creazione elemento lista
        let i = 0;//indice inutilizzato
        li.className = 'list-group-item';//creazione classe bootstrap per l'elemento lista sopra
        li.innerHTML = todo.titolo + ' - ' + todo.testo;//titolo-testo posti all'interno del tag li
        li.innerHTML += '<span id="rimuovi" class="btn btn-sm btn-danger float-end">X</span>';//aggiunta di un pulsante rimuovi dentro un tag span, perché +=?
        lista.appendChild(li);//gli elementi sono appesi alla lista
        
        let rimuovi = $('#rimuovi');//variabile del pulsante rimuovi
        rimuovi.on('click', function () {
            todolist.splice(todolist.indexOf(todo), 1);//rimozione, con splice dall'array, dell'elemento attraverso la ricerca del suo indice
            localStorage.setItem('listaTodo', JSON.stringify(todolist));//aggiornamento del local storage, memorizzo l'array ?
            stampaTodo();//ristampa dopo la rimozione
        })
    });
}