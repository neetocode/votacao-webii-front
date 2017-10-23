import React from 'react'
import axios from 'axios'
import { Container, Form, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { api } from './../constantes'

class NovaVotacao extends React.Component {
	state = {
		nome: '',
		senha: '',

		codigo: null
	}

	submitForm(ev) {
		ev.preventDefault();

		const { nome, senha } = this.state;
		axios.post(`${api}votacao`, { nome, senha })
			.then(r => {
				r = r.data;
				console.log(r);
				if (r.r) {
					this.setState({ codigo: r.data })
				}else{
					console.log(r.error);
				}
			});

	}

	render() {
		const { codigo, nome, senha } = this.state;

		return (
			<div>
				<h1>Nova Votacao</h1>
				{codigo == null ?

					<Container>
						<Form onSubmit={this.submitForm.bind(this)}>
							<Form.Field>
								<label>Nome da votacao</label>
								<input placeholder='Nome' value={nome} onChange={({ target: { value } }) => this.setState({ nome: value })} required />
							</Form.Field>
							<Form.Field>
								<label>Senha de ADM</label>
								<input placeholder='Senha' value={senha} onChange={({ target: { value } }) => this.setState({ senha: value })} required />
							</Form.Field>

							<Button type='submit'>Criar</Button>
							<Link to='/'>
								<Button>Voltar</Button>
							</Link>



						</Form>
					</Container>
					:
					<div>
						<h1 style={{ textAlign: 'center' }}>O código do seu chat é {codigo}</h1>
						<Link to='/'>
							<Button>Início</Button>
						</Link>
					</div>
				}
			</div>
		)
	}


}


export default NovaVotacao;