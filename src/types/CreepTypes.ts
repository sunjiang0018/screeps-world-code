import { WorkType } from "./WorkType";

export interface WorkTarget {
  targetId: string;
}

export interface HarvestWork extends WorkTarget {}

export interface BuildWork extends WorkTarget {}
