import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { StockService } from './stocks.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class StocksGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly stockService: StockService) {}

  @SubscribeMessage('subscribeToStock')
  async handleSubscription(@MessageBody() symbol: string) {
    console.log(`📡 Подписка на ${symbol}`);
    setInterval(async () => {
      const stockData = await this.stockService.getStock(symbol);
      this.server.emit(`stockUpdate_${symbol}`, stockData);
    }, 5000);
  }
}
