import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductDto} from '../model/product';
import {Category} from '../model/category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  url = 'http://18.157.149.249:8091/api/categories/';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Category[]>(this.url + 'list');
  }

  create(category) {
    return this.http.post(this.url + 'save', category);
  }
}
