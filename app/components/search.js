import React, { Component } from 'react';

import { connect } from 'react-redux';
import C from '../constants';
import { reduxForm } from 'redux-form';
import actions from '../actions';
import { Button, Input } from 'react-bootstrap';

import History from './history';

class Search extends Component {
    constructor() {
		super();
	} 

    submitQuery(data) {
        this.props.startLoading();
        this.props.submitNewRecord(data);
        this.props.changePage('releases');
        //this.props.resetForm();
    }
    
	render() {
        const { fields: { recordQuery }, handleSubmit } = this.props;
        
		return (
			<div>
                <form className="eventformForm" onSubmit={handleSubmit(this.submitQuery.bind(this))}>
            
                    <label htmlFor="recordQuery"> 
                        <div className="labelTitle">Query</div>
                        <div className="labelInput">
                            <Input type="text" id="recordQuery" placeholder="enter record Query" {...recordQuery} autoFocus />
                        </div>    
                    </label>         

                    {recordQuery.touched && recordQuery.error && <div className="signupAlert">{recordQuery.error}</div>}
                    
                    <Button type="submit">Submit</Button>
                </form>
                
                <History />         
			</div>
            
		);
	}
}

const validate = values => {
    const errors = {};

    if (!values.recordQuery) {
        //errors.recordQuery = 'Required field';
    }

    return errors;
};

const mapStateToProps = (appState) => {
	return { };
};

const mapDispatchToProps = (dispatch) => {
	return {
        submitNewRecord(data) { dispatch(actions.submitNewRecord(data)); },
        startLoading(){ dispatch(actions.startLoading()); },
        changePage(page) { dispatch(actions.changePage(page)); }
	};
};


Search = reduxForm({
    form: 'eventform',
    fields: ['recordQuery'],
    validate
}, mapStateToProps, mapDispatchToProps)(Search);

export default Search;
