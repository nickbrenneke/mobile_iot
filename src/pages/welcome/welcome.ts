import { Component } from '@angular/core';
import { AddPlacePage } from "../add-place/add-place";


@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage {
    addPlacePage = AddPlacePage;
}