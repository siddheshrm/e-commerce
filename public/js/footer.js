const loadFontAwesome = () => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
  document.head.appendChild(link);
};

const createFooter = () => {
  loadFontAwesome();

  const footer = document.querySelector("footer");

  footer.innerHTML = `
      <div class="footer-content">
          <p class="footer-title">About e-commerce.com</p>
          <p class="footer-info">Welcome to <b>e-commerce.com</b>, your one-stop online shopping destination. We offer a wide range of products at unbeatable prices, ensuring you find exactly what you need. Our mission is to provide a seamless and enjoyable shopping experience, with quality products and excellent customer service.</p>
          <p class="footer-info"><strong>Write us at -</strong> help@e-commerce.com, customersupport@e-commerce.com</p>
          <p class="footer-info"><strong>Telephone -</strong> 180 00 00 001, 180 00 00 002</p>
          <div class="footer-social-container">
              <div>
                  <a href="#" class="footer-link"><strong>Terms & Conditions</strong></a>
                  <a href="#" class="footer-link"><strong>Privacy Page</strong></a>
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
