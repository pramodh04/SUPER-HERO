
const input = document.getElementById("name");
const results = document.getElementById("results");
// console.log(input);
// debounce function
const debounce = (func,delay) =>{
let timer;

const debounced= () =>{
   clearTimeout(timer);
   timer = setTimeout(func,delay);
}
return debounced;
}

let heroes;
let heroeslist;
async function getdata()
{
   let hero = "";
   hero = input.value;
//    console.log(hero);
  
   const response = await fetch(`https://superheroapi.com/api.php/3050188658585764/search/${hero}`,{
    method:"GET",
    headers:{
        "Content-Type":"application/json",
    },
   });
   heroes = await response.json();
   heroeslist = heroes.results;
   results.innerHTML = "";
 
   heroeslist.map((superhero,id) => {
       results.innerHTML += ` <li class="list-item" >
       <div class="search-card">
       <div>
       <img src=${superhero.image.url} alt="superhero-image" class="search-img"/>
       </div>
       <div class="search-info">
       <h4 id="search-title">${superhero.name}</h4>
       <div >
       <a href="details.html" class="search-btn" data-index=${id}>Search</a>
       </div>
       <div >
       <button class="favorite-btn" data-index=${id}>Add to Favourites<button>
       <div>
       </div>
        </div> 
        </li>
     `
  });
  
  
};
input.addEventListener("input",debounce(getdata,300));


//  const favorite = document.querySelectorAll(".favorite-btn");
//  console.log(favorite);
let favoriteherolist=[];

const addfavotite_viewdetails=(e)=>{
    const favorite_btn = e.target;
    
    if(favorite_btn.classList.contains("favorite-btn"))
     {  
        favorite_btn.classList.add('added');
        const searchindex = favorite_btn.dataset.index;
        
        const favoritehero = heroeslist[searchindex];
        console.log("hero:",favoritehero);
         const getlocalstorage = localStorage.getItem("favoriteherolist");
        
        //  console.log(getlocalstorage);
         if(getlocalstorage == null || getlocalstorage == "")
         favoriteherolist = [];
         else
         {
            favoriteherolist = JSON.parse(getlocalstorage);
            console.log("list:",favoriteherolist);
            let index = favoriteherolist.findIndex((hero)=>hero.id == favoritehero.id);
            console.log("index:",index);
            if(index != -1)
            return alert("already , Added to favourite list! ");
         }
         favoriteherolist.push(favoritehero);
        
        localStorage.setItem("favoriteherolist",JSON.stringify(favoriteherolist));
        // localStorage.clear();
     }
     if(favorite_btn.classList.contains("search-btn"))
     {
      // add to local storage
      console.log(favorite_btn);
         const selectid = favorite_btn.dataset.index;
         console.log(selectid);
         const selectedhero = heroeslist[selectid];
        console.log(selectedhero);
       localStorage.setItem('selectedhero',JSON.stringify(selectedhero));
     }
    
}

results.addEventListener("click",addfavotite_viewdetails);

// to view information if selected hero





























// const favorites = document.querySelector(".favorites");
// console.log(favorites);
// const favorite_btn = document.getElementById("favorite");

// const getfavorites = () =>{
//     const getlocalstorage =JSON.parse(localStorage.getItem("favoriteherolist")); 
//     getlocalstorage.map((hero)=>{
//         favorites.innerHTML += `<div class="favorite-card">
//         <img src=${hero.image.url} />
//         <h3>${hero.name}<h3/>
//         <div>`;
//     })     
// }

// favorite_btn.addEventListener("click",getfavorites);
// console.log(favorite_btn);

