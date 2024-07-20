import React, { useState, useEffect } from "react";
import "./Placar.css";

export default function PlacarOnline(props) {
  const [TypePlacar, setTypePlacar] = useState("config");

  const initialName = {
    timeA: "Time A",
    timeB: "Time B",
  };
  const [NomeTime, setNomeTime] = useState(initialName);

  const [GolsTimeA, setGolsTimeA] = useState(0);
  const [GolsTimeB, setGolsTimeB] = useState(0);

  const [Timer, setTimer] = useState(0);
  const [TimerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;

    if (TimerOn) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 100);
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [TimerOn]);

  if (TypePlacar === "config") {
    return configPlacar();
  }
  if (TypePlacar === "placar") {
    return placar(NomeTime.timeA, NomeTime.timeB);
  }

  function configPlacar() {
    function nomeiaTime(ev) {
      const { name, value } = ev.target;
      setNomeTime({ ...NomeTime, [name]: value });
    }

    function handleSubmit(ev) {
      ev.preventDefault();
      setTypePlacar("placar");
    }

    return (
      <div className="config-placar__container">
        <div className="title__container">
          <h1>Insira as informações da partida</h1>
        </div>
        <form className="info-partida-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome do time A"
            name="timeA"
            id="timeA"
            onChange={nomeiaTime}
          />
          <input
            type="text"
            placeholder="Nome do time B"
            name="timeB"
            id="timeB"
            onChange={nomeiaTime}
          />
          <button id="start" type="submit">
            Iniciar Partida!
          </button>
        </form>
      </div>
    );
  }

  function placar(timeA, timeB) {
    function anularGolsTimeA() {
      if (GolsTimeA > 0) {
        setGolsTimeA(GolsTimeA - 1);
      }
    }

    function anularGolsTimeB() {
      if (GolsTimeB > 0) {
        setGolsTimeB(GolsTimeB - 1);
      }
    }

    function confirmarReset() {
      let confirmReset = window.confirm("Deseja realmente reiniciar?");
      if (confirmReset) {
        resetTempo();
      }
    }
    function confirmarResetAll() {
      let confirmReset = window.confirm(
        "Deseja realmente iniciar nova partida?"
      );
      if (confirmReset) {
        resetAll();
      }
    }

    function resetTempo() {
      setTimer(0);
      setTimerOn(false);
    }

    function resetPlacar() {
      setTimer(0);
      setTimerOn(false);
      setGolsTimeA(0);
      setGolsTimeB(0);
    }

    function resetAll() {
      setTypePlacar("config");
      resetPlacar();
    }

    return (
      <div className="container">
        <div className="placar__container">
          <div className="placar__time a">
            <h1>{timeA}</h1>
            <h4>{GolsTimeA}</h4>
          </div>

          <div className="tempo__container">
            <div className="tempo__contador">
              <span>{("0" + Math.floor((Timer / 60000) % 60)).slice(-2)}:</span>
              <span>{("0" + Math.floor((Timer / 1000) % 60)).slice(-2)}</span>
            </div>
            <button
              type="button"
              id="btnStart"
              onClick={() => setTimerOn(true)}
            >
              Começar
            </button>
            <button
              type="button"
              id="btnPause"
              onClick={() => setTimerOn(false)}
            >
              Pausar
            </button>
            <button type="button" id="btnResume" onClick={confirmarReset}>
              Reiniciar
            </button>
          </div>

          <div className="placar__time b">
            <h1>{timeB}</h1>
            <h4>{GolsTimeB}</h4>
          </div>
        </div>

        <div className="placar__reset">
          <div className="marcar-button">
            <button
              type="button"
              className="gol-validado"
              onClick={() => setGolsTimeA(GolsTimeA + 1)}
            >
              Goool
            </button>
            <button
              type="button"
              className="gol-cancelado"
              onClick={anularGolsTimeA}
            >
              Cancelar Gol
            </button>
          </div>

          <div className="reset-button">
            <button type="button" onClick={confirmarResetAll}>
              Iniciar novo jogo
            </button>
          </div>

          <div className="marcar-button">
            <button
              type="button"
              className="gol-validado"
              onClick={() => setGolsTimeB(GolsTimeB + 1)}
            >
              Goool
            </button>
            <button
              type="button"
              className="gol-cancelado"
              onClick={anularGolsTimeB}
            >
              Cancelar Gol
            </button>
          </div>
        </div>
      </div>
    );
  }
}
