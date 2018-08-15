import React, { Component } from 'react';
import firebaseApp from './firebase';

class App extends Component {
  constructor(props){
    super(props);
    
    this.carregaContatos = this.carregaContatos.bind(this);
    this.enviaContato = this.enviaContato.bind(this);
    
    this.state = {
      user: '',
      titulo: 'React and Firebase',
      msg: '',
      contatos: [{id:'fadsklfjalsdkjfak', nome: 'Adel', email: 'adel@gmail.com', telefone: '11988665544'}]
      // contatos: []
      
    }
    
  }
  
  componentWillMount() {
    console.log('componentWillMount', this.state.contatos);
    const cContatos = this.carregaContatos();
    cContatos.then(result => {
      this.setState({
        contatos: result,
        msg: 'Carregado com sucesso..mas nao renderizou pq essa porra?'
      })
    })
  }
  
  // componentDidMount() {
  //   console.log('componentDidMount', this.state.contatos);
  //   this.cContatos = this.carregaContatos()
  //   .then(contatos => {
  //     this.cContatos = null;
  //     this.setState({
  //       contatos,
  //       msg: 'Carregado com sucesso'
  //     })
  //   })
  //   // console.log(cContatos);
  //   console.log('Fim componentDidMount', this.state.contatos);
  
  // }
  // static getDerivedStateFromProps(props, state) {
  //   const cContatos = this.carregaContatos();
  //   cContatos.then(result => {
  //     this.setState({
  //       contatos: result,
  //       msg: 'Carregado com sucesso'
  //     })
  //   })
    
  //   return state
  // }
  
  carregaContatos = async () => {
    const email = 'adelblande@gmail.com';
    const pass = 'adel2323';
    const fb = await firebaseApp.auth().signInWithEmailAndPassword(email, pass);
    console.log('await 1');
    try {
      if(fb.user.uid !== undefined){
        const contatosRef = await firebaseApp.database().ref().child('contatos');
        console.log('await 2');
        var arrayContatos = [];
        contatosRef.on('value', snap => {
          snap.forEach((item) => {
            arrayContatos.push({id: item.key, nome: item.val().nome, email: item.val().email, telefone: item.val().telefone});
          })
        })
        return arrayContatos;
      }
    } catch (error) {
      return error;
    }
  }



  enviaContato = () => {
    firebaseApp.database().ref().child('contatos').push({nome: 'Jerez', email: 'jerez@gmail.com', telefone: '11977445544'});
  }

  render = () => {
    console.log('render', this.state.contatos);
    
    return (
      <div>
        <h1>{this.state.msg}</h1>
        <h1>{this.state.titulo}</h1>
        <ul>
          {
            this.state.contatos.map(contato => {
              return <li key={contato.id}>{ contato.nome } | { contato.email } | { contato.telefone }</li>
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;
