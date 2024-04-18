const categorySelect = document.getElementById("category");
const getButton = document.getElementById("get-button");
const gallery = document.querySelector(".gallery");
const favouriteButton = document.getElementById("get-favourites");
const API_URL = "https://api.thecatapi.com";
const API_KEY = "live_1IXp8S6YiNrA9neE9bs62dNfblZA7sMjqqNfGgJICst9hhXff0FxV5mcoPnNgSKE"; // your API key goes here;
const categoryAPI = "https://api.thecatapi.com/v1/categories";
const searchAPI = "https://api.thecatapi.com/v1/images/search?limit=9&category_ids=";
const getFavouriteAPI = "https://api.thecatapi.com/v1/favourites?limit=9&sub_id=user-123&order=DESC";

let categoryIdList = [];
let count = 0;

categoryOptions();

getButton.addEventListener("click", function(){
  if(count>0){
    removeGalleryItems();
  }
  let index = categorySelect.selectedIndex;
  searchCatImages(categoryIdList[index]);
  count = count+1;
})

favouriteButton.addEventListener("click", function(){
  if(count>0){
    removeGalleryItems();
  }
    getFavourites();
    count = count+1;
})

/*-------- Get the Categories and populate the dropdown --------*/ 
async function categoryOptions(){
const response = await fetch(categoryAPI, {headers:{'x-api-key':API_KEY}});

const dataCategory = await response.json();

  for (let i=0; i<dataCategory.length; i++){
    /*----Category Id----*/ 
    let categoryId = dataCategory[i]["id"];
    categoryIdList.push(categoryId);

    /*----Category Name----*/ 
    let categoryName = dataCategory[i]["name"];

    let newOption = document.createElement("option");
    categorySelect.appendChild(newOption);

    newOption.value = categoryName;
    newOption.innerHTML = categoryName;
  }
}

/*-------- Get the image of the selected category --------*/
async function searchCatImages(idCategory){
  try{
      const response = await fetch(searchAPI+idCategory, {headers:{'x-api-key':API_KEY}});
      const dataSearch = await response.json();

        for (let i=0; i<dataSearch.length; i++){
          showGallery(dataSearch, i)
        }
  } 
  catch (error) {
      console.error(error);
  }
}

/*-------- Show images --------*/
function showGallery(dataSearch, i){

    /*--Populate the gallery--*/
  let galleryDiv = document.createElement("div");
  gallery.appendChild(galleryDiv);
  galleryDiv.className = "gallery-item";

  let catImages = document.createElement("img");
  galleryDiv.appendChild(catImages);
  catImages.src = dataSearch[i].url || dataSearch[i].image.url;
  catImages.id = dataSearch[i].id;

  /*--Append the heart--*/
  const heart = document.createElement("span");
  heart.classList.add("heart");
  heart.innerHTML = "&#x2764;";

  galleryDiv.appendChild(heart);
  galleryDiv.addEventListener("click", addToFavourite);
}

/*-------- Remove images --------*/
function removeGalleryItems(){
  let galleryItems = document.getElementsByClassName("gallery-item");

  for(let i=8; i>=0;i--){
    gallery.removeChild(galleryItems[i]);
  }
}

/*-------- Show Heart in image --------*/
async function addToFavourite(e) {
  e.currentTarget.classList.toggle("showheart");
  let idName= e.target.getAttribute("id");  
  try{
    const newFavourite = await fetch("https://api.thecatapi.com/v1/favourites", 
          {
              method: 'POST',
              headers: {"content-type":"application/json", 'x-api-key':API_KEY} ,
              body: JSON.stringify({ 
                    image_id: idName,
                    sub_id:"user-123"})
          })
  }
  catch(error){
    console.log('Error:', error);
  }
}  

/*-------- Get the favourites images selected --------*/
async function getFavourites(){
  try {
      const response = await fetch(getFavouriteAPI, 
      {headers:{"content-type":"application/json",'x-api-key': API_KEY}})
      const dataSearch = await response.json();

      for (let i=0; i<dataSearch.length; i++){
        showGallery(dataSearch, i);
      }
   } 
  catch (error) {
    console.error(error);
  }
}

