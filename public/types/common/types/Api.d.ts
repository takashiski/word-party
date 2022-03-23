import { Listener, Comment } from './Comment';
import { RecursivePartial } from './Common';
import { Config, SpeechConfig } from './Config';
import { Service, ServiceError } from './Service';
import { UpdateCheckResult } from './Update';
export interface Api {
    receiveComments(callback: (comments: Comment[], listeners: Listener[]) => void): void;
    receiveSpeech(callback: (text: string, config: SpeechConfig) => void): void;
    receivePageError(callback: (error: ServiceError) => void): void;
    getServices(): Promise<Service[]>;
    createService(): Promise<Service>;
    updateService(service: Service): void;
    removeService(service: Service): void;
    clearComents(): void;
    getConfig(): Promise<Config>;
    updateConfig(config: RecursivePartial<Config>): Promise<Config>;
    openAppDirectory(): void;
    resetSettings(): void;
    getVersion(): Promise<string>;
    getTemplatePath(): Promise<string>;
    showContextMenu(): void;
    checkUpdate(): Promise<UpdateCheckResult>;
    downloadUpdate(): void;
    openWindow(service: Service): void;
    speechPreview(comment: string, username: string, config: SpeechConfig): void;
    checkIntegration(name: string, ...args: any[]): Promise<boolean>;
    sendTestComment(comment: Comment): void;
    openCommentTester(): void;
}
