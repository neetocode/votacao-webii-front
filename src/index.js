import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
// import registerServiceWorker from './registerServiceWorker';
import Inicio from './components/Inicio';
import AcessarVotacao from './components/AcessarVotacao';
import NovaVotacao from './components/NovaVotacao';
import Votacao from './components/Votacao';
import 'semantic-ui-css/semantic.min.css';

class App extends React.Component{

    render(){

        return(
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Inicio} />
                        <Route exact path='/nova' component={NovaVotacao} />
                        <Route exact path='/acessar' component={AcessarVotacao} />
                        <Route exact path='/votacao/:id' component={Votacao} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }

}

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();