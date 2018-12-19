import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Tabs from '../common/tab/tabs'
import TabsHeader from '../common/tab/tabsHeader'
import TabsContent from '../common/tab/tabsContent'
import TabHeader from '../common/tab/tabHeader'
import TabHContent from '../common/tab/tabContent'
import { init, create, update, remove, showHistory } from './analyzeAction'

import List from './analyzeList'
import SearchName from './search'

import ListHistory from './analyzeListHistory'
import Form from '../common/operator/ifdu'
import AnalyzeForm from './analyzeForm'
import NewAnalyzeForm from './newAnalyzeForm'

import Class from './class'
import Pagination from '../common/template/pagination'

import id_user_logado from './_variavel'

class Analyze extends Component {

    componentWillMount() {
        this.props.init()
    }

    render() {
        return (
            <div>
                <ContentHeader tittle='Soil' small='1.0' />
                <Content>
                    <Tabs>
                        <TabsHeader>
                            <TabHeader label='Listar' icon='bars' target='tabList' />
                            <TabHeader label='Cadastrar' icon='plus' target='tabCreate' />
                            <TabHeader label='Configurações' icon='pencil' target='tabUpdate' />
                            <TabHeader label='Excluir' icon='trash-o' target='tabDelete' />
                            <TabHeader label='Histórico' icon='history' target='tabHistory' />
                            <TabHeader label='Novo Pivô' icon='bolt' target='tabNew' />
                        </TabsHeader>
                        <TabsContent>
                            <TabHContent id='tabList'>
                               <SearchName />
                                <List />
                                <Pagination/>
                            </TabHContent>
                            <TabHContent id='tabCreate'> 
                                <AnalyzeForm onSubmit={this.props.create}
                                    submitLabel='Cadastrar' submitClass='info'/> 
                            </TabHContent>
                            <TabHContent id='tabUpdate'>
                                <Form onSubmit={this.props.showHistory}
                                    submitLabel='Pronto' submitClass='info' />
                            </TabHContent>
                            <TabHContent id='tabDelete'>
                                <Form onSubmit={this.props.remove} readOnly={true}
                                submitLabel='Excluuuir' submitClass='danger'/>
                            </TabHContent>
                            <TabHContent id='tabHistory'>
                                <ListHistory />
                            </TabHContent>
                            <TabHContent id='tabNew'>
                                <Class />
                                <NewAnalyzeForm onSubmit={this.props.create}
                                    submitLabel='Cadastrar' submitClass='primary' /> 
                            </TabHContent>
                        </TabsContent>
                    </Tabs>
                </Content>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({init, create, update, remove, showHistory}, dispatch)
export default connect(null, mapDispatchToProps)(Analyze)
