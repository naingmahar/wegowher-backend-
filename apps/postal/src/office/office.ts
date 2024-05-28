import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OfficeService } from './office.service';
import { ITopicParam, ITopicResponse } from 'apps/dto/Topics.dto';

@WebSocketGateway({ cors: true })
export class Office {

    constructor(private readonly officeService: OfficeService) {}

    @WebSocketServer()
    server: Server;

    @SubscribeMessage("GLOBAL")
    async onNewGlobalMessage(client: Socket,message: string){
        let response = await this.officeService.getTopics({socketId:client.id,text:message}) as ITopicResponse;
        this.server.emit(response.topic,response.data)
    }

    @SubscribeMessage("KEY_GEN")
    async getKey(client: Socket){
        let key = await this.officeService.getKeys(client.id);
        console.log("KEY",key,client.id)
        this.server.to(client.id).emit("SECRET",key)
    }

}
