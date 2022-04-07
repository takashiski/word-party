import { Engine, Render, Runner, Body } from 'matter-js';
import { WordPartyModule, WordPartyTriggerParams } from './index';
export interface DropperTextureConfig {
    src: string;
    content: string;
    size: number;
    xScale: number;
    yScale: number;
    angle: number;
    density: number;
    frictionAir: number;
    restitution: number;
    friction: number;
    gravity: number;
}
export interface DropperItemConfig {
    lifeTime: number;
    magnification: number;
    texture: DropperTextureConfig;
}
export interface DropperConfig {
    maxItems: number;
}
export declare class Dropper implements WordPartyModule {
    private canvas;
    private _renderId;
    stageWidth: number;
    stageHeight: number;
    engine: Engine;
    render: Render;
    runner: Runner;
    leftWall: Body;
    rightWall: Body;
    ground: Body;
    options: DropperConfig;
    private _items;
    constructor(_op: DropperConfig);
    init(): void;
    private _render;
    _onBeforeUpdate: () => void;
    _onResize: () => void;
    drop(itemConfig: DropperItemConfig, x?: number, y?: number): void;
    fire(config: DropperItemConfig, { hitCount }: WordPartyTriggerParams): void;
    destroy(): void;
}
