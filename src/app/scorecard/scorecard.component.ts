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
    this.roundForm = this._fb.group({
      name: 'Round',
      persons: this._fb.array([this.newPerson()])
    });
  }

  ngOnChanges() {
    // setTimeout(() => {
    //   const johan = this.roundForm.get('persons') as FormGroup;
    //   console.log(johan.controls[0].get('holes'))
    // }, 20);
  }

  get persons() : FormArray {
    return this.roundForm.get("persons") as FormArray
  }
  get holes() : FormArray {
    const johan = this.roundForm.get('persons') as FormGroup;
    return johan.controls[0].get('holes') as FormArray
  }

  newPerson(): FormGroup {
    return this._fb.group({
      name: '',
      hc: '',
      holes: this._fb.array([
        this.createHoleFormGroup(this.course, 0),
        this.createHoleFormGroup(this.course, 1),
        this.createHoleFormGroup(this.course, 2),
        this.createHoleFormGroup(this.course, 3),
        this.createHoleFormGroup(this.course, 4),
        this.createHoleFormGroup(this.course, 5),
        this.createHoleFormGroup(this.course, 6),
        this.createHoleFormGroup(this.course, 7),
        this.createHoleFormGroup(this.course, 8)
      ])
    })
  }

  createHoleFormGroup(data: any, id: number): FormGroup {
    return this._fb.group({
      id: [data[id].id],
      name: [data[id].name],
      score: [data[id].score],
      par: [data[id].par]
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
