import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // getCityFromURL("?city=bengaluru")
  let id;
  const searchParams = new URLSearchParams(search);
  for (const p of searchParams) {
    id = p[1];
    //console.log(id)
  }
  return id;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const data = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    const response = await data.json();
    //console.log("res",response)
    return response;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  //console.log(adventures)
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  adventures.map((adventure) => {
    add(
      adventure.category,
      adventure.costPerHead,
      adventure.currency,
      adventure.duration,
      adventure.id,
      adventure.image,
      adventure.name
    );
    //console.log((adventure.category, adventure.costPerHead, adventure.currency, adventure.duration, adventure.id, adventure.image, adventure.name))
  });
  //console.log(adventures)

  function add(category, costPerHead, currency, duration, id, image, adname) {
    //console.log(category, costPerHead, currency, duration, id, image, adname)
//     const markup = `
//     <div class="col-6 col-lg-3">
//             <a href="detail/?adventure=${id}" id="${id}">
//                 <div class="activity-card">
//                     <div class="category-banner">${category}</div>
//                     <img src="${image}">
//                     <div class="details d-flex flex-column">
//                         <div class="price d-flex justify-content-between name">
//                             <p>${adname}<p>
//                             <p>${currency} ${costPerHead}</p>
//                         </div>
//                         <div class="duration d-flex justify-content-between price">
//                             <p>Duration<p>
//                             <p>${duration} Hours</p>
//                         </div>
//                     </div>
//                 </div>
//               </a>
//             </div>
// `;
const markup=`
<div class="col-6 col-lg-3 mb-5">
<a href="detail/?adventure=${id}" id="${id}">
<p class="category-banner">${category}</p>
            <div class="activity-card">
            <img src="${image}" alt="${adname}">
              <div style="width: 100%;" >
                <div class="d-flex justify-content-between px-2">
                  <h5>${adname}</h5>
                  <p>${currency} ${costPerHead}</p>
                  </div>
                  <div class="d-flex justify-content-between px-2">
                    <h5>Duration</h5>
                    <p>${duration} Hours</p>
                    </div>
              </div>
              
            </div>
          </a>
          </div>`
          
    document.getElementById("data").innerHTML += markup;
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  let lowVal = Number(low);
  let highVal = Number(high);
  console.log(lowVal, highVal);
  let filteredListByDuration = list.filter(
    (fDuration) => fDuration.duration >= lowVal && fDuration.duration <= highVal
  );
  console.log(filteredListByDuration);
  return filteredListByDuration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredListByCategory = list.filter((ele) => {
    return categoryList.find((category) => {
      return ele.category === category;
    });
  });

  return filteredListByCategory;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // Place holder for functionality to work in the Stubs

  if (filters.duration !== "") {
    let fDuration = filters.duration;
    let myArr = fDuration.split("-");
    return filterByDuration(list, myArr[0], myArr[1]);
  } else if (filters.category.length !== 0) {
    let fCategory = filters.category;
    return filterByCategory(list, fCategory);
  } else if (filters.category.length !== 0 && filters.duration !== "") {
    let fCategory = filters.category;
    let fDuration = filters.duration;
    let myArr = fDuration.split("-");
    return (
      filterByCategory(list, fCategory),
      filterByDuration(list, myArr[0], myArr[1])
    );
  } else {
    return list;
  }
  // else if(filters.duration !== ''){
  //  let fDuration = filters.duration;
  //  let myArr = fDuration.split("-")
  //  return filterByDuration(list, myArr[0], myArr[1])
  // }
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filterdData = localStorage.getItem("filters");
  let filters = JSON.parse(filterdData)
  console.log("filters from local: ", JSON.parse(filterdData));
  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  // console.log("pills",filters)

  filters.category.map((pill)=>{
    document.getElementById('category-list').innerHTML += `<div class="category-filter">${pill}</div>`
  })
  
  document.getElementById('duration-select').value = filters.duration
  // document.getElementById("category-list").children = filters.category
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
