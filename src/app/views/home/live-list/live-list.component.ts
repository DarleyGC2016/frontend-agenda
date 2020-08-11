import { Component, OnInit } from '@angular/core';
import { LiveService } from 'src/app/shared/service/live.service';
import { Live } from 'src/app/shared/model/live.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css'],
})
export class LiveListComponent implements OnInit {
  livePrevious: Live[];
  liveNext: Live[];
  next: boolean = false;
  previous: boolean = false;
  tudo: boolean = false;
  lives: Live[];

  constructor(
    public liveService: LiveService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getLives();
    this.all();
  }

  getLives() {
    this.liveService.getLiveWithFlag('previous').subscribe((data) => {
      this.livePrevious = data.content;
      console.log(this.livePrevious);
      this.livePrevious.forEach((live) => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          live.liveLink
        );
      });
      this.previous = true;
    });

    this.liveService.getLiveWithFlag('next').subscribe((data) => {
      this.liveNext = data.content;
      console.log(this.liveNext);
      this.liveNext.forEach((live) => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          live.liveLink
        );
      });
      this.next = true;
    });
  }

  all() {
    this.liveService.getTodasLives().subscribe((data) => {
      this.lives = data.content;
      this.lives.forEach((live) => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          live.liveLink
        );
      });
      this.tudo = true;
    });
  }
}
