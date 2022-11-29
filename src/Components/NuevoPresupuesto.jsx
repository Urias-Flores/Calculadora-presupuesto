import { useState } from "react";
import Mensaje from "./Mensaje.jsx";

const NuevoPresupuesto =({ Presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

    const [ mensaje, setMensaje ] = useState("");

    const HandlePresupuesto = (e) => {
        e.preventDefault();

        if( Presupuesto <= 0){
            setMensaje("El presupuesto ingresado no es valido");
            return;
        }
        setMensaje("")
        setIsValidPresupuesto(true);
    }

    return (
        <div className="contenedor-presupuesto sombra">
            <form className="formulario" onSubmit={HandlePresupuesto}>
                <div className="campo">
                    <label>Define tu presupuesto</label>
                    <input
                        className="nuevo-presupuesto"
                        type="number"
                        placeholder="Añade tu presupuesto"
                        value={Presupuesto}
                        onChange={ (e) => {setPresupuesto(Number(e.target.value))} }
                    />
                    <input
                        type="submit"
                    />
                </div>

                {mensaje && <Mensaje tipo = {"error"}> {mensaje} </Mensaje>}
            </form>
        </div>
    )
}

export default NuevoPresupuesto