import {bindable} from 'aurelia-framework'

var ProductLoader = require('../../../../loader/product-loader');

export class cobasinauitem {
  @bindable dataProduct;


  activate(context) {
    this.data = context.data;
    this.error = context.error;
    console.log(this.error);
    this.options = context.options;
    
    if (this.data.Barang) {
      this.dataProduct = this.data.Barang;
    }

  }

  dataProductChanged(newValue) {
    this.data.Barang = newValue;
  }
 
  get productLoader() {
    return ProductLoader;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}