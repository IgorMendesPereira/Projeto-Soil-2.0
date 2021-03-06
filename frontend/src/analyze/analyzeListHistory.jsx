import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { showUpdate, updateLigar, updateStatus, updateDesligar, showDelete, updateReverso, updateAvanco, integrar, init, showNew } from './analyzeAction'
import socketIOClient from "socket.io-client";
import Mapa from './mapa'

class AnalyzeListHistory extends React.Component {

    on(x) {
        this.props.updateLigar(x, this)
    }
    off(x) {
        this.props.updateDesligar(x, this)
    }

    //    abre de novo no force update
    // go(x) {
    //     this.props.updateAvanco(x)
    //     this.forceUpdate()
    // }
    // back(x) {
    //     this.props.updateReverso(x)
    //     this.forceUpdate()
    // }

    componentDidMount() {


        /*
        const socket = socketIOClient("http://127.0.0.1:3003");
        socket.on("status", data => {
            console.log("DEU BAO", data)
            this.forceUpdate()
            // window.location.reload()
        });
        */
    }


    renderRows() {
        const listHistory = this.props.listHistory || []

        return listHistory.map(x =>

            <tr key={x._id}>
                <td>{x.analyzeCreatedAT}</td>
                <td>{x.parameter4}</td>
                <td>{x.parameter5}</td>
                <td>{x.parameter1}</td>
                <td>{x.parameter2}</td>
                <td>{x.parameter3}</td>
                <td>
                    <button className='btn btn-success' onClick={() => this.on(x)}>
                        <th>Ligar</th>
                    </button>
                    <button className='btn btn-danger' onClick={() => this.off(x)}>
                        <th>Desligar</th>
                    </button>
                </td>
                {/* <td>
                    <button className='btn btn-success' onClick={() => this.props.updateAvanco(x)}>
                        <th>Avanço</th>
                    </button>
                    <button className='btn btn-danger' onClick={() => this.props.updateReverso(x)}>
                        <th>Reverso</th>
                    </button>
                </td> */}
                <td>
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(x)}>
                        <th>Editar</th>
                    </button>
                    <button className='btn btn-default' onClick={() => this.props.showDelete(x)}>
                        <th>Excluir</th>
                    </button>
                </td>
            </tr>
        )
    }

    render() {

        return (
            /*
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Identificador Pivô</th>
                            <th>Local</th>
                            <th>Estado do Pivô</th>
                            <th>Avanço/Reverso</th>
                            <th>Seco/Molhado</th>
                            { <th>Liga/Desliga</th> }
                            { <th>Sentido</th> }
                            <th className='table-actions'></th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
                <div className='box-footer' >
                    {PRECISO VINCULAR NOVA ANÁLISE COM O ID DO CLIENTE}
                    <button type='button' className=' btn btn-success'
                        onClick={this.props.showNew}>Novo Pivô</button>
                    <button type='button' className=' btn btn-default' onClick={this.props.init}>Voltar</button>
                </div>
            </div>
            */

            <div>
                <Mapa></Mapa>
            </div>
        )
    }

}

const mapStateToProps = state => ({ listHistory: state.analyze.listHistory }) //analyze é do reducer global
const mapDispatchToProps = dispatch => bindActionCreators({ updateLigar, updateDesligar, updateStatus, updateReverso, showUpdate, showDelete, updateAvanco, integrar, init, showNew }, dispatch) //dispatch dispara a ação pros reducers
export default connect(mapStateToProps, mapDispatchToProps)(AnalyzeListHistory)