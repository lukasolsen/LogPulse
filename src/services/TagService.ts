class TagController {
  tags: Set<string>;
  enabledTag: string;
  constructor() {
    this.tags = new Set([]);
    this.enabledTag = undefined;
  }

  public addTag(tag: string): void {
    this.tags.add(tag);
  }
  public getEnabledTag(): string {
    return this.enabledTag;
  }
  public enableTag(tag: string): void {
    if (!this.hasTag(tag)) return;
    this.enabledTag = tag;
  }
  public disableTag(): void {
    this.enabledTag = undefined;
  }
  public removeTag(tag: string): void {
    this.tags.delete(tag);
    this.disableTag();
  }
  public getTags(): string[] {
    return [...this.tags];
  }
  public clearTags(): void {
    this.tags.clear();
  }
  public hasTag(tag: string): boolean {
    return this.tags.has(tag);
  }
  public setTags(tags: string[]): void {
    this.clearTags();
    tags.forEach((tag) => {
      this.addTag(tag);
    });
  }
}

export {TagController};
