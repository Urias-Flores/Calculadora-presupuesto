import {useEffect, useState} from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import nuevoPresupuesto from "./NuevoPresupuesto.jsx";
import gasto from "./Gasto.jsx";

const ControlPresupuesto = ( { Presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto } ) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(()=>{
        const totalGastado = gastos.reduce( (total, gasto) => parseInt(gasto.Cantidad) + total, 0);
        setGastado(totalGastado);
        setDisponible(Presupuesto - totalGastado);

        //Calculando porcentaje gastado
        const NuevoPorcentaje = (100 * totalGastado / Presupuesto).toFixed(2);
        setTimeout(()=> {
            setPorcentaje(NuevoPorcentaje)
        }, 1500)
    }, [gastos])

    const formattdeAmount  = (cantidad) => {
        return cantidad.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })
    }

    const handleReset = () =>{
        const confirmation = confirm("Desea reiniciar el presupuesto y los gastos?")

        if(confirmation){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div className="contenido-presupuesto">
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor : porcentaje > 100 ? "#DC2626" :"#3B82F6",
                        trailColor : "#F5F5F5",
                        textColor : porcentaje > 100 ? "#DC2626" :"#3B82F6"
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <p>
                    <button type="button" className="reset-app" onClick={() => {handleReset()}}>
                        Resetear app
                    </button>
                </p>

                <p>
                    <span>Presupuesto: </span> {formattdeAmount(Presupuesto)}
                </p>

                <p className={`${disponible < 0 ? "negativo" : ""}`}>
                    <span>Disponible: </span> {formattdeAmount(disponible)}
                </p>

                <p>
                    <span>Gastado: </span> {formattdeAmount(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto