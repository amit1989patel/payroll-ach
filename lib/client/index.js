// Batch

var _ = require('lodash');
var async = require('async');
var utils = require('./../utils');
var validate = require('./../validate');

var highLevelcontactOverrides = ['ITEMC1', 'ITEMC2', 'ITEMC12'];
var highLevelIdentificationOverrides = ['ITEMA1', 'ITEMA2'];
var highLevelBankAccountOverrides = ['ITEMB1', 'ITEMB2', 'ITEMB7'];

function Batch(options) {
	this._entries = [];

	// Allow the batch header/control defaults to be overriden if provided
	this.contact = options.contact ? _.merge(options.contact, require('./contact'), _.defaults) : _.cloneDeep(require('./contact'));
	this.Identification = options.Identification ? _.merge(options.Identification, require('./Identification'), _.defaults) : _.cloneDeep(require('./Identification'));
	this.BankAccount = options.BankAccount ? _.merge(options.BankAccount, require('./BankAccount'), _.defaults) : _.cloneDeep(require('./BankAccount'));

	// Configure high-level overrides (these override the low-level settings if provided)
	utils.overrideLowLevel(highLevelcontactOverrides, options, this);
	utils.overrideLowLevel(highLevelIdentificationOverrides, options, this);
	utils.overrideLowLevel(highLevelBankAccountOverrides, options, this);

	// Validate the routing number (ABA) before slicing


	return this;
};

// Batch.prototype._validate = function() {

// 	// Validate required fields have been passed
// 	validate.validateRequiredFields(this.header);

// 	// Validate the batch's ACH service class code
// 	validate.validateACHServiceClassCode(this.header.serviceClassCode.value);

// 	// Validate field lengths
// 	validate.validateLengths(this.header);

// 	// Validate datatypes
// 	validate.validateDataTypes(this.header);

// 	// Validate required fields have been passed
// 	validate.validateRequiredFields(this.control);

// 	// Validate field lengths
// 	validate.validateLengths(this.control);

// 	// Validate datatypes
// 	validate.validateDataTypes(this.control);
// };

// Batch.prototype.addEntry = function(entry) {
// 	var self = this;

// 	// Increment the addendaCount of the batch
// 	this.control.addendaCount.value += entry.getRecordCount();

// 	// Add the new entry to the entries array
// 	this._entries.push(entry);

// 	// Update the batch values like total debit and credit $ amounts
// 	var entryHash = 0;
// 	var totalDebit = 0;
// 	var totalCredit = 0;

// 	// (22, 23, 24, 27, 28, 29, 32, 33, 34, 37, 38 & 39)
// 	var creditCodes = ['22', '23', '24', '32', '33', '34'];
// 	var debitCodes = ['27', '28', '29', '37', '38', '39'];

// 	async.each(this._entries, function(entry, done) {
// 			entryHash += Number(entry.fields.receivingDFI.value);

// 		if(_.includes(creditCodes, entry.fields.transactionCode.value)) {
// 			totalCredit += entry.fields.amount.value;
// 			done();
// 		} else if(_.includes(debitCodes, entry.fields.transactionCode.value)) {
// 			totalDebit += entry.fields.amount.value;
// 			done();
// 		} else {
// 			console.log('Transaction codes did not match or are not supported yet (unsupported status codes include: 23, 24, 28, 29, 33, 34, 38, 39)');
// 		}
// 	}, function(err) {
// 		self.control.totalCredit.value = totalCredit;
// 		self.control.totalDebit.value = totalDebit;

// 		// Add up the positions 4-11 and compute the total. Slice the 10 rightmost digits.
// 		self.control.entryHash.value = entryHash.toString().slice(-10);
// 	});
// };

// Batch.prototype.generateHeader = function(cb) {
// 	utils.generateString(this.header, function(string) {
// 		cb(string);
// 	});
// };

// Batch.prototype.generateControl = function(cb) {
// 	utils.generateString(this.control, function(string) {
// 		cb(string);
// 	});
// };

// Batch.prototype.generateEntries = function(cb) {
// 	var result = '';

// 	async.each(this._entries, function(entry, done) {
// 		entry.generateString(function(string) {
// 			result += string + utils.newLineChar();
// 			done();
// 		});
// 	}, function(err) {
// 		cb(result);
// 	});
// };

// Batch.prototype.generateString = function(cb) {
// 	var self = this;

// 	self.generateHeader(function(headerString) {
// 		self.generateEntries(function(entryString) {
// 			self.generateControl(function(controlString) {
// 				cb(headerString + utils.newLineChar() + entryString  + controlString);
// 			});
// 		});
// 	});
// };

Batch.prototype.get = function(field) {

	// If the header has the field, return the value
	if(this.contact[field]) {
		return this.contact[field]['value'];
	}

	// If the control has the field, return the value
	if(this.Identification[field]) {
		return this.Identification[field]['value'];
	}
	if(this.BankAccount[field]) {
		return this.BankAccount[field]['value'];
	}

	
};

Batch.prototype.set = function(field, value) {

	// If the header has the field, set the value
	if(this.contact[field]) {
		this.contact[field]['value'] = value;
	}

	// If the control has the field, set the value
	if(this.Identification[field]) {
		this.Identification[field]['value'] = value;
	}
	if(this.BankAccount[field]) {
		this.BankAccount[field]['value'] = value;
	}
};

module.exports = Batch;
