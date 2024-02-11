import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import * as yaml from 'js-yaml'

@Injectable()
export class DatabaseConfigService{
    private readonly env: string = process.env.NODE_ENV || 'development';
    private readonly config: Record<string, any>;
    
    constructor(){
        const configFile = fs.readFileSync('../config/config.yaml', 'utf8');
        this.config = yaml.load(configFile)[this.env];
    }

    get(key: string): any {
        return this.config[key]
    }
}