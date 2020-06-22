import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../services/product-service';
import {ProductDto} from '../model/product';
import {CategoryService} from '../services/category-service';
import {Category} from '../model/category';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId: string;
  productDetail: ProductDto;
  productForm: FormGroup;
  categories: Category[];
  selectedCategory: Category;

  constructor(private service: ProductService, private fb: FormBuilder,
              private router: Router, private activatedRoute: ActivatedRoute,
              private location: Location,
              private categoryService: CategoryService,
              private toastr: ToastrService) {
    this.activatedRoute.params.subscribe(params => {
      this.productId = params.id;
    });
    this.initializeForm();
  }

  ngOnInit() {
    this.getProductId(this.productId);
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

  getProductId(productId) {
    this.service.get(productId).subscribe(res => {
      this.productDetail = res;
      this.productForm.patchValue({
        name: this.productDetail.name,
        description: this.productDetail.description,
        price: this.productDetail.price,
        category: this.productDetail.category,
        note: this.productDetail.note,
      });
      this.selectedCategory = this.productDetail.category;
    });
  }

  goBack() {
    this.location.back();
  }

  updateProduct() {
    if (this.productForm.valid) {
      try {
        const product = this.productForm.value;
        this.service.update(this.productId, product).subscribe(() => {
            this.toastr.success('Product Successfully Updated');
            this.router.navigate(['dolap/admin']);
          },
          err => {
            this.toastr.error(err.error.message);
          });
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
}
