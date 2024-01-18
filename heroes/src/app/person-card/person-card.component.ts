import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent implements OnInit {
  @Input() heroName="" ;
  @Input() image!: string;
  @Input() name!:string;
  @Input() height!:string;
  @Input() weight!:string;
  @Input() race!:string;

  constructor() { }

  ngOnInit(): void {
  }

}
