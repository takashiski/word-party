export interface WordPartyModule {
    verify(comment: string[]): void;
    destroy(): void;
}
