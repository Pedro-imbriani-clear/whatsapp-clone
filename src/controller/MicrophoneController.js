import { ClassEvents } from "../util/ClassEvents";

export class MicrophoneController extends ClassEvents{
    constructor(){
        super();
        this._available = false;
        this._mimeType = 'audio/webm'
        navigator.mediaDevices.getUserMedia({
            audio : true
        }).then(stream=>{
            this._available = true;
            this._stream = stream;
            this.trigger('ready', this._stream);
        }).catch(err=>{
            console.error(err);
        });
    }
    isAvailable(){
        return this._available
    }
    stop(){
        this._stream.getTracks().forEach(track=>{
            track.stop();
        });
    }
    startRecorder(){
        if(this._available()){
         this._midiaRecorder =   new MidiaRecorder (this._stream,{
            mimeType:this._mimeType
         });
         this._recordedChunks = [];
         this._mediaRecorder.addEventListener('dataavailable', e =>{
            if(e.data.size > 0) this._recordedChunks.push(e.data);
         });
         this._mediaRecorder.addEventListener('stop',e=>{
            let blob = new Blob(this._recordedChunks,{
                type: this._mimeType
            });
            let filename= `rec${Date.now()}.webm`;
            let file = new file([blob],filename,{
                type:this._mimeType,
                lastModified:Date.now()
            });
            
         });
         this._mediaRecorder.start();
         startTimer();

        }

    }
    stopRecorder(){

        if(this._available()){
            this._midiaRecorder.stop();
            this.stop();
            this.stopTimer();
        }
    }
    startTimer(){
        let start = Date.now();
        this._recordMicrophoneInterval = setInterval(()=>{
          this.trigger('recordTimer',(Date.now() - start));
        },100);
    }
    stopTimer(){
        clearInterval( this._recordMicrophoneInterval);
    }
}