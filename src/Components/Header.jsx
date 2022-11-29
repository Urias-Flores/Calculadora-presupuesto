import NuevoPresupuesto from "./NuevoPresupuesto.jsx";
import ControlPresupuesto from "./ControlPresupuesto.jsx";

const Header = ({ Presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, gastos, setGastos }) => {
    return (
        <>
            <header>
                <h1>Control de gastos</h1>
                <div className="contenedor">
                    {
                        isValidPresupuesto ?
                            (
                                <ControlPresupuesto
                                    gastos = {gastos}
                                    setGastos = {setGastos}
                                    Presupuesto = {Presupuesto}
                                    setPresupuesto = {setPresupuesto}
                                    setIsValidPresupuesto = {setIsValidPresupuesto}
                                />
                            ) :
                            (
                                <NuevoPresupuesto
                                    Presupuesto = {Presupuesto}
                                    setPresupuesto = {setPresupuesto}
                                    setIsValidPresupuesto = {setIsValidPresupuesto}
                                />
                            )
                    }
                </div>
            </header>


        </>
    )
}

export default Header