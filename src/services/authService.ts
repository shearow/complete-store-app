import { auth, db, googleProvider, storage } from "../config/firebase"
import { signOut, sendPasswordResetEmail, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, User } from "firebase/auth"
import { doc, getDocs, setDoc, updateDoc, query, where, collection, getDoc, addDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { URL_IMG_PROFILE_DEFAULT } from "../const/dataConst"
import { v4 } from "uuid";
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
        alert("The email enter is already in use.");
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

export const signOutUserOnline = async () => {
    return await signOut(auth);
}

export const resetPasswordUser = (email: string) => {
    return sendPasswordResetEmail(auth, email)
}

export const changeUserNameService = async ( {newUsername, userId}: {newUsername: string, userId: string} ) => {
    const dataDoc = doc(db, "users", userId);
    return await updateDoc(dataDoc, {
        displayName: newUsername
    });
}

export const userChangeImageService = async ( {file, userId}: {file: File, userId: string} ) => {
    const storageRef = ref(storage, `/userImgProfile/${userId}.jpg`);

    try{
        await uploadBytes(storageRef, file).then(async fileData => {
            await getDownloadURL(fileData.ref).then(async downloadURL => {
                const userDataRef = doc(db, "users", userId)
                await updateDoc(userDataRef, {
                    imgURL: downloadURL
                });
            });
            alert("The image was loaded successfully.")
        })
    }catch(err){
        alert("Error when trying to load the image.");
    }
}

export const userChangeNewPasswordService = async ( {newPassword}: {newPassword: string} ) => {
    const userRef= auth.currentUser;

    await updatePassword(userRef as User, newPassword).then(() => {
        alert("Password change correctly.");
    }).catch(() => {
        alert("Inesperate Error. Try in other moment");
    });
}

/******** SHOPP ********/
export const takeAllProducts = async () => {
    const q = query(collection(db, "products"), where("available", "==" , true));

    const productsData = await getDocs(q);
    return await productsData;
}

export const takeProductService = async ( {idProduct}: {idProduct: string} ) => {
    const dataRef = doc(db, "products", idProduct);

    return await getDoc(dataRef);
}

export const createProductService = async ( {
    available,
    category,
    description,
    discountPercentage,
    name,
    images,
    price,
    stock,
    thumbnail
} ) => {
    const productRef = collection(db, "products");

    let dataThumbnail: string;
    let dataImages: string[] = [];

    try{
        await addDoc(productRef, {
            available,
            category,
            description,
            discountPercentage,
            name,
            price,
            stock,
        }).then(async createdProduct => {

            /* IF CATEGORY NOT EXIST, CREATE CATEGORY */
            const itemRef = collection(db, "categories");

            category.forEach(async categoryItem => {
                const q = query(itemRef, where("category", "==", categoryItem)); 

                await getDocs(q).then(async categoryData => {
                    if(categoryData.empty){
                        await addDoc(itemRef, {
                            category: categoryItem
                        });
                    }
                });
            })

            /* CREATE THUMBNAIL IN STORAGE. */
            const storageProductRef = ref(storage, `/products/${createdProduct.id}/thumbnail.jpg`);

            await uploadBytes(storageProductRef, thumbnail).then(async fileData => {
                await getDownloadURL(fileData.ref).then(data => {
                    dataThumbnail = data;
                });
            });
            
            /* CREATE IMAGES IN STORAGE */
            for(let i=0; i < images.length; i++){
                const storageProductRef2 = ref(storage, `/products/${createdProduct.id}/${v4()+v4()}.jpg`);

                await uploadBytes(storageProductRef2, images[i]).then(async fileData => {
                    await getDownloadURL(fileData.ref).then(data => {
                        dataImages = [...dataImages, data];
                    });
                });
            }
            
            /* ADD IMAGES UPLOADEDS IN PRODUCT */
            const productRef = doc(db, "products", createdProduct.id);

            await setDoc(productRef, {
                thumbnail: dataThumbnail,
                images: dataImages
            }, {merge: true});
        });
    }catch(err){
        console.log(err);
    }
}