
export const getID = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36)
    return random + fecha
}

export const formattDate = (date) => {
    const newDate = new Date(date);

    const options = {
        year: "numeric",
        month: "long",
        day: "2-digit"
    }
    return newDate.toLocaleDateString("es-ES", options);
}

export const formattedAmount  = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })
}