import {bindable} from 'aurelia-framework'

var ProductLoader = require('../../../../loader/product-loader');
var UomLoader = require('../../../../loader/uom-loader');

export class cobasinauitem {
  @bindable dataProduct;
  @bindable dataUom;
  activate(context) {
    this.data = context.data;
    this.error = context.error;
    //console.log(this.error);
    this.options = context.options;
    
    if (this.data.Barang) {
      this.dataProduct = this.data.Barang;
    }

    if (this.data.Satuan) {
      this.dataUom = this.data.Satuan;
    }

  }

  dataProductChanged(newValue) {
    this.data.Barang = newValue;
  }

  dataUomChanged(newValue) {
    this.data.Satuan = newValue;
  }
 
  get productLoader() {
    return ProductLoader;
  }

  get uomLoader() {
    return UomLoader;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}