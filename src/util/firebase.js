const firebase = require ('firebase');
require('firebase/firestore');
export class Firebase {
    constructor(){
        this._config = {

            apiKey: "AIzaSyA4tm2EWtSl9TiCd71lohKLj1AxS9qp8Ro",
        
            authDomain: "whatsapp-clone-a21b2.firebaseapp.com",
        
            projectId: "whatsapp-clone-a21b2",
        
            storageBucket: "whatsapp-clone-a21b2.appspot.com",
        
            messagingSenderId: "295404126186",
        
            appId: "1:295404126186:web:cef3588ee584bb9acabc93",
        
            measurementId: "G-L2NTFXBN7G"
        
          };
        this.init();
    }
    init(){
      
          if(!window._initializedFirebase){
            firebase.initializeApp(this._config);
           
            firebase.firestore().settings({
                timestampsInSnapshots: true
            })

            window._initializedFirebase = true;
        }
       
        
    }
    static db(){
        return firebase.firestore();
    }
    static hd (){
        return firebase.storage();
    }
    initAuth(){
        return new Promise((s,f)=>{
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(result=>{
                let token = result.credential.acessToken;
                let user = result.user;
                s({
                    user,
                    token});
            })
            
            .catch(err=>{
                f(err)})
        })
    }
}
