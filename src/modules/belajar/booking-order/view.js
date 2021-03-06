import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    hasCancel = true;
    hasEdit = false;
    hasDelete = false;
    hasUnpost = false;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var locale = 'id-ID';
        var moment = require('moment');
        moment.locale(locale);
        var id = params.id;
        this.bookId = id;
        this.data = await this.service.getById(id);
        // this.data.date = moment(this.data.date).format("DD MMMM YYYY");
        // this.data.expectedDeliveryDate = moment(this.data.expectedDeliveryDate).format("DD MMMM YYYY");
        if (!this.data.isPosted) {
            this.hasEdit = true;
            this.hasDelete = true;
        } else {
            if (!this.data.isUsed) {
                this.hasUnpost = true;
            }
        }
    }

    // list() {
    //     this.router.navigateToRoute('list');
    // }
    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data._id });
    }

    delete(event) {
        this.service.delete(this.data).then(result => {
            this.cancel();
        });
    }

    unpost(event) {
        this.service.unpost(this.bookId).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }
}