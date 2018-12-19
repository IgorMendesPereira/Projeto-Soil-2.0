import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { search, showUpdate, showDelete, showHistory } from './analyzeAction'

class AnalyzeList extends Component {

    componentWillMount() {
        this.props.search()
    }

    renderRows() {
        const list = this.props.list || []
        return list.map(an => (
             <tr key={an._id}>
             
                <td>{an.name}</td>
                <td>{an.telephone}</td>
                <td>{an.city}</td>
                <td>{an.propertyname}</td>
                <td>
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(an)}>
                    <th>Editar</th>
                    </button>
                    <button className='btn btn-danger' onClick={() => this.props.showDelete(an)}>
                    <th>Excluir</th>
                    </button>
                    <button className='btn btn-success' onClick={() => this.props.showHistory(an)}>
                    <th>Pivôs</th>
                    </button>
                </td>
            </tr>
        ))
    }

    render() {

        return(
            <div>
                <table className ='table'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Cidade</th>
                            <th>Propriedade</th>
                            <th className='table-actions'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({list: state.analyze.list}) //billingCycle é do reducer global
const mapDispatchToProps = dispatch => bindActionCreators({search, showUpdate, showDelete, showHistory}, dispatch) //dispatch dispara a ação pros reducers
export default connect(mapStateToProps, mapDispatchToProps)(AnalyzeList)