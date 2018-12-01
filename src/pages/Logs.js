import React from 'react';

class Logs extends React.Component {
    componentDidMount() {
        this.refresh();
    }

    async refresh() {
        const logs = await fetch('/actuator/logfile');
        document.getElementById('logs').value = await logs.text();
    }

    render() {
        return (
            <div>
                <button className="btn" onClick={this.refresh}>Refresh</button>
                <legend>Logs</legend>
                <textarea id="logs" className="form-control" rows="64"></textarea>
            </div>
        );
    };
}

export default Logs;
