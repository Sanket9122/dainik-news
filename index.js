const Apikey = "731b819792fa41e385dd5eca847d8d72";
const blogcontainer = document.getElementById("blog-container");
const searchfield = document.getElementById('search-input');
const searchbtn = document.getElementById("search-btn");

async function fetchrandomnews() {
    try {
        const Apiurl = `https://newsapi.org/v2/top-headlines?country=us&pagesize=14&apikey=${Apikey}`;
        const response = await fetch(Apiurl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("error fetching", error);
        return [];
    }
}

searchbtn.addEventListener('click', async () => {
    const query = searchfield.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsquery(query);
            displayBlogs(articles);
        } catch (error) {
            console.log("error fetched 404", error);
        }
    }
});

async function fetchNewsquery(query) {
    try {
        const Apiurl = `https://newsapi.org/v2/everything?q=${query}&pagesize=14&apikey=${Apikey}`;
        const response = await fetch(Apiurl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("error fetching", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogcontainer.innerHTML = "";
    articles.forEach((article) => {
        const blogcard = document.createElement("div");
        blogcard.classList.add("blog-card");
        
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedtitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
        title.textContent = truncatedtitle;

        const description = document.createElement("p");
        const truncatedDes = article.description.length > 100 ? article.description.slice(0, 100) + "..." : article.description;
        description.textContent = truncatedDes;

        blogcard.appendChild(img);
        blogcard.appendChild(title);
        blogcard.appendChild(description);

        blogcard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });

        blogcontainer.appendChild(blogcard);
    });
}

(async () => {
    try {
        const articles = await fetchrandomnews();
        console.log(articles);
        displayBlogs(articles);
    } catch (error) {
        console.error("error fetching", error);
    }
})();
