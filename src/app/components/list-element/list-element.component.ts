import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-list-element',
  templateUrl: './list-element.component.html',
  styleUrls: ['./list-element.component.css']
})
export class ListElementComponent implements OnInit {
  @Input() id: string
  @Input() title: string
  @Input() plot: string
  @Input() cover: string
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToDetails(id: string) {
    this.router.navigate(['detail', id]);
  }

  noCover() {
    this.cover = "https://cdn.bookauthority.org/dist/images/book-cover-not-available.6b5a104fa66be4eec4fd16aebd34fe04.png"
  }
}
