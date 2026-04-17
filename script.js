// ===== CONFIG =====
const BASE_URL = window.location.origin === 'file://' || window.location.hostname === 'localhost' 
  ? 'http://localhost:3000' 
  : window.location.origin;

console.log('Using BASE_URL:', BASE_URL);

// Page 1
function savePage1() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  localStorage.setItem("from", from);
  localStorage.setItem("to", to);

  window.location.href = "page2.html";
}

// Page 2
function savePage2() {
  const meet = document.getElementById("meet").value;
  const first = document.getElementById("first").value;

  localStorage.setItem("meet", meet);
  localStorage.setItem("first", first);

  window.location.href = "page3.html";
}

// Generate link
function generateLink() {
  const moment = document.getElementById("moment").value;
  const files = document.getElementById("photos").files;

  const from = localStorage.getItem("from");
  const to = localStorage.getItem("to");
  const meet = localStorage.getItem("meet");
  const first = localStorage.getItem("first");

  // Validasi data
  if (!from || !to || !meet || !first || !moment) {
    alert("Mohon lengkapi semua data sebelum generate link!");
    console.log("Missing data:", { from, to, meet, first, moment });
    return;
  }

  // Show loading indicator
  const btn = event.target;
  const originalText = btn.textContent;
  btn.textContent = "Sedang memproses...";
  btn.disabled = true;

  // Upload photos to server
  uploadPhotosToServer(files).then((photoUrls) => {
    // Create message on server
    return createMessageOnServer({
      from,
      to,
      meet,
      first,
      moment,
      photos: photoUrls
    });
  }).then((result) => {
    // Success - show the link
    const link = result.link;
    const copy = confirm("Link sudah dibuat!\n\nKlik OK untuk copy link");

    if (copy) {
      navigator.clipboard.writeText(link);
      alert("Link berhasil di copy!");
    }

    // Clear localStorage
    localStorage.clear();

    // Redirect to result page with messageId
    const messageId = result.messageId;
    window.location.href = `result.html?id=${messageId}`;
  }).catch((error) => {
    console.error("Error:", error);
    alert("Error: " + error.message);
    btn.textContent = originalText;
    btn.disabled = false;
  });
}

// Upload photos to server
async function uploadPhotosToServer(files) {
  if (files.length === 0) {
    return [];
  }

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('photos', files[i]);
  }

  try {
    console.log('Uploading to:', BASE_URL + '/api/upload');
    const response = await fetch(BASE_URL + '/api/upload', {
      method: 'POST',
      body: formData
    });

    console.log('Upload response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upload error response:', errorText);
      throw new Error('Upload gagal: ' + response.statusText);
    }

    const data = await response.json();
    console.log('Upload success, received:', data.photos.length, 'photos');
    return data.photos;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Gagal upload foto: ' + error.message);
  }
}

// Create message on server
async function createMessageOnServer(messageData) {
  try {
    console.log('Creating message on:', BASE_URL + '/api/messages');
    const response = await fetch(BASE_URL + '/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageData)
    });

    console.log('Create message response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Create message error response:', errorText);
      throw new Error('Create message gagal: ' + response.statusText);
    }

    const data = await response.json();
    console.log('Message created successfully, ID:', data.messageId);
    return data;
  } catch (error) {
    console.error('Create message error:', error);
    throw new Error('Gagal membuat pesan: ' + error.message);
  }
}

