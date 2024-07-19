const loadFontAwesome = () => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
  document.head.appendChild(link);
};

const createFooter = () => {
  loadFontAwesome();

  const footer = document.querySelector("footer");

  footer.innerHTML = `
      <div class="footer-content">
          <p class="footer-title">About e-commerce.com</p>
          <p class="footer-info">At e-commerce.com, we believe in transforming houses into homes with our unique and high-quality furniture. Our collection ranges from contemporary to classic designs, ensuring there's something for every taste and style. With a commitment to sustainability and customer satisfaction, we aim to provide furniture that not only looks great but also stands the test of time. Explore our curated selections and find the perfect pieces to elevate your living spaces.</p>
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
