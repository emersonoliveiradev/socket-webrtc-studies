# Para executar
./restore-packages.sh

npm start
npm run dev

# Descrição

- Webrtc
    - Promover comunicação entre browser e aplicativos mobile em tempo real
    - aúdio e vídeo
    - peer to peer
    - precisa de servidores pra orquestrar a comunicação
    - precisa saber o endereço pra estabelecer uma comunicação (signalingn )
        - coordenar a comunicação
        - gerenciar estado de sessão de usuários
        - gerar salas individuais
        - informar sobre eventos
            - nova conexão
            - encerramento de conexão
            - informar todas as conexões de usuários
            - gerenciar o que estão fazendo na plataforma
            - todos os dados são trafegados via peer to peer
        - interactive connectivity establishment ou ICE (ICE framework)
            - Encontrar melhor forma de dois computadores se comunicarem através da rede
    - NESSE PROJETO IREMOS UTILIZAR OS SERVIDOR DE SIGNILING PÚBLICO DISPONIBILIZADO PELO GOOGLE
    - MAS PODERÍAMOS SUBIR UM SERVIDOR DEDICADO EM MÁQUINA VIRTUAL
        - possível fazer contigência pra se comunicação direta falhar estabelecer conexão direta pelos nossos próprios servidores
        - stun server: obter endereço externo de rede dos clientes (opcional)
        - primeiro vai tentar fazer a conxão encontrado o endereço do host
        -TURN RELAY SERVER: garantir a comunicação se a conexão direta falhar
    
    Resumindo:
        ICE: Rota mais curta entre os clientes
        STUN: descobrir o endereço necessário pra conexão
        TURN: é como o stun, mas mais poderoso. garantir o tráfego
        PS: Em prod com certeza vi precisar de contigência usando STUN e/ou TURN

    PEERJS: 
        - lib que abstrai o Webrtc
        - cria e gera id único na rede
        - PEERJS usa servidor dedicado da PEERSERVER
            - mas iremos subir o nosso próprio dedicado

