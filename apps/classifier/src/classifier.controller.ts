import { Controller, Get, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClassifierService } from './classifier.service';
import { PostDto } from 'apps/dto/post.dto';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqContent } from 'apps/dto/RmqContent.dto';
import { ITopicParam } from 'apps/dto/Topics.dto';

@Controller()
export class ClassifierController {
  constructor(private readonly classifierService: ClassifierService) {}



  @MessagePattern({ cmd: 'fetch-key' })
  getKey(@Ctx() context: RmqContext){
  
    const rmqContent:RmqContent<string,string> =JSON.parse(context.getMessage().content.toString())
    let key = this.classifierService.generateKey(rmqContent.data)
    return key
  }
  
  @MessagePattern({ cmd: 'fetch-topic' })
  async getTopic(@Ctx() context: RmqContext) {

    try {
      const rmqContent:RmqContent<ITopicParam,string> = JSON.parse(context.getMessage().content.toString())
      let keygen = await this.classifierService.findBySocketId(rmqContent.data.socketId)
      let key = keygen.key
      let decryptedText = this.classifierService.decrypt(rmqContent.data.text,key);
      if(decryptedText){
        let post:PostDto = JSON.parse(decryptedText);
        const newMsg = this.classifierService.encrypt(JSON.stringify(post),post.channelId)
        this.classifierService.storeMessage({message:newMsg,socketId:rmqContent.data.socketId,topic:post.channelId})
        return {
          topic:post.channelId,
          data:newMsg
        }
      }
    } catch (error) {
      console.log("ERROR",error)
      return {}
    }
  }

}