// Result page
if (window.location.pathname.includes("result.html")) {
  // Get messageId from URL
  const params = new URLSearchParams(window.location.search);
  const messageId = params.get("id");

  if (!messageId) {
    document.getElementById("slide").innerHTML = "❌ Link tidak valid atau sudah expired";
    document.getElementById("slide").classList.add("active");
    throw new Error("Message ID tidak ditemukan");
  }

  // Fetch message from server
  console.log('Fetching message ID:', messageId);
  fetch(BASE_URL + '/api/messages/' + messageId)
    .then(response => {
      console.log('Fetch response status:', response.status);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Pesan tidak ditemukan");
        } else if (response.status === 410) {
          throw new Error("Pesan sudah expired");
        }
        throw new Error("Gagal load pesan: " + response.statusText);
      }
      return response.json();
    })
    .then(message => {
      console.log('Message loaded successfully');
      initializeResultPage(message);
    })
    .catch(error => {
      console.error("Error loading message:", error);
      document.getElementById("slide").innerHTML = `❌ Error: ${error.message}`;
      document.getElementById("slide").classList.add("active");
    });

  function initializeResultPage(message) {
    const { from, to, meet, first, moment, photos } = message;

    // Build slides array with final thank you slide
    const slides = [
      `Hai ${to}...`,
      `Ini dari ${from} ❤️`,
      `Kita pertama ketemu di ${meet}`,
      `Kesan pertama aku: ${first}`,
      `${moment}`,
      photos.length > 0 ? "Ini beberapa momen kita 📸" : "Terima kasih sudah ada 💖"
    ];

    // Add final thank you slide if there are photos
    if (photos.length > 0) {
      slides.push("Terima kasih sudah ada 💖");
    }

    let index = 0;
    let isInGallery = false; // Track if currently viewing gallery
    const slideEl = document.getElementById("slide");
    const progressEl = document.getElementById("progress");
    const navHintEl = document.getElementById("navHint");
    const photosGalleryWrapper = document.getElementById("photosGalleryWrapper");
    const photosGallery = document.getElementById("photosGallery");

    // Create progress dots - include dot for gallery AND final slide
    function createProgressDots() {
      progressEl.innerHTML = '';
      const totalDots = photos.length > 0 ? slides.length + 1 : slides.length;
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'progress-dot' + (i === 0 ? ' active' : '');
        dot.onclick = (e) => {
          e.stopPropagation();
          index = i;
          isInGallery = (i === slides.length - 1 && photos.length > 0);
          showSlide();
        };
        progressEl.appendChild(dot);
      }
    }

    function updateProgressDots() {
      const dots = progressEl.querySelectorAll('.progress-dot');
      const currentDotIndex = isInGallery ? slides.length - 1 : index;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentDotIndex);
      });
    }

    // Create photo gallery
    function createPhotoGallery() {
      if (photos.length === 0) return;

      photosGallery.innerHTML = '';
      photos.forEach((photoUrl, idx) => {
        const photoEl = document.createElement('img');
        photoEl.src = photoUrl;
        photoEl.className = 'gallery-photo';
        photoEl.onclick = (e) => {
          e.stopPropagation();
          selectPhotoSlide(idx);
        };
        photosGallery.appendChild(photoEl);
      });
    }

    function selectPhotoSlide(photoIdx) {
      // Set active photo
      const photos_list = photosGallery.querySelectorAll('.gallery-photo');
      photos_list.forEach((p, i) => {
        p.classList.toggle('active', i === photoIdx);
      });

      // Show the photo in main slide
      slideEl.classList.remove("active");
      setTimeout(() => {
        slideEl.innerHTML = `<img src="${photos[photoIdx]}" class="photo">`;
        slideEl.classList.add("active");
      }, 200);
    }

    function showSlide() {
      slideEl.classList.remove("active");

      setTimeout(() => {
        // If viewing gallery
        if (isInGallery && photos.length > 0) {
          slideEl.innerHTML = `<img src="${photos[0]}" class="photo">`;
          photosGalleryWrapper.style.display = 'block';
          hideActionButtons(); // Hide buttons when viewing gallery
          
          // Mark first photo as active
          const photos_list = photosGallery.querySelectorAll('.gallery-photo');
          photos_list.forEach((p, i) => {
            p.classList.toggle('active', i === 0);
          });
        } 
        // If final slide after gallery
        else if (index === slides.length && photos.length > 0) {
          slideEl.innerHTML = "Terima kasih sudah ada 💖";
          photosGalleryWrapper.style.display = 'none';
          showActionButtons(from); // Show action buttons on final slide
        }
        // Final slide when no photos
        else if (index === slides.length - 1 && photos.length === 0) {
          slideEl.innerHTML = slides[index];
          photosGalleryWrapper.style.display = 'none';
          showActionButtons(from); // Show action buttons
        }
        // Regular text slides
        else if (index < slides.length) {
          slideEl.innerHTML = slides[index];
          photosGalleryWrapper.style.display = 'none';
          hideActionButtons(); // Hide buttons on regular slides
          
          // If this is the photos intro slide, prepare gallery for next click
          if (index === slides.length - 1 && photos.length > 0) {
            // Gallery will show on next slide
          }
        }

        slideEl.classList.add("active");
        updateProgressDots();
      }, 200);
    }

    window.nextSlide = function () {
      // If currently in gallery
      if (isInGallery && photos.length > 0) {
        // Exit gallery to final slide
        isInGallery = false;
        index = slides.length;
        showSlide();
      }
      // If on regular slides and not at end
      else if (index < slides.length - 1) {
        index++;
        showSlide();
      }
      // If on photos intro slide (slides.length - 1)
      else if (index === slides.length - 1 && photos.length > 0) {
        // Enter gallery mode
        isInGallery = true;
        showSlide();
      }
      // If on final slide, don't advance (or loop back to start)
      else if (index === slides.length && photos.length > 0) {
        // Loop back to beginning
        index = 0;
        isInGallery = false;
        showSlide();
      }
    };

    // Scroll gallery
    window.scrollGallery = function (direction) {
      const scrollAmount = 200;
      photosGallery.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    };

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        window.nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (isInGallery && photos.length > 0) {
          // Exit gallery back to photos intro slide
          isInGallery = false;
          index = slides.length - 1;
          showSlide();
        } else if (index > 0) {
          index--;
          showSlide();
        }
      }
    });

    // Hide nav hint after 5 seconds
    setTimeout(() => {
      if (navHintEl) navHintEl.style.opacity = '0';
    }, 5000);

    // Initialize
    createProgressDots();
    createPhotoGallery();
    showSlide();
  }
}

// Global variables untuk action buttons
let senderName = '';

// Function untuk show action buttons di final slide
function showActionButtons(fromName) {
  const actionButtonsEl = document.getElementById("actionButtons");
  if (actionButtonsEl) {
    actionButtonsEl.style.display = 'flex';
    senderName = fromName;
  }
}

// Function untuk hide action buttons
function hideActionButtons() {
  const actionButtonsEl = document.getElementById("actionButtons");
  if (actionButtonsEl) {
    actionButtonsEl.style.display = 'none';
  }
}

// Reply via WhatsApp
function replyViaWA() {
  const message = "Terima kasih untuk pesan dan foto-fotonya! 💖";
  const encodedMessage = encodeURIComponent(message);
  
  // Try WhatsApp Web first
  const waLink = `https://wa.me/?text=${encodedMessage}`;
  
  window.open(waLink, '_blank');
}

// Close page
function closePage() {
  // Go back or close
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.close();
  }
}