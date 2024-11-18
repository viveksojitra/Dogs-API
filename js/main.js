const dogList = document.getElementById("doglist");
const galleryBox = document.querySelector(".gallerybox");
const title = document.getElementById("title");
const noData = document.getElementById("nodata");

// Gallery
jQuery("#animated-thumbnails-gallery")
  .justifiedGallery({
    captions: false,
    lastRow: "hide",
    rowHeight: 180,
    margins: 5,
  })
  .on("jg.complete", () => {
    window.lightGallery(
      document.getElementById("animated-thumbnails-gallery"),
      {
        autoplayFirstVideo: false,
        pager: false,
        galleryId: "nature",
        plugins: [lgZoom, lgThumbnail],
        mobileSettings: {
          controls: false,
          showCloseIcon: false,
          download: false,
          rotate: false,
        },
      }
    );
  });

// Fetch Data From API
const fetchData = () => {

  fetch("https://dog.ceo/api/breeds/list/all")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      for (const key in data.message) {
        dogList.innerHTML += `<li class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button fw-semibold" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" onclick="getImages('${key}')">
                            ${key}
                        </button>
                    </h2>
                </li>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching dog breeds:", error);
    });
};

// Fetch Images From API
const getImages = (breed) => {
  const title = document.getElementById("title");
  const galleryBox = document.getElementById("galleryBox");
  const noData = document.getElementById("nodata");

  if (!title || !galleryBox || !noData) {
    console.error("One or more required elements are missing from the DOM.");
    return;
  }

  title.innerHTML = `<h4>${breed}</h4>`;
  console.log("Breed", breed);

  galleryBox.innerHTML = "";

  fetch(`https://dog.ceo/api/breed/${breed}/images`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Bad Request");
      }
      return response.json();
    })
    .then((images) => {
      console.log("Images", images);

      // Images
      if (images.message && images.message.length > 0) {
        noData.style.display = "none";
        images.message.forEach((img) => {
          galleryBox.innerHTML += `
            <a data-lg-size="1600-1067" class="gallery-item" data-src="${img}">
              <img class="img-size img-responsive" src="${img}" alt="Dog Image" />
            </a>`;
        });
      } else {
        noData.style.display = "flex";
      }
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
      noData.style.display = "flex";
    });
};

fetchData();