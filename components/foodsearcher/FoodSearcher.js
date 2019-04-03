import SearchBar from "./SearchBar.js";

import SearchResults from './SearchResults.js';

class FoodSearcher extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {
            info: [],
            inputValue: "",
            selectedndbno : null
        }
        this.submitToParent = this.submitToParent.bind(this)
    }

    //UNUSED (Still good example)
    //pass Value of selected option to ./App.js
    passToParent = (event) => {
        event.preventDefault();
        this.state.selectedndbno != null ? this.props.triggerUpdate(this.state.selectedndbno) : console.log("valueEmpty")
    }

    //UNUSED
    //Change Global State Context API
    changeContext = (ndbno, dispatch) => {
        event.preventDefault();
        if (this.state.selectedndbno != null){
            const apiLink = "https://api.nal.usda.gov/ndb/V2/reports?"+"ndbno="+String(ndbno)+"&type=b&format=json&api_key=rAebodHVqSo7XtWRjjcs32d57qAVUYMSwP8muiwK"
            fetch(apiLink)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    dispatch({
                        type: 'CHANGE_SELECTION',
                        payload: {
                            ndbno : ndbno,
                            name : data.foods[0].food.desc.name,
                            calorie: data.foods[0].food.nutrients[1].value,
                            carbFactor: data.foods[0].food.nutrients[4].value,
                            fatFactor: data.foods[0].food.nutrients[3].value,
                            proteinFactor: data.foods[0].food.nutrients[2].value
                            }
                        })  
                })

        }
        else{
            console.log("no value chosen")
        }
        
    }

    handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({[name]: value})
    }

    /// Get Value from SearchBar Component then fetches api
    submitToParent(searchValue){
        if (searchValue !== ""){
            console.log(searchValue, " from SearchBar received")
            const apiCall = "https://api.nal.usda.gov/ndb/search/?format=json&q="+String(searchValue)+"&sort=r&max=500&offset=0&api_key=rAebodHVqSo7XtWRjjcs32d57qAVUYMSwP8muiwK"
            fetch (apiCall)
            .then(response => response.json())
            .then(data => {
                    console.log(data)
                    this.setState({info : data})
                }
            )
        }
        else {
            console.log("no value received from SearchBar")
        }
    }

    render(){       
        let properties = []
        //workaround for api call before fetch
        try {
            properties =
              this.state.info.list.item
        } catch (exception) {
            console.log("API fetch not yet received")
        }
        const productNames = properties.map(x => 
            <div key={x.ndbno} >
                <button  
                    type ="button"
                    value={x.ndbno} 
                    name="selectedndbno"
                    onClick={this.handleChange}
                >   
                {x.name}
                </button>
                <br />
            </div>)
        return(
            <div>   
                <SearchBar submitToParent={this.submitToParent}/> 
                <SearchResults resultList={this.state.info}/>
            </div>   
        )     
    }    
}

export default FoodSearcher