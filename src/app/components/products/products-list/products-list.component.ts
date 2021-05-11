import { Product } from './../../model/product.model';
import { Observable } from 'rxjs';
import { AppDataState, DataStateEnum, ActionEvent, ProductActionsType } from './../../../state/product.state';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() productsInput$: Observable<AppDataState<Product[]>> | null = null;
  @Output() productsEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  readonly DataStateEnum = DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(p: Product) {
    this.productsEventEmitter.emit({ type: ProductActionsType.DELETE_PRODUCTS, payload: p });


  }

  onSelect(p: Product) {

    this.productsEventEmitter.emit({ type: ProductActionsType.SELECT_PRODUCTS, payload: p });
  }

  onEdit(p: Product) {
    this.productsEventEmitter.emit({ type: ProductActionsType.EDIT_PRODUCTS, payload: p });

  }


  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
        case ProductActionsType.SELECT_PRODUCTS: this.onSelect($event.payload); break;
      case ProductActionsType.EDIT_PRODUCTS: this.onEdit($event.payload); break;
      case ProductActionsType.DELETE_PRODUCTS: this.onDelete($event.payload); break;
    }


}
}
