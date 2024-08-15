import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reusable-button',
  standalone: true,
  imports: [],
  templateUrl: './reusable-button.component.html',
  styleUrl: './reusable-button.component.css'
})

export class ReusableButtonComponent {
  @Input() buttonName1!: string;
  @Input() buttonName2!: string;
  @Input() buttonEvent2!: () => void;
  @Input() buttonEvent1!: () => void;
}
