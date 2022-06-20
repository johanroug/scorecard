import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'golf';

  constructor(
    private _httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.getCourse('fureso_par3');
    this.getPlayer('otto');
  }

  getCourse(course: string) {
    this._httpClient.get('assets/' + course + '.json').subscribe(res => {
      console.log(res)
    });
  }

  getPlayer(player: string) {
    this._httpClient.get('assets/' + player + '.json').subscribe(res => {
      console.log(res)
    });
  }
}
