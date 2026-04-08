document.getElementById("searchBtn").addEventListener("click", function () {

    var url = "https://dattebayo-api.onrender.com/characters";
    var characterName = document.getElementById("characterInput").value.toLowerCase();
    var result = document.getElementById("result");

    result.innerHTML = "";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            for (var i = 0; i < data.characters.length; i++) {

                if (data.characters[i].name.toLowerCase().includes(characterName)) {

                    var name = data.characters[i].name;
                    var image = data.characters[i].images[0];

                    var birthdate = "Ingen informasjon";
                    if (data.characters[i].personal.birthdate) {
                        birthdate = data.characters[i].personal.birthdate;
                    }

                    var traits = "Ingen informasjon";

                    if (data.characters[i].personal.uniqueTraits) {
                        traits = data.characters[i].personal.uniqueTraits.join(", ");
                    } 
                    else if (data.characters[i].personal.classification) {
                        if (Array.isArray(data.characters[i].personal.classification)) {
                            traits = data.characters[i].personal.classification.join(", ");
                        } else {
                            traits = data.characters[i].personal.classification;
                        }
                    } 
                    else if (data.characters[i].personal.kekkeiGenkai) {
                        if (Array.isArray(data.characters[i].personal.kekkeiGenkai)) {
                            traits = data.characters[i].personal.kekkeiGenkai.join(", ");
                        } else {
                            traits = data.characters[i].personal.kekkeiGenkai;
                        }
                    } 
                    else if (data.characters[i].personal.clan) {
                        traits = data.characters[i].personal.clan;
                    }

                    result.innerHTML += `
                        <div class="character-card">
                            <img src="${image}" alt="${name}">
                            <h2>${name}</h2>
                            <p><strong>Birthdate:</strong> ${birthdate}</p>
                            <p><strong>Unique Traits:</strong> ${traits}</p>
                        </div>
                    `;
                }
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "<p>Noe gikk galt.</p>";
        });
});