function searchGitHubUsers(query){
    const url = 'https://api.github.com/search/users?q=${query}';
    fetch(url , {
        headers : {
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(data =>{
        const users = data.items;
        const resultsContainer = document.getElementById("results-container");

        resultsContainer.innerHTML = "";

        users.forEach(user => {
            const userContainer = document.createElement("div");
            userContainer.classList.add("user-container");

            const avatar = document.createElement("img");
            avatar.src = user.avatar_url;
            avatar.alt = `${user.login}'s avatar`;

            const username = document.createElement("p");
            username.textContent = user.login;

            userContainer.appendChild(avatar);
            userContainer.appendChild(username);

            resultsContainer.appendChild(userContainer);
        });
    })
    .catch(error =>{
        console.error("Error:" , error);
    });
}

document.getElementById("github-form").addEventListener("submit" , function(event){
    event.preventDefault();

    const query = document.getElementById("search").ariaValueMax;
    searchGitHubUsers(query);
});