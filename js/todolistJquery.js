import { Todo } from './Todo.js';

let todolist = [];

$(() => {//caricamento della pagina 
    stampaTodo();
    let button = $('.todo button');//pulsante inserisci
    button.on('click', function () {//al click
        let titolo = $('#titolo');
        let testo = $('#testo');
        let todo = new Todo(titolo.val(), testo.val());//istanziazione elemento lista todo
        todolist.push(todo);//pusha nell'array 
        localStorage.setItem('listaTodo', JSON.stringify(todolist));//aggiunta in storage
        titolo.val('');//svuota campi dopo inserimento
        testo.val('');//svuota campi dopo inserimento
        stampaTodo();//stampa
    });

    $(document).on('click', '.rimuovi', function () {//richiesta aggiornata del document per trovare gli elementi lista
        let indice = $(this.parentElement).index();
        remove(indice);
        stampaTodo();//ristampa dopo la rimozione
    });


    function stampaTodo() {
        let lista = $('.lista ul');//individua la lista
        lista.html('');//svuota inizialmente la lista per poi riempirla
        let localLista = localStorage.getItem('listaTodo');//recupera dallo storage
        if (localLista !== null) {
            todolist = JSON.parse(localLista);
        }
        $.each(todolist, (index, todo) => {//per ogni elemento nell'array chiamo una funzione freccia con parametro todo
            lista.append(`<li class="list-group-item">${todo.titolo} - ${todo.testo} <span class="rimuovi btn btn-sm btn-danger float-end">X</span></li>`);
        });
        
    }


    function remove(indice) {
        todolist.splice(indice, 1);//rimozione, con splice dall'array, dell'elemento attraverso la ricerca del suo indice
        localStorage.setItem('listaTodo', JSON.stringify(todolist));//aggiornamento del local storage, memorizzo l'array ?
    }
});