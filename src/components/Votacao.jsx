import React from 'react'
import axios from 'axios'
import { Container, Form, Button, Loader, Rating } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { api } from './../constantes'

class Votacao extends React.Component {
    state = {
        votacao: null,

        perguntas: [],
        loading: true,
        error: null,
        votacaoOk: false
    }

    componentDidMount() {
        const { state } = this.props.location;
        debugger;
        if (state) {
            if (state.votacao) {
                this.setState({ votacao: state.votacao });
                return this.getPerguntas(state.votacao._id);
            }
        }

        this.props.history.replace('/acessar')
    }

    getPerguntas(votacaoId) {

        this.setState({ loading: true });
        axios.get(`${api}votacao/${votacaoId}/perguntas`)
            .then(r => {
                this.setState({ perguntas: r, loading: false })
            })
    }

    votar(conceito) {
        const { votacao, loading, rating } = this.state;
        if (loading) return;
        this.setState({ loading: true });
        axios.post(`${api}votacao/${votacao._id}/votar`, { votacaoId: votacao._id, valor: rating })
            .then(r => {
                r = r.data;
                if (r.r) {
                    this.setState({ votacaoOk: true, loading: false });
                } else {
                    this.setState({ error: r.error, loading: false });
                }
            })
    }

    handleRate(e, { rating, maxRating }) {
        this.setState({ rating });
    }

    renderVotoComputado() {
        return (
            <div>
                <h1>Voto computado</h1>
            </div>
        )
    }

    render() {
        const { loading, votacaoOk, votacao } = this.state;
        if (votacao == null) return <Loader active={true} />;
        return (
            <div>
                <div className='votacaoHeader'>
                    <div>
                        <Link to='/'>
                            <Button>Voltar</Button>
                        </Link>
                    </div>

                    <h1>{votacao.titulo}</h1>

                    <p>{votacao.descricao}</p>
                </div>
                {
                    loading ?
                        <Loader active={true} />
                        :
                        (
                            votacaoOk ?
                                this.renderVotoComputado()
                                :
                                <Container>
                                    <div>
                                        <Rating maxRating={5} defaultRating={3} icon='star' size='massive' onRate={this.handleRate} />
                                    </div>
                                </Container>
                        )

                }


            </div>
        )
    }


}


export default Votacao;