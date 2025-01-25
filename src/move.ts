export class Move {
  static move(target: RoomPosition, creep: Creep) {
    const result = creep.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" }, reusePath: 100 });


  }
}
