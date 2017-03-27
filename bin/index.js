#! /usr/bin/env node
'use strict';

const Fiber = require('fibers');
const command = require('../lib/generator.js');
const argv = require('minimist')(process.argv.slice(2));
const args = argv._;

Fiber(function() {
	command.create(args, argv);
}).run();
