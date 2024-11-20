import "./styles.css"

import Header from "../../components/Header"
import Footer from "../../components/Footer"

export default function Dashboard() {
  return (
    <>
      <Header />
      <div id="dashboard">
        <aside>
          <div className="container">
            <ul>
              <li>Usuários</li>
              <li>Denúncias</li>
              <li>Tendências de Denúncias</li>
            </ul>
          </div>
        </aside>

        <main>
          <Users_Dashboard />
          <Complaints_Dashboard />
          <Trends_Dashboard />
        </main>
      </div>

      <Footer />
    </>
  )
}

/**
 * 1. Usuários
    - Número de Usuários: Quantidade total de usuários cadastrados na plataforma, com indicação de crescimento semanal ou mensal.
    - Usuários Ativos: Percentual de usuários que interagiram recentemente (últimos 30 dias).
  * 2. Denúncias
    - Denúncias Semanais: Contagem de novas denúncias registradas na semana, acompanhada de um gráfico de tendência (comparação com semanas anteriores).
    - Denúncias Resolvidas: Número e percentual de denúncias que foram atendidas e solucionadas. Um gráfico de barras ou de progresso seria ideal aqui para mostrar a eficiência na resolução.
  * 3. Tendências de Denúncias
    - Principal Denúncia da Semana: Tipo de problema mais relatado na semana (ex.: buracos na rua, falta de iluminação, transporte público) com um indicador visual destacando o aumento ou queda nas ocorrências.
 */


