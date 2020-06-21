import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../services/product-service';
import {ProductDto} from '../model/product';
import {CategoryService} from '../services/category-service';
import {Category} from '../model/category';

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
  selectedCategory = '';

  constructor(private service: ProductService, private fb: FormBuilder,
              private router: Router, private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService) {
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
      desc: ['', [Validators.required]],
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
        desc: this.productDetail.description,
        price: this.productDetail.price,
        category: this.productDetail.category.name,
        note: this.productDetail.note,
      });
      this.selectedCategory = this.productDetail.category.id;
    });
  }

  updateProduct() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      this.service.update(this.productId, product).subscribe(() => {
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
