document.getElementById("convertBtn").addEventListener("click", async function () {
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const amount = document.getElementById("amount").value;

    if (!amount || amount <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    try {
        // API gratuita para conversão de moedas
        const response = await fetch(`https://data.fixer.io/api/latest?access_key=ab88d9d8641bad491d96e06dc28b6c13&format=1`);
        const data = await response.json();

        if (!data.rates[toCurrency]) {
            alert("Conversão indisponível para a moeda selecionada.");
            return;
        }

        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        document.getElementById("result").innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        alert("Houve um erro ao tentar buscar as taxas de câmbio. Tente novamente mais tarde.");
    }
});
