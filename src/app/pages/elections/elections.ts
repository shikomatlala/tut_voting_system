import { Component } from '@angular/core';
import { BallotBox } from "../../components/ballot-box/ballot-box";

@Component({
  selector: 'app-elections',
  imports: [BallotBox],
  templateUrl: './elections.html',
  styleUrl: './elections.css',
})
export class Elections {}
