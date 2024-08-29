# Supermarket Classifies

## Descrição

O projeto "Supermarket Classifies" é uma aplicação que permite aos usuários avaliar mercados com base em critérios específicos e exibir os resultados parciais da votação.

## Como Compilar e Executar o Sistema

### Backend

1. **Clone o repositório**:
    ```bash
    https://github.com/pedroita/backVOTEMARKTEDESAFIOTECNICO
    ```

2. **Navegue até o diretório do backend**:
    ```bash
    cd supermarket-classifies/backend
    ```

3. **Instale as dependências**:
    ```bash
    npm install
    ```

4. **Compile o código TypeScript (se aplicável)**:
    ```bash
    npm run dev
    ```


   O servidor estará disponível em `http://localhost:3000` (ou outro porto configurado).

### Frontend

1. **Navegue até o diretório do frontend**:
    ```bash
    cd ../frontend
    ```

2. **Instale as dependências**:
    ```bash
    npm install
    ```

3. **Inicie o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```

   A aplicação estará disponível em `http://localhost:3000` (ou outro porto configurado).

## O Que Vale Destacar no Código Implementado?

- **Arquitetura Modular**: O código é modularizado seguindo o princípio da responsabilidade única, o que facilita a manutenção e escalabilidade.
- **Uso de React e Material-UI**: A interface do usuário é construída usando React e Material-UI, proporcionando uma experiência de usuário rica e responsiva.
- **Integração com APIs**: A aplicação integra com APIs para buscar e enviar dados de mercados e votos.
- **Gestão de Estado e Navegação**: O estado da aplicação e a navegação são geridos de forma eficiente com React Router e hooks do React.

## O Que Poderia Ser Feito para Melhorar o Sistema?

- **Testes Automatizados**: Implementar testes automatizados para o frontend para garantir a integridade da interface e a interação do usuário.
- **Validação de Dados no Frontend**: Adicionar validações mais robustas no frontend para garantir a integridade dos dados antes do envio.
- **Melhorar o Design Responsivo**: Ajustar o design para garantir que a aplicação funcione bem em todos os tamanhos de tela e dispositivos.
- **Documentação Adicional**: Melhorar a documentação para incluir mais detalhes sobre a configuração e uso dos componentes e serviços.

## Testes Automatizados

Os testes automatizados foram implementados apenas para o backend. Eles garantem que a lógica de negócios e as APIs estejam funcionando corretamente. Para executar os testes do backend, utilize:

```bash
npm test
```
Você tera uma tela assim:
![image](https://github.com/user-attachments/assets/26dd2c58-b038-4ee4-a4ad-935497ef77ae)
