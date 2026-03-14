import "../css/footer.css"

function Footer(){

  return(

    <footer className="footer">

      <div className="footer-content">

        <h3>SmartSpend</h3>

        <p>Track • Analyze • Improve Your Spending</p>

        <div className="social-icons">

          <a href="https://www.instagram.com/pandey.ji__800/" target="_blank">
            <i className="fab fa-instagram"></i>
          </a>

          <a href="https://github.com/ajaypandey1807" target="_blank">
            <i className="fab fa-github"></i>
          </a>

          <a href="https://www.linkedin.com/in/ajay-pandey-4141462a4/" target="_blank">
            <i className="fab fa-linkedin"></i>
          </a>

          <a href="https://www.facebook.com/ajaypandey4976" target="_blank">
            <i className="fab fa-facebook"></i>
          </a>

          <a href="https://x.com/AjayPan04531465" target="_blank">
            <i className="fab fa-x-twitter"></i>
          </a>

        </div>

        <p className="copyright">
          © 2026 SmartSpend
        </p>

      </div>

    </footer>

  )

}

export default Footer