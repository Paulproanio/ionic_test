<template>
<ion-page>
    <ion-header>
        <ion-toolbar>
            <ion-title color="success">Lista Planta </ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-grid>
            <ion-row>

                <ion-col size="12">
                    <ion-input label-placement="stacked" fill="outline" shape="round" color="success" label="Codigo planta.." disabled="false" v-model="idPlanta"></ion-input>
                </ion-col>
                <ion-col size="3"></ion-col>
                <ion-col size="3">
                    <ion-button shape="round" color="success" expand="full" @click="buscarPlanta(idPlanta)"><ion-icon :icon="searchOutline" ></ion-icon></ion-button>
                </ion-col>
                <ion-col size="3">
                    <ion-button shape="round" color="danger" expand="full" @click="reiniciarVariables()">
                       
                        <ion-icon :icon="closeOutline" ></ion-icon>
                    </ion-button>
                </ion-col>
                <ion-col size="3"></ion-col>
                <ion-col size="12">

                </ion-col>
            </ion-row>
        </ion-grid>

        <ion-card color="success" elevation="1" v-if="idPlantaMostrar != 0">
            <ion-card-header>

                <ion-card-title color="danger"> FICHA TÉCNICA PLANTA

                    <ion-chip v-if="idEstadoPlantaMostrar == 1">
                        <ion-avatar>
                            <ion-icon :icon="checkmarkCircle" color="warning"></ion-icon>
                        </ion-avatar>
                        <ion-label color="warning"> {{ nombreEstadoPlantaMostrar  }}</ion-label>
                    </ion-chip>

                    <ion-chip v-else>
                        <ion-avatar>
                            <ion-icon name="close-circle-outline"></ion-icon>
                            <ion-icon :icon="closeCircleOutline"></ion-icon>
                        </ion-avatar>
                        <ion-label> {{ elementosPlanta.proEstadoPlanta.nombreEstadoPlanta }}</ion-label>
                    </ion-chip>
                </ion-card-title>

                <ion-card-subtitle>CARACTERÍSTICAS PRINCIPALES</ion-card-subtitle>

                <!-- <ion-grid>
                    <ion-icon :icon="leafSharp"></ion-icon>
                    <ion-row>
                        <ion-col>{{ idPlantaMostrar }}</ion-col>
                    </ion-row>
                </ion-grid> -->

                <ion-item>
                    <ion-label>Id planta : </ion-label>
                    {{ idPlantaMostrar }}
                </ion-item>
                <ion-item>
                    <ion-label>Lote siembra : </ion-label>
                    {{ loteRegistroSiembraMostrar }}
                </ion-item>
                <ion-item>
                    <ion-label>Tipo planta : </ion-label>
                    {{ nombreTipoPlantaMostrar }}
                </ion-item>
                <ion-item>
                    <ion-label>% Thc : </ion-label>
                    {{ porcentajeThcPlantaMostrar }}
                </ion-item>
                <ion-item>
                    <ion-label>% Cbd : </ion-label>
                    {{ porcentajeCbdPlantaMostrar }}
                </ion-item>
                <ion-item>
                    <ion-label>Ubicación : </ion-label>
                    {{ idUbicacionMostrar }}
                </ion-item>
                <ion-item>
                    <ion-label>Familia : </ion-label>
                    {{ nombreFamiliaPlantaMostrar }}
                </ion-item>
                <ion-item>
                    <ion-label>Nombre interno : </ion-label>
                    {{ nombreInternoMostrar }}
                </ion-item>
                <!-- <ion-item>
                    <ion-label>Qr: </ion-label>
                    {{ codigoQRMostrar }}
                </ion-item> -->

            </ion-card-header>
        </ion-card>

        <ion-card color="success" elevation="1" v-if="idPlantaMostrar != 0">
            <ion-card-header>
                <ion-card-title>Actividades</ion-card-title>
            </ion-card-header>

            <ion-list v-for="item in listActividadPlanta" :key="item.idPlantaActividad">
                <ion-item>
                    <!-- <ion-label>{{ item.idPlantaActividad }}</ion-label> -->
                    <ion-label>{{ item.fechaPlantaActividad }}</ion-label>
                    <!-- <ion-icon :icon="checkmarkCircle" color="success" slot="start"> </ion-icon> -->
                    <!-- <span v-if="phone.data && phone.data.hasOwnProperty('color')">({{ phone.data.color }})</span> -->
                    <ion-label>{{ item.proActividad.nombreActividad }}</ion-label>
                    <ion-label>

                        <ion-chip v-if="item.estadoActividad " color="success">
                            <ion-icon :icon="checkmarkCircleOutline" color="success" size="large"></ion-icon>
                        </ion-chip>
                        <ion-chip v-else color="danger">
                            <ion-icon :icon="checkmarkCircleOutline" color="danger" size="large"></ion-icon>
                        </ion-chip>
                    </ion-label>

                </ion-item>
            </ion-list>

        </ion-card>

        <ion-card color="success" elevation="1" v-if="idPlantaMostrar != 0">
            <ion-card-header>
                <ion-card-title>Registro crecimiento</ion-card-title>
            </ion-card-header>

            <ion-list v-for="item in listaCrecimiento" :key="item.idRegistro">
                <ion-item>
                    <!-- <ion-label>{{ item.idRegistro }}</ion-label> -->
                    <ion-label>{{ item.fechaRegistro }}</ion-label>
                    <!-- <ion-icon :icon="checkmarkCircle" color="success" slot="start"> </ion-icon> -->
                    <!-- <span v-if="phone.data && phone.data.hasOwnProperty('color')">({{ phone.data.color }})</span> -->
                    <ion-label>sem {{ item.semanaRegistro }}</ion-label>
                    <ion-label>{{ item.valorRegistro }} cm</ion-label>
                </ion-item>
            </ion-list>

        </ion-card>

    </ion-content>

    <!-- <ion-content class="ion-padding">
        <ion-list lines="full" v-for="phone in phones" :key="phone.id">
            <ion-item>
                <ion-icon :icon="checkmarkCircle" color="success" slot="start"> </ion-icon>
                <ion-label>{{ phone.name }}
                    <span v-if="phone.data && phone.data.hasOwnProperty('color')">({{ phone.data.color }})</span>
                </ion-label>
            </ion-item>

        </ion-list>
    </ion-content> -->
