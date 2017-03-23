'use strict';
const Alexa = require("alexa-sdk");
const _ =require("lodash");


exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(newSessionHandlers, launchStateHandlers, transferFundsHandlers, BalanceQueryHandlers, SavingsBoosterHandlers, handlers);
    alexa.execute();
};

// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

var checkingAccountBalance = 5234;
var savingsAccountBalance = 10433;

var checkingAccount = [
	{"type" : "checking"},
	{"balance" : 5234}
];

var savingsAccount = [
	{"type" : "savings"},
	{"balance" : 10433}
];

var transferObject = [
	{"fromAccount" : ""},
	{"toAccount" : ""},
	{"amount" : ""}
];

//var primaryAccountBalance = checkingAccount.balance;

var skillName = 'MyBank';

var states = {
	LAUNCH : '_LAUNCHMODE',
	HELP: '_HELPMODE',
	TRANSFERFUNDS: '_TRANSFERFUNDSMODE',
	BALANCEQUERY: '_BALANCEQUERYMODE',
	SAVINGSBOOSTER: '_SAVINGSBOOSTERMODE'
};

// 2. Skill Code =======================================================================================================
var newSessionHandlers = {
	'LaunchRequest': function() {
		this.handler.state = states.LAUNCH;
		this.emitWithState('Hello', true);
	},

	'AMAZON.HelpIntent': function () {
        this.handler.state = states.HELP;
        this.emitWithState('Help', true);
    },

    'TransferIntent': function () {
        this.handler.state = states.TRANSFERFUNDS;
        this.emitWithState('TransferFunds', true);
    },

    'BalanceIntent': function () {
    	this.handler.state = states.BALANCEQUERY;
    	this.emitWithState('BalanceQuery', true);
    },

    'SavingsBoosterIntent': function () {
    	this.handler.state = states.SAVINGSBOOSTER;
    	this.emitWithState('SavingsBooster', true);
    },

    'Unhandled': function()  {
    	var speechOutput = 'Sorry, I did not catch that. Can you repeat your question?';
    	this.emit(':ask', speechOutput, speechOutput);
    }
};

var launchStateHandlers = Alexa.CreateStateHandler(states.LAUNCH, {
	'Hello': function () {
		var speechOutput = 'Welcome to MyBank, how may I help you?';
		this.emit(':ask', speechOutput, speechOutput);
	}
});

var transferFundsHandlers = Alexa.CreateStateHandler(states.TRANSFERFUNDS, {
	'TransferFunds': function() {
		var speechOutput = '';
		var accountType = this.event.request.intent.slots.AccountType.value;
		var transferType = this.event.request.intent.slots.TransferType.value;

		switch(transferType) {
			case 'to':
				speechOutput = 'How much money do you want to transfer to your ' + accountType + ' account? ';
				if(accountType == 'checking') {
					transferObject.toAccount = 'checking';
					transferObject.fromAccount  = 'savings';
				} else if(accountType == 'savings') {
					transferObject.toAccount = 'savings';
					transferObject.fromAccount = 'checking';
				}
				break;
			case 'from':
				speechOutput = 'How much money do you want to transfer from your ' + accountType + ' account? ';
				if(accountType == 'checking') {
					transferObject.fromAccount = 'checking';
					transferObject.toAccount  = 'savings';
				} else if(accountType == 'savings') {
					transferObject.fromAccount = 'savings';
					transferObject.toAccount = 'checking';
				}
				break;
			default:
				speechOutput = 'Which account would you like to transfer money to? ';
		}

		this.emit(':ask', speechOutput, speechOutput);
	},

	'AccountIntent': function () {
		//var isResponseAccountValid = isResponseAccountValid(this.event.request.intent);
		var accountType = this.event.request.intent.slots.AccountType.value;

		transferObject.toAccount = accountType;

		var speechOutput = 'How much money do you want to transfer to your ' + accountType + ' ';

		this.emit(':ask', speechOutput, speechOutput);
	},

	'DollarIntent' : function () {
		//var isResponseValidDollarAmount = isResponseValidDollarAmount(this.event.request.intent);
		transferObject.amount = this.event.request.intent.slots.NumberType.value;
		this.emitWithState('CompleteTransfer', true);
	},

	'CompleteTransfer' : function () {
		var speechOutput = 'Successfully transfered ' + transferObject.amount + ' dollars to your ' + transferObject.toAccount + ' account. ';
		this.emit(':tell', speechOutput);
	}
});

