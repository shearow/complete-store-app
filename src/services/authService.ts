import { auth, db, googleProvider, storage } from "../config/firebase"
import { signOut, sendPasswordResetEmail, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, User } from "firebase/auth"
import { doc, getDocs, setDoc, updateDoc, query, where, collection, getDoc, addDoc, deleteDoc, limit } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage"
import { URL_IMG_PROFILE_DEFAULT } from "../const/dataConst"
import { v4 } from "uuid";
import { CreateUserService, CreateUserDBService } from "../types/AuthServiceTypes"
import { CreateProductServiceType, EditCompleteProductServiceType } from "../types/UtilitiesTypes"

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
    thumbnail,
    setIsLoading
}: CreateProductServiceType ) => {
    const productRef = collection(db, "products");

    try{
        setIsLoading(true);

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
            createCategoryService( {category} );

            /* CREATE THUMBNAIL IN STORAGE. */
            const dataThumbnail = await createThumbnailInStorageService( {productId: createdProduct.id, thumbnail} );

            /* CREATE IMAGES IN STORAGE */
            const dataImages = await createImagesInStorageService( {productId: createdProduct.id, images: images} );
            
            /* ADD IMAGES UPLOADEDS IN PRODUCT */
            updateProductService( {
                productId: createdProduct.id,
                data: {
                    thumbnail: dataThumbnail,
                    images: dataImages
                }
            } );

            alert("The product was created successfully");
        });
    }catch(err){
        alert(`Unexpected error, try again or another time.`);
    }finally{
        setIsLoading(false);
    }
}

export const createCategoryService = async ( {category}: {category: string[]} ) => {
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
    });
}

export const createThumbnailInStorageService = async ( {productId, thumbnail}: {productId: string, thumbnail: File} ) => {
    let dataThumbnail = "";
    const storageProductRef = ref(storage, `/products/${productId}/thumbnail.jpg`);

    await uploadBytes(storageProductRef, thumbnail).then(async fileData => {
        await getDownloadURL(fileData.ref).then(data => {
            dataThumbnail = data;
        });
    });
    return dataThumbnail;
}

export const createImagesInStorageService = async ( {productId, images}: {productId: string, images: File[]} ) => {
    let dataImages: string[] = [];

    /* REEMPLAZAR CONTENIDO CON LA NUEVA VARIABLE createImageInStorageService */
    for(let i=0; i < images.length; i++){
        const storageProductRef2 = ref(storage, `/products/${productId}/${v4()+v4()}.jpg`);

        await uploadBytes(storageProductRef2, images[i]).then(async fileData => {
            await getDownloadURL(fileData.ref).then(data => {
                dataImages = [...dataImages, data];
            });
        });
    }
    return dataImages;
}

export const createImageInStorageService = async ( {productId, image}: {productId: string, image: File} ) => {
    const storageProductRef = ref(storage, `/products/${productId}/${v4() + v4()}.jpg`);
    
    const fileData = await uploadBytes(storageProductRef, image);
    const data = await getDownloadURL(fileData.ref);
    return data;
}

export const updateProductService = async ( {productId, data}: {productId: string, data: Object} ) => {
    const productRef = doc(db, "products", productId);
    await setDoc(productRef, data, {merge: true});
}

export const deleteCompleteProductService = async ( {productId, productCategory}: {productId: string, productCategory: string} ) => {
    try{
        await deleteProductService( {productId} ).then(async () => {
            /* Delete all images of the deleted product in Storage */
            const productRef = ref(storage, `products/${productId}`);

            listAll(productRef).then((res) => {
                res.items.forEach((itemRef) => {
                    deleteProductImageService( {productId, imagePath: itemRef.name} );
                });
            }).catch((err) => {
                console.log(err);
            });

            /* If the category does not exist in other products, delete it */
            if(await notExistCategoryInProducts( {category: productCategory[0]} )){
                deleteCategoryService( {categoryName: productCategory[0]} );
            }
        });
    }catch(err){
        console.log(err);
    }
}

export const notExistCategoryInProducts = async ( {category}: {category: string} ) => {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("category", "array-contains", category), limit(1));
    
    const data = await getDocs(q);
    return data.empty;
}

export const deleteProductService = async ( {productId}: {productId: string} ) => {
    const productRef = doc(db, "products", productId);    
    await deleteDoc(productRef);
}

export const deleteProductImageService = async ( {productId, imagePath}: {productId: string, imagePath: string} ) => {
    const productRef = ref(storage, `products/${productId}/${imagePath}`);
    await deleteObject(productRef);
}

export const deleteCategoryService = async ( {categoryName}: {categoryName: string} ) => {
    const categoriesRef = collection(db, "categories");
    const q = query(categoriesRef, where("category", "==", categoryName));

    await getDocs(q).then(category => {
        category.forEach(async data => {            
            const categoryRef = doc(db, "categories", data.id);
            await deleteDoc(categoryRef);
        });
    })
}

export const editCompleteProductService = async ( 
    {newData, imagesToDelete = [], oldCategories}: EditCompleteProductServiceType
) => {

    /* Take new images, if images not exist in DB create. */
    const newImages = await Promise.all(newData.images.map(async (image: string | File) => {
        if (image instanceof File) {
            return createImageInStorageService( {productId: newData.id, image} );
        } else {
            return image;
        }
    }));

    /* If thumbnail Upload instanceof File, replace Thumbnail in storage with same name */
    if(newData.thumbnail instanceof File){
        createThumbnailInStorageService( {productId: newData.id, thumbnail: newData.thumbnail} );
    }
    /* CHECK IF THUMBNAIL CHANGE, IF NOT CHANGE NOTHIN EXCEPT THUMBNAIL !! IMPORTANT */

    /* Upload product */
    updateProductService( {
        productId: newData.id,
        data: {
            name: newData.name,
            available: newData.available,
            price: newData.price,
            discountPercentage: newData.discountPercentage,
            description: newData.description,
            stock: newData.stock,
            category: newData.category,
            images: newImages
        }
    } );

    /* If category not exist in products create, and delete old category */
    oldCategories.forEach(async category => {
        if(await notExistCategoryInProducts){
            deleteCategoryService( {categoryName: category} );
        }
    });    

    /* If new category not exist, create category in db */
    await createCategoryService( {category: newData.category} );

    /* Delete images */
    imagesToDelete.forEach(image => {
        const imageSplited = image.split("%2F");
        const imagePath = imageSplited[2].split("?")[0];
        deleteProductImageService( {productId: newData.id, imagePath} );
    });
}