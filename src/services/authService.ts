import { auth, db, googleProvider} from "../config/firebase"
import { signOut, sendPasswordResetEmail, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { URL_IMG_PROFILE_DEFAULT } from "../const/dataConst"
/********************* TYPESCRIPT TYPES *****************************************/
import { CreateUserService, CreateUserDBService } from "../types/AuthServiceTypes"
/********************************************************************************/

export const createUserService = async ( {email, displayName, password}: CreateUserService ) => {
    try{
        await createUserWithEmailAndPassword(auth, email, password).then(userInfo => {
            alert("Welcome " + userInfo.user.email)
            createUserDBService({
                email,
                displayName: displayName,
                id: userInfo.user.uid,
                role: "user",
                imgURL: userInfo?.user?.photoURL || URL_IMG_PROFILE_DEFAULT
            })
        });
    }catch(err){
        alert("El EMAIL INGRESADO YA SE ENCUENTRA EN USO");
    }
}

export const createUserDBService = async ( {email, displayName, id, role, imgURL = ""}: CreateUserDBService ) => {
    const userDBRef = doc(db, "users", id);

    try{
        await setDoc(userDBRef, {email,displayName,role,imgURL}, {merge: true})
    }catch(err){
        alert("An error has ocurred.");
    }
}

export const loginUserService = async ( {email, password}: {email:string, password: string} ) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const loginWithGoogleService = async () => {
    return signInWithPopup(auth, googleProvider);
}

export const signOutUserOnline = () => {
    return signOut(auth);
}

export const resetPasswordUser = (email: string) => {
    return sendPasswordResetEmail(auth, email)
}

export const getUserIdData = async ( id: string ) => {
    const userDataRef = doc(db, "users", id)
    return await getDoc(userDataRef)
}