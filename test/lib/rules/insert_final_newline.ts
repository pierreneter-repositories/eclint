﻿///<reference path='../../../vendor/dt-node/node.d.ts'/>
///<reference path='../../../vendor/dt-mocha/mocha.d.ts'/>
///<reference path='../../../vendor/dt-sinon-chai/sinon-chai.d.ts'/>
import common = require('../common');
import _line = require('../../../lib/line');
import rule = require('../../../lib/rules/insert_final_newline');


var expect = common.expect;
var reporter = common.reporter;
var context = common.context;
var Line = _line.Line;

describe('insert_final_newline rule', () => {

	beforeEach(() => {
		reporter.reset();
	});

	describe.skip('check command', () => {

	});

	describe.skip('fix command', () => {

	});

	describe.skip('infer command', () => {

	});

});
