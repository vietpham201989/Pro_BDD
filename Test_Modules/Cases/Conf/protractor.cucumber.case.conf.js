
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
	specs: ['../../../Common_Template/Features/apmLogin.feature','../Features/case-example.feature'],

	// Patterns to exclude.
	exclude: [],

	// Organize spec files into suites. To run specific suite, --suite=<name of suite> no suites
	suites: {
	},

	// Hooks running in the background
	plugins: [{
		path: '../../../node_modules/proui-utils/Compressed_Utils/GeneralHook.js',
	}],

	// Browser options
	multiCapabilities: [
		//{
		//browserName: 'internet explorer',
		//platform: 'ANY',
		//version: '11'
		//},
		 {
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
		 }

	],

	params: {
		env: 'dev'
	},

	maxSessions: -1,

	allScriptsTimeout: 250000,

	// How long to wait for a page to load.
	getPageTimeout: 650000,

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
		browser.driver.manage().window().setSize(1280, 1440);

		chai = require('chai');
		expect = chai.expect;
		path = require('path');
		Cucumber = require('cucumber');
		fs = require('fs');

		// Initializing page object variables
		loginPage = require('../../../Common_Template/PageObjects/apm-login-po.js');
		apmlandingPage = require('../../../Common_Template/PageObjects/apm-landing-po.js');
		casesPage = require('../../../Common_Template/PageObjects/cases-po.js');


		// Initializing necessary utils from ProUI-Utils module
		TestHelper = require('ProUI-Utils').TestHelper;
		ElementManager = require('ProUI-Utils').ElementManager;
		Logger = require('ProUI-Utils').Logger;
		cem = new ElementManager('../../../Common_Template/common-element-repo.json');
		TestHelper.setElementManager(cem);
		RestHelper = require('ProUI-Utils').RestHelper;

		commonTestData = require('../../../Common_Template/TestData/common-test-data.json').data;
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
			baseUrl: 'https://apm-tubs-rc2.run.asv-pr.ice.predix.io/tenant0624',
			"username": "tenant0624-smokeuser",
			"password": "test",
		}
	},

	resultJsonOutputFile: null,

	// If true, protractor will restart the browser between each test.
	// CAUTION: This will cause your tests to slow down drastically.
	restartBrowserBetweenTests: false,

	// Custom framework in this case cucumber
	framework: 'custom',
	frameworkPath: require.resolve('protractor-cucumber-framework'),
	cucumberOpts: {

		// define your step definitions in this file
		require: [
			'../../../Common_Template/step_definitions/env.js',
			'../../../Common_Template/step_definitions/login-spec.js',
			'../../../node_modules/proui-utils/Compressed_Utils/Reporter.js',
			'../step_definitions/*'
		],

		format: 'pretty'
	}
};
