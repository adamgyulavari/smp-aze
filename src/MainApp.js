import React, { Component } from 'react';
import './App.css';
import Single from './App';
import {Person, engageEveryone} from './Person';

class MainApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      students: [],
      sponsors: []
    };
  }
  addSingle(single) {
    if(single.student) {
      this.setState({students: this.state.students.concat([new Person(single.name)])});
    } else {
      this.setState({sponsors: this.state.sponsors.concat([new Person(single.name)])});
    }
  }
  render() {
    return (
      <div>
        <Adder onAdd={(e) => this.addSingle(e)} />
        <Runner singles={this.state.students} />
        <Singles singles={this.state.students} candidates={this.state.sponsors} title="students" />
        <Singles singles={this.state.sponsors} candidates={this.state.students} title="sponsors" />
      </div>
    );
  }
}

class Runner extends Component {
  engageEveryone() {
    var res = engageEveryone(this.props.singles);
    console.log(res)
    document.getElementById('marriages').innerHTML = res;
  }
  render() {
    return (
      <div className='result'>
        <h4>marriages</h4>
        <div id='marriages'></div>
        <button onClick={() => this.engageEveryone()} >MARRY EVERYBODY</button>
      </div>
    )
  }
}

class Adder extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {name: '', student: false};
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onAdd(this.state);
    this.setState({name: '', student: false});
    this.refs.studentname.focus();
    return;
  }
  onChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  onStudentChanged(e) {
    this.setState({
      student: e.currentTarget.value === 'student'
    });
  }
  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <input type='text' ref='studentname' onChange={(e) => this.onChange(e)} value={this.state.name}/>
        <input type='radio' name='student' value='student' checked={this.state.student} onChange={(e) => this.onStudentChanged(e)} />Student
        <input type='radio' name='student' value='sponsor' checked={!this.state.student} onChange={(e) => this.onStudentChanged(e)} />Sponsor
        <input type='submit' value='Add'/>
      </form>
    );
  }
}

class Singles extends Component {
  createSingle(single, index) {
    return (
      <Single single={single} key={index} candidates={this.props.candidates} />
    );
  }

  render() {
    return (
      <div className='singles'>
        <h4>{this.props.title}</h4>
        {this.props.singles.map((e, index) => this.createSingle(e, index))}
      </div>
    );
  }
}

export default MainApp;
