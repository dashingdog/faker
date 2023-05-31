import { NumberModule } from './modules/number';
import { StringModule } from './modules/string';


export class Faker {
    readonly number: NumberModule = new NumberModule();
    readonly string: StringModule = new StringModule();

}