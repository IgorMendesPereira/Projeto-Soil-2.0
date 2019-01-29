import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {showUpdate,updateLigar,updateDesligar, showDelete, updateReverso, updateAvanco,integrar, init, showNew } from './analyzeAction'


class AnalyzeListHistory extends React.Component {
    on(x)
    {
        this.props.updateLigar(x)
        this.forceUpdate()
    }
    off(x)
    {
        this.props.updateDesligar(x)
        this.forceUpdate()
    }
    go(x)
    {
        this.props.updateAvanco(x)
        this.forceUpdate()
    }
    back(x)
    {
        this.props.updateReverso(x)
        this.forceUpdate()
    }

    renderRows() {
        const listHistory = this.props.listHistory || []

        //console.log("AnalyzeListHistory",listHistory)
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
                <td>
                    <button className='btn btn-success' onClick={() => this.go(x)}>
                    <th>Avanço</th>
                    </button>
                    <button className='btn btn-danger' onClick={() => this.back(x)}>
                    <th>Reverso</th>
                    </button></td>
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
        
        return(
            <div> 
                <table className ='table'>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Identificador Pivô</th>
                            <th>Local</th>
                            <th>Ligado/Desligado</th>
                            <th>Avanço/Reverso</th>
                            <th>Seco/Molhado</th>
                            <th>Liga/Desliga</th>
                            <th>Sentido</th>
                            <th className='table-actions'></th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
                <div className='box-footer' >
                {/*PRECISO VINCULAR NOVA ANÁLISE COM O ID DO CLIENTE*/}
                    <button type='button' className=' btn btn-success' 
                        onClick={this.props.showNew}>Novo Pivô</button>
                    <button type='button' className=' btn btn-default' onClick={this.props.init}>Voltar</button>
                </div>     
            </div>
      
        )
    }
}

const mapStateToProps = state => ({listHistory: state.analyze.listHistory}) //analyze é do reducer global
const mapDispatchToProps = dispatch => bindActionCreators({updateLigar,updateDesligar,updateReverso, showUpdate, showDelete, updateAvanco,integrar, init, showNew}, dispatch) //dispatch dispara a ação pros reducers
export default connect(mapStateToProps, mapDispatchToProps)(AnalyzeListHistory)