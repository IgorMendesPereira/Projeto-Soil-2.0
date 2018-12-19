import './valueBox.css'
import React from 'react'
import Grid from '../layout/grid'

export default props => (
    <div className='small-box-container'>
        <Grid cols={props.cols}>
            <div className={`small-box bg-${props.color}`}>
                <div className='inner'>
                    <p>{props.text}</p>
                    <h3>{props.value}</h3>

                </div>
                <div className='icon'>
                    <i className={`fa fa-${props.icon}`}></i>
                </div>
            </div>
        </Grid>
    </div>
)