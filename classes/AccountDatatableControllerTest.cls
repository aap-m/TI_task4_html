@isTest
private class AccountDatatableControllerTest {
    @isTest 
    static void TestGetOneAccount(){
        Account AccTest1 = new Account(Name = 'Test1', Rating = 'Test1');
        Insert AccTest1;

        test.startTest();      
        List<Account> first = new List<Account>(AccountDatatableController.getAccount());
        test.stopTest();
        System.assertEquals(first.size(), 1);
    }
    
    @isTest 
    static void TestGetNullAccount(){

        test.startTest();      
        List<Account> first = new List<Account>(AccountDatatableController.getAccount());
        test.stopTest();
        System.assertEquals(first.size(), 0);
    }
}

