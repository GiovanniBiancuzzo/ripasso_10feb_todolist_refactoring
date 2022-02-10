import { Todo } from './Todo.js';

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
        localStorage.setItem('listaTodo2', JSON.stringify(todolist));//cosa aggiunge nello storage? guarda in console
        stampaTodo();//stampa
    });
});


let stampaTodo = () => {
    let lista = document.querySelector('.lista ul');//individua la lista
    lista.innerHTML = '';//svuota inizialmente la lista per poi riempirla

    let localLista = localStorage.getItem('listaTodo');//recupera dallo storage, ma per inserire in array locale e lista locale e stampare
    if (localLista !== null) {
        todolist = JSON.parse(localLista);//trasformazione in oggetto e push nel local?
    }

    todolist.forEach((todo) => {//per ogni elemento nell'array chiamo una funzione freccia con parametro todo
        let li = document.createElement('li');//creazione elemento lista
        let i = 0;//indice inutilizzato
        li.className = 'list-group-item';//creazione classe bootstrap per l'elemento lista sopra
        li.innerHTML = todo.titolo + ' - ' + todo.testo;//titolo-testo posti all'interno del tag li
        //console.log(todo);
        li.innerHTML += '<span class="btn btn-sm btn-danger rimuovi float-end">X</span>';//aggiunta di un pulsante rimuovi dentro un tag span
        lista.appendChild(li);//gli elementi sono appesi alla lista

        document.addEventListener('DOMContentLoaded', function () {
            let rimuovi = document.getElementsByClassName('rimuovi');//variabile del pulsante rimuovi
            rimuovi.addEventListener('click', function () {
                
                todolist.splice(todolist.indexOf(todo), 1);//rimozione, con splice dall'array, dell'elemento attraverso la ricerca del suo indice

                localStorage.setItem('listaTodo', JSON.stringify(todolist));//aggiornamento del local storage, memorizzo l'array ?
                stampaTodo();//ristampa dopo la rimozione
            });
        });
    });
    //function remove(todo) {
    //
    //    
    //}
}




//[{"titolo":"1","testo":"aaaaa"},{"titolo":"2","testo":"bbbbb"},{"titolo":"3","testo":"ccccc"},{"titolo":"4","testo":"ddddd"},{"titolo":"5","testo":"eeeee"},{"titolo":"6","testo":"fffff"},{"titolo":"7","testo":"ggggg"},{"titolo":"8","testo":"hhhhh"}]