import React from "react";
import logo from "../images/logo.png"
import kargo from "../images/kargo.png";
import shop from "../images/shop.png";
import {Link} from 'react-router-dom';


const About = () => {
  return(
  <div className="aboutus">
    <header className="mynavbar">
    <Link to='/'><img class="logo" src={logo} alt="logo" /> </Link>
      <ul>  
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/about'>About Us</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
      </ul>
    </header>
  
    <div class="resim1">
      <img src={kargo}/>

      <p>İstediğiniz an size özel oluşturulan hesap üzerinden sistemimizde kayıtlı mağazanız için ürün sipariş verebilir veya otomatik sipariş özelliğini kullanabilirsiniz.Sistemimiz mağaza,ürün ve depo bilgilerinizi ayrıntılı bir şekilde kayıt altında tutacaktır ve aynı zamanda birden fazla şubeniz için de kontrolleri sağlayabilecektir.Siparişinizin teslimat sürecini de aktif olarak takip edebilirsiniz. </p>

    </div>
    <div class="resim2">
      <img src={shop} class="1" alt="kargo"/>
        <p>Her bir şubeniz için oluşturulan istatistikler sayesinde satış başarınızı artırabilir,şubeleriniz arasında kolaylıkla başarı karşılaştırması yapabilirsiniz.Sistemimiz size şubeleriniz için değerlendirmeler yapacağınız kayıtlar sunacaktır.</p>
    </div>
  </div>
  );
}

export default About;