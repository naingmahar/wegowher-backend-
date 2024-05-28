export class RmqContent<T,CMD >{
        pattern: string | { cmd: string|CMD }
        data: T
        id: string
}