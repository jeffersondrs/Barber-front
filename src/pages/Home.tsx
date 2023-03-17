import * as HomeStyles from "../assets/styles/home.styles";

export default function Home(): JSX.Element {
  return (
    <HomeStyles.HomeContainer>
      <HomeStyles.HomeTitle>Página Inicial</HomeStyles.HomeTitle>
      <HomeStyles.HomeDescription>
        Bem vido ao administrador do banco de dados. Para começar, escolha uma
        opção abaixo.
      </HomeStyles.HomeDescription>

      <HomeStyles.HomeButton to={"/"}>
        Cadastrar Novo Funcionário
      </HomeStyles.HomeButton>
      <HomeStyles.HomeButton to={"/"}>
        Cadastrar Novo Cliente
      </HomeStyles.HomeButton>

      <HomeStyles.HomeButton to={"/login"}>
        Entrar na minha conta
      </HomeStyles.HomeButton>
    </HomeStyles.HomeContainer>
  );
}
