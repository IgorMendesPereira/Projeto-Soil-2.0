import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'   //Field é uma tag

import labelAndInput from '../common/form/labelAndInput'
import { init } from './analyzeAction'

class NewAnalyzeForm extends Component {

    componentDidMount() {
        this.props.initialize({ id_client: this.props.id });
      }
      
    render() {
       // console.log("newAnalyzeForm-Id",this.props.id)
        const { handleSubmit, readOnly } = this.props //método do redux-form
         return(
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='parameter1' component={labelAndInput} readOnly={readOnly}
                        label='Parâmetro 1' cols='12 2' placeholder='Valor' />
                    <Field name='parameter2' component={labelAndInput} readOnly={readOnly}
                        label='Parâmetro 2' cols='12 2' placeholder='Valor' />
                    <Field name='parameter3' component={labelAndInput} readOnly={readOnly}
                        label='Parâmetro 3' cols='12 2' placeholder='Valor' />    
                    <Field name='parameter4' component={labelAndInput} readOnly={readOnly}
                        label='Parâmetro 4' cols='12 2' placeholder='Valor' />
                    <Field name='parameter5' component={labelAndInput} readOnly={readOnly}
                        label='Parâmetro 5' cols='12 2' placeholder='Valor' />
                    <Field name='id_client' type="hidden" component={labelAndInput} readOnly={readOnly}
                        cols='0' />
                 </div>  
                    {/* <button className='btn btn-success' onClick={() => this.props.showHistory(an)}>
                <button className='btn btn-success' onClick={() => this.props.showHistory(an)}>
                        <th>Avanço</th>
                        </button>
                    <button className='btn btn-danger' onClick={() => this.props.showHistory(an)}>
                        <th>Reverso</th>
                    </button>      
                    </button>*/}          
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className=' btn btn-default' onClick={this.props.init}>Cancelar</button> {/*Pagina configurar pivo*/}
                </div>
            </form>
        )
    }
}

NewAnalyzeForm = reduxForm({ form: 'NewAnalyzeForm', destroyOnUnmount: false})(NewAnalyzeForm)

const mapStateToProps = state => ({id: state.analyze.id})

const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(NewAnalyzeForm)
//destroyOnUnmount flag do redux-form para não destruir o formulário qdo o componente for remontado