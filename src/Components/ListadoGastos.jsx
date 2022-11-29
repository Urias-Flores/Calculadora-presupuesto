import Gasto from "./Gasto.jsx";

const ListadoGastos = ({gastos, setGastoEditar, deleteGasto, gastosFiltrados, filtro}) => {
    return (
        <div className="listado-gastos contenedor">
            {
                filtro.length > 0 ?
                (
                    <>
                        <h2>{gastosFiltrados.length ? "Gastos" : "No hay gastos en esta categoria"}</h2>
                        {gastosFiltrados.map( gasto => (
                        <Gasto
                            key = {gasto.id}
                            gasto = {gasto}
                            setGastosEditar = {setGastoEditar}
                            deleteGasto = {deleteGasto}
                        />))}
                    </>
                ) :
                (
                    <>
                        <h2>{gastos.length ? "Gastos" : "No hay gastos registrados aun"}</h2>
                        {gastos.map( gasto => (
                        <Gasto
                            key = {gasto.id}
                            gasto = {gasto}
                            setGastosEditar = {setGastoEditar}
                            deleteGasto = {deleteGasto}
                        />))}
                    </>
                )
            }
        </div>
    )
}

export default ListadoGastos