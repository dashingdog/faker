import { NumberModule } from './modules/number';
import { StringModule } from './modules/string';
import { HelpersModule } from './modules/helper'

export class Faker {
    private _defaultRefDate: () => Date = () => new Date();

    /**
     * Gets a new reference date used to generate relative dates.
     */
    get defaultRefDate(): () => Date {
      return this._defaultRefDate;
    }
    readonly helpers: HelpersModule = new HelpersModule(this);
    readonly number: NumberModule = new NumberModule(this);
    readonly string: StringModule = new StringModule(this);
}