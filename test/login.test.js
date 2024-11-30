const request = require('supertest');
const chai = require('chai');
const app = require('../app');
const authService = require('../services/authService');
const sinon = require('sinon');

const { expect } = chai;

describe('POST /login', function () {

  it('Deve retornar 401 se as credenciais forem inválidas', async function () {
    const loginData = { email: 'john@example.com', password: 'senhaerrada' };

    const mockLogin = sinon.stub(authService, 'login').returns(null);

    const resposta = await request(app)
      .post('/login')
      .send(loginData)
      .expect(401);

    expect(resposta.body).to.have.property('message').that.equals('Credenciais inválidas.');

    mockLogin.restore();
  });

  it('Deve retornar 200 com token se as credenciais forem válidas', async function () {
    const loginData = { email: 'john@example.com', password: 'senhaCorreta' };

    const mockLogin = sinon.stub(authService, 'login').returns('token_gerado_aqui');

    const resposta = await request(app)
      .post('/login')
      .send(loginData)
      .expect(200);

    expect(resposta.body).to.have.property('token').that.equals('token_gerado_aqui');

    mockLogin.restore();
  });

  it('Deve retornar 500 se ocorrer um erro inesperado no servidor', async function () {
    const loginData = { email: 'john@example.com', password: 'senhaErrada' };

    const mockLogin = sinon.stub(authService, 'login').throws(new Error('Erro interno'));

    const resposta = await request(app)
      .post('/login')
      .send(loginData)
      .expect(500);

    expect(resposta.body).to.have.property('message').that.equals('Erro ao tentar fazer login.');
    expect(resposta.body).to.have.property('error').that.includes('Erro interno');

    mockLogin.restore();
  });
});