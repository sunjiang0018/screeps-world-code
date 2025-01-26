import * as _ from "lodash";
// @ts-expect-error
import * as constants from "@screeps/common/lib/constants.js";
import { getMockGame } from "./Game";
import { getMockMemory } from "./Memory";






/**
 * 刷新游戏环境
 * 将 global 改造成类似游戏中的环境
 */
export const refreshGlobalMock = function () {
  global.Game = getMockGame();
  global.Memory = getMockMemory();
  global._ = _;
  // 下面的 @screeps/common/lib/constants 就是所有的全局常量
  Object.assign(global, constants);
};
