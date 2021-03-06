
module.exports = function() {

    this.When(/^I navigate to Admin - Users Management page$/, function (callback) {
        navigation.navigateToAdmin_UserManagement().then(function (completed) {
            assert.isTrue(completed, 'Not Admin - Users Management screen');
            callback();
        });
    });



    this.When(/^I sign out$/, function (callback) {
        url = browser.params.navigation.signOut;
        navigation.navigateToSignOut(url).then(function () {
            callback();
        });

    });



    this.When(/^I navigate to Admin - Organizations page$/, function (callback) {
        navigation.navigateToAdmin_Organization().then(function (completed) {
            assert.isTrue(completed, 'Not Admin - Organization Management screen');
            callback();
        });
    });


    this.When(/^I navigate to Device Registration$/, function (callback) {
        navigation.navigateToDeviceRegistration().then(function (completed) {
            assert.isTrue(completed, 'Not Device registration screen');
            callback();
        });

    });



};








