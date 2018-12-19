const INITIAL_STATE = {list: [], listHistory: [], searchingName: ''}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'NAME_CHANGED':
        return { ...state, searchingName: action.payload }

        case 'NAME_CLEAR':
            return { ...state, searchingName: '' }

        case 'NAME_FETCHED':
            return { ...state, list: action.payload.data}
        
        case 'ID_CHANGED':
        //console.log("Teste", action.payload)
            return { ...state, id: action.payload }

        case 'FORM_FORMNEW':
           // console.log("FORM_FORMNEW", action.payload.id_client)
            return { ...state, form_formnew: action.payload.id_client }

        case 'ANALYZE__FETCHED':
           // console.log("ANALYZE__FETCHED")
            return { ...state, listHistory: action.payload.data }

        default:
            return state
    }
}

