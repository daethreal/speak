import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../service/modal.service';
import { Category, CategoryInfo } from '../../models/category';
import { FirebaseService } from '../../services/firebase-service.service';

@Component({
  selector: 'app-category',
  providers: [ModalService],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryInfo: CategoryInfo[];

  constructor(
    private modalService: ModalService,
    private firebaseService: FirebaseService){
  }

  ngOnInit() {
    this.firebaseService.getCategory().subscribe((item)=> {
      this.categoryInfo = item;
    });

  }

  add() {
    this.modalService.category().result.then((response: Category) => {
      this.firebaseService.saveCategory(response);
    }, () => {});
  }
  edit(data:CategoryInfo){
    this.modalService.category(data).result.then((response: Category) => {
      this.firebaseService.updateCategory(data.key, response);
    }, () => {});
  }

  delete(data: CategoryInfo){
    this.firebaseService.deleteCategory(data.key);

  }

}
