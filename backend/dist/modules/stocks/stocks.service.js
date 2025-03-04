"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let StockService = class StockService {
    constructor() {
        this.API_KEY = process.env.FINNHUB_API_KEY;
        this.API_URL = 'https://finnhub.io/api/v1/quote';
    }
    getStock(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.get(`${this.API_URL}`, {
                    params: { symbol, token: this.API_KEY },
                });
                return {
                    symbol,
                    currentPrice: data.c, // Текущая цена
                    change: data.d, // Изменение в $
                    changePercent: data.dp, // Изменение в %
                    open: data.o, // Цена открытия
                    high: data.h, // Максимум
                    low: data.l, // Минимум
                    prevClose: data.pc, // Предыдущая закрытая цена
                };
            }
            catch (error) {
                console.error(`Ошибка при загрузке данных для ${symbol}:`, error);
                return null;
            }
        });
    }
    getStockHistory(symbol_1, from_1, to_1) {
        return __awaiter(this, arguments, void 0, function* (symbol, from, to, resolution = "D") {
            try {
                const { data } = yield axios_1.default.get(`https://finnhub.io/api/v1/stock/candle`, {
                    params: { symbol, resolution, from, to, token: this.API_KEY },
                });
                if (data.s !== "ok") {
                    throw new Error("No data available");
                }
                return {
                    symbol,
                    timestamps: data.t,
                    open: data.o,
                    high: data.h,
                    low: data.l,
                    close: data.c,
                    volume: data.v,
                };
            }
            catch (error) {
                console.error(`Ошибка при загрузке исторических данных ${symbol}:`, error);
                return null;
            }
        });
    }
};
exports.StockService = StockService;
exports.StockService = StockService = __decorate([
    (0, common_1.Injectable)()
], StockService);
