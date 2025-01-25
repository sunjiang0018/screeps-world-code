import { readFileSync } from 'fs';
import * as _ from 'lodash';
import {ScreepsServer, stdHooks} from 'screeps-server-mockup';
import User from 'screeps-server-mockup/dist/src/user';
const DIST_MAIN_JS = 'dist/main.js';

/*
 * Helper class for creating a ScreepsServer and resetting it between tests.
 * See https://github.com/Hiryus/screeps-server-mockup for instructions on
 * manipulating the terrain and game state.
 */
class IntegrationTestHelper {
  private _server!: ScreepsServer;
  private _player!: User;

  get server() {
    return this._server;
  }

  get player() {
    return this._player;
  }

  async beforeEach() {
    this._server = new ScreepsServer();

    // reset world but add invaders and source keepers bots
    await this._server.world.reset();

    // create a stub world composed of 9 rooms with sources and controller
    await this._server.world.stubWorld();

    // add a player with the built dist/main.js file
    const modules = {
        main: readFileSync(DIST_MAIN_JS).toString(),
    };
    this._player = await this._server.world.addBot({ username: 'player', room: 'W0N1', x: 15, y: 15, modules });

    // Start server
    await this._server.start();
  }

  async afterEach() {
    await this._server.stop();
  }
}

beforeEach(async () => {
  await helper.beforeEach();
});

afterEach(async () => {
  await helper.afterEach();
});

before(() => {
  stdHooks.hookWrite();
});

export const helper = new IntegrationTestHelper();
