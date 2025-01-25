import { CreepJob, scheduleJobs } from "../schedule/schedule";
import { sourcesManager } from "../sources";
import { HarvestWork, WorkType } from "../types";

export class harvester {
  static run(creep: Creep) {
    if (creep.store.getFreeCapacity() == 0) {
      creep.memory.working = creep.memory.task.workList.shift();
      scheduleJobs.addJob(new CreepJob(creep));
      return;
    }

    if (creep.store.getFreeCapacity() > 0) {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    } else {
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: structure => {
          return (
            (structure.structureType == STRUCTURE_EXTENSION ||
              structure.structureType == STRUCTURE_SPAWN ||
              structure.structureType == STRUCTURE_TOWER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        }
      });
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" }, reusePath: 100 });
        }
      }
    }
  }

  static harvest(creep: Creep) {
    const target = creep.memory.workTarget as HarvestWork;
    const source = Game.getObjectById(target.targetId) as Source;
    if (source) {
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.memory.task.workList.unshift(WorkType.Move);
        harvester.moveToSource(creep);
      }
    }
  }

  static moveToSource(creep: Creep) {
    const sources = sourcesManager.getSources(creep.room);
    const targetSource = sourcesManager.chooseTargetSource(sources);
    if (targetSource) {
      creep.moveTo(targetSource.pos, { visualizePathStyle: { stroke: "#ffffff" }, reusePath: 100 });
    }
  }
}
