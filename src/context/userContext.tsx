import { createContext, useState, useEffect } from "react"
import { getUserIdData, signOutUserOnline } from "../services/authService"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../config/firebase"
import { URL_IMG_PROFILE_DEFAULT } from "../const/dataConst"

/********************* TYPESCRIPT TYPES *****************************************/
interface UserOnline {
    id: string,
    displayName?: string,
    email?: string,
    imgURL: string,
    role: string,
    online: boolean
}
/*******************************************************************************/

const initialUserOnline = {
    id: "",
    displayName: "",
    email: "",
    imgURL: URL_IMG_PROFILE_DEFAULT,
    role: "",
    online: false
}

/* Context */
export const UserContext = createContext(null);

/* Provider */
export const UserProvider = ( {children}: {children: JSX.Element} ) => {
    const [userOnline, setUserOnline] = useState<UserOnline>(initialUserOnline);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) =>{
            if(user){
                getUserIdData(user.uid).then(userOn => {
                    if(userOn.exists()){
                        const {displayName,email,imgURL,role} = userOn.data()

                        setUserOnline({
                            id: user.uid,
                            displayName,
                            email,
                            imgURL,
                            role,
                            online: true
                        });
                    }
                });
            }
        });
        return () => unsub();
    }, []);

    const onlineWaitingData = (online: boolean) => {
        setUserOnline(prevState => ( {...prevState, online} ));
    }

    const removeUserOnline = async () => {
        try{
            await signOutUserOnline();
            setUserOnline(initialUserOnline);
        } catch(err){
            console.log(err);
        }
    };

    return (
        <UserContext.Provider value={ { userOnline, removeUserOnline, onlineWaitingData } }>
            { children }
        </UserContext.Provider>
    )
}