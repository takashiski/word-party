import { Engine, Render, Runner, Body } from 'matter-js';
import { WordPartyModule } from './index';
export interface DropperTextureConfig {
    src: string;
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
    trigger: number;
    pattern: string[];
    lifeTime: number;
    magnification: number;
    textures: DropperTextureConfig[];
}
export interface DropperConfig {
    use: boolean;
    maxItems: number;
    items: DropperItemConfig[];
}
export declare class Dropper implements WordPartyModule {
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
    _onBeforeUpdate: () => void;
    _onResize: () => void;
    _onMouseDown: (e: MouseEvent) => void;
    drop(itemConfig: DropperItemConfig, x?: number, y?: number): void;
    verify(comments: string[]): void;
    destroy(): void;
}
