import { ErrorMapper } from "./utils/ErrorMapper";
import { harvester } from "./role/harvester";
import { Builder } from "./role/builder";
import { Upgrader } from "./role/upgrader";
import { WorkType } from "./types/WorkType";



// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  if (Game.creeps["Harvester1"] == undefined) {
    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], "Harvester1", {
      // memory: { role: "harvester" }
    });
  } else if (Game.creeps["Upgrader1"] == undefined) {
    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], "Upgrader1", {
      // memory: { role: "upgrader" }
    });
  } else {
    for (let i = 1; i < 4; i++) {
      if (Game.creeps["Builder" + i] == undefined) {
        Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], "Builder" + i, {
          // memory: { role: "builder" }
        });
        break;
      }
    }
  }

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.working == WorkType.Harvest) {
      harvester.run(creep);
    }
    if (creep.memory.working == WorkType.Upgrade) {
      Upgrader.run(creep);
    }
    if (creep.memory.working == WorkType.Build) {
      Builder.run(creep);
    }
  }
});
