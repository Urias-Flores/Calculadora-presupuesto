import { useState, useEffect } from "react";
import iconoNuevoGasto from "./img/nuevo-gasto.svg"
import Header from "./Components/Header.jsx";
import Modal from "./Components/Modal.jsx"
import Filtros from "./Components/Filtros.jsx";
import ListadoGastos from "./Components/ListadoGastos.jsx";
import { getID } from "../Helpers/index.js";

function App() {

    const [Presupuesto, setPresupuesto] = useState(Number( localStorage.getItem("Presupuesto") ) ?? 0);
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [gastos, setGastos] = useState(JSON.parse(localStorage.getItem("gastos")) ?? []);
    const [gastoEditar, setGastoEditar] = useState({});
    const [filtro, setFiltro] = useState("");
    const [gastosFiltrados, setGastosFiltrados] = useState([])

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0){
            handleNuevoGasto();
        }
    }, [gastoEditar]);

    useEffect(()=> {
        localStorage.setItem("Presupuesto", Presupuesto ?? 0)
    }, [Presupuesto])

    useEffect(() => {
        localStorage.setItem("gastos", JSON.stringify(gastos) ?? [])
    }, [gastos]);

    useEffect(()=> {
        if(filtro){
            const gastosFiltrados = gastos.filter( gastoState => gastoState.Categoria === filtro )
            console.log(gastosFiltrados)
            setGastosFiltrados(gastosFiltrados)
        }else{
            //setGastos(JSON.parse(localStorage.getItem("gastos")))
        }
    }, [filtro])

    useEffect(() => {
        const PresupuestoLS = Number(localStorage.getItem("Presupuesto")) ?? 0;
        if (PresupuestoLS > 0){
            setIsValidPresupuesto(true)
        }
    }, []);


    const handleNuevoGasto = ()=>{
        setModal(true)
        setTimeout(()=>{setAnimarModal(true)}, 500)
    }

    const saveGasto = (gasto) => {
        if(gasto.id){
            const gastosActualizados = gastos.map( gastoState => gasto.id === gastoState.id ? gasto : gastoState );
            setGastos(gastosActualizados);
        }else{
            gasto.id = getID();
            gasto.fecha = Date.now();
            setGastos([...gastos, gasto]);
        }
    }

    const deleteGasto = id => {
        const gastosActualizados = gastos.filter( gastoState => gastoState.id !== id)
        setGastos(gastosActualizados);
    }

    return (
    <div className={modal ? "fijar" : ""}>
        <Header
            gastos = {gastos}
            setGastos = {setGastos}
            Presupuesto = {Presupuesto}
            setPresupuesto = {setPresupuesto}
            isValidPresupuesto = {isValidPresupuesto}
            setIsValidPresupuesto = {setIsValidPresupuesto}
        />

        {isValidPresupuesto &&
            (
                <>
                    <main>
                        <Filtros
                            filtro = {filtro}
                            setFiltro = {setFiltro}
                        />
                        <ListadoGastos
                            gastos = {gastos}
                            filtro = {filtro}
                            gastosFiltrados = {gastosFiltrados}
                            setGastoEditar = {setGastoEditar}
                            deleteGasto = {deleteGasto}
                        />
                    </main>

                    <div className="nuevo-gasto">
                        <img src={iconoNuevoGasto} alt="Icono de nuevo gasto" onClick={handleNuevoGasto}/>
                    </div>
                </>
            )
        }

        {modal && <Modal
            setModal = {setModal}
            animarModal = {animarModal}
            setAnimarModal = {setAnimarModal}
            saveGasto = {saveGasto}
            gastoEditar = {gastoEditar}
            setGastoEditar = {setGastoEditar}
        />}
    </div>
    )
}

export default App
