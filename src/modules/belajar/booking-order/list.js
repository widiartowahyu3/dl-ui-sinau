import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
  dataToBePosted = [];

  rowFormatter(data, index) {
    if (data.isPosted)
      return { classes: "success" }
    else
      return {}
  }
  context = ["Rincian"];
  columns = [
    {
      field: "isPosting", title: "Post", checkbox: true, sortable: false,
      formatter: function (value, data, index) {
        this.checkboxEnabled = !data.isPosted;
        return ""
      }
    },
    { field: "Code", title: "Kode Barang" },
    { field: "DivisionName", title: "Divisi" },
    {
      field: "BookingDate", title: "Tanggal Booking", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    { field: "BuyerName", title: "Buyer" },
    { field: "OrderQuantity", title: "Jumlah Order" },
    {
      field: "DeliveryDate", title: "Tanggal Pengiriman", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    { field: "Remark", title: "Keterangan" },
    {
      field: "isPosted", title: "Posted",
      formatter: function (value, row, index) {
        return value ? "SUDAH" : "BELUM";
      }
    }
  ];
  
  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      //select: ["Code", "DivisionName", "BookingDate", "BuyerName", "OrderQuantity", "DeliveryDate", "Remark","isPosted"],
      order: order
    }

    return this.service.search(arg)
      .then(result => {
        for (var data of result.data) {
          data.Id = data.Id || data._id || 0;
          data.DivisionName = data.Division.Name;
          data.BuyerName = data.Buyer.Name;
      }
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
  
  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Rincian":
        console.log("data = "+data)
        this.router.navigateToRoute('view', { id: data.Id });
        break;
    }
  }


  posting() {
    if (this.dataToBePosted.length > 0) {
      this.service.post(this.dataToBePosted).then(result => {
        this.table.refresh();
      }).catch(e => {
        this.error = e;
      })
    }
  }

  create() {
    this.router.navigateToRoute('create');
  }

}