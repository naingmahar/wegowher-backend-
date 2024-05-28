import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ITopicParam } from 'apps/dto/Topics.dto';

@Injectable()
export class OfficeService {
    constructor(@Inject('CLASSIFIER_SERVICE') private classifierClient: ClientProxy) {}

    async getKeys(socketId:string) {
        return new Promise((resolve,reject)=>{
            this.classifierClient.send({cmd: 'fetch-key'},socketId)
                .subscribe(val=>resolve(val))
                .closed
        })
    }

    async getTopics(messagePackage:ITopicParam) {
        return new Promise((resolve,reject)=>{
            this.classifierClient.send({cmd: 'fetch-topic'},messagePackage)
                .subscribe(val=>resolve(val))
                .closed
        })
    }



    sendEvent() {
        return this.classifierClient.emit('message-placed', "123");
    }

}
