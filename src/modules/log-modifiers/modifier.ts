import {TEXT_MODIFIERS} from '../../constants/ColorControls';
import {Singleton} from '../../utils/Singleton';

export class ModifierManager extends Singleton<ModifierManager> {
  private modifiers: ModifiersType[];
  private predefinedModifiers: ModifiersType;

  constructor() {
    super();

    this.modifiers = [];
    this.predefinedModifiers = TEXT_MODIFIERS;

    Object.keys(this.predefinedModifiers).forEach((modifier) => {
      this.modifiers.push({
        name: modifier as unknown as ModifierFormatType,
        color: this.predefinedModifiers[
          modifier
        ] as unknown as ModifierFormatType,
      });
    });
  }

  public addModifier(name: string, style: string): void {
    if (
      this.modifiers.find(
        (modifier) => (modifier as unknown as string) === name
      )
    ) {
      throw new Error(`Modifier name ${name} is already taken.`);
    }
  }

  public getModifiers(): ModifiersType[] {
    return this.modifiers;
  }

  public isValidModifier(name: string): boolean {
    return !!this.modifiers.find(
      (modifier) =>
        (modifier as unknown as string).toLowerCase() === name.toLowerCase()
    );
  }

  public getModifier(name: string): ModifiersType {
    const modifier = this.modifiers.find(
      (modifier) => (modifier as unknown as object)['name'] === name
    );
    return modifier;
  }
}
