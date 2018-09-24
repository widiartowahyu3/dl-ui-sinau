import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
var UnitLoader = require('../../../../../loader/unit-loader');
var SupplierLoader = require('../../../../../loader/garment-supplier-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }
 
    user=null;
    unit=null;
    supplier=null;
    duration='';
    dateFrom = null;
    dateTo = null;

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }
    durationItems=["0-30 hari","31-60 hari","> 60 hari"];
    listDataFlag = false;

    columns = [
      { field: "index", title: "No", sortable:false},
      { field: "roNo", title: "No RO", sortable:false},
      { field: "planPO", title: "Plan PO", sortable:false},      
      { field: "artikelNo", title: "Article / Style", sortable:false},
      { field: "buyerName", title: "Nama Buyer", sortable:false},
      { field: "unit", title: "Unit", sortable:false},
      { field: "category", title: "Kategori", sortable:false},
      { field: "productCode", title: "Kode Barang", sortable:false},
      { field: "productName", title: "Deskripsi Barang", sortable:false},
      { field: "productQuantity", title: "Jumlah Barang", sortable:false},
      { field: "productUom", title: "Satuan Barang", sortable:false},
      { field: "productPrice", title: "Harga Barang", sortable:false},
      { field: "supplierCode", title: "Kode Supplier", sortable:false},
      { field: "supplierName", title: "Nama Supplier", sortable:false},
      { field: "poIntNo", title: "No PO Internal", sortable:false},
      { field: "poIntCreatedDate", title: "Tgl PO Internal", sortable:false,
        formatter: (value, data) => {
            return moment(value).format("DD/MM/YYYY");
        }
      },
      { field: "poEksNo", title: "No PO Eksternal", sortable:false},
      { field: "poEksCreatedDate", title: "Tgl PO Eksternal", sortable:false, 
        formatter: (value, data) => {
          return moment(value).format("DD/MM/YYYY");
        }
      },
      { field: "expectedDate", title: "Tgl Target Datang", sortable:false, 
        formatter: (value, data) => {
          return moment(value).format("DD/MM/YYYY");
        }
      },
      { field: "deliveryOrderNo", title: "No Surat Jalan", sortable:false},
      { field: "supplierDoDate", title: "Tgl Surat Jalan", sortable:false,
        formatter: (value, data) => {
            return moment(value).format("DD/MM/YYYY");
        }
      },
      { field: "dateDiff", title: "Selisih (hari)", sortable:false},
      { field: "staff", title: "Nama Staff Pembelian", sortable:false},
    ]

    bind() {
        
    }

    fillValues() {
        this.arg.unitId = this.filter.unit ? this.filter.unit._id : "";
        this.arg.supplierId = this.filter.supplier ? this.filter.supplier._id : "";
        this.arg.duration = this.filter.duration ? this.filter.duration : "0-30 hari";
        this.arg.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
        this.arg.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        this.arg.offset = new Date().getTimezoneOffset() / 60 * -1;
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        this.arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        };

        return this.listDataFlag ? (
            this.fillValues(),
            this.service.search(this.arg)
                .then(result => {
                    return {
                        total: result.info.length,
                        data: result.data
                    }
            })
        ) : { total: 0, data: {} };
    }

    searching() {
        this.listDataFlag = true;
        this.durationTable.refresh();
    }

    reset() {
        this.filter = {};       
        this.listDataFlag = false;
        this.durationTable.refresh();
    }

    ExportToExcel() {
        this.fillValues();
        this.service.generateExcel(this.arg);
    }

    get unitLoader() {
        return UnitLoader;
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    autocomplete_change(e) {
        if(e.au.controller.view.bindingContext.value == undefined || e.au.controller.view.bindingContext.value == "")
            e.au.controller.view.bindingContext.value = e.au.controller.view.bindingContext.value == undefined ? "" : undefined;
    }
}
