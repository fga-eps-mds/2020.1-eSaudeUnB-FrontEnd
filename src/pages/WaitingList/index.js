import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import api from '../../services/api';
import './styles.css';
import NavBar from '../../components/NavBar';

export default function WaitingList() {
  const [waitingList, setWaitingList] = useState([]);

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    api.get(`/waitingList`, {
      headers: { authorization: accessToken },
    }).then((response) => {
      setWaitingList(response.data);
    });
  }, [accessToken]);

  function calculateUrgency(score) {
    if (score <= 1134 && score > 430) {
      return 'vermelha';
    }
    if (score <= 430 && score > 280) {
      return 'laranja';
    }
    if (score <= 280 && score > 182) {
      return 'amarela';
    }
    if (score <= 182 && score > 120) {
      return 'verde';
    }
    if (score <= 120 && score > 4) {
      return 'azul';
    }
    if (score < 4) {
      return 'branca';
    }
  }

  return (
    <div className="waiting-list-container">
      <NavBar className="navBar" bond="Professional" />
      <div className="content">
        <div className="list">
          <div className="list-title">
            <h1>Lista de Espera</h1>
          </div>
          <div className="list-content">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Posição</th>
                  <th>Email</th>
                  <th>Urgência</th>
                </tr>
              </thead>
              <tbody>
                {waitingList.map((item, index) => (
                  <tr key={index} className="waiting-list-item">
                    <td>{`${index + 1}º`}</td>
                    <td>{`${item.emailPatient}`}</td>
                    <td>{calculateUrgency(item.patientScore)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}