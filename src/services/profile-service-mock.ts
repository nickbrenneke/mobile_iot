import {Injectable} from '@angular/core';
import profiles from './mock-profiles';

@Injectable()
export class ProfileService {

    findAll() {
        return Promise.resolve(profiles);
    }

    findById(id) {
        return Promise.resolve(profiles[id - 1]);
    }

}
