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
        case "update_follow_user":   
            let tempusers = [...state.allUsers];
                tempusers = tempusers.filter((temp)=> temp.username !== payload.user.username && temp.username !== payload.followUser.username)
            return{...state, allUsers:[...tempusers, payload.user, payload.followUser]};
        case "update_user":
            let tusers = [...state.allUsers];
                tusers = tusers.filter((t)=> t.username !== payload.username);
            return{...state, allUsers:[...tusers, payload]};
               
            

        default: 
            return{state}
    }
}