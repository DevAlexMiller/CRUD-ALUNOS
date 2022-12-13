import React  from 'react';
import Alunos from '../../components/Alunos/Alunos';
import 'bootstrap/dist/css/bootstrap.min.css';
function Crud() {
  return (
    <div className="Crud">
      <div>
        <h1>Alunos</h1>
      </div>
      <Alunos />
    </div>
    
  );
}

export default Crud;