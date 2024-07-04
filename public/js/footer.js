const createFooter = () => {
  let footer = document.querySelector("footer");

  footer.innerHTML = `
    <hr style="height:5px;border-width:0;background-color:black">
    <div class="footer-content">
        
    </div>
    <img href="#" src="../img/furniture-logo-white-bg.gif" class="logo" alt="">
    <p class="footer-title">About furniture.com</p>
    <p class="footer-info">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
    <p class="footer-info"><b>Write us at -</b> help@furniture.com, customersupport@furniture.com</p>
    <p class="footer-info"><b>Telephone -</b> 180 00 00 001, 180 00 00 002</p>
    <div class="footer-social-container">
        <div>
            <a href="#" class="social-link"><b>terms & conditions</b></a>
            <a href="#" class="social-link"><b>privacy page</b></a>
        </div>
        <div>
            <a href="https://www.facebook.com/login/" class="social-link"><img src="../img/facebook.png" width="50" alt=""></a>
            <a href="https://www.instagram.com/" class="social-link"><img src="../img/instagram.png" width="50" alt=""></a>
            <a href="https://twitter.com/" class="social-link"><img src="../img/twitter.png" width="50" alt=""></a>
        </div>
    </div>
    `;
};

createFooter();
