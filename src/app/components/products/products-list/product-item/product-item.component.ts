import { Product } from './../../../model/product.model';
import { AppDataState } from './../../../../state/product.state';
import { Observable } from 'rxjs';
import { ActionEvent, ProductActionsType } from '../../../../state/product.state';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product:Product|null= null;
  @Output() productItemEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
 // @Input() product: Observable<AppDataState<Product[]>> | null = null;
  constructor() { }

  ngOnInit(): void {
  }


  onDelete(p: Product) {
    this.productItemEventEmitter.emit({ type: ProductActionsType.DELETE_PRODUCTS, payload: p });


  }

  onSelect(p: Product) {

    this.productItemEventEmitter.emit({ type: ProductActionsType.SELECT_PRODUCTS, payload: p });
  }

  onEdit(p: Product) {
    this.productItemEventEmitter.emit({ type: ProductActionsType.EDIT_PRODUCTS, payload: p });

  }

}
