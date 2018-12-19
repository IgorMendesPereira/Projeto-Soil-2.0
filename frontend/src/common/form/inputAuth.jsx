import React from 'react'
import If from '../operator/if'

export default props => (
    <If test={!props.hide}>
        <div className="form-group has-feedback">
            <input {...props.input}
                className='form-control'
                placeholder={props.placeholder}
                readOnly={props.readOnly}
                type={props.type} />
            <span  className={`glyphicon glyphicon-${props.icon}
                form-control-feedback`}></span>
            {/* <button type="button" id="show_password" 
                name="show_password" className={`glyphicon glyphicon-${props.iconButton} form-control-feedback`} 
                aria-hidden="true"></button> */}
        </div>
    </If>
)