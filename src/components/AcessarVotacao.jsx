import React from 'react'
import axios from 'axios'
import { Container, Form, Button, Loader, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { api } from './../constantes'



class AcessarVotacao extends React.Component {
    state = {
        codigo: '',
        votacoes: null,

        encontrado: false,
        buscado: false
    }

    componentDidMount() {
        axios.get(`${api}votacao`)
            .then(r => {
                r = r.data;
                this.setState({ votacoes: r });
            })
    }

    submitForm(ev) {
        ev.preventDefault();

        const { codigo } = this.state;
        this.setState({ buscado: false, encontrado: false });
        axios.get(`${api}votacao/codigo/${codigo}`)
            .then(r => {
                r = r.data;
                console.log(r);
                if (r) {
                    this.setState({ buscado: true, encontrado: true });
                    this.props.history.push('/votacao/' + codigo, { votacao: r });

                } else {
                    this.setState({ buscado: true, encontrado: false });

                }
            });
    }

    goToVotacao(votacao) {
        const { push } = this.props.history;
        debugger
        push(`/votacao/${votacao._id}`, { votacao });
    }

    render() {
        const { buscado, encontrado, codigo, votacoes } = this.state;

        return (
            <div>
                {/* <h1>Acessar Votacao</h1> */}


                <Container>
                    {buscado && !encontrado ?
                        <h4>Votação não encontrada</h4> : null
                    }
                    {/* <Form onSubmit={this.submitForm.bind(this)}>
                        <Form.Field>
                            <label>Código da votacao</label>
                            <input placeholder='Código' value={codigo} onChange={({ target: { value } }) => this.setState({ codigo: value })} required />
                        </Form.Field>
                        <Button type='submit'>Acessar</Button>
                        <Link to='/'>
                            <Button>Voltar</Button>
                        </Link>
                    </Form> */}

                    <h2>Votações</h2>

                    {votacoes == null ?
                        <Loader active={true} content='Buscando votacoes' />
                        :
                        <div>
                            {votacoes.length == 0 ?
                                <p className='text-center'>Nenhuma votação encontrada</p>
                                :
                                <List>
                                    {votacoes.map(votacao => (
                                        <List.Item key={votacao._id}>
                                            <List.Content>
                                                <List.Header>{votacao.titulo}</List.Header>
                                                <p>{votacao.descricao}</p>
                                                <Button onClick={() => this.goToVotacao(votacao)}>Acessar</Button>
                                            </List.Content>
                                        </List.Item>
                                    ))}
                                </List>

                            }
                        </div>
                    }
                </Container>

            </div>
        )
    }


}


export default AcessarVotacao;