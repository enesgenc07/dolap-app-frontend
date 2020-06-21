import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../services/product-service';
import {CategoryService} from '../services/category-service';
import {Category} from '../model/category';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  productForm: FormGroup;
  categories: Category[];
  selectedCategory = '';

  constructor(private service: ProductService, private fb: FormBuilder,
              private router: Router, private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService) {
    this.initializeForm();
  }

  ngOnInit() {
    this.getAllCategories();
  }

  initializeForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      note: ['']
    });
  }


  createProject() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      this.service.create(product).subscribe(() => {
        this.router.navigate(['dolap/admin']);
      });
    }
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe(
      resp => {
        this.categories = resp;
      }
    );
  }

}
