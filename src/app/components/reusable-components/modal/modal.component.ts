import { Component, OnInit, Input } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() privileges: string[];
  @Input() username:string;
  @Input() email:string;
  form: FormGroup;
  value: Observable<number>;
  tagSuggestions = ['google', 'apple', 'microsoft'];

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      tags: [this.privileges]
    });
    this.value = this.form.controls.tags.valueChanges;
   }
   submit() {
    console.log(this.form.value);
  }

}
