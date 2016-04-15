import C from '../constants';

const searchActions = {
    
    getHistoryFromIdb(queries){
        return (dispatch, getState) => {
            console.log(queries);
            console.log('QQQQQQQQQQQQQQQQQQ');
            dispatch({
                type: "HISTORY_QUERY_FROM_IDB_ADDED",
                queryHistory: queries
            }); 
        };    
    },
    
	submitNewRecord(data) {
		return (dispatch, getState) => {
            console.log(data);
            
            let page = 1;
            
            if(data.hasOwnProperty("page")){
                page = data.page;
            }
            else{
                dispatch({
                    type: "QUERY_ADDED",
                    query: data.recordQuery,
                    timestamp: new Date().getTime()
				});              
            }
            
            fetch('https://edwardlai3582.com/discogs?query='+data.recordQuery+'&page='+page).then(function(response){
                if(response.ok) {
                    console.log('statusText is '+response.statusText);
                    response.json().then(function(myJson) {
                        console.log(myJson);                  
                        
                        dispatch({
				            type: "SEARCH_RESULTS_RECEIVED",
				            page: myJson.pagination.page,
                            pages: myJson.pagination.pages,
                            results: myJson.results
				        });
                        dispatch({ type: "LOADING_END" });
                    });
                } else {
                    console.log('Network response was not ok.');
                    dispatch({ type: "LOADING_END" });
                }

            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                dispatch({ type: "LOADING_END" });
            });
        };
	}
};

export default searchActions;
