import { WorkType } from "../types/WorkType";

export interface Job {
  run(): void;
}

export class CreepJob implements Job {
  constructor(private creep: Creep) {}

  run(): void {
    switch (this.creep.memory.working) {
      case WorkType.Move:
        break;
      case WorkType.Harvest:
        break;
      case WorkType.Build:
        break;
      case WorkType.Upgrade:
        break;
    }
  }
}

class ScheduleJobs {
  private jobs: Job[] = [];

  addJob(job: Job) {
    this.jobs.push(job);
  }

  runJobs() {
    while (this.jobs.length > 0) {
      this.jobs.shift()!.run();
    }
  }
}
export const scheduleJobs: ScheduleJobs = new ScheduleJobs();
