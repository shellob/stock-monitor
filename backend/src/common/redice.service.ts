import {Injectable} from '@nestjs/common'
import {Redis} from 'ioredis'

@Injectable()
    export class RedisService {
        private readonly redis: Redis;

        constructor() {
            this.redis = new Redis({host: 'localhost', port: 6379});
        }

        async get(key: string) {
            return this.redis.get(key);
        }

        async set(key: string, value: string, ttl: number) {
            return this.redis.setex(key, ttl, value);
        }
    }

