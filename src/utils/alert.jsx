import Swal from "sweetalert2";



export const swal = () => 
    Swal.fire({
        title: "Credenciales inválidas",
        text: "Por favor verifique sus credenciales",
        confirmButtonText: "Aceptar",
        width: "400px",
        timer: 10000,
        timerProgressBar: true
    })

