import { LightningElement, wire, api } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';

import getAccount from '@salesforce/apex/AccountDatatableController.getAccount';

import Name_field from '@salesforce/schema/Account.Name';
import Rating_field from '@salesforce/schema/Account.Rating';
import Id_field from '@salesforce/schema/Account.Id';

export default class AccountDatatableHtml extends LightningElement {
    deleteId;
    overLay = false;
    EditIcon = false;
    footerTable = false;
    handleCancelRow = false;
    newName;
    newRating;
    idForChange;

    @wire (getAccount)
    account;
    
    @api getName;
    @api getRating;
    @api getId;
    @api initialName;
    @api initialRating;
    @api cancelRow;
   
    deliteAccount(event) {
        this.deleteId = event.detail;
            deleteRecord(this.deleteId)
                .then(() => {
                    this.dispatchEvent(new ShowToastEvent({
                        title:'Account deleted',
                        message:'Account deleted successfully',
                        variant:'success',
                    }))
                    this.overLay=false;
                    return refreshApex(this.account);
                })
                .catch(() => {
                    this.dispatchEvent(new ShowToastEvent({
                        title: 'Error deleting',
                        message: error.body.message,
                        variant: 'error',
                    }))
                });
    }

    openFooter(event) {
        this.footerTable = event.detail;
        this.handleCancelRow = false;
        this.overLay = true;
    }

    handleCancel(event) {
        this.footerTable = false;
        this.handleCancelRow = true;
        this.template.querySelectorAll('c-html-row').handleCancelRow;
        this.overLay = false;
    }

    changeNameData(event) {
        this.newName = event.detail;
    }

    changeRatingData(event) {
        this.newRating = event.detail;
    }

    passIdforChange(event) {
        this.idForChange = event.detail;
    }

    handleSave() {
        const fields = {};
        fields[Id_field.fieldApiName] = this.idForChange;
        fields[Name_field.fieldApiName] = this.newName;
        fields[Rating_field.fieldApiName] = this.newRating;

        const recordInput = {fields};
        
        updateRecord(recordInput)
            .then(()=>{
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: 'Account updated',
                    variant: 'success'
                    })
                );
                return refreshApex(this.account).then(()=>{
                    this.handleCancel();
                    this.overLay=false;
                });
            }).catch(error => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error updating',
                    message: error.body.message,
                    variant: 'error',
                }))
            })
    }
}