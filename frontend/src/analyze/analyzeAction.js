
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const axios = require('axios');



const BASE_URL = 'http://localhost:3003/api'
const RAFA_URL = 'http://192.168.137.2:10003'
const INITIAL_VALUES = { name: "", telephone: "", city: "", propertyname: "" }//ARRUMAR.. TÁ ERRADO
var id;

// export function getList() {
//     const request = axios.get(`${BASE_URL}/analyzes`)
//     return {
//         type: 'NAME_FETCHED',
//         payload: request    //dentro do request eu tenho um atributo chamado .data
//     }
// }

export function getListHistory() {
    //console.log("getListHistory", value)
    return dispatch => {
        const request = axios.get(`${BASE_URL}/analyzes`)
            .then(resp => dispatch({ type: 'ANALYZE__FETCHED', payload: resp }))
    }
}

export const searchAnalyze = (id_client) => {  //vai buscar os serviços no backend
    return (dispatch, getState) => {
       // console.log("searchAnalyze", id_client)
        const search = id_client ? `&id_client__regex=/${id_client}/` : ''
        const request = axios.get(`${BASE_URL}/analyzes/?sort=-createdAt${search}`)
            .then(resp => dispatch({ type: 'ANALYZE__FETCHED', payload: resp }))
    }
}

export function create(values) {
    //console.log("create", values)
    return submit(values, 'post')

}

export function update(values) {
    console.log(values)
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete')
}

function submit(values, method) {
    return dispatch => {
        //console.log("Value = ", values._id)
        const id = values._id ? values._id : ''
        //console.log("id = ", id)
        const clientsOranalyzes = values.id_client ? 'analyzes' : 'clients' // PENSAR.. PENSAR..
        //console.log("clientsOranalyzes = ", clientsOranalyzes)

        axios[method](`${BASE_URL}/${clientsOranalyzes}/${id}`, values) //executa o post e depois realiza as ações
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com Sucesso.')
                dispatch(init())
            })
            .catch(e => {   //qdo o banco acusar algum erro
                e.response.data.errors.forEach(error => toastr.error('Erro', error)) //errors é do backend..forEach percorre a matriz de erros
            })
    }
}
function ligar()  {
    return dispatch => {
        console.log("test ligado = ")
        axios.post('http://localhost:3000/acionamento', { data: '01' })
            .then(resp => {
                console.log("teste Ligado = ", resp.data)
            })
            .catch(e => {   //qdo o banco acusar algum erro
                console.log("erro= ", e)
            })
    }
}

function desligar(values,method) {
    return dispatch =>{
    console.log("test desligas = ",)
          axios.post('http://localhost:3000/acionamento', {data: '02' })
            .then(resp => {
                console.log("teste Desligado = ", resp.data)          
            })
            .catch(e => {   //qdo o banco acusar algum erro
                console.log("erro= ",e)
            })  
}}
//feito RAFAELA
function avanco(values, method) {
    return dispatch => {
        console.log("test avanco = ")
        axios.post('http://localhost:3000/sentido', { data: '05' })
            .then(resp => {
                console.log("test avanco resposta = ", resp.data)
                 })
            .catch(e => {   //qdo o banco acusar algum erro
                console.log("Error= ", e)
            })
    }}
function reverso(values, method) {
    return dispatch => {
        console.log("test reverso = ")
        axios.post('http://localhost:3000/sentido', { data: '06' })
            .then(resp => {
                console.log("test reverso resposta = ", resp.data)
                 })
            .catch(e => {   //qdo o banco acusar algum erro
                console.log("Error= ", e)
            })
    }}
    

