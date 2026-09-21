import request from "supertest";
import { expect } from "chai";
//using helpers
import { api } from "../helpers/api.js";
import { TokenDeAdmin } from "../helpers/auth.js";
import testesAlunos from "../fixtures/alunos.json" with { type: "json" };

/*Automatizar testes para logar como administrador, cadastrar um aluno, logar como aluno e registrar a entrega de um trabalho como aluno (usar Mocha, SuperTest e Chai)
Testes precisam implementar Data-Driven Testing, adicionando dados usados no teste em um arquivo JSON
O projeto deve usar Dotenv
O projeto deve ter o login de Admin e de Usuário como Helpers
Os testes precisam rodar na pipeline do Github Actions
*/

describe("Fluxo de Matrícula de Aluno em Disciplina", () => {
  testesAlunos.forEach((testeAluno) => {
    
    it.only(testeAluno.testTitle, async () => {

      // register a new student
      const cadastroAlunoResposta = await api()
        .post("/api/admin/alunos")
        .set("Content-Type", "application/json")
        .set("Authorization", await TokenDeAdmin())
        .send(testeAluno.dadosAluno);

      //expect(cadastroAlunoResposta.status).to.equal(200);
      const alunoId = cadastroAlunoResposta.body.id;
      console.log(cadastroAlunoResposta.body.id);

      // register the student in a new discipline
      const matriculaAlunoResposta = await api()
        .post(`/api/admin/disciplinas/disciplina-matematica/matriculas`)
        .set("Content-Type", "application/json")
        .set("Authorization", await TokenDeAdmin())
        .send({
          alunoId: cadastroAlunoResposta.body.id,
        });

      //expect(matriculaAlunoResposta.status).to.equal(200);
      console.log(matriculaAlunoResposta.body);

      // Log in as the student
      const loginRespostaAluno = await api()
        .post("/api/auth/login")
        .set("Content-Type", "application/json")
        .send(testeAluno.loginAluno);
      //expect(loginRespostaAluno.status).to.equal(200);
      console.log(loginRespostaAluno.body.token);

      // Register the submission of a work as a student
      const entregaTrabalhoResposta = await api()
        .post(`/api/alunos/${alunoId}/trabalhos`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${loginRespostaAluno.body.token}`)
        .send(testeAluno.RegisterSubmission);

      expect(entregaTrabalhoResposta.status).to.equal(201);
      expect(entregaTrabalhoResposta.body.alunoId).to.equal(
        cadastroAlunoResposta.body.id,
      );
      expect(entregaTrabalhoResposta.body.titulo).to.equal(
        "Trabalho de Matemática",
      );
      expect(entregaTrabalhoResposta.body.descricao).to.equal(
        testeAluno.RegisterSubmission.descricao,
      );
      console.log(entregaTrabalhoResposta.body);
    });
  });
});
