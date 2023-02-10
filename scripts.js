const movies = [
  { title: "The Shawshank Redemption", genre: "Drama" },
  { title: "The Godfather", genre: "Crime" },
  { title: "The Godfather: Part II", genre: "Crime" },
  { title: "The Dark Knight", genre: "Action" },
  { title: "12 Angry Men", genre: "Drama" },
  { title: "Schindler's List", genre: "Drama" },
  { title: "The Lord of the Rings: The Return of the King", genre: "Adventure" },
  { title: "Pulp Fiction", genre: "Crime" },
  { title: "The Good, the Bad and the Ugly", genre: "Western" },
  { title: "Fight Club", genre: "Drama" },
  { title: "Forrest Gump", genre: "Drama" },
  { title: "Inception", genre: "Action" },
  { title: "The Lord of the Rings: The Fellowship of the Ring", genre: "Adventure" },
  { title: "Star Wars: Episode V - The Empire Strikes Back", genre: "Action" },
  { title: "The Lord of the Rings: The Two Towers", genre: "Adventure" },
  { title: "The Matrix", genre: "Action" },
  { title: "Goodfellas", genre: "Crime" },
  { title: "One Flew Over the Cuckoo's Nest", genre: "Drama" },
  { title: "Seven Samurai", genre: "Adventure" },
  { title: "Se7en", genre: "Crime" },
  { title: "City of God", genre: "Crime" },
  { title: "The Silence of the Lambs", genre: "Thriller" },
  { title: "It's a Wonderful Life", genre: "Drama" },
  { title: "Life is Beautiful", genre: "Comedy" },
  { title: "The Usual Suspects", genre: "Crime" },
  { title: "Léon: The Professional", genre: "Action" },
  { title: "Spirited Away", genre: "Animation" },
  { title: "Saving Private Ryan", genre: "Drama" },
  { title: "Interstellar", genre: "Adventure" },
  { title: "The Green Mile", genre: "Drama" },
  { title: "The Prestige", genre: "Drama" },
  { title: "The Intouchables", genre: "Comedy" },
  { title: "The Lion King", genre: "Animation" },
  { title: "The Pianist", genre: "Drama" },
  { title: "The Departed", genre: "Crime" },
  { title: "Whiplash", genre: "Drama" },
  { title: "Gladiator", genre: "Action" }
]

let list;

const titleInput = document.getElementById('title');
const genreInput = document.getElementById('genre');
const ulContainer = document.getElementById('results');
const selectBy = document.getElementById('search-by')

const searchByTitle = (query, movies)=>{

    if(query == ""){
        list = [];
        return list;
    }
    query = query.toLowerCase();
    list = movies.filter((movie)=>{
        return movie.title.toLowerCase().includes(query);
    })
    return list
}

const searchByGenre = (query, movies)=>{

    if(query == ""){
        list = [];
        return list;
    }
    query = query.toLowerCase();
    list = movies.filter((movie)=>{
        return movie.genre.toLowerCase().includes(query)
    })
    return list
}

const displayResults = (list)=>{

    ulContainer.innerHTML = "";
    if(list.length === 0){
        ulContainer.innerHTML = `<li class='list-item' style="color:red;">There are no results</li>`
    }else{
        let disp =  list.map((movie)=>{
            return `${movie.title}(${movie.genre})`
        })
        let text = "";
        for(let str of disp)text += (`<li class='list-item'>${str}</li>`)
        ulContainer.innerHTML = text;
    }
    const results = countByGenre(list);
    for(let key of Object.keys(results)){
        ele = document.getElementById(key);
        ele.innerText = results[key];
        ele.style.width = `${results[key] * 20 + 20}px`;
    }
}
// console.log(list.sort((a,b)=>a.title.localeCompare(b.title)))

const sortByTitle = ()=>{
    if(list.length < 2)return;
    list.sort((a,b)=>a.title.localeCompare(b.title))
    displayResults(list);
}

const sortByGenre = ()=>{
    if(list.length < 2)return;
    list.sort((a,b)=>a.genre.localeCompare(b.genre))
    displayResults(list);
}

const countByGenre = (arr)=>{
    const count = {
        action: 0,
        adventure: 0,
        animation: 0,
        comedy: 0,
        crime: 0,
        drama: 0,
        thriller: 0,
        western: 0
    };
    for(let movie of arr){
        let key = movie.genre.toLowerCase();
        count[key]++;
    }
    return count;
}

const helperFunc = ()=>{
    let titlequery = titleInput.value;
    let genrequery = genreInput.value;
    let searchBy = selectBy.value;
    console.log(titlequery, genrequery)
    if(searchBy === 'all'){
        list = movies;
    }else if(searchBy === 'genre'){
        searchByGenre(genrequery, movies);
    }else if(searchBy === 'title'){
        searchByTitle(titlequery, movies);
    }else{
        searchByTitle(titlequery, movies);
        searchByGenre(genrequery, list);
    }
    displayResults(list);
    localStorage.setItem('list', JSON.stringify(list));
}

let stored = localStorage.getItem('list');
if(stored){
    list = JSON.parse(stored);
    displayResults(list);
}

document.getElementById('search').addEventListener('click', helperFunc)

document.getElementById('title-sort').addEventListener('click', sortByTitle);
document.getElementById('genre-sort').addEventListener('click', sortByGenre);

