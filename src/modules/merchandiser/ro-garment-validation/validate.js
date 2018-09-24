import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';

const costCalculationGarmentLoader = require('../../../loader/cost-calculation-garment-loader');
const buyerLoader = require('../../../loader/buyers-loader');

@inject(Router, Service)
export class Create {
    @bindable data = {};
    @bindable error = {};

    @bindable costCalculationGarment;
    @bindable validationType;
    @bindable buyer;
    @bindable article;

    options = {
        cancelText: "Clear",
        saveText: "Process",
    };

    length = {
        label: {
            align: "right",
            length: 4
        }
    };

    columns = [
        { header: "No.", value: "No" },
        { header: "Seksi", value: "Section" },
        { header: "No. PO", value: "PO_SerialNumber" },
        { header: "Kode", value: "Code" },
        { header: "Item Barang", value: "ProductName" },
        { header: "Deskripsi Barang", value: "ProductDescription" },
        { header: "Qty", value: "Quantity" },
        { header: "Satuan", value: "UOMQuantityUnit" },
        { header: "Shipment", value: "DeliveryDate" },
    ];

    get costCalculationGarmentLoader() {
        return costCalculationGarmentLoader;
    }

    get buyerLoader() {
        return buyerLoader;
    }

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.error = {};
    }

    async costCalculationGarmentChanged(newValue) {
        if (newValue && newValue.Id) {
            this.data.CostCalculationGarment = await this.service.getCostCalculationGarmentById(newValue.Id);
            
            if (this.data.CostCalculationGarment && this.data.CostCalculationGarment.CostCalculationGarment_Materials) {
                this.buyer = this.data.CostCalculationGarment.Buyer.Name;
                this.article = this.data.CostCalculationGarment.Article;

                let isAnyPostedMaterials = this.data.CostCalculationGarment.CostCalculationGarment_Materials.reduce((acc, cur) => {
                    return acc || cur.IsPosted;
                }, false);

                this.validationType = (isAnyPostedMaterials === true) ? "Process" : "Non Process";

                this.data.CostCalculationGarment_Materials = this.data.CostCalculationGarment.CostCalculationGarment_Materials.filter(mtr => {
                    let processOrNot = (isAnyPostedMaterials === true) ? (mtr.Category.Name.toUpperCase() === "PROCESS") : (mtr.Category.Name.toUpperCase() !== "PROCESS");
                    return true
                        && mtr.IsPosted === false
                        // && mtr.Category.Name.toUpperCase() !== "PROCESS"
                        // && mtr.Category.Name.toUpperCase() === "PROCESS"
                        && processOrNot
                });

                let no = 0;
                this.data.CostCalculationGarment_Materials.map(material => {
                    material.No = ++no;
                    material.Section = this.data.CostCalculationGarment.Section;
                    material.ProductName = material.Product.Code;
                    material.ProductDescription = material.Product.Code;
                    material.UOMQuantityUnit = material.UOMQuantity.Unit;
                    material.DeliveryDate = moment(this.data.CostCalculationGarment.DeliveryDate).format("DD MMM YYYY");
                });
            }
        }
        else {
            this.data.CostCalculationGarment = {};
        }
    }

    clear() {
        this.data = {};
        this.error = {};

        this.costCalculationGarment = {};
        this.validationType = "";
        this.buyer = "";
        this.article = "";
    }

    cancelCallback(event) {
        this.clear();
    }

    saveCallback() {
        var sentData = this.data.CostCalculationGarment || {};
        sentData.CostCalculationGarment_Materials = this.data.CostCalculationGarment_Materials;
        this.service.create(sentData)
            .then(result => {
                alert("Berhasil Ciyee...");
                this.clear();
            })
            .catch(e => {
                if(e.statusCode === 500) {
                    this.error = JSON.parse(e.message);
                }
                else
                {
                    this.error = e;
                }
            })
    }
}