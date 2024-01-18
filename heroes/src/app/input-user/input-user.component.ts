import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-user',
  templateUrl: './input-user.component.html',
  styleUrls: ['./input-user.component.scss']
})
export class InputUserComponent implements OnInit {
  userInput!: string;

  constructor() { }

  ngOnInit(): void {
    this.userInput = '';
  }

}
