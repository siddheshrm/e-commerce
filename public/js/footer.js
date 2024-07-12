const loadFontAwesome = () => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
  document.head.appendChild(link);
};

const createFooter = () => {
  loadFontAwesome();

  let footer = document.querySelector("footer");

  footer.innerHTML = `
      <div class="footer-content">
          <p class="footer-title">About furniture.com</p>
          <p class="footer-info">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit."</p>
          <p class="footer-info"><b>Write us at -</b> help@furniture.com, customersupport@furniture.com</p>
          <p class="footer-info"><b>Telephone -</b> 180 00 00 001, 180 00 00 002</p>
          <div class="footer-social-container">
              <div>
                  <a href="#" class="social-link"><b>Terms & Conditions</b></a>
                  <a href="#" class="social-link"><b>Privacy Page</b></a>
              </div>
              <div>
                  <a href="https://www.facebook.com/login/" class="social-link" target="_blank"><i class="fa-brands fa-facebook"></i></a>
                  <a href="https://www.instagram.com/" class="social-link" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                  <a href="https://twitter.com/" class="social-link" target="_blank"><i class="fa-brands fa-twitter"></i></a>
              </div>
          </div>
      </div>
    `;
};

createFooter();
