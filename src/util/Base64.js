export class Base64{
    static getMimetype(urlBase64){
        let regex =  /^data:(.+);base64,(.*)$/;
        let result = this.el.pictureCamera.src.match(regex);
        let mimeType = result[1];
    }
    static toFile(urlBase64){
        let mimeType = Base64.getMimetype(urlBase64);
        let ext = mimeType.split('/')[1];
        let filename = `file${Date.now()}.${ext}`;

       return fetch(urlBase64)
        .then(res=>{return res.arrayBuffer();})
        .then(Buffer=>{return new File([Buffer],filename,{type:mimeType});});
        
        
    }
}