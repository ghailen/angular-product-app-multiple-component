
import { HttpClient } from '@angular/common/http';
import { Product } from './../model/product.model';
import { AppDataState, DataStateEnum, ProductActionsType, ActionEvent } from './../../state/product.state';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/services/products.service';
import { catchError, map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productsService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.products$ = this.productsService.getAllProducts().pipe(
      map(data => {
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }
  onGetSelectedProducts() {
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map(data => {
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }
  onGetAvailableProducts() {
    this.products$ = this.productsService.getAvailabeProducts().pipe(
      map(data => {
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onSearch(dataForm: any) {
    this.products$ = this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data => {
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onSelect(p: Product) {
    this.productsService.select(p).subscribe(data => {
      p.selected = data.selected

    })

  }

  onDelete(p: Product) {
    let v = confirm("etes vous sure ?");
    if (v == true)
      this.productsService.deletProduct(p).subscribe(data => {
        this.onGetAllProducts();
      })

  }



  onNewProduct() {
    this.router.navigateByUrl("/newProduct");

  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/" + p.id);

  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionsType.GET_ALL_PRODUCTS: this.onGetAllProducts(); break;
      case ProductActionsType.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts(); break;
      case ProductActionsType.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts(); break;
      case ProductActionsType.SEARCH_PRODUCTS: this.onSearch($event.payload); break;
      case ProductActionsType.NEW_PRODUCTS: this.onNewProduct(); break;
      case ProductActionsType.SELECT_PRODUCTS: this.onSelect($event.payload); break;
      case ProductActionsType.EDIT_PRODUCTS: this.onEdit($event.payload); break;
      case ProductActionsType.DELETE_PRODUCTS: this.onDelete($event.payload); break;
    }



  }
}
