import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { KeyGen } from './res/keygen.entity';
import { IKeyGen } from './dto/keygen.dto';
import { IMessage } from './dto/message.dto';
import { Message } from './res/message.entity';
const CryptoJS = require('crypto-js')

@Injectable()
export class ClassifierService {

  constructor(
    @InjectModel(KeyGen)
    private keyRepository: typeof KeyGen,

    @InjectModel(Message)
    private msgRepository: typeof Message,
  ) {}


  createKeyGen(createKeyGenDto: IKeyGen) {
    return this.keyRepository.create(createKeyGenDto as any);
  }

  storeMessage(createMessage: IMessage) {
    return this.msgRepository.create(createMessage as any);
  }


  findBySocketId(id:string) {
    return this.keyRepository.findOne({where:{socketID:id}});
  }

  findAll() {
    return this.keyRepository.findAll({});
  }

  async generateKey(socketId:string) {
    let key = crypto.randomUUID();
    await this.createKeyGen({key,socketId:socketId})
    return key
  }

  encrypt(text:string,key:string){
    return CryptoJS.AES.encrypt(text,key).toString()
  }

  decrypt(encryptedText:string,key:string){
    let decryptedText = CryptoJS.AES.decrypt(encryptedText, key);
    return decryptedText.toString(CryptoJS.enc.Utf8);
  }

}


