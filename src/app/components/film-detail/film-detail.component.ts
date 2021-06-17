import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import films from '../../data/films.json';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {

  //Array immagini per carosello(Se mi viene)
  images: [] = [];
  //Id film
  id: string;
  //Lista di film falsa in realta ha solo una posizione che verrà poi portata nell'oggetto sottostante film
  filmFakeList: any;
  film: any;

  listImageURL: [];

  bg: SafeStyle;


  //Variabile usata per il voto
  rate: number = 0;
  //Variabile usata per la media e num valutazioni
  media: number = 0;
  nRate: number = 0
  //variabile usata per settare il read-only al rating component(Se settato un voto non posso modificarlo)
  check: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private sanitization: DomSanitizer) {
  }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    films.map(f => console.log(f.imdbID + ' ' + this.id))
    this.filmFakeList = films.filter(f => f.imdbID === this.id)
    this.film = this.filmFakeList[0]
    this.listImageURL = this.film.Images
    console.log(this.listImageURL)


    this.setImages(this.listImageURL)
    console.log(this.images)

    //prendo dati da local storage per l'id del film che ho richiamato
    var lc_rate = localStorage.getItem(this.film.imdbID)
    console.log(lc_rate)
    if (lc_rate !== null) {
      this.media = this.calcoloMedia(lc_rate)
      this.nRate = this.calcoloVoti(lc_rate)
    }


    this.check = false;//Ogni volta che rientro attivo il rating


    //https://stackoverflow.com/questions/38593515/warning-sanitizing-unsafe-style-value-url
    var img
    //Immagine random tra le disponibili
    img = this.images[Math.floor(Math.random() * this.images.length)]
    console.log(img)
    this.bg = this.sanitization.bypassSecurityTrustStyle(`url(${img})`); console.log(this.bg);
  }


  setImages(list: []) {
    list.map(url => {
      (console.log(url),
        this.images.push(url)
      )
    })
  }


  voted(value: number) {
    this.check = true;
    this.rate = value
    console.log('Voto: ' + this.rate)
    var lc_rate = localStorage.getItem(this.film.imdbID)
    if (lc_rate === null) {
      localStorage.setItem(this.film.imdbID, this.rate.toString())
    } else {
      localStorage.setItem(this.film.imdbID, lc_rate + ',' + this.rate.toString())
    }
    lc_rate = localStorage.getItem(this.film.imdbID)
    this.media = this.calcoloMedia(lc_rate)
    this.nRate = this.calcoloVoti(lc_rate)
  }

  calcoloMedia(data: string): number {
    var sum: number = 0;
    var arr = ((Array.from(data))
      .filter(n => n !== ','))//Scorro la "stringa" e filtro per quelli diversi da ,(Quindi sranno numeri)
      .map(n => {
        (
          console.log(n),
          sum = sum + parseInt(n),
          console.log(sum)
        )
      })
    console.log('Calcolo media somma ' + sum + 'con den.' + arr.length)
    return sum / arr.length
  }

  calcoloVoti(data: string): number {
    var arr = (Array.from(data)).filter(n => n !== ',')//Scorro la "stringa" e filtro per quelli diversi da ,(Quindi sranno numeri)
    return arr.length
  }
  noCover() {
    this.film.Poster = "./app/media/noPoster.png"
  }

}
