# ELLP - Ensino Lúdico De Logica e Programação
Projeto desenvolvido na disciplina de Oficina de Integração 2

## Equipe:
- Erick Elsas de Freitas, 2347938
- Maria Clara Fadel, 2350637

---

## Descrição do Projeto
Este projeto desenvolvido na disciplina de Oficina de Integração 2, que visa a criação de uma aplicação web para o registro de presença dos alunos nas oficinas do projeto ELPP - Ensino Lúdico de Lógica e Programação. A proposta tem como objetivo principal otimizar a gestão da frequência, proporcionando uma solução prática e eficiente para o acompanhamento das atividades dos alunos.

## Requisitos Funcionais
- **Fazer Login**: Realizar a autenticação de usuários para acesso ao sistema utilizando tecnologias como JWT;
- **Criar Conta**: Realizar a criação de uma conta, mantendo suas informações no banco de dados Postgres. Novos usuários devem ser cadastrados como Alunos e devem passar por aprovação de um superior;
- **Criar Oficina**: Deve ser possível criar oficinas, editar, ver e excluir oficinas. Oficinas nada mais são do que turmas de alunos;
- **Adicionar alunos à oficina**:Deve ser possível cadastrar alunos em oficinas, para gerenciar a presença destes;
- **Gerar certificado de participação**: Deve ser possível gerar certificado de participação dos alunos em oficinas;

## Arquitetura do Sistema
- **Front-End**
- **Back-End**
- **Banco de Dados**


## Estratégia de Automação de Testes
- **Testes de Integração**: Os testes de integração serão implementados para assegurar que os módulos interajam corretamente entre si, especialmente nas interações entre o backend e o banco de dados (PostgreSQL), e nas chamadas de API entre o backend e o frontend.
Ferramentas como Supertest para o Node.js permitirão testar endpoints e validar respostas, verificando que o sistema funcione como esperado nas camadas de integração.
- **Testes End-to-End (E2E)**: Para validar a experiência completa do usuário e verificar a integração entre todas as partes do sistema, serão utilizados testes End-to-End (E2E) com Cypress. Esses testes cobrirão fluxos completos, como cadastro, autenticação e interações essenciais do usuário com o sistema.
O Cypress permite simular o comportamento do usuário e verificar se todas as funcionalidades essenciais estão operando como esperado no ambiente de produção.

## Tecnologias Utilizadas
- Backend: Node.js com Sequelize
- Banco de Dados: PostgreSQL
- Frontend: React

Hospedagem
Render para o backend: A Render é uma plataforma de hospedagem que oferece um ambiente escalável e fácil de gerenciar para aplicações Node.js, com suporte para CI/CD (integração e entrega contínuas) e automação de deploys, permitindo que atualizações de código sejam facilmente integradas ao sistema.
Vercel para o frontend: A Vercel é altamente otimizada para aplicações React e oferece um desempenho superior no carregamento de páginas, especialmente para aplicações front-end. Com integrações CI/CD, o deploy contínuo fica automatizado, proporcionando uma experiência rápida e fluida tanto para os desenvolvedores quanto para os usuários finais.
Essas escolhas foram feitas visando um sistema ágil, seguro e escalável, que ofereça uma boa experiência tanto para os usuários quanto para a equipe de desenvolvimento.


Documentação completa disponível aqui: https://docs.google.com/document/d/1Gx5RoRtk0SL4qM39w5rh_6OKP2cSQr_FkhTHyjul3p0/edit?usp=sharing
