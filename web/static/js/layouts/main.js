import React            from 'react'; 
import Header           from './header';

export default class MainLayout extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;          
  }

  render() {    
    return (
      <div id="authentication_container" className="application-container">
        <Header/>

        <div className='main-container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

