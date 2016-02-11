var React = require('react');
var ReactDOM = require('react-dom');
require('eventsource-polyfill');

var AdminApp = React.createClass({
	getInitialState: function() {
		console.log('getInitialState(): ' + JSON.stringify(this.props.initIstates));
		return {states: this.props.initIstates};
	}
	,eventSource: new EventSource("/admin_api/event_stream")
	,componentDidMount: function() {
		var me = this;
		this.eventSource.onmessage = function(event) {
			var o = JSON.parse(event.data);
			if (o.event === 'STATES') {
				//console.log('message: ' + JSON.stringify(o.states));
				me.setState({states: o.states});
			}
		};
	}
	,render: function() {
		var workers = this.state.states.workers;
		var queue = this.state.states.queue;
		var outstanding = this.state.states.outstanding;
		var workerRow = (worker, i) => <tr key={i}><td>{(i+1).toString()}</td><td>{worker.id}</td><td>{worker.ready.toString()}</td><td>{worker.busy.toString()}</td></tr>;
		var queryRow = (query, i) => <tr key={i}><td>{query.id}</td><td>{query.queryString}</td></tr>;
		return (
		<div>
			<header className="w3-container w3-teal">
				<h1>Google Place Suggestion Controller Admin</h1>
			</header>
			<div className="w3-container w3-margin-top">
				<div className="w3-card-2">
					<header className="w3-container w3-blue">
					  <h5>Workers</h5>
					</header>
					<table className="w3-table w3-striped">
						<thead>
							<tr>
								<th>#</th>
								<th>Id</th>
								<th>Ready</th>
								<th>Busy</th>
							</tr>
						</thead>
						<tbody>{workers.map(workerRow)}</tbody>
					</table>
				</div>
			</div>

			<div className="w3-container w3-margin-top">
				<div className="w3-card-2">
					<header className="w3-container w3-blue">
					  <h5>Queue</h5>
					</header>
					<table className="w3-table w3-striped">
						<thead>
							<tr>
								<th>Query Id</th>
								<th>Query String</th>
							</tr>
						</thead>
						<tbody>{queue.map(queryRow)}</tbody>
					</table>
				</div>
			</div>
			
			<div className="w3-container w3-margin-top">
				<div className="w3-card-2">
					<header className="w3-container w3-blue">
					  <h5>Outstanding Queries</h5>
					</header>
					<table className="w3-table w3-striped">
						<thead>
							<tr>
								<th>Query Id</th>
								<th>Query String</th>
							</tr>
						</thead>
						<tbody>{outstanding.map(queryRow)}</tbody>
					</table>
				</div>
			</div>
	
		</div>
		);
	}
});

ReactDOM.render(<AdminApp initIstates={__initStates}/>, document.getElementById('content'));