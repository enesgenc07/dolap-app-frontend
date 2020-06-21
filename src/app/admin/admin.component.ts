import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ProductService} from '../services/product-service';
import {ProductDto} from '../model/product';
import {ToastrService} from 'ngx-toastr';
import {MatTable} from '@angular/material';
import {Router} from '@angular/router';
import {CategoryService} from '../services/category-service';
import {Category} from '../model/category';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  productForm: any;
  products: ProductDto[];
  displayedColumns: string[] = ['id', 'name', 'description', 'note', 'category', 'price', 'action'];

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private fb: FormBuilder, private productService: ProductService,
              private toastr: ToastrService, private router: Router,
              ) {
  }


  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      note: ['']
    });
    this.getAllProducts();

  }

  onSubmit(product: ProductDto) {
    this.createProduct(product);
    this.productForm.reset();
  }

  resetForm() {
    this.productForm.reset();
  }


  editProduct(product: ProductDto) {
    this.router.navigate([`product/edit/${product.id}`]);
  }


  getAllProducts() {
    this.productService.getAll().subscribe(
      resp => {
        this.products = resp;
      }
    );
  }




  deleteProduct(product: ProductDto) {
    this.productService.delete(product.id).subscribe(() => {
      this.toastr.success('Deleted Product');
      this.getAllProducts();
    });
  }

  private createProduct(product: ProductDto) {
    if (product.id != null) {
      this.productService.update(product.id, product).subscribe(
        resp => {
          this.toastr.success('Updated Product');
        }
      );
    } else {
      this.productService.create(product).subscribe(
        resp => {
          this.toastr.success('Created Product');
        }
      );
    }
  }
}