/*function reverso(values, method) {
    return dispatch => {
        //console.log("Value = ", values._id)
        const id = values._id ? values._id : ''
        values.parameter2 = "Reverso";
        //console.log("id = ", id)
        const clientsOranalyzes = values.id_client ? 'analyzes' : 'clients' // PENSAR.. PENSAR..
        //console.log("clientsOranalyzes = ", clientsOranalyzes)
          


    
}}
// function avanco(values, method) {
//     return dispatch => {
//         console.log("test avanco = ")
//         axios.post('http://localhost:3000/sentido', { data: '05' })
//             .then(resp => {
//                 console.log("teste Avanço = ", resp.data)
//                 const id = values._id ? values._id : ''
//                 values.parameter2 = "Avanço";
//                 const clientsOranalyzes = values.id_client ? 'analyzes' : 'clients'
//                 axios[method](`${BASE_URL}/${clientsOranalyzes}/${id}`, values) //executa o post e depois realiza as ações
//                     .then(resp => {
//                         toastr.success('Sucesso', 'Operação Realizada com Sucesso.')
//                     })
//                     .catch(e => {   //qdo o banco acusar algum erro
//                         e.response.data.errors.forEach(error => toastr.error('Erro', error)) //errors é do backend..forEach percorre a matriz de erros
//                     })
//             })
//             .catch(e => {   //qdo o banco acusar algum erro
//                 console.log("erro= ", e)
//             })
//     }
// }
function avanco(values, method) {
    return dispatch => {
        console.log("test avanco = ")
        axios.post('http://localhost:3000/sentido', { data: '05' })
            .then(resp => {
                console.log("test avanco resposta = ", resp.data)
                 })
            .catch(e => {   //qdo o banco acusar algum erro
                console.log("Error= ", e)
            })
    }}
// function reverso(values, method) {
//     return dispatch => {
//         console.log("test Reverso = ")
//         axios.post('http://localhost:3000/sentido', { data: '06' })
//             .then(resp => {
//                 console.log("teste Reverso = ", resp.data)
//                 const id = values._id ? values._id : ''
//                 values.parameter2 = "Reverso";
//                 const clientsOranalyzes = values.id_client ? 'analyzes' : 'clients'
//                 axios[method](`${BASE_URL}/${clientsOranalyzes}/${id}`, values) //executa o post e depois realiza as ações
//                     .then(resp => {
//                         toastr.success('Sucesso', 'Operação Realizada com Sucesso.')
//                     })
//                     .catch(e => {   //qdo o banco acusar algum erro
//                         e.response.data.errors.forEach(error => toastr.error('Erro', error)) //errors é do backend..forEach percorre a matriz de erros
//                     })
//             })
//             .catch(e => {   //qdo o banco acusar algum erro
//                 console.log("erro= ", e)
//             })
//     }
// }
function reverso(values, method) {
    return dispatch => {
//         console.log("test reverso = ")
//         axios.post('http://localhost:3000/sentido', { data: '06' })
//             .then(resp => {
//                 console.log("test reverso resposta = ", resp.data)
//                  })
//             .catch(e => {   //qdo o banco acusar algum erro
//                 console.log("Error= ", e)
//             })
//     }
// }*/
//     }}
function nossoDelete(values, id_2) {
    const id = id_2
    const clientsOranalyzes = 'analyzes';
    axios['delete'](`${BASE_URL}/${clientsOranalyzes}/${id}`, values) //executa o post e depois realiza as ações
        .then(resp => {
            toastr.success('Sucesso', 'Operação Realizada com Sucesso.')
            dispatch(init())
        })
        .catch(e => {   //qdo o banco acusar algum erro
            console.log(e)
            e.response.data.errors.forEach(error => toastr.error('Erro', error)) //errors é do backend..forEach percorre a matriz de erros
        })
        //window.location.reload()
}
//Mudam o Status de liga e desliga
export function updateLigar(values) {
    return ligar(values, 'put')
}
export function updateDesligar(values) {
    return desligar(values, 'put')
}
//Mudam o Status de avanço e reverço
export function updateAvanco(values) {
    return avanco(values, 'put')
}
export function updateReverso(values) {
    return reverso(values, 'put')
}




/* function integrar(analyze) { //integração
    axios.post('update')(`${RAFA_URL}/${analyze}/${analyze._id}`, values) // Tentando uma possivel conversa
        console.log("TESTE = ", _id)
        .then(resp => {
            toastr.success('Sucesso', 'Operação Realizada com Sucesso.')
            dispatch(init())
        })
        .catch(e => {   //qdo o banco acusar algum erro
            console.log(e)
            e.response.data.errors.forEach(error => toastr.error('Erro', error)) //errors é do backend..forEach percorre a matriz de erros
        })
}    */

/**************************************************************************************************/

export const changeName = (event) => ({
    type: 'NAME_CHANGED',
    payload: event.target.value // valor que tá no campo input no momento que o evento é disparado
})                               //só cria o evento, não dispara o evento pra chamar o reducer.. dispatch que chama..

export const search = () => {  //vai buscar os serviços no backend
    return (dispatch, getState) => {
        const searchingName = getState().analyze.searchingName
        //console.log(searchingName)
        const search = searchingName ? `&name__regex=/${searchingName}/` : ''
        const request = axios.get(`${BASE_URL}/clients/?sort=-createdAt${update}`)
            .then(resp => dispatch({ type: 'NAME_FETCHED', payload: resp }))
    }
}

export const clear = () => {
    return [{ type: 'NAME_CLEAR' }, search()]
}

/**************************************************************************************************/

export function showUpdate(analyze) {
    return [
        //console.log("showUpdate", analyze),
        { type: 'FORM_FORMNEW', payload: analyze },
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('analyzeForm', analyze) //inicializar o formulário com dados já cadastrados
    ]
}

export function showDelete(analyze) { //delete do pivo
    nossoDelete(analyze, analyze._id)
    window.location.reload()
    showHistory(analyze)
  
}
export function meuDelete(analyze) { //delete da fazenda

    return [
        //console.log("showDelete", analyze),
        { type: 'FORM_FORMNEW', payload: analyze},
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('analyzeForm', analyze) //inicializar o formulário com dados já cadastrados
    ]
}

export function showHistory(analyze) {
    // buscar o cara que ta logado
    if (analyze._id != undefined)
        id = analyze._id;
    return [
        //console.log('Valor=' + id),
        searchAnalyze(id),
        showTabs('tabHistory'),
        selectTab('tabHistory'),
        { type: 'ID_CHANGED', payload: id }
    ]
}

export function showNew() { //como vou linkar o id do usuário com o id_client ???????
    return [

        showTabs('tabNew'),
        selectTab('tabNew'),
        //initialize('NewAnalyzeForm', id)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        search(),
        initialize('analyzeForm', INITIAL_VALUES) //inicializar o formulário com dados já cadastrados
    ]
}
export function init_2() {
    return [
        showTabs('tabHistory', 'tabCreate'),
        selectTab('tabHistory'),
        search(),
        initialize('analyzeForm', INITIAL_VALUES) //inicializar o formulário com dados já cadastrados
    ]
}
