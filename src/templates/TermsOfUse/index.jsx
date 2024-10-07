import { Link } from "react-router-dom"
import { useEffect } from "react"
import "./styles.css"

export default function TermsOfUse() {
  useEffect(() => {
    document.title = "Melhor Cidade - Termos de Uso"
  }, [])

  return (
    <main id="all_terms">
      <div id="title_and_go_out">
        <h1>Termos de Uso</h1>
        <Link to={"/signup"}>Sair</Link>
      </div>

      <p>
        Bem-vindo ao MelhorCidade! Ao acessar ou utilizar nosso aplicativo, você
        concorda em cumprir e ficar vinculado aos seguintes Termos de Uso.
      </p>

      <span>
        Se você não concorda com estes termos, não utilize nosso aplicativo.
      </span>

      <dl>
        <dt>1. Descrição do Serviço</dt>
        <dd>
          MelhorCidade é um aplicativo que visa conectar usuários a informações
          e serviços locais. Através do MelhorCidade, você pode se cadastrar,
          compartilhar fotos, e acessar informações sobre sua localização.
        </dd>

        <dt>2. Cadastro e Conta de Usuário</dt>
        <dd>
          Para utilizar nosso aplicativo, você deve criar uma conta. Você
          concorda em fornecer informações verdadeiras, completas e atualizadas
          durante o cadastro. É sua responsabilidade manter a confidencialidade
          de sua senha e informações da conta.
        </dd>

        <dt>3. Coleta e Uso de Dados</dt>
        <dd>
          Coletamos as seguintes informações:
          <ul>
            <li>E-mail: para comunicação e recuperação de conta.</li>
            <li>Localização: para fornecer serviços personalizados.</li>
            <li>Fotos: para compartilhar experiências e informações.</li>
          </ul>
          <p>
            Você concorda que podemos utilizar essas informações para melhorar
            nosso serviço e personalizar sua experiência.
          </p>
        </dd>

        <dt>4. Localização</dt>
        <dd>
          Ao utilizar o MelhorCidade, você permite que coletamos e utilizemos
          sua localização. Você pode desativar a coleta de localização a
          qualquer momento nas configurações do seu dispositivo.
        </dd>

        <dt>5. Fotografias</dt>
        <dd>
          Você nos concede o direito de usar as fotos que você tira e
          compartilha através do aplicativo. Essas imagens poderão ser usadas
          para fins promocionais e informativos, respeitando sempre sua
          privacidade.
        </dd>

        <dt>6.Direitos e Deveres do Usuário</dt>
        <dd>
          Você se compromete a:
          <ul>
            <li>Utilizar o aplicativo de forma legal e ética.</li>
            <li>
              Não compartilhar informações que possam violar a privacidade de
              outros usuários.
            </li>
            <li>
              Notificar-nos imediatamente sobre qualquer uso não autorizado de
              sua conta.
            </li>
          </ul>
        </dd>

        <dt>7. Propriedade Intelectual</dt>
        <dd>
          Todo o conteúdo do MelhorCidade, incluindo textos, gráficos e logos, é
          de propriedade exclusiva do MelhorCidade ou de nossos parceiros. Você
          não pode reproduzir ou distribuir qualquer parte do nosso aplicativo
          sem nossa permissão.
        </dd>

        <dt>8. Segurança e Proteção de Dados</dt>
        <dd>
          Implementamos medidas de segurança para proteger suas informações. No
          entanto, não podemos garantir a segurança absoluta dos dados
          transmitidos pela internet.
        </dd>

        <dt>9. Alterações nos Termos de Uso</dt>
        <dd>
          Reservamo-nos o direito de modificar estes Termos de Uso a qualquer
          momento. As alterações serão comunicadas através do aplicativo e
          entrarão em vigor assim que publicadas.
        </dd>

        <dt>10. Descontinuação do Serviço</dt>
        <dd>
          Podemos descontinuar ou modificar nosso serviço a qualquer momento,
          sem aviso prévio.
        </dd>

        <dt>11. Limitação de Responsabilidade</dt>
        <dd>
          O MelhorCidade não se responsabiliza por danos diretos, indiretos ou
          consequenciais resultantes do uso do aplicativo ou de informações
          fornecidas por usuários.
        </dd>

        <dt>12. Legislação Aplicável e Jurisdição</dt>
        <dd>
          Estes Termos de Uso são regidos pelas leis da Lei Geral de Proteção de
          Dados (LGPD). Quaisquer disputas serão resolvidas nos tribunais dessa
          jurisdição.
        </dd>

        <dt>13. Contato</dt>
        <dd>
          Se você tiver dúvidas sobre estes Termos de Uso, entre em contato
          conosco pelo e-mail: .
        </dd>

        <dt>14. Aceitação dos Termos</dt>
        <dd>
          Ao utilizar o MelhorCidade, você confirma que leu, entendeu e concorda
          com estes Termos de Uso.
        </dd>
      </dl>
    </main>
  )
}
