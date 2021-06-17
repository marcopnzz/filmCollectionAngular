import { Component, OnInit } from '@angular/core';
import films from '../../data/films.json';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listFilmToSee: any
  constructor() {
  }

  ngOnInit() {
    this.listFilmToSee = films
    console.log(this.listFilmToSee)
  }

  search(event: any) {//Ricerca di un film
    console.log('Avviata la ricerca per: ' + event.target.value)
    this.listFilmToSee = films.filter(film => film.Title.toLowerCase().includes((event.target.value).toLowerCase()))
    //messo lowercase su entrambi per evitare una mancanza di risultati dovuta al case sensitive
    console.log(this.listFilmToSee)
  }



}
