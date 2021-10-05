public with sharing class AccountDatatableController {
    @AuraEnabled (cacheable=true)
    public static List<Account> getAccount(){
        return [SELECT Id, Name, Rating FROM Account LIMIT 15];
    }
}