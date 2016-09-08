import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }
//
// export default App;
class SingleBanner extends Component {
  render() {
    return (
      <h3>{this.props.single.name}</h3>
    );
  }
}

class Priority extends Component {
  createItem(candidate, id) {
    return (
        <PriorityItem key={id}>{candidate.name}</PriorityItem>
      );
  }
  render() {
    return <ol>{this.props.single.candidates.map(this.createItem)}</ol>;
  }
}

class PriorityItem extends Component {
  render(){
    return (
      <li>{this.props.children}</li>
    );
  }
}

class PriorityForm extends Component {
  // getInitialState() {
  //   return {item: ''};
  // }
  constructor(props, context) {
    super(props, context)
    this.state = {
      value: '',
      suggestions: []
    };
  }
  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');
    return this.props.candidates.filter(cand => regex.test(cand.name));
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmit(this.state.value);
    this.setState({value: ''});
    document.getElementById('item-'+this.props.name).focus();
    return;
  }
  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  render() {
    const {value, suggestions} = this.state
    const inputProps = {
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange,
      id: 'item-' + this.props.name
    };
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps} />
        <input type='submit' value='Add'/>
      </form>
    );
  }
}

class Single extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      single: props.single
    }
  }
  updateItems(newItem) {
    this.props.single.candidates.push(this.props.candidates.filter((e)=> e.name == newItem)[0])
    this.setState({
      single: this.props.single
    });
  }
  render() {
    return (
      <div className='single'>
        <SingleBanner single={this.props.single}/>
        <Priority single={this.props.single}/>
        <PriorityForm onFormSubmit={(e) => this.updateItems(e)} candidates={this.props.candidates} name={this.props.single.name}/>
      </div>
    );
  }
}

export default Single;
