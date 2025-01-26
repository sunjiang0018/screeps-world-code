import { ScreepsServer } from "screeps-server-mockup";

/**
 * 全局唯一的 server 实例
 */
let server: ScreepsServer;

/**
 * 获取可用的 server 实例
 * @returns server 实例
 */
export const getServer = async function () {
  if (!server) {
    server = new ScreepsServer();
    await server.start();
  }

  return server;
};

/**
 * 重置 server
 */
export const resetServer = async function () {
  if (!server) return;
  await server.world.reset();
};

/**
 * 停止 server
 */
export const stopServer = async function () {
  if (!server) return;

  // monkey-patch 用于屏蔽 screeps storage 的退出提示
  const error = global.console.error;
  global.console.error = function (...arg) {
    return !arg[0].match(/Storage connection lost/i) && error.apply(this, arg);
  };

  await server.stop();
};
``;
