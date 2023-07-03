export const dataReducer = (state, {type, payload})=>{

    switch(type){
        case "AllUsers":
            return{...state, allUsers:[...payload]};
        case "AllPosts":
            return{...state, allPosts:[...payload]};
        case "currentUser":
            return{...state, currentuser:{...payload}};
        case "Add-new-user":
            return{...state, allUsers:[...state.allUsers, ...payload]};
        case "getBookmarks":
            return{...state, bookmarks:[...payload]};
        case "getNewBookmarks":
            return{...state, bookmarks:[...payload]};
        


        default: 
            return{state}
    }
}