const roomCreepsMap: Record<string, string[]> = {};

export class CreepsManager {
  static getCreepsByRoom(roomName: string): string[] {
    if (roomCreepsMap[roomName]) {
      return roomCreepsMap[roomName];
    }

    const creeps = Object.values(Game.creeps).filter(creep => creep.room.name === roomName);
    roomCreepsMap[roomName] = creeps.map(creep => creep.name);
    return roomCreepsMap[roomName];
  }
}
