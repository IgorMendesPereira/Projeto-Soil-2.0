import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'   //Field é uma tag

import labelAndInput from '../common/form/labelAndInput'
import { init } from './analyzeAction'
import ItemList from './itemList'

class AnalyzeForm extends Component {
    

    render() {
        const { handleSubmit, readOnly} = this.props //método do redux-form
        return(
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    
                    <Field name='name' component={labelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='Informe o nome' />
                    <Field name='telephone' component={labelAndInput}readOnly={readOnly}
                        label='Telefone' cols='12 4' placeholder='Informe o telefone' />
                    <Field name='city' component={labelAndInput} readOnly={readOnly}
                        label='Cidade' cols='12 4' placeholder='Informe a cidade' />
                    <Field name='propertyname' component={labelAndInput}readOnly={readOnly}
                        label='Propriedade' cols='12 4' placeholder='Informe o nome da propriedade' />
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className=' btn btn-default' onClick={this.props.init}>Cancel</button>
                </div>
            </form>
        )
    }
}

AnalyzeForm = reduxForm({ form: 'analyzeForm', destroyOnUnmount: false})(AnalyzeForm)

const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(null, mapDispatchToProps)(AnalyzeForm)
//destroyOnUnmount flag do redux-form para não destruir o formulário qdo o componente for remontado