import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../services/product-service';
import {CategoryService} from '../services/category-service';
import {Category} from '../model/category';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  productForm: FormGroup;
  categories: Category[];

  constructor(private service: ProductService, private fb: FormBuilder,
              private router: Router, private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private location: Location,
              private toastr: ToastrService) {
    this.initializeForm();
  }

  ngOnInit() {
    this.getAllCategories();
  }

  initializeForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      note: ['']
    });
  }


  createProject() {

    if (this.productForm.valid) {
      try {
        const product = this.productForm.value;
        this.service.create(product).subscribe(() => {
            this.toastr.success('Product Added Successfuly');
            this.router.navigate(['dolap/admin']);
          }, err => {
            this.toastr.error(err.error.message);
          }
        );
      } catch (err) {
        this.toastr.error(err.error.message);
      }
    }
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe(
      resp => {
        this.categories = resp;
      }
    );
  }

  goBack() {
    this.router.navigate(['dolap/admin']);
  }

}
