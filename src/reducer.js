const Reducer = (state = [], action) => {

    switch(action.type){
        case 'ADD_TODO':
            return state.concat([action.newTodo]);
            default:
            return state;
    }
}

export default Reducer;