import React from 'react'
import axios from 'axios'
import { Container, Form, Button, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { api } from './../constantes'

const conceitos = {
    massa: 'massa',
    legal: 'legal',
    tentandoEntender: 'tentandoEntender',
    puts: 'puts'
}
class Votacao extends React.Component {
    state = {
        votacao: null,

        loading: false,
        error: null,
        votacaoOk: false
    }

    componentDidMount() {
        try {
            const { state } = this.props.location;
            if (state) {
                if (state.votacao)
                    this.setState({ votacao: state.votacao });
            } else {
                const { match } = this.props;
                axios.get(`${api}votacao/${match.params.id}`)
                    .then(r => {
                        r = r.data;
                        if (r) {
                            this.setState({ votacao: r });
                        } else {
                            this.props.history.replace('/acessar')
                        }
                    });

            }
        } catch (ex) {
            this.props.history.replace('/acessar')

        }
    }

    votar(conceito) {
        const { votacao, loading } = this.state;
        if (loading) return;
        this.setState({ loading: true });
        axios.post(`${api}votacao/${votacao._id}/votar`, { votacaoId: votacao._id, conceito: conceito })
            .then(r => {
                r = r.data;
                if (r.r) {
                    this.setState({ votacaoOk: true, loading: false });
                } else {
                    this.setState({ error: r.error, loading: false });
                }
            })
    }

    render() {
        const { votacao, loading, votacaoOk } = this.state;
        return (
            <div>
                {votacao ?
                    <Container>
                        <h1 className='text-center'>Votação {votacao.nome}</h1>
                        <small>{votacao.votos.length} votos.</small>
                        {votacaoOk ?
                            <div>
                                <h1 className='text-center'>Seu voto foi computado!</h1>

                                <Link to='/'>
                                    <Button>Ok</Button>
                                </Link>
                            </div>
                            :
                            loading ?
                                <Loader active={true} content='Buscando votacoes' />
                                :
                                <div>
                                    <div className='conceitos'>
                                        <div className='conceito' onClick={() => this.votar(conceitos.massa)} disabled={loading}>Massa</div>
                                        <div className='conceito' onClick={() => this.votar(conceitos.legal)} disabled={loading}>Legal</div>

                                        <div className='conceito' onClick={() => this.votar(conceitos.tentandoEntender)} disabled={loading}>Tentando entender</div>
                                        <div className='conceito' onClick={() => this.votar(conceitos.puts)} disabled={loading}>Puts</div>
                                    </div>

                                    <div>
                                        <Link to='/'>
                                            <Button>Início</Button>
                                        </Link>
                                    </div>
                                </div>

                        }


                    </Container>
                    :
                    <Loader active={true} content='Buscando votação...' />
                }
            </div>
        )
    }


}


export default Votacao;