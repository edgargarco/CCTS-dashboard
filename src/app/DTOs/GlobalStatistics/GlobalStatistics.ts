import { NewCase } from './SuplemetaryEntities/NewCase';
import { NewDeath } from './SuplemetaryEntities/NewDeath';
import { NewTests } from './SuplemetaryEntities/NewTests';

export class GlobalStatistics{
    id:number;
    country:string;
    cases:NewCase;
    deaths:NewDeath;
    tests:NewTests;
    year:number;
    day:number;
    month:number;
}