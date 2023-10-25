import { createContext, useState, useEffect } from "react"
import { signOutUserOnline } from "../services/authService"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../config/firebase"
import { URL_IMG_PROFILE_DEFAULT } from "../const/dataConst"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../config/firebase"
import { UserOnlineType, UserContextType } from "../types/UtilitiesTypes"

const initialUserOnline = {
    id: "",
    displayName: "",
    email: "",
    imgURL: URL_IMG_PROFILE_DEFAULT,
    role: "",
    online: false
}

/************************************************************/
/* Context */
export const UserContext = createContext<UserContextType>({userOnline: initialUserOnline, loadingUserAuth: true});

/************************************************************/
/* Provider */
export const UserProvider = ( {children}: {children: JSX.Element} ) => {
    const [userOnline, setUserOnline] = useState<UserOnlineType>(initialUserOnline);
    const [loadingUserAuth, setLoadingUserAuth] = useState(true);

    useEffect(() => { 
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                const userDataRef = doc(db, "users", user.uid);
                const unsub2 = onSnapshot(userDataRef, (doc) => {
                    const {displayName, email, imgURL, role, cart} = doc.data() as UserOnlineType;

                    setUserOnline({
                        id: doc.id,
                        displayName,
                        email,
                        imgURL: imgURL || URL_IMG_PROFILE_DEFAULT,
                        role,
                        online: true,
                        cart: cart || []
                    })
                    setLoadingUserAuth(false);
                })
                return () => unsub2();
            }else {
                removeUserOnline();
                setLoadingUserAuth(false);
            }
        });
        return () => unsub();
    }, []);

    const removeUserOnline = async () => {
        try{
            await signOutUserOnline();
            setUserOnline(initialUserOnline);
        } catch(err){
            console.log(err);
        }
    };

    return (
        <UserContext.Provider value={ { userOnline, removeUserOnline, loadingUserAuth } } >
            { children }
        </UserContext.Provider>
    )
}