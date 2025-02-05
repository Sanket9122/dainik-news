const Apikey = '731b819792fa41e385dd5eca847d8d72';
const blogcontainer = document.getElementById("blog-container");

async function fetchRandomNews() {
    try {
        const Apiurl = `https://newsapi.org/v2/top-headlines?country=wholeworld&pagesize=14&apiKey=${Apikey}`;
        const response = await fetch(Apiurl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching", error);
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
        title.textContent = article.title;
        const description = document.createElement("p");
        description.textContent = article.description;
 blogcard.appendChild(img);
        blogcard.appendChild(title);
        blogcard.appendChild(description);
        blogcontainer.appendChild(blogcard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        console.log(articles);
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching", error);
    }
})();
