import React from 'react';

export const Footer = () => {
  return (
    <div class="footer-dark">
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-md-3 item">
                        <h3>Serviços</h3>
                        <ul>
                            <li><a href="#">Saiba os cursos mais novos do mercado!</a></li>
                            <li><a href="#">Tenha tudo para seu ENEM</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-6 col-md-3 item">
                        <h3>Sobre Nós</h3>
                        <ul>
                            <li><a href="#">A companhia</a></li>
                            <li><a href="#">Nosso time</a></li>
                            <li><a href="#">Carreiras</a></li>
                        </ul>
                    </div>
                    <div class="col-md-6 item text">
                        <h3>Fic Questions</h3>
                        <p>Só aqui no FIC questions você vê todo o conteúdo para conseguir uma boa pontuação em suas provas!!</p>
                        <p>Você terá acesso a: </p>
                        <p>*Montagem de simulados;</p>
                        <p>*Questões respondidas com comentários do professor;</p>
                        <p>*Simulados recomendados pelo nosso time de professores.</p>
                    </div>
                    {/* <div class="col item social"><a href="#"><i class="icon ion-social-facebook"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-instagram"></i></a></div> */}
                </div>
                <p class="copyright">Fic Questions © 2022</p>
            </div>
        </footer>
    </div>
  );
}