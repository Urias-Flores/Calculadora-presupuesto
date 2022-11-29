import { useState, useEffect } from "react";
import Mensaje from "./Mensaje.jsx";
import btnClose from "../img/cerrar.svg"
import gasto from "./Gasto.jsx";

const Modal = ( { setModal, animarModal, setAnimarModal, saveGasto, gastoEditar, setGastoEditar } ) => {

    const [Nombre, setNombre] = useState("");
    const [Cantidad, setCantidad] = useState("");
    const [Categoria, setCategoria] = useState("");
    const [id, setID] = useState("")
    const [fecha, setFecha]  = useState("")
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.Nombre)
            setCantidad(gastoEditar.Cantidad)
            setCategoria(gastoEditar.Categoria)
            setID(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        if([Nombre, Cantidad, Categoria].includes('')){
            setMensaje("Todos los campos son obligatorios")

            setTimeout(() =>{
                setMensaje("")
            }, 3000)
            return
        }
        saveGasto( { Nombre, Cantidad, Categoria, id, fecha } )
        hideModal();
    }

    const hideModal = ()=>{
        setGastoEditar({})
        setAnimarModal(false)
        setTimeout(()=>{setModal(false)}, 500)
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img src={btnClose} alt="Imagen cerrar modal" onClick={hideModal}/>
            </div>

            <form className={`formulario ${animarModal ? "animar" : "cerrar"}`} onSubmit={handleSubmit}>

                <legend>{gastoEditar.Nombre ? "Editar gasto" : "Nuevo gasto"}</legend>

                {mensaje && <Mensaje tipo = {"error"}>{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" placeholder="Ingrese el nombre del gasto" value={Nombre} onChange={e => setNombre(e.target.value)}/>
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input type="number" id="cantidad" placeholder="Ingrese la cantidad" value={Cantidad} onChange={e => setCantidad(e.target.value)}/>
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select id="categoria" value={Categoria} onChange={e => setCategoria(e.target.value)}>
                        <option>-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="casa">Casa</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Subcripciones</option>
                    </select>
                </div>

                <input type="submit" value={gastoEditar.Nombre ? "Guardar cambios" : "Añadir gasto"}/>
            </form>
        </div>

    )
}

export default Modal