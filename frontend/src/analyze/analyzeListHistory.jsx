import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { showUpdate, showDelete, init, showNew } from './analyzeAction'

class AnalyzeListHistory extends Component {

    renderRows() {
        const listHistory = this.props.listHistory || []

        //console.log("AnalyzeListHistory",listHistory)
        return listHistory.map(x => 
                
            <tr key={x._id}>
                <td>{x.analyzeCreatedAT}</td>
                <td>{x.parameter1}</td>
                <td>{x.parameter2}</td>
                <td>{x.parameter3}</td>
                <td>{x.parameter4}</td>
                <td>{x.parameter5}</td>
                <td>
                    <button className='btn btn-success' onClick={() => this.props.showUpdate(an)}>
                    <th>Ligar</th>
                    </button>
                    <button className='btn btn-danger' onClick={() => this.props.showDelete(an)}>
                    <th>Desligar</th>
                    </button> 
                </td>
                <td>
                    <button className='btn btn-success' onClick={() => this.props.showDelete(an)}>
                    <th>Avanço</th>
                    </button>
                    <button className='btn btn-danger' onClick={() => this.props.showHistory(an)}>
                    <th>Reverso</th>
                    </button></td>
                <td>
        {/* <button className='btn btn-success' onClick={() => this.props.showUpdate(x)}>
                        <th>Configurar</th>
        </button>*/}
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
                            <th>Ligado/Desligado</th>
                            <th>Avanço/Reverço</th>
                            <th>Seco/Molhado</th>
                            <th>P4</th>
                            <th>P5</th>
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
const mapDispatchToProps = dispatch => bindActionCreators({showUpdate, showDelete, init, showNew}, dispatch) //dispatch dispara a ação pros reducers
export default connect(mapStateToProps, mapDispatchToProps)(AnalyzeListHistory)