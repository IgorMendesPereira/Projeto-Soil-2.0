import React, { Component } from 'react'
import { connect } from 'react-redux'

import AnalyzeForm from '../../analyze/analyzeForm'
import NewAnalyzeForm from '../../analyze/newAnalyzeForm'

class Form extends Component {
    render() {
        const form_formnew = this.props.form_formnew
        //console.log("ifdu:", form_formnew)

        if (form_formnew === undefined) {
            return <AnalyzeForm {...this.props}/>
        } else {
            return <NewAnalyzeForm {...this.props}/>
        }
    }
}


// form_formnew ? <AnalyzeForm /> : <NewAnalyzeForm />
// return form_formnew

const mapStateToProps = state => ({form_formnew: state.analyze.form_formnew})

export default connect(mapStateToProps, null)(Form)