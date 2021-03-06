import { RestService } from '../../../utils/rest-service';

const serviceUri = "booking-orders";

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    getByCode(code) {
        var endpoint = `${serviceUri}?keyword=${code}`;
        return super.get(endpoint);
    }
    
    unpost(id) {
        var endpoint = `${serviceUri}/unpost/${id}`;
        return super.put(endpoint);
    }
    
    post(data) {
        var endpoint = `${serviceUri}/post`;
        return super.post(endpoint, data);
    }

}