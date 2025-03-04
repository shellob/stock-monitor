"use strict";
const cached = await this.redisService.get(symbol);
if (cached) {
    this.logger.log(`Cache hit for: ${symbol}`);
    return JSON.parse(cached);
}
