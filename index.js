/**
 * Module Dependencies
 */

var Extend = require('sand-extend').Extend;
var EventEmitter = require('events').EventEmitter;
var only = require('only');
var Logger = require('sand').Logger;
var _ = require('lodash');


/**
 * Initialize a new `SandGrain`.
 *
 * @api public
 */

function SandGrain() {
  this.name = this.name || 'SandGrain';
  this.configName = this.configName || this.name;
  this.config = this.config || {};
  this.defaultConfig = this.defaultConfig || {};
  this.log = (new Logger(this.name)).log;
  this.version = this.name == 'SandGrain' ? require('./package').version : 'unknown';
}

Extend(SandGrain, EventEmitter, {
  inspect: toJSON,

  init: function(config) {
    if (typeof config === 'object') {
      this.config = config;
    } else if (typeof config === 'string') {
      // Must be a path
      this.config = require(config);
    }

    this.config = _.extend(this.defaultConfig, this.config);

    return this;
  },

  shutdown: _.noop
});

function toJSON() {
  "use strict";
  return only(this, [
    'name',
    'version'
  ]);
}

/**
 * Expose `Application`
 */

exports = module.exports = SandGrain;
