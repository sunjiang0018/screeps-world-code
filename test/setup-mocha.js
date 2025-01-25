//inject mocha globally to allow custom interface refer without direct import - bypass bundle issue
import lodash from 'lodash';
import * as mocha from 'mocha';
import * as chai from 'chai';
import  sinon from 'sinon';
import sinonChai from 'sinon-chai';

global._ = lodash;
global.mocha = mocha;
global.chai = chai;
global.sinon = sinon;
chai.should();
global.chai.use(sinonChai);

// Override ts-node compiler options
process.env.TS_NODE_PROJECT = 'tsconfig.test.json'
