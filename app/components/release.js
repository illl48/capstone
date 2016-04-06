import React, { Component } from 'react';

import { connect } from 'react-redux';
import C from '../constants';
import { routeActions } from 'react-router-redux';
import { Link } from 'react-router';
import { Button, Panel, Glyphicon } from 'react-bootstrap';
import actions from '../actions';

import DiscogsMarketplace from './discogsMarketplace';

class Release extends Component {
    /*
    submitQuery(page) {
        let data = {};
        data.page =  this.props.search.page + page;
        data.recordQuery = this.props.query.queryHistory[this.props.query.queryHistory.length-1];
        this.props.startLoading();
        this.props.submitNewRecord(data);
    }
    */
    searchDiscogsMarketplace(){
        this.props.toggleDiscogsMarketplace(); 
        this.props.searchDiscogsMarketPlace();
    }
    
    renderRelease(){
        const r = this.props.release.release;
        const p = this.props.suggestPrice.suggestPrice;
        
        if(!r){
            return '';    
        }
        
        let format_descriptions = '';
        for(let i=0; i<r.formats[0].descriptions.length; i++){
            format_descriptions = format_descriptions.concat(', ').concat(r.formats[0].descriptions[i]);
        }
        
        let trackLi = [];
        trackLi = r.tracklist.map((track) =>{
                return (
                    <li className="track">
                    {track.position+' '+track.title}
                    </li>
                );
            });
        
        
        return (
            <div className="releaseWrapper">
                <section className="releaseInfoWrapper">
                    <img src={r.thumb} alt={r.title} />
                    <ul>
                        <li> {'Label: ' +r.labels[0].name+' - '+r.labels[0].catno } </li>
                        <li> {'Format: ' +r.formats[0].name+ format_descriptions } </li>
                        <li> {'Country: ' +r.country } </li>
                        <li> {'Released: ' +r.released_formatted} </li>
                        <li> {'Genre: ' +r.genres[0]} </li>
                        <li> {'Rating: ' +r.community.rating.average+' / 5'} </li>
                    </ul>
                    <Glyphicon glyph="heart" />
                </section>
            
                <section className="releaseTracklistWrapper">
                    <h5> PRICE SUGGESTIONS </h5>
                    <ul>
                        {p.hasOwnProperty("Mint (M)")?
    <li className="track"> {'Mint (M): '+Math.floor(p['Mint (M)'].value)+' '+p['Mint (M)'].currency} </li>
                        :''}
                        {p.hasOwnProperty('Near Mint (NM or M-)')?
    <li className="track"> {'Near Mint (NM or M-): '+Math.floor(p['Near Mint (NM or M-)'].value)+' '+p['Near Mint (NM or M-)'].currency} </li>
                        :''}
                        {p.hasOwnProperty('Very Good Plus (VG+)')?
    <li className="track"> {'Very Good Plus (VG+): '+Math.floor(p['Very Good Plus (VG+)'].value)+' '+p['Very Good Plus (VG+)'].currency} </li>
                        :''}
                        {p.hasOwnProperty('Very Good (VG)')?
    <li className="track"> {'Very Good (VG): '+Math.floor(p['Very Good (VG)'].value)+' '+p['Very Good (VG)'].currency} </li>
                        :''}
                        {p.hasOwnProperty('Good Plus (G+)')?
    <li className="track"> {'Good Plus (G+): '+Math.floor(p['Good Plus (G+)'].value)+' '+p['Good Plus (G+)'].currency} </li>
                        :''}
                        {p.hasOwnProperty('Good (G)')?
    <li className="track"> {'Good (G): '+Math.floor(p['Good (G)'].value)+' '+p['Good (G)'].currency} </li>
                        :''}
                        {p.hasOwnProperty('Fair (F)')?
    <li className="track"> {'Fair (F): '+Math.floor(p['Fair (F)'].value)+' '+p['Fair (F)'].currency} </li>
                        :''}
                        {p.hasOwnProperty('Poor (P)')?
    <li className="track"> {'Poor (P): '+Math.floor(p['Poor (P)'].value)+' '+p['Poor (P)'].currency} </li>
                        :''}
                    </ul>
                </section>
                
                <section className="releaseTracklistWrapper">
                    <h5> Discogs Marketplace </h5>
                    <Button onClick={ this.searchDiscogsMarketplace.bind(this) }>
                      click
                    </Button>
                    <Panel collapsible expanded={this.props.ui.showDiscogsMarketplace}>
                        QQQQ
                        <DiscogsMarketplace />
                    </Panel>
                </section>    
                    
                <section className="releaseTracklistWrapper">
                    <h5> TRACKLIST </h5>
                    <ul>
                        {trackLi}
                    </ul>
                </section>
            </div>
        );
    }
    
    render() {
        const r = this.props.release;
        const h4style={color:'#FDD24F'};
		return (
            <div>
                <header className="releasesHeader">
                    <Link to="/releases" className="link"><Glyphicon glyph="circle-arrow-left" /></Link> 
                    <h4 style={h4style}>{r.chosen_title}</h4>
                </header>
                
                {this.renderRelease()}
            </div>
		);
	}
}

const mapStateToProps = (appState) => {
	return { 
        release: appState.release,
        suggestPrice: appState.suggestPrice,
        ui: appState.ui
    };
};

const mapDispatchToProps = (dispatch) => {
	return {
        goSomewhere(url) { dispatch(routeActions.push(url)); },
        submitNewRecord(data) { dispatch(actions.submitNewRecord(data)); },
        startLoading(){ dispatch(actions.startLoading()); },
        toggleDiscogsMarketplace(){ dispatch(actions.toggleDiscogsMarketplace()); },
        searchDiscogsMarketPlace(){ dispatch(actions.searchDiscogsMarketPlace()); }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Release);
