const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const { studentController } = require('../controllers');
const { studentService } = require('../services');

describe('Students Controller', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('getStudents', () => {
        it('deve retornar 200 e uma lista de estudantes', async () => {
            const mockStudents = [{ id: 1, name: 'John Doe' }];
            sinon.stub(studentService, 'getStudents').resolves(mockStudents);

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await studentController.getStudents(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                message: 'Oficinas encontradas com sucesso.',
                data: mockStudents,
            })).to.be.true;
        });

        it('deve retornar 404 se nenhum estudante for encontrado', async () => {
            sinon.stub(studentService, 'getStudents').resolves([]);

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await studentController.getStudents(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: 'Nenhum estudante encontrado.' })).to.be.true;
        });

        it('deve retornar 500 em caso de erro', async () => {
            sinon.stub(studentService, 'getStudents').rejects(new Error('Erro ao buscar estudantes'));

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await studentController.getStudents(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWithMatch({ message: 'Erro ao buscar oficinas' })).to.be.true;
        });
    });

    describe('createStudent', () => {
        it('deve criar um estudante e retornar 201', async () => {
            const mockStudent = { name: 'Jane Doe' };
            const mockCreatedStudent = { id: 1, ...mockStudent };
            sinon.stub(studentService, 'createStudent').resolves(mockCreatedStudent);

            const req = { body: mockStudent };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await studentController.createStudent(req, res);

            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith({
                message: 'Estudante criado com sucesso.',
                data: mockCreatedStudent,
            })).to.be.true;
        });

        it('deve retornar 400 se o body estiver vazio', async () => {
            const req = { body: null };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await studentController.createStudent(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ message: 'Não existe estudante enviado no body.' })).to.be.true;
        });
    });
});