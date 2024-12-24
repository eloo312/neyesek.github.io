// Form gönderildiğinde çalışacak fonksiyon
document.getElementById("surveyForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Kullanıcının verdiği bilgiler
    const age = document.getElementById("age").value;
    const height = document.getElementById("height").value;
    const health = document.getElementById("health").value;
    const foodPreference = document.getElementById("food_preference").value;
    const sleep = document.getElementById("sleep").value;

    // API'ye gönderilecek kullanıcı verisi
    const userData = {
        age: age,
        height: height,
        health: health,
        foodPreference: foodPreference,
        sleep: sleep
    };

    // API'ye istek gönderme
    fetch('https://api.gemini.com/suggestions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer AIzaSyBiHaFjexsI6notNJRonmLszxw8jZXVS5U'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        // API'den gelen veriyi işleyip, önerileri ekrana yazdırma
        displaySuggestions(data);
    })
    .catch(error => {
        console.error('API Hatası:', error);
    });
});

// API'den gelen önerileri ekrana yazdırma fonksiyonu
function displaySuggestions(data) {
    // Yiyecek önerilerini göster
    document.getElementById("food_suggestion").innerHTML = `
        <h3>Yiyecekler:</h3>
        <ul>
            ${data.food.map(food => `<li>${food.name} - ${food.description}</li>`).join("")}
        </ul>
    `;
    
    // İçecek önerilerini göster
    document.getElementById("drink_suggestion").innerHTML = `
        <h3>İçecekler:</h3>
        <ul>
            ${data.drink.map(drink => `<li>${drink.name} - ${drink.description}</li>`).join("")}
        </ul>
    `;
    
    // Bitki önerilerini göster
    document.getElementById("plant_suggestion").innerHTML = `
        <h3>Bitkiler:</h3>
        <ul>
            ${data.plant.map(plant => `<li>${plant.name} - ${plant.description}</li>`).join("")}
        </ul>
    `;
}