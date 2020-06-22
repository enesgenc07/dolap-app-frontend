import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ProductService} from '../services/product-service';
import {ProductDto} from '../model/product';
import {ToastrService} from 'ngx-toastr';
import {MatTable} from '@angular/material';
import {Router} from '@angular/router';

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


  createProduct() {
    this.router.navigate(['product/add']);
  }

  createCategory() {
    this.router.navigate(['category/add']);
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

}
