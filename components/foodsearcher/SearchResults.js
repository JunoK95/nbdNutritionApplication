import React, { Component } from 'react'
import { Consumer } from "../../context.js";
import { TitleCase , DeleteStringSection } from '../../helpers.js'

class SearchResults extends Component{

    constructor(){
        super()
        this.state = {
            selectedndbno: null
        }
    
    }

    handleChange = (event) => {
        const name = event.target.getAttribute('name')
        const value = event.target.getAttribute('value')
        this.setState({[name]: value})
    }

    //Change Global State Context API
    changeContext = (dispatch) => {
        event.preventDefault();
        const value = event.target.getAttribute('value')
        this.setState({selectedndbno: value})
        console.log(event.target)
        if (value != null){
            const apiLink = "https://api.nal.usda.gov/ndb/V2/reports?"+"ndbno="+String(value)+"&type=b&format=json&api_key=rAebodHVqSo7XtWRjjcs32d57qAVUYMSwP8muiwK"
            fetch(apiLink)
                .then(response => response.json())
                .then(data => {
                    console.log(data) 
                    const calNut = data.foods[0].food.nutrients.filter(x => x.nutrient_id == "208")
                    const carbNut = data.foods[0].food.nutrients.filter(x => x.nutrient_id == "205")
                    const fatNut = data.foods[0].food.nutrients.filter(x => x.nutrient_id == "204")
                    const proNut = data.foods[0].food.nutrients.filter(x => x.nutrient_id == "203")  
                    dispatch({
                        type: 'CHANGE_SELECTION',
                        payload: {
                            ndbno : value,
                            name : data.foods[0].food.desc.name,
                            calorie: calNut[0].value + calNut[0].unit,
                            carbFactor: carbNut[0].value + carbNut[0].unit,
                            fatFactor: fatNut[0].value + fatNut[0].unit,
                            proteinFactor: proNut[0].value + proNut[0].unit
                            }
                        })  
                })

        }
        else{
            console.log("no value chosen")
        }
        
    }

    render(){
        let results = []
        try {
            results =
              this.props.resultList.list.item
        } catch (exception) {
            console.log("Search Results not received")
        }

        const tableContents = results.map(item => {
            return(
                <tr key={item.ndbno} className="success">
                    <td value={item.ndbno} name="selectedndbno" onClick={this.handleChange} style={{cursor: 'pointer'}}>
                        {DeleteStringSection(TitleCase(item.name))}
                    </td>
                </tr>
            )
        })

        return(
            <div>
                <Consumer>
                    { value => {
                        const {dispatch} = value;
                        return (
                            <div className="container">
                                NUMBER CHOSEN = {this.state.selectedndbno}
                                <br />
                                <table className="table table-striped">
                                    <thead></thead>
                                    <tbody>
                                        {
                                            results.map(item => {
                                                return(
                                                    <tr key={item.ndbno} className="success">
                                                        <td value={item.ndbno} name="selectedndbno" onClick={this.changeContext.bind(this,dispatch)} style={{cursor: 'pointer'}}>
                                                            {DeleteStringSection(TitleCase(item.name))}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )}
                    }
                </Consumer>
            </div>
        )
    }
}

export default SearchResults