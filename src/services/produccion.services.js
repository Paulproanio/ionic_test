import axios from "axios";
import generalHeader from "@/services/general-header";
const API_PROD = "http://localhost:6060/api/tucann/genUsuarioSistema/";

class produccionServices {

  listarRegistroCrecimiento(idPlanta) {
    var config = {
      method: "get",
      url: "http://localhost:6060/api/tucann/proRegistroCrecimiento/xidpcr/"+idPlanta,
     // headers: generalHeader(),
     // data: usuario,
     ///proRegistroCrecimiento/xidpcr/{idPlanta}
    };
    //  console.log(generalHeader);
    return axios(config);
  }
}
export default new produccionServices();
