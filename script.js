document.getElementById("convertBtn").addEventListener("click", async function () {
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const amount = document.getElementById("amount").value;

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    try {
        // URL da API com chave de acesso
        const apiKey = "ab88d9d8641bad491d96e06dc28b6c13";
        const url = `https://data.fixer.io/api/latest?access_key=${apiKey}&format=1`;

        // Requisitar os dados da API
        const response = await fetch(url);
        const data = await response.json();

        if (!data.success) {
            throw new Error("Failed to fetch exchange rates.");
        }

        // Obter a taxa de câmbio para as moedas selecionadas
        const rates = data.rates;
        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];

        if (!fromRate || !toRate) {
            alert("Conversion unavailable for the selected currency.");
            return;
        }

        // Calcular o valor convertido
        const convertedAmount = ((amount / fromRate) * toRate).toFixed(2);

        // Exibir o resultado
        document.getElementById("result").innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching exchange rates. Please try again later.");
    }
});
