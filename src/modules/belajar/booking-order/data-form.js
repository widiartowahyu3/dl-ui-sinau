import { inject, bindable, computedFrom } from 'aurelia-framework';
var DivisionLoader = require('../../../loader/division-loader');
var BuyersLoader = require('../../../loader/buyers-loader');


export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    DeliveryOptions = ["","Garmen", "Tekstil"];

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    divisionChanged(e) {
        if (this.data.division)
            this.data.divisionId = this.data.division._id ? this.data.division._id : {};
    }
    
    buyersChanged(e) {        
        if (this.data.buyer)
        this.data.buyerId = this.data.buyer._id ? this.data.buyer._id : {};
    }
    
    get divisionLoader() {
        return DivisionLoader;
    }

    get buyersLoader() {
        return BuyersLoader;
    }

    itemsColumns = [
        { header: "Barang " },
        { header: "Jumlah" },
        { header: "Tanggal Konfirmasi" },
        { header: "Keterangan" },
    ]

    get addItems() {
        return (event) => {
            this.data.Items.push({})
        };
    }

}