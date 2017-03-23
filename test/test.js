var expect = require('chai').expect;
var index = require('../index.js');
const context = require('aws-lambda-mock-context');
const ctx = context();


describe("Testing a New Session", function() {
    var speechResponse = null
    var speechError = null
 
    before(function(done){
        index.handler({
            "session": {
                "sessionId": "",
                "application": {
                    "applicationId": ""
            },
            "attributes": {},
            "user": {
                "userId": null
            },
            "new": true
            },
            "request": {
                "type": "IntentRequest",
                "requestId": "EdwRequestId.12d5b8eb-06ab-11e7-8945-0f1e70162494",
                "timestamp": "22017-03-11T22:35:48.394Z",
                "intent": {
                    "name": "LaunchRequest",
                    "slots": {}
                },
                "locale": "en-US"
            },
            "version": "1.0"
        }, ctx)
 
        ctx.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })
 
    describe("The response is structurally correct for Alexa Speech Services", function() {
        it('should not have errored',function() {
            expect(speechError).to.be.null
        })
 
        it('should have a version', function() {
            expect(speechResponse.version).not.to.be.null
        })
 
        it('should have a speechlet response', function() {
            expect(speechResponse.response).not.to.be.null
        })
 
        it("should have a spoken response", () => {
            expect(speechResponse.response.outputSpeech).not.to.be.null
        })
 
        it("should leave Alexa session open", function() {
            expect(speechResponse.response.shouldEndSession).not.to.be.null
            expect(speechResponse.response.shouldEndSession).to.be.false
        })
        
    })
})

describe("Testing Dollar Amount Intent", function() {
    var speechResponse = null
    var speechError = null
 
    before(function(done){
        index.handler({
            "session": {
                "sessionId": "",
                "application": {
                    "applicationId": ""
            },
            "attributes": {},
            "user": {
                "userId": null
            },
            "new": true
            },
            "request": {
                "type": "IntentRequest",
                "requestId": "EdwRequestId.12d5b8eb-06ab-11e7-8945-0f1e70162494",
                "timestamp": "22017-03-11T22:35:48.394Z",
                "intent": {
                    "name": "DollarIntent",
                    "slots": {
        				"NumberType": {
         					"name": "NumberType",
          					"value": "10"
        				}
      				}
                },
                "locale": "en-US"
            },
            "version": "1.0"
        }, ctx)
 
        ctx.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })
 
    describe("The response is structurally correct for Alexa Speech Services", function() {
        it('should not have errored',function() {
            expect(speechError).to.be.null
        })
 
        it('should have a version', function() {
            expect(speechResponse.version).not.to.be.null
        })
 
        it('should have a speechlet response', function() {
            expect(speechResponse.response).not.to.be.null
        })
 
        it("should have a spoken response", () => {
            expect(speechResponse.response.outputSpeech).not.to.be.null
        })
 
        it("should leave Alexa session open", function() {
            expect(speechResponse.response.shouldEndSession).not.to.be.null
            expect(speechResponse.response.shouldEndSession).to.be.false
        })
        
    })
})

describe("Testing Balance Intent with no specified account", function() {
    var speechResponse = null
    var speechError = null
 
    before(function(done){
        index.handler({
            "session": {
                "sessionId": "",
                "application": {
                    "applicationId": ""
            },
            "attributes": {},
            "user": {
                "userId": null
            },
            "new": true
            },
            "request": {
                "type": "IntentRequest",
                "requestId": "EdwRequestId.12d5b8eb-06ab-11e7-8945-0f1e70162494",
                "timestamp": "22017-03-11T22:35:48.394Z",
                "intent": {
                    "name": "BalanceIntent",
                    "slots": {}
                },
                "locale": "en-US"
            },
            "version": "1.0"
        }, ctx)
 
        ctx.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })
 
    describe("The response is structurally correct for Alexa Speech Services", function() {
        it('should not have errored',function() {
            expect(speechError).to.be.null
        })
 
        it('should have a version', function() {
            expect(speechResponse.version).not.to.be.null
        })
 
        it('should have a speechlet response', function() {
            expect(speechResponse.response).not.to.be.null
        })
 
        it("should have a spoken response", () => {
            expect(speechResponse.response.outputSpeech).not.to.be.null
        })
 
        it("should end the alexa session", function() {
            expect(speechResponse.response.shouldEndSession).not.to.be.null
            expect(speechResponse.response.shouldEndSession).to.be.true
        })
        
    })
})

describe("Testing Transfer Funds with no account or dollar amount", function() {
    var speechResponse = null
    var speechError = null
 
    before(function(done){
        index.handler({
            "session": {
                "sessionId": "",
                "application": {
                    "applicationId": ""
            },
            "attributes": {},
            "user": {
                "userId": null
            },
            "new": true
            },
            "request": {
                "type": "IntentRequest",
                "requestId": "EdwRequestId.12d5b8eb-06ab-11e7-8945-0f1e70162494",
                "timestamp": "22017-03-11T22:35:48.394Z",
                "intent": {
                    "name": "TransferIntent",
                    "slots": {}
                },
                "locale": "en-US"
            },
            "version": "1.0"
        }, ctx)
 
        ctx.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })
 
    describe("The response is structurally correct for Alexa Speech Services", function() {
        it('should not have errored',function() {
            expect(speechError).to.be.null
        })
 
        it('should have a version', function() {
            expect(speechResponse.version).not.to.be.null
        })
 
        it('should have a speechlet response', function() {
            expect(speechResponse.response).not.to.be.null
        })
 
        it("should have a spoken response", () => {
            expect(speechResponse.response.outputSpeech).not.to.be.null
        })
 
        it("should end the alexa session", function() {
            expect(speechResponse.response.shouldEndSession).not.to.be.null
            expect(speechResponse.response.shouldEndSession).to.be.true
        })
        
    })
})

describe("Testing Savings Booster", function() {
    var speechResponse = null
    var speechError = null
 
    before(function(done){
        index.handler({
            "session": {
                "sessionId": "",
                "application": {
                    "applicationId": ""
            },
            "attributes": {},
            "user": {
                "userId": null
            },
            "new": true
            },
            "request": {
                "type": "IntentRequest",
                "requestId": "EdwRequestId.12d5b8eb-06ab-11e7-8945-0f1e70162494",
                "timestamp": "22017-03-11T22:35:48.394Z",
                "intent": {
                    "name": "SavingsBoosterIntent",
                    "slots": {
        				"SavingsBoosterType": {
         					"name": "SavingsBoosterType",
          					"value": "savings booster"
        				}
      				}
                },
                "locale": "en-US"
            },
            "version": "1.0"
        }, ctx)
 
        ctx.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })
 
    describe("The response is structurally correct for Alexa Speech Services", function() {
        it('should not have errored',function() {
            expect(speechError).to.be.null
        })
 
        it('should have a version', function() {
            expect(speechResponse.version).not.to.be.null
        })
 
        it('should have a speechlet response', function() {
            expect(speechResponse.response).not.to.be.null
        })
 
        it("should have a spoken response", () => {
            expect(speechResponse.response.outputSpeech).not.to.be.null
        })
 
        it("should end the alexa session", function() {
            expect(speechResponse.response.shouldEndSession).not.to.be.null
            expect(speechResponse.response.shouldEndSession).to.be.true
        })
        
    })
})