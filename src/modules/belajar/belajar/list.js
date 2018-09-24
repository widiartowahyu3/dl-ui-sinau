import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
    columns = [
        { field: "Code", title: "Kode Barang" },
        { field: "Name", title: "Nama Barang" },
        { field: "UOM.Unit", title: "Satuan Detail" },
        { field: "Currency.Code", title: "Mata Uang" },
        { field: "Price", title: "Harga Barang" },
        { field: "Tags", title: "Tags" },
      ];

      loader = (info) => {
        var order = {};
        if (info.sort)
          order[info.sort] = info.order;
    
        var arg = {
          page: parseInt(info.offset / info.limit, 10) + 1,
          size: info.limit,
          keyword: info.search,
          //select: ["Code", "Name", "Address", "City", "Country", "Contact", "Tempo","Type"],
          order: order
        }
    
        return this.service.search(arg)
          .then(result => {
            return {
              total: result.info.total,
              data: result.data
            }
          });
    
      }

      constructor(router, service) {
        this.service = service;
        this.router = router;
        this.belajarId = "";
        this.belajars = [];
      }    
}
