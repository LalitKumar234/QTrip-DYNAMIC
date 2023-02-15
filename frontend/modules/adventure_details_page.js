import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let id;
  const searchParams = new URLSearchParams(search);
  for (const p of searchParams) {
    id = p[1];
  }
  return id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const data = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    );
    const response = await data.json();
    //console.log("res", response);
    return response;
  } catch (err) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  //console.log(adventure);

  const showImages = (image) => {
    const images = `<img class="activity-card-image" src=${image} alt="image"/>`;
    document.getElementById("photo-gallery").innerHTML += images;
  };
  adventure.images.map((image) => {
    return showImages(image);
  });

  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  document.getElementById("adventure-content").innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  //console.log(images)

  const image = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="inner">
   
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

  document.getElementById("photo-gallery").innerHTML = image;

  images.map((image) => {
    const galleryImage = `
  <div class="carousel-item">
      <img src=${image} class="d-block w-100" alt="...">
  </div>`;

    //console.log('galleryImg', image)

    document.getElementById("inner").innerHTML += galleryImage;
  });

  let carausel = document.querySelectorAll(".carousel-item");

  carausel[0].classList.add("active");
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // const soldOut = document.getElementById('reservation-panel-sold-out')
  // const available = document.getElementById('reservation-panel-available')

  console.log(adventure);
  if (adventure.available) {
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-person-cost").innerHTML =
      adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-available").style.display =
      "none";
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
  }
  // else{
  //   document.getElementById('reservation-panel-available').style.display = 'block'
  //   document.getElementById('reservation-panel-sold-out').style.display = 'none'
  // }
  // !adventure.reserved ? soldOut.style.display = 'none': soldOut.style.display = 'block'
  // adventure.reserved ? available.style.display = 'none': available.style.display = 'block'
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  //console.log(adventure, persons)
  // let cost = adventure.costPerHead
  // let newCost = cost * persons
  document.getElementById("reservation-cost").innerHTML =
    adventure.costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  //console.log(adventure);
  //const form = document.getElementById('myForm');
  //console.log(form)
  // sendData();

  const url = config.backendEndpoint+'/reservations/new';
  console.log(url)

  // const sendData = async (formData) => {
  //   return 
  // }
    let formValues = document.getElementById("myForm")

    formValues.addEventListener("submit", async (e)=>{
      e.preventDefault();
      console.log("form submitted");
      try {
        let res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            name: formValues.elements.name.value,
            date: formValues.elements.date.value,
            person: formValues.elements.person.value,
            adventure: adventure.id
          }),
          headers:{
            "Content-type": "application/json; charset=UTF-8"
          }
        });
        console.log('form submitted', res)
        alert("success")
      }catch(err){
        console.log('err', err)
        }
    })


  }


//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById('reserved-banner').style.display = 'block'
  }
  else{
    document.getElementById('reserved-banner').style.display = 'none'
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
