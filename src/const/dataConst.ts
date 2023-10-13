
export const URL_IMG_PROFILE_DEFAULT = "https://firebasestorage.googleapis.com/v0/b/shearow-second-proyect.appspot.com/o/userImgProfile%2Fprofile-default.svg?alt=media&token=41470d22-8cb5-445e-a406-c55c6edb29c1&_gl=1*iezlwg*_ga*MTI2ODY1OTgwMi4xNjk1NjQ5Njk1*_ga_CW55HF8NVT*MTY5NjE4NDAxNC40MC4xLjE2OTYxODY3NzAuNDQuMC4w";

export const MENU_EDIT_PROFILE = {
    menu: "menu-edit-profile",
    changeUserName: "change-username",
    changePassword: "change-password"
}

export const REGEX_AUTH = {
    userName: /^[a-zA-Z0-9\s]{1,30}$/,
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    password: /^[A-Za-z0-9]{6,30}$/,
    repeatPassword: /^[A-Za-z0-9]{6,30}$/,
}

export const MAX_COUNT_MINIATURES = 7;

export const PRIVATE_OPTION = {
    onlyLogged: "onlyUsers",
    onlyNotLogged: "onlyNotLogged",
    onlyAdmin: "onlyAdmin"
}

export const SECTION_ADMIN_ON = {
    home: "home",
    products: "products",
    users: "users"
}

export const ALL_PRODUCTS = "all";

export const INITIAL_MIN_PRICE = 0;

export const INITIAL_MAX_PRICE = 1000000000;