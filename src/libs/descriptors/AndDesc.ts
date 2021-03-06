import * as _ from "lodash";
import {GroupDesc} from "./GroupDesc";
import {ExprDesc} from "./ExprDesc";



export class AndDesc extends GroupDesc {

  readonly type:string = 'and';


  constructor(...values: ExprDesc[]) {
    super(...values);
  }

  lookup(source: any): (target: any) => boolean {
    const checks = _.map(this.values, v => v.lookup(source));
    return function (target: any): boolean {
      for (let fn of checks) {
        if (!fn(target)) {
          return false;
        }
      }
      return true;
    }
  }

  for(source: any, keyMap: any = {}): any {
    const checks = _.map(this.values, v => v.for(source, keyMap));
    let c: any = {};
    c['$and'] = checks;
    return c;
  }

}



export function And(...values: ExprDesc[]) {
  return new AndDesc(...values);
}
