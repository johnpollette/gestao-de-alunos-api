import request from 'supertest';
import { expect } from 'chai';
//using helpers  
import { api } from './helpers/api.js';
//import { comTokenDeAdmin } from '../helpers/auth.js';


/*Automatizar testes para logar como administrador, cadastrar um aluno, logar como aluno e registrar a entrega de um trabalho como aluno (usar Mocha, SuperTest e Chai)
Testes precisam implementar Data-Driven Testing, adicionando dados usados no teste em um arquivo JSON
O projeto deve usar Dotenv
O projeto deve ter o login de Admin e de Usuário como Helpers
Os testes precisam rodar na pipeline do Github Actions
*/

describe('Fluxo de Matrícula de Aluno em Disciplina', () => { 
    it.only('Validar que um aluno que acaba de ser cadastrado pode ser matriculado pode logar e entregar um trabalho em uma  disciplina', async () => {
        // Get the admin token section
        const loginRespostaAdmin = await api()
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({ 
                email:'admin@escola.com',
                senha:'admin123'
            });
            expect(loginRespostaAdmin.status).to.equal(200);
            console.log(loginRespostaAdmin.body.token);
/*
            // register a new student
        const cadastroAlunoResposta = await api()
            .post('/api/admin/alunos')
            .set('Content-Type', 'application/json')
            .set('Authorization', await comTokenDeAdmin())
            .send({
                nome: 'John Doe',
                email: 'john.doe@example.com',
                matricula: '2026000',
                senha: 'senha123'
            });

        expect(cadastroAlunoResposta.status).to.equal(201);
        const alunoId = cadastroAlunoResposta.body.id;
        console.log(cadastroAlunoResposta.body.id);

        // register  the student in a new discipline
        const matriculaAlunoResposta = await api()
            .post(`/api/admin/disciplinas/disciplina-matematica/matriculas`)
            .set('Content-Type', 'application/json')
            .set('Authorization', await comTokenDeAdmin())
            .send({
                alunoId: cadastroAlunoResposta.body.id
            });

        expect(matriculaAlunoResposta.status).to.equal(201);
        console.log(matriculaAlunoResposta.body);

        

        // Log in as the student
        const loginRespostaAluno = await api()
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({ 
                email:'john.doe@example.com',
                senha:'senha123'
            });
            expect(loginRespostaAluno.status).to.equal(200);
            console.log(loginRespostaAluno.body.token);
           
            
            // Register the submission of a work as a student
        const entregaTrabalhoResposta = await api()
            .post(`/api/alunos/${alunoId}/trabalhos`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${loginRespostaAluno.body.token}`)
            .send({
                disciplinaId: 'disciplina-matematica',
                titulo: 'Trabalho de Matemática',
                descricao: 'Descrição do trabalho de matemática John Doe',

            });

        expect(entregaTrabalhoResposta.status).to.equal(201);
        expect(entregaTrabalhoResposta.body.alunoId).to.equal(cadastroAlunoResposta.body.id);
        expect(entregaTrabalhoResposta.body.titulo).to.equal('Trabalho de Matemática');
        expect(entregaTrabalhoResposta.body.descricao).to.equal('Descrição do trabalho de matemática John Doe');
        console.log(entregaTrabalhoResposta.body);
        
*/
    })
})