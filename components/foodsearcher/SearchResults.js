import React, { Component } from 'react'
import { Consumer } from "../../context.js";
import { TitleCase , DeleteStringSection } from '../../helpers.js'

class SearchResults extends Component{

    constructor(){
        super()
        this.state = {
            selectedndbno: null,
            page : 1
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

        let tableContents = results.slice(25 * (this.state.page - 1), 25 * this.state.page)
        const maxPages = Math.floor(results.length/25);
        let pageButtons = [maxPages]

        for (let i = 0; i < maxPages; i++){
            pageButtons[i] = <button key={i} className="btn btn-secondary btn-sm" name="page" value={i+1} onClick={this.handleChange}>{i+1}</button>
        }

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
                                            tableContents.map(item => {
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
                                {pageButtons != 0 ? pageButtons : null}
                            </div>
                        )}
                    }
                </Consumer>
            </div>
        )
    }
}

export default SearchResults