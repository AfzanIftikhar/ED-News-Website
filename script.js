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





let index = 0

function showslide() {
    let slider = document.querySelector(".carousel-track")
    slider.style.transform = `translateX(-${index * 100}%)`
}

function nextslide() {
    index = (index + 1) % 3
    showslide()
}

setInterval(() => {

    nextslide()

}, 8000)


const carouselTrack = document.querySelector(".carousel-track");


 function loadCarousel() {


apikey = '26571c2d9dced683ee620dcf7f510a31';
category = 'general';
API_URL = 'https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=en&country=us&max=10&apikey=' + apikey;


     fetch(API_URL)
        .then((rawData) => rawData.json())
        .then((data) => {
            console.log(data)

            carouselTrack.innerHTML = "";

            data.articles.slice(-3).forEach(article => {
                // Create slide
                const slide = document.createElement("div");
                slide.classList.add("slide");

                // Image
                const img = document.createElement("img");
                img.src = article.image;
                img.alt = article.title;

                // Caption
                const caption = document.createElement("div");
                caption.classList.add("caption");

                const h2 = document.createElement("h2");
                h2.textContent = article.title;

                const p = document.createElement("p");
                p.textContent = article.description || "No description available.";

                // Build structure
                caption.appendChild(h2);
                caption.appendChild(p);

                slide.appendChild(img);
                slide.appendChild(caption);

                carouselTrack.appendChild(slide);


            })
        })
        .catch(err => console.log(err))


}

loadCarousel()




 function loadNews() {
  const cardsContainer = document.querySelector(".testimonialCards");
  const API_KEY = "26571c2d9dced683ee620dcf7f510a31";
  const API_URL = `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=en&max=6`;

  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const articles = data.articles || [];
      cardsContainer.innerHTML = ""; 

      articles.forEach(article => {
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = article.image || "fallback.jpg";
        img.alt = article.title || "News";

        const textDiv = document.createElement("div");
        textDiv.className = "text";

        const h2 = document.createElement("h2");
        h2.textContent = article.title;

        const p = document.createElement("p");
        p.textContent = article.description || "No description.";

        const a = document.createElement("a");
        a.href = article.url;
        a.textContent = "Read more";
        a.target = "_blank";

        textDiv.append(h2, p, a);
        card.append(img, textDiv);
        cardsContainer.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Error fetching news:", err);
      cardsContainer.innerHTML = "<p>Failed to load news.</p>";
    });
}


loadNews();



async function loadNewsVideos(){

  const videoAPI = "AIzaSyCCJtQPmtWdUza0xhUhPPcANyApRV4Rzwk";

  const Videos_API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=date&channelId=UC16niRr50-MSBwiO3YDb3RA&maxResults=6&key=${videoAPI}`;

  await fetch(Videos_API_URL)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    let videos = document.querySelector(".videos1")

    data.items.forEach(item => {

      let videoId = item.id.videoId
      let title = item.snippet.title


      let div = document.createElement("div")
      div.classList.add("headline1")


      const iframe = document.createElement("iframe");
      iframe.width = "400";
      iframe.height = "215";
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allowfullscreen", "true");

       // Create title
      const h1 = document.createElement("p");
      h1.textContent = title;

      div.appendChild(iframe);
      div.appendChild(h1);

    videos.appendChild(div);
    });

  })
  .catch(err => console.log(err))



}



loadNewsVideos()



const API_KEY = "6f7aaf41379d493c8eb50c4b58ba45f2";//newsAPI key
async function loadTopheadlines() {

    let cards_Container = document.querySelector(".news-cards")
    const API_URL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=6&apiKey=${API_KEY}`;
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

loadTopheadlines()



async function mostRead() {


    let mostRead = document.querySelector("#MostRead")
    

   let APIurl = `https://newsapi.org/v2/everything?q=news&language=en&sortBy=publishedAt&pageSize=7&apiKey=${API_KEY}`;


    await fetch(APIurl)
        .then(res => res.json())
        .then(data => {
            mostRead.innerHTML = ""

            data.articles.forEach(article => {
                
                
                
                const li = document.createElement("li");
                li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
                
                
                mostRead.appendChild(li);
            });
        
        
        })




        .catch(err => console.log(err))


}

mostRead()




async function latestNews(){


    let latestNews = document.querySelector(".latestNews")
    latestNews.innerHTML = ""

    let API_URL = `https://newsapi.org/v2/everything?q=news&language=en&sortBy=publishedAt&pageSize=5&apiKey=${API_KEY}`

    await fetch(API_URL)
    .then(res => res.json())
    .then(data => {

        
    
           data.articles.forEach(article => {
                const li = document.createElement("li");
                li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
                latestNews.appendChild(li);
            });
        
    
    })
    .catch(err => console.log(err))



}


latestNews()



async function SportsNews() {


    let SportsNews = document.querySelector(".SportsNews")

    SportsNews.innerHTML = ""

    await fetch(`https://newsapi.org/v2/top-headlines?category=sports&language=en&pageSize=5&apiKey=${API_KEY}
`)
    .then(res => res.json())
    .then(data => {

        data.articles.forEach(article => {
              const li = document.createElement("li");
                li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
                SportsNews.appendChild(li);
        })

    })


}
SportsNews()



