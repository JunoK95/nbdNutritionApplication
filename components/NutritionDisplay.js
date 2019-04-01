import {Consumer} from '../context.js'

class NutritionDisplay extends React.Component{
    render(){
        return(
            <Consumer>
                { value => {
                    return(
                        <div className='container'>
                            <div className="card">
                                Current NDBNO {value.ndbno}
                            </div>
                            <div className="card">
                                Current name {value.name}
                            </div>
                            <div className="card">
                                Current kCal {value.calorie}
                            </div>
                            <div className="card">
                                Current CF {value.carbFactor}
                            </div>
                            <div className="card">
                                Current FF {value.fatFactor}
                            </div>
                            <div className="card">
                                Current PF {value.proteinFactor}
                            </div>
                        </div>
                        )
                }}
            </Consumer>
        )
    }
}

export default NutritionDisplay