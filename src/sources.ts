const positionNumberMap: Record<string, number> = {};

const harvestingNumber: Record<string, number> = {};

const sourceIds: string[] = [];


class SourcesManager {
  getSources(room: Room): Source[] {
    if (sourceIds.length === 0) {
      this.initSources(room);
    }
    return sourceIds.map(id => Game.getObjectById(id) as Source);
  }

  private initSources(room: Room) {
    const result = room.find(FIND_SOURCES);
    sourceIds.push(...result.map(source => source.id));
  }

  private getAvailableLocationCount(source: Source): number {
    if (positionNumberMap[source.id]) {
      return positionNumberMap[source.id];
    }

    const room = source.room;
    const terrain = room.getTerrain();
    let count = 0;
    for (let x = source.pos.x - 1; x <= source.pos.x + 1; x++) {
      for (let y = source.pos.y - 1; y <= source.pos.y + 1; y++) {
        if (terrain.get(x, y) !== TERRAIN_MASK_WALL) {
          count++;
        }
      }
    }

    return count;
  }

  blockSourceLocation(source: Source) {
    this.initSourceLocation(source);
    if (this.hasLocation(source)) {
      harvestingNumber[source.id]++;
    }
  }
  unblockSourceLocation(source: Source) {
    this.initSourceLocation(source);
    if (harvestingNumber[source.id] > 0) {
      harvestingNumber[source.id]--;
    }
  }

  private hasLocation(source: Source) {
    return harvestingNumber[source.id] < this.getAvailableLocationCount(source);
  }

  private initSourceLocation(source: Source) {
    const room = source.room;
    const harvestingCreeps = room.lookForAtArea(
      LOOK_CREEPS,
      source.pos.y - 1,
      source.pos.x - 1,
      source.pos.y + 1,
      source.pos.x + 1,
      true
    );
    harvestingNumber[source.id] = harvestingCreeps.length;
  }

  chooseTargetSource(sources: Source[]): Source | undefined {
    if (sources.length === 0) {
      return undefined;
    }

    for (const source of sources) {
      this.initSourceLocation(source);
    }

    return sources.find(source => this.hasLocation(source));
  }
}

export const sourcesManager: SourcesManager = new SourcesManager();
