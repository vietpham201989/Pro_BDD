
module.exports = function() {
    this.Given(/^I navigate to signup page$/, function (callback) {
        var env = browser.params.signup.baseUrl;
        signupPage.getSignup(env).then(function (completed) {
            browser.ignoreSynchronization = true;
            assert.isTrue(completed, 'Not Signup page');
            callback();
        });
    });


    this.When(/^I sign up with valid email address: (.*), first name: (.*), last name: (.*), tenant: (.*), reason (.*)$/,
        function (email, firstName, lastName, tenant, reason, callback) {

        signupPage.setEmail(email).then(function () {
            signupPage.setFirstName(firstName).then(function () {
                signupPage.setLastName(lastName).then(function () {
                    signupPage.selectTenant(tenant).then(function () {
                        signupPage.setReason(reason).then(function () {
                            signupPage.clickSubmit().then(function () {
                                callback();
                            });
                        });
                    });
                });
            });
        });
    });


    this.Then(/^I should see the sign up successful message$/, function (callback) {
        signupPage.checkSuccessfullyMessage().then(function (completed) {
            assert.isTrue(completed, 'Sign up unsuccessful');
            callback();
        });
    });




    this.When(/^I open the registration link$/, function (callback) {
        email = browser.params.signup.email;
        email = email.replace('@mailinator.com','');

        url = 'https://www.mailinator.com/inbox2.jsp?to=<email_here>#/#public_maildirdiv'
        url = url.replace('<email_here>', email);
        signupPage.openMailServer(url).then(function () {
            signupPage.clickRegistrationMail().then(function () {
                signupPage.openRegistrationLink().then(function () {
                    callback();
                });
            });
        });

    });


    this.Then(/^I can create password$/, function (callback) {
        password = browser.params.signup.password;
        signupPage.setPassword(password).then(function () {
            signupPage.setConfirmPassword(password).then(function () {
                signupPage.clickSignUpButton().then(function () {
                    callback();
                });
            });

        });
    });







    this.When(/^I open the registration link temp$/, function (callback) {
        email = 'psktest123123';
        email = email.replace('@mailinator.com','');

        url = 'https://www.mailinator.com/inbox2.jsp?to=<email_here>#/#public_maildirdiv'
        url = url.replace('<email_here>', email);
        signupPage.openMailServer(url).then(function () {
            signupPage.clickRegistrationMail().then(function () {
                signupPage.openRegistrationLink_temp().then(function () {
                    callback();
                });
            });
        });

    });


};








