import React            from 'react'; 
import Header           from './header';

export default class MainLayout extends React.Component {  
  render() {    
    return (
      <div id="authenticated_container" className="application-container">
        <Header/>

        <div className='main-container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

