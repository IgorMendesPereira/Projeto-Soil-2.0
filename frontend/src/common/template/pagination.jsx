import React, { Component } from 'react'

class Pagination extends Component {
    render() {
        return (
            <div className='box-footer clearfix'>
            <ul className='pagination pagination-sm no-margin pull-right'>
            <li><a href='#'>«</a></li>
            <li><a href='#'>1</a></li>
            <li><a href='#'>2</a></li>
            <li><a href='#'>3</a></li>
            <li><a href='#'>»</a></li>

            </ul>
            </div>
        )
    }
}
export default Pagination