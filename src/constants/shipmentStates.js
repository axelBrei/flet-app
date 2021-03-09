export const SHIPMENT_STATE = {
    NEW: 'NEW', // Order has been confirmed but it han't a courrier
    PENDING_COURRIER: 'COURRIER_PENDING', // Waiting to find a courrier
    COURRIER_CONFIRMED: 'CONFIRMED', // One courrier accepted the order and it's going to pickup the package
    ON_PROCESS: 'ON_PROCESS', // The courrier is delivering the package to it's final location
    DELIVERED: 'DELIVERED', // Courrier delivered the package
    FINISHED: 'FINISHED', // User accept the delivery with the courrier code.

    CANCELLED: 'CANCEL',
}

/*
 *  New ->
 *
 *  Conductor confirmado/yendo a buscar el paquete
 *  Conductor levanto el paquete
 *  Conductor entrego el paquete
 *  Entregado
 *  Cancelado -> Solamente antes de que el conductor llegue a buscar el paquete o 5 minutos.
 */
