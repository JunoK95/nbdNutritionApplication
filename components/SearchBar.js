class SearchBar extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            inputValue: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        const name = event.target.name
        const value = event.target.value
        this.setState({[name]: value})
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.submitToParent(this.state.inputValue)
        this.setState({inputValue: ""})
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input name="inputValue" value={this.state.inputValue} placeholder="Search" onChange={this.handleChange}></input>
                <button type="submit">Search</button>
            </form>
        )
    }
}

export default SearchBar