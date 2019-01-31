import * as _ from "lodash";


import {Selector} from "./Selector";
import {KeyDesc} from "./KeyDesc";
import {ValueDesc} from "./ValueDesc";
import {OpDesc} from "./OpDesc";


export class NeqDesc extends OpDesc {
  readonly type:string = 'ne';
  constructor(key: string | KeyDesc, value: Selector) {
    super(key, value);
  }

  lookup(source: any): (target: any) => boolean {
    const value = this.value instanceof KeyDesc ? source[this.value.key] : _.clone((<ValueDesc>this.value).value);
    const key = this.key;
    return function (target: any) {
      return target[key] != value;
    }
  }

}

export function Neq(key: string | KeyDesc, value: Selector) {
  return new NeqDesc(key, value);
}
