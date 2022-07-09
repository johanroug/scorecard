import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Icourse } from './scorecard/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'golf';
  course: any;
  courseLoaded = false;
  playerLoaded = false;

  constructor(
    private _httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.getCourse('9');
    this.getPlayer('otto');
  }

  choose(count: string) {
    this.getCourse(count);
  }

  getCourse(course: string) {
    return this._httpClient.get('assets/' + course + '.json').subscribe((res) => {
      this.course = res;
      console.log(res)
      this.courseLoaded = true;
    });
  }

  getPlayer(player: string) {
    this._httpClient.get('assets/' + player + '.json').subscribe(res => {
      console.log(res)
      this.playerLoaded = true;
    });
  }
}