var BalanceQueryHandlers = Alexa.CreateStateHandler(states.BALANCEQUERY, {
	'BalanceQuery': function () {
		var speechOutput = '';
		var outputType = '';
		var accountType = this.event.request.intent.slots.AccountType.value;
		switch(accountType) {
			case 'checking':
    			speechOutput = 'Your current ' + accountType + ' account balance is ' + checkingAccountBalance + ' dollars. ';
    			outputType = ':tell';
    			break;
			case 'savings':
				speechOutput = 'Your current ' + accountType + ' account balance is ' + savingsAccountBalance + ' dollars. ';
				outputType = ':tell';
				break;
			default:
				speechOutput = 'For which account would you like your balance? ';
				outputType = ':ask';
		}

		if(outputType == ':tell') {
			this.emit(':tell', speechOutput);
		} else {
			this.emit(':ask', speechOutput, speechOutput);
		}
	},

	'AccountIntent': function () {
		//var isResponseAccountValid = isResponseAccountValid(this.event.request.intent);
		var speechOutput = '';
		var accountType = this.event.request.intent.slots.AccountType.value;

		if(accountType == 'checking') {
			speechOutput = 'The current balance of your ' + accountType + ' account is ' + checkingAccountBalance + ' dollars. ';
		} else {
			speechOutput = 'The current balance of your ' + accountType + ' account is ' + savingsAccountBalance + ' dollars. ';
		}

		this.emit(':tell', speechOutput);
	}
});

var SavingsBoosterHandlers = Alexa.CreateStateHandler(states.SAVINGSBOOSTER, {
	'SavingsBooster': function () {
		var speechOutput = '';
		var outputType = '';
		var savingsBoosterType = this.event.request.intent.slots.SavingsBoosterType.value;
		var numberType = this.event.request.intent.slots.NumberType.value;
		switch(savingsBoosterType) {
			case 'savings booster':
    			speechOutput = 'Welcome to savings booster. How can I help you boost your savings today?';
    			outputType = ':ask';
    			break;
			case 'save':
				if(numberType != null) {
					speechOutput = 'Great job saving ' + numberType + ' dollars today! ';
					outputType = ':tell';
				} else {
					this.emitWithState('DollarIntent', true);
				}
				break;
			case 'tracker':
				speechOutput = 'Welcome to Tracker, the dog that helps you save! How can I assist you today? ';
				break;
			default:
				speechOutput = 'How can I help you today? ';
				outputType = ':ask';
		}

		if(outputType == ':tell') {
			this.emit(':tell', speechOutput);
		} else {
			this.emit(':ask', speechOutput, speechOutput);
		}
	},

	'DollarIntent' : function () {
		//var isResponseValidDollarAmount = isResponseValidDollarAmount(this.event.request.intent);
		transferObject.amount = this.event.request.intent.slots.NumberType.value;
		this.emitWithState('CompleteTransfer', true);
	},

	'CompleteTransfer' : function () {
		var speechOutput = 'Great job saving ' + transferObject.amount + ' dollars today! ';
		this.emit(':tell', speechOutput);
	}
});

var handlers = {

    'AMAZON.StopIntent': function () {
        var speechOutput = 'Goodbye';
        this.emit(':tell', speechOutput);
    },
 
    'AMAZON.CancelIntent': function () {
        var speechOutput = 'Goodbye';
        this.emit(':tell', speechOutput);
    },

    'AboutIntent': function () {
        var speechOutput = 'MyBank is a sample applicaiton to simulate banking transactions with Alexa. Created by Benjamin Goos. ';
        this.emit(':tell', speechOutput);
    },

    'SaveIntent': function () {
        var speechOutput = 'Great job saving! ';
        this.emit(':tell', speechOutput);
    },

    'Unhandled': function()  {
    	var speechOutput = "I'm sorry, I didn't catch that. Can you repeat your question?";
    	this.emit(':ask', speechOutput, speechOutput);
    }
};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

function isResponseAccountValid(userResponse) {
	var responseIsNotNull = userResponse && userResponse.slots && userResponse.slots.AccountType && userResponse.slots.AccountType.value;
	var validAccount = false;
	if(userResponse.slots.AccountType.value == 'checking' || userResponse.slots.AccountType.value == 'savings') {
		validAccount = true;
	}

	return responseIsNotNull && validAccount;
}

function isResponseValidDollarAmount(userResponse) {
	var responseIsNotNull = userResponse && userResponse.slots && userResponse.slots.NumberType && userResponse.slots.NumberType.value;
	//var responseIsInt = responseIsNotNull && !isNaN(parseInt(userResponse.slots.NumberType.value));

	return responseIsNotNull;
}