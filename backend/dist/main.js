"use strict";
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
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./common/http-exception.filter");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const platform_ws_1 = require("@nestjs/platform-ws");
const swagger_1 = require("@nestjs/swagger");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const logger = new common_1.Logger('Bootstrap');
        app.use((0, helmet_1.default)());
        app.use((0, compression_1.default)());
        app.enableCors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        });
        app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
        app.useWebSocketAdapter(new platform_ws_1.WsAdapter(app));
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Stock Monitor API')
            .setDescription('API для мониторинга биржевых котировок')
            .setVersion('1.0')
            .addTag('stocks')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, document);
        const PORT = process.env.PORT || 3000;
        yield app.listen(PORT, () => {
            logger.log(`🚀 Server started on http://localhost:${PORT}`);
            logger.log(`📊 Swagger UI available at http://localhost:${PORT}/api`);
        });
    });
}
bootstrap();
