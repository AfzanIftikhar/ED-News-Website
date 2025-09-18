let menu = document.querySelector("#menu")
let close = document.querySelector("#close")

let response = document.querySelector(".response")

let tl = gsap.timeline({ paused: true })
tl.from(".response", {
    y: -200,
    duration: 0.8,
    opacity: 0

})
tl.from(".response ul li", {
    x: 200,
    duration: 0.6,
    opacity: 0,
    stagger: 0.3
})

menu.addEventListener("click", () => {
    response.style.display = "block"
    tl.play()

})


close.addEventListener("click", () => {
    tl.reverse()
    tl.eventCallback("onReverseComplete", () => {
        response.style.display = "none";
    });
})



let API_Key = '6f7aaf41379d493c8eb50c4b58ba45f2'


async function heroNews(){
    let API_URL =  `https://newsapi.org/v2/top-headlines?category=sports&language=en&pageSize=10&apiKey=${API_Key}`;

    let container = document.querySelector(".hero")

    await fetch(API_URL)
    .then(res => res.json())
    .then(data =>{
       

        let articles = data.articles[0]

        // Create parent div
          const heroSection = document.createElement("div");
          heroSection.classList.add("hero-section");

          // Create image
          const img = document.createElement("img");
          img.src = articles.urlToImage || "https://via.placeholder.com/300";
          img.alt = "news image";

          // Create text container
          const heroText = document.createElement("div");
          heroText.classList.add("hero-text");

          // Create clickable title
          const title = document.createElement("a");
          title.href = articles.url;
          title.target = "_blank";
          title.textContent = articles.title;

          // Create description
          const desc = document.createElement("p");
          desc.textContent = articles.description || "No description available.";

          // Append children
          heroText.appendChild(title);
          heroText.appendChild(desc);
          heroSection.appendChild(img);
          heroSection.appendChild(heroText);
          container.appendChild(heroSection);



    })
    .catch(err => console.log(err) )

}
heroNews()



let dropDown = document.getElementById("sportsFilter");

async function loadTopheadlines(sport) {

    let cards_Container = document.querySelector(".news-cards")
    cards_Container.innerHTML = "";
    const API_URL = `https://newsapi.org/v2/everything?q=${sport}&language=en&sortBy=publishedAt&pageSize=6&apiKey=${API_Key}`;
    await fetch(API_URL)
        .then(res => res.json())
        .then(data => {


            // Create main card
            data.articles.forEach(article => {


                const card = document.createElement("div");
                card.classList.add("news-card");

                // Create image
                const img = document.createElement("img");
                img.src = article.urlToImage; // replace with API image
                img.alt = "news image";

                // Create text wrapper
                const textDiv = document.createElement("div");
                textDiv.classList.add("news-text");

                // Headline
                const h3 = document.createElement("h3");
                h3.textContent = article.title;

                // Description
                const p = document.createElement("p");
                p.textContent = article.description || "No description available.";

                // Read More link
                const link = document.createElement("a");
                link.href = article.url; // replace with API article URL
                link.textContent = "Read more";

                // Append elements inside textDiv
                textDiv.appendChild(h3);
                textDiv.appendChild(p);
                textDiv.appendChild(link);

                // Append image + textDiv inside card
                card.appendChild(img);
                card.appendChild(textDiv);

                // Finally, add card to container
                cards_Container.appendChild(card);


            });


        })
        .catch(err => console.log(err))




}

loadTopheadlines("football")


dropDown.addEventListener("change", function (e) {

    let h2 = document.querySelector(".leftSide_header")
    h2.innerText = e.target.value
   loadTopheadlines(e.target.value)

   console.log(e)


})






async function latestNews(sport){


    
     let Tech = document.querySelector("#Tech")
    Tech.innerHTML = ""


    const API_URL = `https://newsapi.org/v2/everything?q=${sport}&language=en&sortBy=publishedAt&pageSize=6&apiKey=${API_Key}`;

    await fetch(API_URL)
    .then(res => res.json())
    .then(data => {

        console.log(data)
    
           data.articles.forEach(article => {
                const li = document.createElement("li");
                li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
                Tech.appendChild(li);
            });
        
    
    })
    .catch(err => console.log(err))



}


latestNews("football")
dropDown.addEventListener("change", function (e) {

    let h2 = document.querySelector(".rightSide_Header")
    h2.innerText = `${e.target.value} News`
   latestNews(e.target.value)

   console.log(e)


})