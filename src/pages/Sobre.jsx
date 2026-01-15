import Layout from '../components/Layout'

export default function Sobre() {
    return (
        <Layout>
            <div style={{ maxWidth: 800 }}>
                <h2 style={{ marginBottom: 20 }}>Sobre o Cuidar de Berço</h2>

                <p>
                    Sou enfermeira, especialista em UTI, urgência e emergência e saúde da
                    mulher, com atuação voltada ao pós-parto, puerpério, amamentação e
                    cuidados ao recém-nascido.
                </p>

                <p>
                    Ao longo da minha trajetória profissional, acompanhei famílias em
                    momentos de grande vulnerabilidade emocional: o nascimento prematuro,
                    a internação em UTI Neonatal, as inseguranças do puerpério, as
                    dificuldades da amamentação e a solidão que muitas mães enfrentam após
                    a alta hospitalar. Foi a partir dessa vivência que nasceu o{' '}
                    <strong>Cuidar de Berço</strong>.
                </p>

                <p>
                    O Cuidar de Berço é um espaço de acolhimento e orientação baseada em
                    evidências científicas, que traduz o conhecimento técnico para uma
                    linguagem acessível, sem julgamentos, romantizações ou desinformação.
                </p>

                <ul style={{
                    paddingLeft: 0,
                    marginLeft: 0,
                    listStylePosition: 'inside'
                }}>
                    <li>Cuidados com o recém-nascido</li>
                    <li>Amamentação e manejo das principais dificuldades</li>
                    <li>Pós-parto e saúde emocional materna</li>
                    <li>Prematuridade e UTI Neonatal</li>
                    <li>Fortalecimento da rede de apoio familiar</li>
                </ul>

                <p>
                    Acredito em uma assistência que une ciência e sensibilidade.
                    Informação salva vidas, porém informação empática, responsável e
                    acessível transforma famílias.
                </p>

                <p className="sobre-destaque">
                    <strong>
                        Cuidar de Berço: onde o cuidado começa no colo e se sustenta no
                        conhecimento.  💜
                    </strong>
                </p>

                <h3 style={{ marginBottom: 16, marginTop: 30 }}>Entre em contato</h3>

                <div style={{ display: 'flex', gap: 15 }}>
                    {/* Instagram */}
                    <a
                        href="https://instagram.com/cuidardeberco"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: '10px 20px',
                            background: '#A77ACF',
                            color: '#fff',
                            borderRadius: 6,
                            textDecoration: 'none',
                            fontWeight: 500
                        }}
                    >
                        📷 Instagram
                    </a>

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/5518996730149"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: '10px 20px',
                            background: '#25D366',
                            color: '#fff',
                            borderRadius: 6,
                            textDecoration: 'none',
                            fontWeight: 500
                        }}
                    >
                        💬 WhatsApp
                    </a>
                </div>
            </div>
        </Layout>
    )
}


