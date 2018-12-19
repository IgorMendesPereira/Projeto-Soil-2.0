import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { changeName, search, clear } from './analyzeAction'

import labelAndInput from '../common/form/labelAndInput'
import Grid from '../common/layout/grid'

class SearchName extends Component {

    render() {
        const { search, searchingName, changeName, clear } = this.props
        return (
             <div role='form' className='analyzeForm' >
                <Grid cols='12 9 10'>
                   
                    <input id='searchingName' className='form-control'
                        placeholder='Pesquisar nome..'
                        onChange={this.props.changeName} // método criado na action(todoAction.js)
                        value={this.props.searchingName}>
                    </input>
                </Grid>

                <Grid cols='12 3 2'>
                    <button className='btn btn-info' onClick={search}>
                        <i className='fa fa-search'></i>
                    </button>
                    <button className='btn btn-default' onClick={this.props.clear}>
                        <i className='fa fa-close'></i>
                    </button>
                </Grid>
            </div>

        )
    }
}

const mapStateToProps = state => ({ searchingName: state.analyze.searchingName })
const mapDispatchToProps = dispatch => 
    bindActionCreators ({ changeName, search, clear }, dispatch)     //dispara a ação e passa as ações para todos os reducers
export default connect(mapStateToProps, mapDispatchToProps)(SearchName)

