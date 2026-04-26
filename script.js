/* ===========================
   1. API de preços (CoinGecko)
=========================== */
async function carregarPrecos() {
  try {
    const resposta = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd'
    );
    const dados = await resposta.json();
    const lista = document.getElementById('prices');
    lista.innerHTML = `
      <li>Bitcoin: $${dados.bitcoin.usd}</li>
      <li>Ethereum: $${dados.ethereum.usd}</li>
      <li>Solana: $${dados.solana.usd}</li>
    `;
  } catch (error) {
    console.error("Erro ao carregar preços:", error);
  }
}
// Carregar preços ao iniciar e atualizar a cada 60s
carregarPrecos();
setInterval(carregarPrecos, 60000);

/* ===========================
   2. Configuração Firebase
=========================== */
// Substitua pelos dados do seu projeto Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "seuprojeto.firebaseapp.com",
  projectId: "seuprojeto",
  storageBucket: "seuprojeto.appspot.com",
  messagingSenderId: "ID",
  appId: "APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

/* ===========================
   3. Cadastro de usuário
=========================== */
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    await auth.createUserWithEmailAndPassword(email, senha);
    alert(`Cadastro realizado com sucesso! Bem-vindo, ${nome}.`);
  } catch (error) {
    alert("Erro: " + error.message);
  }
});

/* ===========================
   4. Futuras funcionalidades
=========================== */
// - Login de usuário
// - Dashboard com saldo e histórico
// - Integração com Firestore para salvar dados