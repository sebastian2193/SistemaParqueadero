import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

    const [datos, setDatos] = useState({});

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {

        try {

            const respuesta =
            await api.get("/dashboard");

            setDatos(respuesta.data);

        } catch(error) {

            console.log(error);

        }

    };

    return (

        <div>

            <h1 className="mb-4">
                Dashboard Parqueadero
            </h1>

            <div className="row">

                <div className="col-md-4 mb-3">

                    <div className="card p-4">

                        <h4>🚗 Vehículos Activos</h4>

                        <h2>
                            {datos.vehiculosActivos || 0}
                        </h2>

                    </div>

                </div>

                <div className="col-md-4 mb-3">

                    <div className="card p-4">

                        <h4>🏍️ Motos Activas</h4>

                        <h2>
                            {datos.motosActivas || 0}
                        </h2>

                    </div>

                </div>

                <div className="col-md-4 mb-3">

                    <div className="card p-4">

                        <h4>🚙 Carros Activos</h4>

                        <h2>
                            {datos.carrosActivos || 0}
                        </h2>

                    </div>

                </div>

                <div className="col-md-6 mb-3">

                    <div className="card p-4">

                        <h4>📥 Ingresos Hoy</h4>

                        <h2>
                            {datos.ingresosHoy || 0}
                        </h2>

                    </div>

                </div>

                <div className="col-md-6 mb-3">

                    <div className="card p-4">

                        <h4>💰 Recaudo Hoy</h4>

                        <h2>
                            $
                            {datos.recaudoHoy || 0}
                        </h2>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;