</ion-page>
</template>

<script>
import axios from 'axios'
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonInput,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonSelect,
    IonSelectOption,
    IonCard,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonAvatar,
    IonChip,

} from '@ionic/vue';

import {
    checkmarkCircle,
    leafSharp,
    closeCircleOutline,
    addCircleOutline,
    checkmarkCircleOutline,
    searchOutline,
    closeOutline,
} from 'ionicons/icons'

export default {
    name: 'TelefonoList',

    data() {
        return {
            nombreEstadoPlantaMostrar: '',
            idPlantaMostrar: '',
            idEstadoPlantaMostrar: '',
            loteRegistroSiembraMostrar: '',
            nombreTipoPlantaMostrar: '',
            porcentajeCbdPlantaMostrar: '',
            porcentajeThcPlantaMostrar: '',
            idUbicacionMostrar: '',
            nombreFamiliaPlantaMostrar: '',
            nombreInternoMostrar: '',
            codigoQRMostrar: '',
            ///////////////////////////
            leafSharp,
            checkmarkCircle,
            closeCircleOutline,
            checkmarkCircleOutline,
            closeOutline,
            searchOutline,
            phones: [],
            idPlanta: 0,
            planta: [],
            listaCrecimiento: [],
            listActividadPlanta: [],
            elementosPlanta: [{
                clasificacionA: 0,
                clasificacionB: 0,
                clasificacionC: 0,
                clasificacionD: 0,
                codigoQR: "",
                idPlanta: 0,
                lotePlanta: "",
                numeroBandeja: "",
                porcentajeCbdPlanta: 0,
                porcentajeThcPlanta: 0,
                prefijoPlanta: "",
                proEstadoPlanta: {
                    idEstadoPlanta: 1,
                    nombreEstadoPlanta: '',
                    detalleEstadoPlanta: '',
                    proGestionarEstadoPlanta: null
                },
                proPlanta: null,
                proRegistroSiembra: {
                    idRegistroSiembra: 0,
                    loteRegistroSiembra: '',
                    semanaRegistroSiembra: '',
                    pesoImpuresasRegistroSiembra: null,
                    pesoSemillasRegistroSiembra: 0,

                },
                proTipoPlanta: {
                    idTipoPlanta: 0,
                    nombreTipoPlanta: '',
                    detalleTipoPlanta: ''
                },
                proUbicacion: {
                    idUbicacion: '0-0-0',
                    ubiPrimeraParte: 0,
                }
            }]
        };
    },

    mounted() {

    },

    methods: {

        async buscarPlanta(codigoPlanta) {
            if (codigoPlanta) {
                await axios.get('http://localhost:12590/api/tucann/proPlanta/' + codigoPlanta)
                    .then(res => {

                        this.elementosPlanta = res.data

                        //{
                        //     clasificacionA: 0,
                        //     clasificacionB: 0,
                        //     clasificacionC: 0,
                        //     clasificacionD: 0,
                        this.codigoQRMostrar = res.data.codigoQR
                        this.idPlantaMostrar = res.data.idPlanta
                        //     lotePlanta: "",
                        //     numeroBandeja: "1",
                        this.porcentajeCbdPlantaMostrar = res.data.porcentajeCbdPlanta
                        this.porcentajeThcPlantaMostrar = res.data.porcentajeThcPlanta
                        //     prefijoPlanta: "AAA",
                        this.nombreEstadoPlantaMostrar = res.data.proEstadoPlanta.nombreEstadoPlanta
                        this.idEstadoPlantaMostrar = res.data.proEstadoPlanta.idEstadoPlanta

                        this.nombreFamiliaPlantaMostrar = res.data.proRegistroSiembra.proSemilla.proFamiliaSemilla.nombreFamiliaSemilla
                        this.nombreInternoMostrar = res.data.proRegistroSiembra.proSemilla.nombreInternoSemilla
                        // : {
                        //         idEstadoPlanta: 1,
                        //         nombreEstadoPlanta: 'Activa',
                        //         detalleEstadoPlanta: 'Semilla que si germinó y sigue en el proceso de producción',
                        //         proGestionarEstadoPlanta: null
                        //     },
                        //     proPlanta: null,
                        this.loteRegistroSiembraMostrar = res.data.proRegistroSiembra.loteRegistroSiembra
                        //{
                        //         idRegistroSiembra: 1,
                        //         loteRegistroSiembra: 'C112122501',
                        //         semanaRegistroSiembra: '22',
                        //         pesoImpuresasRegistroSiembra: null,
                        //         pesoSemillasRegistroSiembra: 0.022,

                        //     },
                        this.nombreTipoPlantaMostrar = res.data.proTipoPlanta.nombreTipoPlanta
                        //     proTipoPlanta: {
                        //         idTipoPlanta: 2,
                        //         nombreTipoPlanta: 'Madre',
                        //         detalleTipoPlanta: 'Planta madre usada para clonación'
                        //     },
                        this.idUbicacionMostrar = res.data.proUbicacion.idUbicacion
                        //     proUbicacion: {
                        //         idUbicacion: '0-0-0',
                        //         ubiPrimeraParte: 0,
                        //     }
                        // }
                        this.traerDatosCrecimiento(codigoPlanta)
                        this.traerDatosActividad(codigoPlanta)

                    })
                    .catch(err => {
                        console.error(err);
                    })

            } else {
                alert("Debe colocar un id de planta")
            }
        },
        reiniciarVariables() {
            this.idPlantaMostrar = 0
            this.idPlanta = 0
        },

        traerDatosCrecimiento(codigoPlanta) {
            axios.get('http://localhost:12590/api/tucann/proRegistroCrecimiento/xidpcr/' + codigoPlanta)
                .then(res => {
                    this.listaCrecimiento = res.data
                })
                .catch(err => {
                    console.error(err);
                })
        },

        traerDatosActividad(codigoPlanta) {
            axios.get('http://localhost:12590/api/tucann/proPlantaActividad/xidp/' + codigoPlanta)
                .then(res => {
                    console.log(res.data)
                    this.listActividadPlanta = res.data
                })
                .catch(err => {
                    console.error(err);
                })
        }

    },
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonIcon,
        IonInput,
        IonButton,
        IonGrid,
        IonRow,
        IonCol,
        IonSelect,
        IonSelectOption,
        IonCard,
        IonCardSubtitle,
        IonCardTitle,
        IonCardHeader,
        IonAvatar,
        IonChip,
    }
};
</script>

<style>
.colorChipSucccess {
    --background: #00213f;
    --color: #adefd1;
}
</style>
