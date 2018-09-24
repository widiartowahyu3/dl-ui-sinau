import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);

    if (this.data.isReprocess) {
      this.data.output = "Kanban Reproses";
    } else if (this.data.oldKanban._id && !this.data.isReprocess) {
      this.data.output = "Kanban Lanjut Proses";
    } else {
      this.data.output = "Kanban Baru";
    }

    this.data.cart.uom = this.data.cart.uom ? this.data.cart.uom.unit : 'MTR';
    this.productionOrder = this.data.productionOrder;
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }

  editCallback(event) {
    this.router.navigateToRoute('edit', { id: this.data._id });
  }

  deleteCallback(event) {
    this.service.delete(this.data)
      .then(result => {
        this.cancelCallback();
      });
  }

  get isView() {
    return true;
  }
}
