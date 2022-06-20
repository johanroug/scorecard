import { Component, OnInit } from '@angular/core';
import { FormGroup,FormArray, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent implements OnInit{
  title = 'FormArray Example in Angular Reactive forms';
  roundForm: FormGroup;

  constructor(
    private fb:FormBuilder
    ) {}

  ngOnInit(): void {
    this.roundForm = this.fb.group({
      name: 'Round',
      persons: this.fb.array([this.newPerson()])
    });
  }

  get persons() : FormArray {
    return this.roundForm.get("persons") as FormArray
  }

  newPerson(): FormGroup {
    return this.fb.group({
      name: '',
      hc: '',
      holes: this.fb.group({
        hole1: null
      })
    })
  }

  addPerson() {
    this.persons.push(this.newPerson());
  }

  removePerson(i:number) {
    this.persons.removeAt(i);
  }

  onSubmit() {
    console.log(this.roundForm.value);
  }

}
