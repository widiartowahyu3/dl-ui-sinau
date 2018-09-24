import { RestService } from '../../../utils/rest-service';

const serviceUri = "master/products";

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "core");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }
    
}  