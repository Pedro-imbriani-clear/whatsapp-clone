import { ClassEvents } from "../util/ClassEvents";
import { Firebase } from "../util/firebase";

export class User extends ClassEvents{
    static getRef(){
        return Firebase.db().collection('/users')
    }
    static findByEmail(email){
        return User.getRef().doc(email);
    }
}