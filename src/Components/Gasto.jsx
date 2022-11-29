import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list"
import "react-swipeable-list/dist/styles.css"
import { formattDate, formattedAmount } from "../../Helpers/index.js";

//Importacion de imagenes
import IconoAhorro from "../img/icono_ahorro.svg"
import IconoCasa from "../img/icono_casa.svg"
import IconoComida from "../img/icono_comida.svg"
import IconoGastos from "../img/icono_gastos.svg"
import IconoOcio from "../img/icono_ocio.svg"
import IconoSalud from "../img/icono_salud.svg"
import IconoSuscripciones from "../img/icono_suscripciones.svg"

const Gasto = ({gasto, setGastosEditar, deleteGasto}) => {

    const iconsDictionary = {
        ahorro : IconoAhorro,
        comida : IconoComida,
        gastos : IconoGastos,
        ocio : IconoOcio,
        casa : IconoCasa,
        salud : IconoSalud,
        suscripciones : IconoSuscripciones
    }

    const { Categoria, Nombre, Cantidad, id, fecha } = gasto

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => {setGastosEditar(gasto)}}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() => {deleteGasto(id)}}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )



    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img src={iconsDictionary[Categoria]} alt="Imagen categoria"/>

                        <div className="descripcion-gasto">
                            <p className="categoria">{Categoria}</p>
                            <p className="nombre-gasto">{Nombre}</p>
                            <p className="fecha-gasto">Agregado el: {" "}
                                <span>{formattDate(fecha)}</span>
                            </p>
                        </div>
                    </div>

                    <div className="cantidad-gasto">${Cantidad}</div>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Gasto