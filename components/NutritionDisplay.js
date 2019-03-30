import {Consumer} from '../context.js'

class NutritionDisplay extends React.Component{
    render(){
        return(
            <Consumer>
                { value => {
                    return(
                        <div className='container'>
                            <h4>
                                Current NDBNO {value.ndbno}
                            </h4>
                            <h4>
                                Current name {value.name}
                            </h4>
                            <h4>
                                Current CF {value.carbFactor}
                            </h4>
                            <h4>
                                Current FF {value.fatFactor}
                            </h4>
                            <h4>
                                Current PF {value.proteinFactor}
                            </h4>
                        </div>
                        )
                }}
            </Consumer>
        )
    }
}

export default NutritionDisplay