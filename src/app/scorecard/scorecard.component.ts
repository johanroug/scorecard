import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup,FormArray, FormBuilder } from '@angular/forms'
import { Icourse } from './model';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent implements OnInit, OnChanges{
  title = 'FormArray Example in Angular Reactive forms';
  roundForm: FormGroup;
  @Input() course: Icourse[];

  constructor(
    private _fb:FormBuilder
    ) {}

  ngOnInit(): void {
    this.newForm();
  }

  ngOnChanges() {
    this.newForm();
  }

  newForm() {
    this.roundForm = this._fb.group({
      name: 'Round',
      persons: this._fb.array([this.newPerson()])
    });
  }

  get persons() : FormArray {
    return this.roundForm.get("persons") as FormArray
  }
  get holes() : FormArray {
    const person = this.roundForm.get('persons') as FormGroup;
    return person.controls[0].get('holes') as FormArray
  }

  newPerson(): FormGroup {
    return this._fb.group({
      name: '',
      hc: '',
      holes: this._fb.array(this.prepareHoles())
    })
  }

  prepareHoles() {
    const holes: FormGroup[] = [];
    this.course.forEach((element) => {
      holes.push(this.createHoleFormGroup(element));
    });
    return holes;
  }

  createHoleFormGroup(data: any): FormGroup {
    return this._fb.group({
      id: [data.id],
      name: [data.name],
      score: [data.score],
      par: [data.par]
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
