import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductDto} from '../model/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  url = 'http://localhost:8093/api/products/';

  constructor(private http: HttpClient) {
  }

  get(id) {
    return this.http.get<ProductDto>(`${this.url}get/${id}`);
  }

  getAll() {
    return this.http.get<ProductDto[]>(this.url + 'list');
  }

  delete(id) {
    return this.http.delete(`${this.url}delete/${id}`);
  }

  update(id, product) {
    return this.http.put(`${this.url}update/${id}`, product );
  }

  create(product) {
    return this.http.post(this.url + 'save', product);
  }
}
