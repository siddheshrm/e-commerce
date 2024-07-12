const createFooter = () => {
  let footer = document.querySelector("footer");

  footer.innerHTML = `
      <div class="footer-content">
          <!-- <img href="#" src="../img/furniture-logo-white-bg.gif" class="logo" alt="logo"> -->
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
                  <a href="https://www.facebook.com/login/" class="social-link" target="_blank"><img src="../img/facebook.png" width="50"></a>
                  <a href="https://www.instagram.com/" class="social-link" target="_blank"><img src="../img/instagram.png" width="50"></a>
                  <a href="https://twitter.com/" class="social-link" target="_blank"><img src="../img/twitter.png" width="50"></a>
              </div>
          </div>
      </div>
    `;
};

createFooter();
