CREATE TABLE "userJava" (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL,
    cpf VARCHAR(15) NOT NULL UNIQUE,
    endereco VARCHAR(150)
);

INSERT INTO "userJava" (id, nome, numero, email, cpf, endereco) VALUES
(1, 'João da Silva', '(51) 99876-5432', 'joao.silva@email.com', '123.456.789-09', 'Rua das Flores 123'),
(2, 'Maria Oliveira', '(11) 91234-5678', 'maria.oliveira@email.com', '862.883.667-50', 'Avenida Central 456'),
(3, 'Carlos Mendes', '(21) 93456-7890', 'carlos.mendes@email.com', '295.379.310-01', 'Travessa Verde 789'),
(4, 'Ana Paula Costa', '(31) 99999-0000', 'ana.costa@email.com', '697.987.550-03', 'Rua Azul 55'),
(5, 'Fernanda Souza', '(41) 98888-7777', 'fernanda.souza@email.com', '368.458.570-80', 'Alameda das Acácias 10');

drop table "userJava";

select * from "userJava";