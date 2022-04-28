import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  points = '0';
  username = 'Player';

  @ViewChild('name') nameKey!: ElementRef;
  constructor() {}

  ngOnInit(): void {
    this.username = localStorage.getItem('name') ?? 'Player';
    this.points = localStorage.getItem('point') ?? '0';
  }

  startQuiz() {
    localStorage.setItem('name', this.nameKey.nativeElement.value);
  }
}
