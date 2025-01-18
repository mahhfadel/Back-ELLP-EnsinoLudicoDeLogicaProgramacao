const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const { workshopController } = require('../controllers');
const { workshopService } = require('../services');

describe('Workshops Controller', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('getWorkshops', () => {
        it('deve retornar 200 e uma lista de oficinas', async () => {
            const mockWorkshops = [{ id: 1, name: 'Workshop A' }];
            sinon.stub(workshopService, 'getWorkshops').resolves(mockWorkshops);

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await workshopController.getWorkshops(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                message: 'Oficinas encontradas com sucesso.',
                data: mockWorkshops,
            })).to.be.true;
        });

        it('deve retornar 404 se nenhuma oficina for encontrada', async () => {
            sinon.stub(workshopService, 'getWorkshops').resolves([]);

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await workshopController.getWorkshops(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: 'Nenhuma oficina encontrado.' })).to.be.true;
        });

        it('deve retornar 500 em caso de erro', async () => {
            sinon.stub(workshopService, 'getWorkshops').rejects(new Error('Erro ao buscar oficinas'));

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await workshopController.getWorkshops(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWithMatch({ message: 'Erro ao buscar oficinas' })).to.be.true;
        });
    });

    describe('createWorkshop', () => {
        it('deve criar uma oficina e retornar 201', async () => {
            const mockWorkshop = { name: 'Workshop A' };
            const mockCreatedWorkshop = { id: 1, ...mockWorkshop };
            sinon.stub(workshopService, 'createWorkshop').resolves(mockCreatedWorkshop);

            const req = { body: mockWorkshop };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await workshopController.createWorkshop(req, res);

            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith({
                message: 'Oficina criada com sucesso.',
                data: mockCreatedWorkshop,
            })).to.be.true;
        });

        it('deve retornar 400 se o body estiver vazio', async () => {
            const req = { body: null };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await workshopController.createWorkshop(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ message: 'Não existe oficina enviada no body.' })).to.be.true;
        });
    });

    describe('addStudentsToWorkshop', () => {
        it('deve adicionar estudantes a uma oficina e retornar 201', async () => {
            const workshopId = 1;
            const studentIds = [1, 2];
            const mockResponse = { workshopId, studentIds };
            sinon.stub(workshopService, 'addStudentsToWorkshop').resolves(mockResponse);

            const req = { params: { id: workshopId }, body: { studentIds } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await workshopController.addStudentsToWorkshop(req, res);

            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith({
                message: 'Estudantes adicionados à oficina com sucesso.',
                data: mockResponse,
            })).to.be.true;
        });

        it('deve retornar 400 se o ID da oficina for inválido', async () => {
            const req = { params: { id: 0 }, body: { studentIds: [1, 2] } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await workshopController.addStudentsToWorkshop(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ message: 'O ID do Workshop deve ser maior que 0.' })).to.be.true;
        });

        it('deve retornar 400 se nenhum estudante for enviado', async () => {
            const req = { params: { id: 1 }, body: { studentIds: [] } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await workshopController.addStudentsToWorkshop(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ message: 'É preciso enviar um array de IDs de estudantes no body.' })).to.be.true;
        });

        it('deve retornar 500 em caso de erro', async () => {
            sinon.stub(workshopService, 'addStudentsToWorkshop').rejects(new Error('Erro interno'));

            const req = { params: { id: 1 }, body: { studentIds: [1, 2] } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await workshopController.addStudentsToWorkshop(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWithMatch({ message: 'Erro ao associar alunos e oficinas.' })).to.be.true;
        });
    });
});