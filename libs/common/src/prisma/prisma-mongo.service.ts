import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "../../../../node_modules/prisma-mongo/client";

@Injectable()
export class PrismaMongoDbService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db:{
                    url: config.get('MONGODB_URI')
                },
            },
        });
    }
}