/*jshint esversion: 6 */

import React from 'react';
import {render} from 'react-dom';


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="index">
                <div className="row">
                    <div className="col-md-12">
                        <h1>hello</h1>
                    </div>
                </div>
            </div>
        );
    }
}

render(<Index />, document.getElementById('app'));