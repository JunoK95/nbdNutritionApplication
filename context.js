import React, {Component} from 'react'
const Context = React.createContext()

const reducer = (state, action) => {
    switch(action.type){
        case 'CHANGE_SELECTION':
            return{
                ndbno : action.payload.ndbno, 
                name : action.payload.name,
                calorie: action.payload.calorie,
                carbFactor: action.payload.carbFactor,
                fatFactor: action.payload.fatFactor,
                proteinFactor: action.payload.proteinFactor,
            }
        default: return state
    }
}

export class Provider extends Component{  
    constructor(){
        super()
        this.state = {
            ndbno : "ndbno",
            name : "name",
            calorie: "calorie",
            carbFactor: "carb",
            fatFactor: "fat",
            proteinFactor: "protein",
            dispatch: action => this.setState(state => reducer(state,action))
        }
        
    }
    
    render(){
        return(
            <Context.Provider value = {this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer