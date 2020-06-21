import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CategoryService} from '../services/category-service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(private service: CategoryService, private fb: FormBuilder,
              private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.service.create(this.categoryForm.value).subscribe(
        resp => {
          this.router.navigate(['dolap/admin']);
          this.toastr.success('Successfully Added Category');
        }
      );
    }
  }
}
