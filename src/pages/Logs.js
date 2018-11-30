import React from 'react';
import {sendRequest} from '../Util';
class Logs extends React.Component {
    componentDidMount() {
        this.refresh();
    }

    async refresh() {
        const logs = ""
        document.getElementById('logs').value = logs;
    }

    render() {
        return (
            <div>
                <button onClick={this.refresh}>Refresh</button>
                <legend>Logs</legend>
                <textarea id="logs" className="form-control" rows="64"></textarea>
            </div>
        );
    };
}

export default Logs;
