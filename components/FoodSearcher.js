import SearchBar from "./SearchBar.js";
import { Consumer } from "../context.js";

class FoodSearcher extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {
            inputValue: "",
            selectedndbno : null
        }
        this.submitToParent = this.submitToParent.bind(this)
    }

    //pass Value of selected option to ./App.js
    //UNUSED (Still good example)
    passToParent = (event) => {
        event.preventDefault();
        this.state.selectedndbno != null ? this.props.triggerUpdate(this.state.selectedndbno) : console.log("valueEmpty")
    }

    //Change Global State Context API
    changeContext = (ndbno, dispatch) => {
        event.preventDefault();
        if (this.state.selectedndbno != null){
            const apiLink = "https://api.nal.usda.gov/ndb/V2/reports?"+"ndbno="+String(ndbno)+"&type=b&format=json&api_key=rAebodHVqSo7XtWRjjcs32d57qAVUYMSwP8muiwK"
            fetch(apiLink)
                .then(response => response.json())
                .then(data => 
                    dispatch({
                        type: 'CHANGE_SELECTION',
                        payload: {
                            ndbno : ndbno,
                            name : data.foods[0].food.desc.name,
                            carbFactor: data.foods[0].food.nutrients[3].value,
                            fatFactor: data.foods[0].food.nutrients[2].value,
                            proteinFactor: data.foods[0].food.nutrients[1].value
                            }
                        })  
                    )

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
            const apiCall = "https://api.nal.usda.gov/ndb/search/?format=json&q="+String(searchValue)+"&sort=r&max=25&offset=0&api_key=rAebodHVqSo7XtWRjjcs32d57qAVUYMSwP8muiwK"
            fetch (apiCall)
            .then(response => response.json())
            .then(data => this.setState({
                info : data
            }))
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
                NUMBER CHOSEN {this.state.selectedndbno}
                <Consumer>
                    { value => {
                        const {dispatch} = value;
                        return (
                            <form onSubmit={this.changeContext.bind(this, this.state.selectedndbno, dispatch)}>
                            {productNames}   
                            <button type="submit">SEND</button>   
                            </form> )
                            }
                        }
                </Consumer>
            </div>   
        )     
    }    
}

export default FoodSearcher