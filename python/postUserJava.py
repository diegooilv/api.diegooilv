import requests
from faker import Faker
import random

fake = Faker('pt_BR')  # Para gerar nomes, endereços e CPFs brasileiros

def gerar_cpf_valido():
    def calcular_digito(cpf, peso_inicial):
        soma = 0
        peso = peso_inicial
        for digito in cpf:
            soma += int(digito) * peso
            peso -= 1
        resto = soma % 11
        return 0 if resto < 2 else 11 - resto

    # Gerar os 9 primeiros dígitos aleatoriamente
    cpf_base = [str(random.randint(0, 9)) for _ in range(9)]

    # Calcular o primeiro dígito verificador
    digito1 = calcular_digito(cpf_base, 10)
    cpf_base.append(str(digito1))

    # Calcular o segundo dígito verificador
    digito2 = calcular_digito(cpf_base, 11)
    cpf_base.append(str(digito2))

    # Formatar o CPF no padrão brasileiro
    cpf_str = ''.join(cpf_base)
    return f'{cpf_str[:3]}.{cpf_str[3:6]}.{cpf_str[6:9]}-{cpf_str[9:]}'

def gerar_numero():
    ddd = random.choice(['11','21','31','41','51','61'])
    numero = f'9{random.randint(90000000, 99999999)}'
    return f'({ddd}) {numero}'

def gerar_email(nome):
    nome_formatado = nome.lower().replace(' ', '.')
    dominio = random.choice(['email.com', 'gmail.com', 'hotmail.com', 'outlook.com'])
    return f'{nome_formatado}@{dominio}'

def gerar_pessoa(id_):
    nome = fake.name()
    pessoa = {
        "id": id_,
        "nome": nome,
        "numero": gerar_numero(),
        "email": gerar_email(nome),
        "cpf": gerar_cpf_valido(),
        "endereco": fake.street_address()
    }
    return pessoa

def postar_pessoa(pessoa):
    url = "https://api.diegooilv.xyz/userJava"
    response = requests.post(url, json=pessoa)
    if response.status_code == 200 or response.status_code == 201:
        print(f"Pessoa ID {pessoa['id']} postada com sucesso!")
    else:
        print(f"Erro ao postar pessoa ID {pessoa['id']}: {response.status_code} - {response.text}")

if __name__ == "__main__":
    # Exemplo: gerar e postar 5 pessoas
    for i in range(1, 100):
        p = gerar_pessoa(i)
        print(p)
        postar_pessoa(p)
