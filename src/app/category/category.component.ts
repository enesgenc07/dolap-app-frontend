import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CategoryService} from '../services/category-service';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(private service: CategoryService, private fb: FormBuilder,
              private router: Router, private toastr: ToastrService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.toastr.clear();
    this.initializeForm();
  }

  initializeForm() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  onSubmit() {
    try {
      if (this.categoryForm.valid) {
        this.service.create(this.categoryForm.value).subscribe(
          resp => {
            this.router.navigate(['dolap/admin']);
            this.toastr.success('Successfully Added Category');
          }, err => {
            this.toastr.error(err.error.message);
          }
        );
      }
    } catch (err) {
      this.toastr.error(err.error.message);
    }
  }

  goBack() {
    this.router.navigate(['dolap/admin']);
  }
}
