
(function () {
    'use strict';


    var currentPage = 'navigation';


    var Navigation = function () {

        return {
            clickAdmin: function () {
                return cem.findElement(currentPage,'admin').sendKeys(protractor.Key.ENTER);
            },

            clickUsersManagement: function () {
                return cem.findElement(currentPage,'usersManagement').sendKeys(protractor.Key.ENTER);
            },

            clickUserInfo: function () {
                return cem.findElement(currentPage,'userInfo').sendKeys(protractor.Key.ENTER);
            },

            clickSignOut: function () {
                return cem.findElement(currentPage,'signOut').sendKeys(protractor.Key.ENTER);
            },

            navigateToAdmin_UserManagement: function () {
                var url = browser.params.navigation.admin_UsersManagement;
                browser.driver.get(url);
                var EC = protractor.ExpectedConditions;
                var el = element(by.xpath("//div[@id='tabtitle'][contains(., 'Pending Request')]"));
                browser.wait(EC.visibilityOf(el), 30000);
                return browser.driver.isElementPresent(by.xpath("//div[@id='tabtitle'][contains(., 'Pending Request')]"));
            },

            navigateToSignOut: function () {
                browser.driver.get(url);
                return browser.driver.sleep(3000);

            },


            navigateToAdmin_Organization: function () {
                var url = browser.params.navigation.admin_UsersManagement;
                browser.driver.get(url);
                var elementLocator = "//*[starts-with(@id,'organizations-management-view')]//button[contains(.,'New organization')]";
                var EC = protractor.ExpectedConditions;
                var el = element(by.xpath(elementLocator));
                browser.wait(EC.visibilityOf(el), 30000);
                return browser.driver.isElementPresent(by.xpath(elementLocator));
            },

            navigateToDeviceRegistration: function () {
                var url = browser.params.navigation.deviceRegistration;
                browser.driver.get(url);

                var elementLocator = "//button[normalize-space(text())='Register']";
                var EC = protractor.ExpectedConditions;
                var el = element(by.xpath(elementLocator));
                browser.wait(EC.visibilityOf(el), 30000);
                return browser.driver.isElementPresent(by.xpath(elementLocator));
            },

        }

    };

    module.exports = new Navigation();

}());