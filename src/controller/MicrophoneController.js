import { ClassEvents } from "../util/ClassEvents";

export class MicrophoneController extends ClassEvents{
    constructor(){
        super();
        navigator.mediaDevices.getUserMedia({
            audio : true
        }).then(stream=>{
            this._stream = stream
            let audio = new Audio();
            audio.src = URL.createObjectURL(stream);
            audio.play();
            this.trigger('play',audio);
        }).catch(err=>{
            console.error(err);
        });
    }
}