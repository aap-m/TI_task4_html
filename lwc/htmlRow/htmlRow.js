import { LightningElement, api } from 'lwc';

export default class HtmlRow extends LightningElement {
    EditeIcon = false;
    EditeIconRating = false;
    changeColorName = false;
    changeColorRating = false;
    newName;
    newRating;
    returnDefault;
    
    @api getName;
    @api getRating;
    @api getId;
    @api initialName;
    @api initialRating;

    closeEditeIcon() {
        this.EditeIconRating = false;
        this.EditeIcon = false;
    }

    handleEditeClick() {
        this.EditeIcon = true;      
    }

    handleEditeClickRating() {
        this.EditeIconRating = true;
    }

    nameChange(event) {
        this.newName = event.target.value;
        this.getName = this.newName;
        this.changeColorName=true;
        this.footerOpen();
        this.passId();  
    }

    ratingChange(event) {
        this.newRating = event.target.value;
        this.getRating= this.newRating;
        this.changeColorRating = true;
        this.footerOpen();
        this.passId();
    }

    get colorName() {
        return this.changeColorName ? 'yellow': 'white';
    }
    get colorNameRating() {
        return this.changeColorRating ? 'yellow': 'white';
    }

    handleCancelEdite(event) {
        this.getName=this.initialName;
        this.getRating=this.initialRating;
        this.changeColorName = false;
        this.changeColorRating = false;
    }

    @api get cancelRow() {
        return this.returnDefault;
    }
    set cancelRow(value){
        this.returnDefault = value;
            if (this.returnDefault == true) {
            this.handleCancelEdite();
        }
    }

    footerOpen() {
        this.dispatchEvent(new CustomEvent('openfooter', {detail: true}));
    }

    handleDeleteClick(event) {
        this.dispatchEvent(new CustomEvent('rowclick', {detail: event.currentTarget.name}));
    }

    passId() {
        this.dispatchEvent(new CustomEvent('getid', {detail: this.getId}));
        this.dispatchEvent(new CustomEvent('namechange', {detail: this.getName}));
        this.dispatchEvent(new CustomEvent('ratingchange', {detail: this.getRating}));
    }
}