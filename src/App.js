import React from 'react';
import './scss/theme.scss';
import {english, spanish} from './text/languages'

function App() {
  const items = [1, 2, 3, 4, 5, 6];

  const [hora, setHora] = React.useState('');
  const [idioma, setIdioma] = React.useState(false);
  const [textos, setTextos] = React.useState(english);
  const [dia_semana, setDiaSemana] = React.useState(0);
  const [dia_mes, setDiaMes] = React.useState(0);
  const [mes, setMes] = React.useState(0);

  React.useEffect(() => {    
    const regresaDosDigitos = (valor) => {
      return valor<=9?'0'+valor:valor;
    };

    const actualizaHoraFecha = () => {
      const date = new Date();
      const horas = regresaDosDigitos(date.getHours());
      const minutos = regresaDosDigitos(date.getMinutes());
      //const segundos = regresaDosDigitos(date.getSeconds()); por si se requieren segundos

      setDiaSemana(date.getDay());
      setMes(date.getMonth());
      setDiaMes(date.getDate());

      setHora(horas+":"+minutos);
    };

    setInterval(actualizaHoraFecha,500);
  }, []);

  const cambiaIdioma = async (valor) => {
    setIdioma(valor);
    setTextos(valor?spanish:english);
  };
  
  return (
    <div className="main-container container-fluid">
      <div className="row h-100">
        <div className="col-xl-3 col-md-5 col-sm-12 bg-image-left d-flex align-items-center justify-content-center h-100">
          <div className="card user-card overflow-y">
            <img className="card-img-top logo-user" src='img/logo-user.png' alt="user logo"></img>
            <div className="card-body user-card-body">
              <div className="d-flex align-items-center flex-column user-content">
                <div className="row text-center div-config">
                  <div><i className="fa-solid fa-gear"></i> {textos.config}</div>
                </div>
                <div className="row text-center div-bienvenida">
                  <h1 className="bienvenida">{textos.bienvenida}</h1>
                </div>
                <div className="row text-center div-language">
                  <div><i className="fa-solid fa-globe active-language"></i> <span className={`cursor-pointer btn btn-outline-light ${!idioma?'active-language':''}`} onClick={()=>cambiaIdioma(false)}>EN</span> <span className={`cursor-pointer btn btn-outline-light ${idioma?'active-language':''}`} onClick={()=>cambiaIdioma(true)}>ES</span></div>
                </div>
                <div className="row justify-content-center div-button">
                    <button className="btn btn-outline-primary btn-sign">{textos.button_msg}</button>
                </div>
                <div className="row time-date text-center div-date">
                  <span className="time">{hora}</span>
                  <span className="date">{textos.dias_semana[dia_semana]},{dia_mes} {textos.meses[mes]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-md-7 col-sm-12 align-self-center h-100 bg-image-right">
          <div className="content-right">
            <p className="title align-self-center">Logo</p>
            <div className="row">
              {
                items.map(item => (
                  <div className="col-xl-4 col-md-6 col-12 div-menu-item d-flex justify-content-center" key={item}>
                    <div className="card menu-item-card">
                      <div className="card-body user-card-body">
                        <div className="w-100 bg-menu-item d-flex justify-content-center">
                          <img src={'./img/menu-items/item' + item + '.png'} alt="menu-item"></img>
                        </div>
                        <div className="w-100 text-center text-item">{textos.menu_item} {item}</div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
