import { NumberModule } from './modules/number';
import { StringModule } from './modules/string';
import { HelpersModule } from './modules/helper'
import { MockModule } from './modules/mock'
import {RandomModule} from './modules/random'
export class Faker {
    private _defaultRefDate: () => Date = () => new Date();

    /**
     * Gets a new reference date used to generate relative dates.
     */
    get defaultRefDate(): () => Date {
      return this._defaultRefDate;
    }
    get mock(){
      return this.mockHandler.mock
    }
    readonly helpers: HelpersModule = new HelpersModule(this); 
    readonly number: NumberModule = new NumberModule(this);
    readonly string: StringModule = new StringModule(this);
    readonly mockHandler: MockModule = new MockModule(this);
    readonly random:RandomModule = new RandomModule(this);
}