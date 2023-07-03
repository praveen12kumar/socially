export const dataReducer = (state, {type, payload})=>{
    switch(type){
        case "AllUsers":
            return{...state, allUsers:[...payload]};
        case "AllPosts":
            return{...state, allPosts:[...payload]};

        case "currentUser":
            return{...state, currentuser:{...payload}};




        default: 
            return{state}
    }
}