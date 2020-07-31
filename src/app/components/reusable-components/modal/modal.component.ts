import { Component, OnInit, Input } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { RolesService } from 'src/app/services/roles/roles.service';

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
  tagSuggestions = [];
  roles:string[];

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,private rolesService:RolesService) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.getAllRoles();
  }
  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      tags: [this.privileges],
      username:[this.username],
      email:[this.email]
    });
     this.getAllRoles();
   }
   submit() {
    this.updateAdminRoles();
  }
  async getAllRoles(){
    await this.rolesService.getAllRoles().toPromise().then(e => this.tagSuggestions = e.result);
  }
  async updateAdminRoles(){
     await this.rolesService.updateAdminRoles(this.form.value).toPromise().then((e)=>{
       window.location.reload();
     });
  }

}
