const request = require('supertest');
const chai = require('chai');
const app = require('../app');
const teacherService = require('../services/teacherService');
const authService = require('../services/authService');
const sinon = require('sinon');

const { expect } = chai;

describe('POST /register', function () {
  it('Deve retornar 400 se falhar ao criar o professor', async function () {
    const teacher = { name: 'John', email: 'john@example.com', phone: '123456789', birthdate: '1990-01-01', password: '123456', address: '123 Main St' };
    
    const mockCreateTeacher = sinon.stub(teacherService, 'createTeacher').returns(null);

    const resposta = await request(app)
      .post('/register')
      .send(teacher)
      .expect(400);

    expect(resposta.body.message).to.equal('Não foi possível criar o usuário.');

    mockCreateTeacher.restore();
  });

  it('Deve criar o professor e retornar 201 com token se os dados forem válidos', async function () {
    const teacher = { name: 'John', email: 'john@example.com', phone: '123456789', birthdate: '1990-01-01', password: '123456', address: '123 Main St' };

    const mockCreateTeacher = sinon.stub(teacherService, 'createTeacher').returns({ id: 1, ...teacher });

    const mockLogin = sinon.stub(authService, 'login').returns('token_gerado_aqui');

    const resposta = await request(app)
      .post('/register')
      .send(teacher)
      .expect(201);

    expect(resposta.body.teacher).to.have.property('id').that.equals(1);
    expect(resposta.body.teacher).to.have.property('email').that.equals(teacher.email);
    expect(resposta.body.token).to.equal('token_gerado_aqui');

    mockCreateTeacher.restore();
    mockLogin.restore();
  });
});