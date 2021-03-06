
exports.config = {

	// ---- While testing locally
	sauceUser: null,
	sauceKey: null,
	sauceSeleniumAddress: null,

	directConnect: false,
	firefoxPath: null,

	// ---------------------------------------------------------------------------
	// ----- What tests to run ---------------------------------------------------
	// ---------------------------------------------------------------------------

	// Spec patterns are relative to the location of this config.
	specs: [],

	// Patterns to exclude.
	exclude: [],

	// Organize spec files into suites. To run specific suite, --suite=<name of suite>
	suites: {
		// login: ['../Features/Login.feature'],
		// signup: ['../Features/Signup.feature'],
		// test: ['../Features/test.feature'],
		// user_management: ['../Features/UserManagement.feature'],
        device_management: ['../Features/DevicesManagement.feature'],
    },

	capabilities: {
		browserName: 'chrome',
		count: 1,
		shardTestFiles: false,
		maxInstances: 1,
		'chromeOptions': {
			args: ['--no-sandbox', '--test-type=browser'],
			// Set download path and avoid prompting for download even though
			// this is already the default on Chrome but for completeness
			prefs: {
				'download': {
					'prompt_for_download': false,
					'directory_upgrade': true,
					'default_directory': 'C:/Jenkins/sharedspace/public/test/e2e-reboot/steps/'
				}
			}
		}
	},

	 //Browser options
	//multiCapabilities: [
	//	// {
	//	// browserName: 'internet explorer',
	//	// platform: 'ANY',
	//	// version: '11'
	//	// },
    //
	//	// {
	//	// browserName: 'firefox',
	//	// },
    //
	//	{
	//		browserName: 'chrome',
	//		count: 1,
	//		shardTestFiles: false,
	//		maxInstances: 1,
	//		'chromeOptions': {
	//			args: ['--no-sandbox', '--test-type=browser'],
	//			// Set download path and avoid prompting for download even though
	//			// this is already the default on Chrome but for completeness
	//			prefs: {
	//				'download': {
	//					'prompt_for_download': false,
	//					'directory_upgrade': true,
	//					'default_directory': 'C:/Jenkins/sharedspace/public/test/e2e-reboot/steps/'
	//				}
	//			}
	//		}
	//	}
    //
	//],

	params: {
		env: 'dev'
	},

	maxSessions: -1,

	allScriptsTimeout: 30000,

	// How long to wait for a page to load.
	getPageTimeout: 120000,

	// Before launching the application
	beforeLaunch: function () {
	},

	// Application is launched but before it starts executing
	onPrepare: function () {

		// Create reports folder if it does not exist
		var folderName = (new Date()).toString().split(' ').splice(1, 4).join(' ');
		var mkdirp = require('mkdirp');
		var reportsPath = "./Reports/";

		mkdirp(reportsPath, function (err) {
			if (err) {
				console.error(err);
			} else {
			}
		});

		browser.manage().deleteAllCookies();
		browser.manage().timeouts().pageLoadTimeout(50000);
		browser.manage().timeouts().implicitlyWait(50000);
		browser.driver.manage().window().maximize();

		chai = require('chai');
		expect = chai.expect;
		path = require('path');
		Cucumber = require('cucumber');
		fs = require('fs');

		// Initializing page object variables
		loginPage = require('../PageObjects/login.js');
		signupPage = require('../PageObjects/signup.js');
		landingPage = require('../PageObjects/landing.js');
        navigation = require('../PageObjects/navigation.js');
        usersManagement = require('../PageObjects/usersManagement.js');
        loginSpec = require('../step_definitions/login-spec.js');





		// Initializing necessary utils from ProUI-Utils module
		TestHelper = require('proui-utils').TestHelper;
		ElementManager = require('proui-utils').ElementManager;
		Logger = require('proui-utils').Logger;
		cem = new ElementManager('../../../PSK/common-element-repo.json');
		TestHelper.setElementManager(cem);
        RestHelper = require('proui-utils').RestHelper;

		//commonTestData = require('../TestData/common-test-data.json').data;
	},






	// A callback function called once tests are finished
	onComplete: function () {
	},


	// A callback function called once tests are cleaning up
	onCleanUp: function (exitCode) {

	},

	// A callback function after tests are launched
	afterLaunch: function () {
	},

    // Browser parameters for feature files.
	params: {
		login: {
			baseUrl: 'https://predix-isk-ui-dev.run.aws-usw02-pr.ice.predix.io/',
			"username": "predix_admin",
			"password": "IM_SO_SECRET",
			"adminUserName": "predix_admin",
		    "adminPassword": "IM_SO_SECRET",
		},
		signup: {
		    baseUrl: 'https://predix-psk-landing-page-dev.run.aws-usw02-pr.ice.predix.io/#/signup',
		    "email": "psktest123@mailinator.com",
		    "password": "12345678",
		    "reason": "This is a reason",
		    "firstName": "Test",
		    "lastName": "Automation",
		},
		navigation: {
		    "admin_UsersManagement": 'https://predix-isk-ui-dev.run.aws-usw02-pr.ice.predix.io/#/admin/users-management',
		    "signOut": 'https://predix-isk-ui-dev.run.aws-usw02-pr.ice.predix.io/logout',
			"deviceRegistration": 'https://predix-isk-ui-dev.run.aws-usw02-pr.ice.predix.io/#/user-device',
		},
		userManagement: {
			"tenant_name":"Automation_test",
		}


	},



	// If true, protractor will restart the browser between each test.
	// CAUTION: This will cause your tests to slow down drastically.
	restartBrowserBetweenTests: true,

	// Custom framework in this case cucumber
	framework: 'custom',
	frameworkPath: require.resolve('protractor-cucumber-framework'),
	cucumberOpts: {

		// define your step definitions in this file
		require: [
            '../step_definitions/*.js',
            '../../node_modules/proui-utils/Compressed_Utils/Reporter.js',

		],

		//format: 'pretty'
	}
};
