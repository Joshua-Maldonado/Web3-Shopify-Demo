import verify from '../api/verify'
import React from 'react'
import PostVerify from './PostVerify'






class VerifyAccout extends React.Component {
  
    constructor(props) {
      super(props)
      this.state = this.initialState()
      
      
    }
    initialState() {
      return {
        account: this.props.account,
        
      }
    }
    componentDidMount() {
        
          
   
    }
  
    render() {
      return (
        <div>
        <PostVerify address={this.props.account} approve={this.props.approve} deny={this.props.deny}></PostVerify> 
        <div id="valid-state"></div>
        </div>
      )
    }
  }
  
  export default VerifyAccout








