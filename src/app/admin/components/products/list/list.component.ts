import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from 'src/app/contracts/list_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private productService: ProductService, private alertifyService: AlertifyService) {}

  displayedColumns: string[] = ['name', 'price', 'stock', 'createdDate', 'modifiedDate','edit','delete'];
  dataSource: MatTableDataSource<List_Product> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts() {
    const allProducts: {totalCount:number,products:List_Product[]} = await this.productService.list(this.paginator ? this.paginator.pageIndex:0,
       this.paginator ? this.paginator.pageSize:5,
        () => null, errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }))
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length=allProducts.totalCount;

  }

  async changePage(){
    await this.getProducts();
  }

  async ngOnInit() {
    await this.getProducts();
  }

}
